import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/prisma.service';

interface AIProvider {
  name: string;
  baseUrl: string;
  apiKey: string;
  models: { [key: string]: string };
  priority: number;
}

@Injectable()
export class AiGatewayService {
  private readonly logger = new Logger(AiGatewayService.name);
  private providers: AIProvider[] = [];
  private requestCache = new Map<string, { response: string; timestamp: number }>();
  private readonly CACHE_TTL = 3600000;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.initProviders();
  }

  private initProviders() {
    if (this.configService.get<string>('OPENAI_API_KEY')) {
      this.providers.push({
        name: 'openai',
        baseUrl: 'https://api.openai.com/v1',
        apiKey: this.configService.get<string>('OPENAI_API_KEY')!,
        models: {
          'gpt-4o': 'gpt-4o',
          'gpt-4o-mini': 'gpt-4o-mini',
          'o1': 'o1',
          'o3-mini': 'o3-mini',
        },
        priority: 1,
      });
    }

    if (this.configService.get<string>('ANTHROPIC_API_KEY')) {
      this.providers.push({
        name: 'anthropic',
        baseUrl: 'https://api.anthropic.com/v1',
        apiKey: this.configService.get<string>('ANTHROPIC_API_KEY')!,
        models: {
          'claude-3-opus': 'claude-3-opus-20240229',
          'claude-3-sonnet': 'claude-3-sonnet-20240229',
          'claude-3-haiku': 'claude-3-haiku-20240307',
        },
        priority: 2,
      });
    }

    if (this.configService.get<string>('GOOGLE_AI_API_KEY')) {
      this.providers.push({
        name: 'google',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        apiKey: this.configService.get<string>('GOOGLE_AI_API_KEY')!,
        models: {
          'gemini-pro': 'gemini-pro',
          'gemini-ultra': 'gemini-ultra',
        },
        priority: 3,
      });
    }
  }

  async processRequest(dto: { feature: string; prompt: string; context?: Record<string, unknown> }, userId: string) {
    const cacheKey = `${dto.feature}:${dto.prompt.substring(0, 100)}`;
    const cached = this.requestCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      this.logger.log(`Cache hit for ${dto.feature}`);
      return { success: true, data: JSON.parse(cached.response), error: null, confidence: null, cached: true };
    }

    if (this.providers.length === 0) {
      throw new BadRequestException('No AI providers configured. Set OPENAI_API_KEY, ANTHROPIC_API_KEY, or GOOGLE_AI_API_KEY.');
    }

    const systemPrompts: Record<string, string> = {
      QUESTION_EXPLANATION: 'You are an expert tutor. Explain this question and its answer clearly.',
      PERSONAL_TUTOR: 'You are a personal tutor. Help the student understand the concept.',
      PERFORMANCE_ANALYSIS: 'Analyze the student performance data and provide insights.',
      WEAKNESS_IDENTIFICATION: 'Identify the student weak areas based on their performance.',
      STUDY_PLAN: 'Create a personalized daily or weekly study plan.',
      REVISION_NOTE: 'Generate concise revision notes for the given topic.',
      FLASHCARD: 'Create flashcards for effective revision.',
      SIMILAR_QUESTION: 'Generate similar practice questions.',
      QUESTION_GENERATION: 'Generate objective questions for the given topic.',
      THEORY_MARKING: 'Mark this theory answer. Provide score, correct points, missing points, and improvements.',
      ESSAY_MARKING: 'Grade this essay. Provide score, feedback, structure analysis, and improved version.',
      HANDWRITING_ANALYSIS: 'Analyze the handwriting image for answer content.',
      READINESS_PREDICTION: 'Predict exam readiness based on student performance data.',
      VOICE_TUTOR: 'Generate a voice tutor response for the given topic.',
    };

    const sortedProviders = [...this.providers].sort((a, b) => a.priority - b.priority);

    for (const provider of sortedProviders) {
      try {
        const startTime = Date.now();
        const response = await this.callProvider(provider, systemPrompts[dto.feature] || '', dto.prompt);
        const latency = Date.now() - startTime;

        const parsed = typeof response === 'string' ? this.safeParse(response) : response;

        await this.prisma.aIRequest.create({
          data: {
            userId,
            feature: dto.feature as any,
            prompt: dto.prompt,
            response: JSON.stringify(parsed),
            provider: provider.name,
            model: provider.models['gpt-4o'] || Object.values(provider.models)[0],
            tokensUsed: 0,
            cost: 0,
            latency,
            isCached: false,
          },
        });

        this.requestCache.set(cacheKey, {
          response: JSON.stringify(parsed),
          timestamp: Date.now(),
        });

        return { success: true, data: parsed, error: null, confidence: null, cached: false };
      } catch (error: any) {
        this.logger.error(`Provider ${provider.name} failed: ${error.message}`);
        continue;
      }
    }

    throw new BadRequestException('All AI providers failed. Please try again later.');
  }

  private async callProvider(provider: AIProvider, systemPrompt: string, userPrompt: string): Promise<any> {
    if (provider.name === 'openai') {
      return this.callOpenAI(provider, systemPrompt, userPrompt);
    } else if (provider.name === 'anthropic') {
      return this.callAnthropic(provider, systemPrompt, userPrompt);
    } else if (provider.name === 'google') {
      return this.callGoogleAI(provider, systemPrompt, userPrompt);
    }
    throw new Error(`Unknown provider: ${provider.name}`);
  }

  private async callOpenAI(provider: AIProvider, systemPrompt: string, userPrompt: string): Promise<any> {
    const response = await fetch(`${provider.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${provider.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async callAnthropic(provider: AIProvider, systemPrompt: string, userPrompt: string): Promise<any> {
    const response = await fetch(`${provider.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': provider.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${error}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  private async callGoogleAI(provider: AIProvider, systemPrompt: string, userPrompt: string): Promise<any> {
    const response = await fetch(
      `${provider.baseUrl}/models/gemini-pro:generateContent?key=${provider.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `${systemPrompt}\n\n${userPrompt}` },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4000,
          },
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Google AI API error: ${error}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  private safeParse(text: string): any {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      return { text };
    } catch {
      return { text };
    }
  }
}
