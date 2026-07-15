import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ResultsService {
  constructor(private prisma: PrismaService) {}

  async generateFromAttempt(attemptId: string) {
    const attempt = await this.prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        answers: {
          include: {
            question: {
              include: { subject: true, topic: true },
            },
          },
        },
      },
    });

    if (!attempt) throw new NotFoundException('Attempt not found');

    const totalScore = attempt.score || 0;
    const totalMarks = attempt.totalMarks || 0;
    const percentageScore = totalMarks > 0 ? (totalScore / totalMarks) * 100 : 0;

    const grade = this.calculateGrade(percentageScore);

    const subjectBreakdown = this.calculateSubjectBreakdown(attempt.answers);
    const topicBreakdown = this.calculateTopicBreakdown(attempt.answers);
    const timeAnalysis = this.calculateTimeAnalysis(attempt);
    const mistakeAnalysis = this.calculateMistakeAnalysis(attempt.answers);

    const recommendations = this.generateRecommendations(subjectBreakdown, topicBreakdown, mistakeAnalysis);

    const existing = await this.prisma.result.findUnique({ where: { attemptId } });
    if (existing) {
      return this.prisma.result.update({
        where: { attemptId },
        data: {
          totalScore,
          totalMarks,
          percentageScore,
          grade,
          subjectBreakdown,
          topicBreakdown,
          timeAnalysis,
          mistakeAnalysis,
          recommendations,
        },
      });
    }

    return this.prisma.result.create({
      data: {
        attemptId,
        userId: attempt.userId,
        totalScore,
        totalMarks,
        percentageScore,
        grade,
        subjectBreakdown,
        topicBreakdown,
        timeAnalysis,
        mistakeAnalysis,
        recommendations,
      },
    });
  }

  private calculateGrade(percentage: number): string {
    if (percentage >= 75) return 'A1';
    if (percentage >= 70) return 'B2';
    if (percentage >= 65) return 'B3';
    if (percentage >= 60) return 'C4';
    if (percentage >= 55) return 'C5';
    if (percentage >= 50) return 'C6';
    if (percentage >= 45) return 'D7';
    if (percentage >= 40) return 'E8';
    return 'F9';
  }

  private calculateSubjectBreakdown(answers: any[]) {
    const subjectMap = new Map<string, { subjectId: string; subjectName: string; score: number; totalMarks: number; questionsAttempted: number; questionsCorrect: number }>();

    for (const answer of answers) {
      if (!answer.question?.subject) continue;
      const subject = answer.question.subject;
      const key = subject.id;

      if (!subjectMap.has(key)) {
        subjectMap.set(key, {
          subjectId: subject.id,
          subjectName: subject.name,
          score: 0,
          totalMarks: 0,
          questionsAttempted: 0,
          questionsCorrect: 0,
        });
      }

      const entry = subjectMap.get(key)!;
      entry.questionsAttempted++;
      entry.totalMarks += answer.question.marks;
      if (answer.isCorrect) {
        entry.score += answer.question.marks;
        entry.questionsCorrect++;
      }
    }

    return Array.from(subjectMap.values()).map((entry) => ({
      ...entry,
      accuracy: entry.totalMarks > 0 ? (entry.score / entry.totalMarks) * 100 : 0,
    }));
  }

  private calculateTopicBreakdown(answers: any[]) {
    const topicMap = new Map<string, any>();

    for (const answer of answers) {
      if (!answer.question?.topic) continue;
      const topic = answer.question.topic;
      const key = topic.id;

      if (!topicMap.has(key)) {
        topicMap.set(key, {
          topicId: topic.id,
          topicName: topic.name,
          score: 0,
          totalMarks: 0,
          questionsAttempted: 0,
        });
      }

      const entry = topicMap.get(key)!;
      entry.questionsAttempted++;
      entry.totalMarks += answer.question.marks;
      if (answer.isCorrect) entry.score += answer.question.marks;
    }

    return Array.from(topicMap.values()).map((entry) => ({
      ...entry,
      accuracy: entry.totalMarks > 0 ? (entry.score / entry.totalMarks) * 100 : 0,
    }));
  }

  private calculateTimeAnalysis(attempt: any) {
    const answers = attempt.answers || [];
    const timePerQuestion: Record<string, number> = {};
    const questionsAnsweredTooQuickly: string[] = [];
    const questionsAnsweredTooSlowly: string[] = [];
    const totalTimeSpent = attempt.timeSpent || 0;

    for (const answer of answers) {
      timePerQuestion[answer.questionId] = answer.timeSpent;
      if (answer.timeSpent < 5) questionsAnsweredTooQuickly.push(answer.questionId);
      if (answer.timeSpent > 180) questionsAnsweredTooSlowly.push(answer.questionId);
    }

    const averageTimePerQuestion = answers.length > 0 ? totalTimeSpent / answers.length : 0;

    const timeManagementScore = this.calculateTimeManagementScore(
      questionsAnsweredTooQuickly.length,
      questionsAnsweredTooSlowly.length,
      answers.length,
    );

    return {
      totalTimeSpent,
      averageTimePerQuestion,
      timePerQuestion,
      questionsAnsweredTooQuickly,
      questionsAnsweredTooSlowly,
      unansweredQuestions: [],
      timeManagementScore,
      timePerSection: {},
    };
  }

  private calculateTimeManagementScore(tooQuick: number, tooSlow: number, total: number): number {
    if (total === 0) return 0;
    const penalty = ((tooQuick + tooSlow) / total) * 100;
    return Math.max(0, 100 - penalty);
  }

  private calculateMistakeAnalysis(answers: any[]) {
    const mistakes = answers.filter((a: any) => a.isCorrect === false);
    const categories: Record<string, number> = {};
    const mistakeRecords: any[] = [];
    const repeatedMistakes: string[] = [];
    const weakestTopics = new Map<string, { topicName: string; mistakes: number }>();

    for (const mistake of mistakes) {
      const category = this.categorizeMistake(mistake);
      categories[category] = (categories[category] || 0) + 1;

      mistakeRecords.push({
        questionId: mistake.questionId,
        questionText: mistake.question?.questionText || '',
        selectedAnswer: mistake.selectedAnswer,
        correctAnswer: mistake.question?.correctAnswer,
        category,
        topicId: mistake.question?.topicId,
        topicName: mistake.question?.topic?.name || '',
        subjectName: mistake.question?.subject?.name || '',
        attemptedAt: mistake.createdAt,
      });

      if (mistake.question?.topicId) {
        const topicId = mistake.question.topicId;
        if (!weakestTopics.has(topicId)) {
          weakestTopics.set(topicId, { topicName: mistake.question.topic.name, mistakes: 0 });
        }
        weakestTopics.get(topicId)!.mistakes++;
      }
    }

    const sortedTopics = Array.from(weakestTopics.entries())
      .sort((a, b) => b[1].mistakes - a[1].mistakes)
      .slice(0, 5)
      .map(([id, data]) => id);

    return {
      totalMistakes: mistakes.length,
      mistakes: mistakeRecords,
      categories,
      repeatedMistakes,
      weakestTopics: sortedTopics,
    };
  }

  private categorizeMistake(answer: any): string {
    if (!answer.selectedAnswer) return 'UNANSWERED';
    if (answer.answerChanges > 2) return 'CHANGED_CORRECT_ANSWER';
    if (answer.timeSpent < 3) return 'GUESSING';
    if (answer.timeSpent > 120) return 'TIME_PRESSURE';
    return 'KNOWLEDGE_GAP';
  }

  private generateRecommendations(subjectBreakdown: any[], topicBreakdown: any[], mistakeAnalysis: any): string[] {
    const recommendations: string[] = [];

    const weakSubjects = subjectBreakdown
      .filter((s) => s.accuracy < 50)
      .map((s) => `Focus on improving ${s.subjectName} (${s.accuracy.toFixed(1)}% accuracy)`);

    recommendations.push(...weakSubjects);

    const weakTopics = topicBreakdown
      .filter((t) => t.accuracy < 40)
      .map((t) => `Review ${t.topicName} - ${t.accuracy.toFixed(1)}% accuracy`);

    recommendations.push(...weakTopics);

    if (mistakeAnalysis.categories.TIME_PRESSURE > 2) {
      recommendations.push('Practice time management - try to spend more time on difficult questions');
    }

    if (mistakeAnalysis.categories.GUESSING > 2) {
      recommendations.push('Avoid guessing - use elimination strategy for objective questions');
    }

    if (recommendations.length === 0) {
      recommendations.push('Great work! Continue practicing to maintain your performance');
    }

    return recommendations.slice(0, 5);
  }
}
