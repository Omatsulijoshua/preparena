# PrepArena

A production-ready cross-platform examination preparation platform supporting WAEC, WAEC GCE, NECO, NECO GCE, JAMB/UTME, Post-UTME, SAT, school examinations and administrator-created custom CBT examinations.

## Architecture

```
preparena/
├── apps/
│   ├── student_app/          # Flutter (Android, iOS, Web, Windows, macOS)
│   ├── admin_dashboard/      # Next.js + TypeScript admin dashboard
│   └── landing_website/      # Next.js marketing website
├── services/
│   └── api/                  # NestJS + PostgreSQL + Prisma + Redis backend
├── packages/
│   └── shared/               # Shared types, schemas, constants
└── docker-compose.yml        # PostgreSQL, Redis, MinIO
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS, TypeScript, PostgreSQL, Prisma, Redis, BullMQ |
| Admin Dashboard | Next.js 15, TypeScript, Tailwind CSS, Radix UI |
| Landing Website | Next.js 15, TypeScript, Tailwind CSS |
| Student App | Flutter, Dart, Bloc, Dio, Hive |
| Shared | Zod schemas, TypeScript types, constants |
| Infrastructure | Docker, GitHub Actions |

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- Docker Desktop
- Flutter SDK >= 3.4.0

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start infrastructure
docker-compose up -d

# 3. Setup database
npm run db:migrate
npm run db:seed

# 4. Start services (in separate terminals)
npm run dev:api      # Backend on :4000
npm run dev:admin    # Admin on :3001
npm run dev:landing  # Landing on :3000

# 5. Run Flutter app
cd apps/student_app
flutter pub get
flutter run
```

### Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@preparena.com | Admin@123 |
| Student | student@preparena.com | Student@123 |

## Features

### Student App
- Secure auth (email, phone, Google, Apple)
- Smart dashboard with readiness score, streak, AI recommendations
- Multiple examination modes (Practice, CBT simulation, Daily Challenge, etc.)
- Full CBT with timer, question palette, flagging, auto-submit
- Rich question types (objective, theory, essay, practical, diagrams, LaTeX)
- AI personal tutor, explanations, essay marking
- Mistake notebook with categorization
- Performance analytics by subject, topic, difficulty, time
- Offline content with encrypted storage
- Spaced-repetition flashcards
- Multiplayer challenge architecture

### Admin Dashboard
- Role-based access (SUPER_ADMIN, CONTENT_ADMIN, FINANCE_ADMIN, etc.)
- Student, teacher, parent, and school management
- Question CRUD with review workflow
- CSV/Excel question import
- Payment and subscription management
- AI provider and prompt configuration
- Audit logs and system settings
- Analytics and reporting

### Backend
- Modular NestJS architecture
- JWT with rotating refresh tokens
- Rate limiting, device session management
- Multi-AI-provider gateway with fallback and caching
- Multi-tenant school system
- Payment abstraction (Paystack, Flutterwave, Stripe, Google Play, Apple IAP, Bank Transfer)
- Offline sync architecture
- Comprehensive API documentation via Swagger

## API Documentation

Once running, visit `http://localhost:4000/api/docs` for Swagger documentation.

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## Testing

```bash
npm test                  # Run all tests
npm run test:api          # API tests only
npm run test:admin        # Admin dashboard tests
npm run test:shared       # Shared package tests
```
