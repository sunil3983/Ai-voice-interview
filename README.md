# PrepWise

PrepWise is a production-ready AI-powered voice mock interview platform. Users can register, create interviews, run a live Vapi voice interview, view transcripts, receive OpenAI-generated structured feedback, and track history and analytics.

## Architecture

The repository is a TypeScript monorepo:

- `frontend`: React 18, Vite, Tailwind CSS, Zustand, React Hook Form, Zod, Recharts, Framer Motion, Vapi Web SDK.
- `backend`: Node.js, Express, MongoDB/Mongoose, Firebase Admin, JWT, Redis, BullMQ, OpenAI, Nodemailer.

The frontend talks to the backend through `/api/v1/*` REST endpoints. Vapi handles the realtime browser voice session. Completed transcripts are sent to the backend, where OpenAI produces structured feedback and MongoDB stores the interview, feedback, and analytics records.

## Features

- Secure email/password auth with JWT.
- Optional Firebase ID token verification middleware support.
- Protected dashboard, interview, feedback, analytics, and settings routes.
- Vapi-powered live voice interview with realtime transcript bubbles.
- AI question generation using `gpt-4o-mini`.
- AI feedback scoring with JSON response validation.
- Redis caching and BullMQ feedback job infrastructure.
- Contact form with confirmation and admin email notifications.
- Dark/light theme, responsive layouts, Framer Motion transitions, and reduced-motion support.

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env` with your MongoDB, OpenAI, Vapi, Firebase, Redis, and email credentials.

## Local Development

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Scripts

- `npm run dev`: starts backend and frontend concurrently.
- `npm run build`: builds both apps.
- `npm run typecheck`: runs TypeScript checks.
- `npm run lint`: runs ESLint in both workspaces.

## Environment Setup

Required variables are listed in `.env.example`. The frontend reads only `VITE_*` variables. The backend validates required server variables on startup.

## Screenshots

Add product screenshots here after deployment:

- Landing page
- Live interview
- Feedback report
- Analytics dashboard

