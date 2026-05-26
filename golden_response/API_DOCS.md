# PrepWise API Documentation

Base URL: `/api/v1`

Protected routes require `Authorization: Bearer <jwt>`.

## Auth

### POST `/auth/register`

Auth: public

Request:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "Str0ngPass!"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "token": "jwt",
    "user": {
      "id": "user_id",
      "name": "Ada Lovelace",
      "email": "ada@example.com",
      "role": "user"
    }
  }
}
```

### POST `/auth/login`

Auth: public

Request:

```json
{
  "email": "ada@example.com",
  "password": "Str0ngPass!"
}
```

Response: same as register.

### GET `/auth/me`

Auth: required

Response:

```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "role": "user"
  }
}
```

## Interviews

### POST `/interviews/create`

Auth: required

Request:

```json
{
  "role": "Frontend Developer",
  "techStack": ["React", "TypeScript"],
  "difficulty": "Medium",
  "questions": [
    {
      "id": "q1",
      "question": "Explain React reconciliation.",
      "category": "technical",
      "expectedSignals": ["virtual DOM", "diffing"]
    }
  ]
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "interview_id",
    "status": "created"
  }
}
```

### POST `/interviews/complete`

Auth: required

Request:

```json
{
  "interviewId": "interview_id",
  "transcript": [
    {
      "role": "assistant",
      "content": "Tell me about React hooks.",
      "timestamp": "2026-05-26T10:00:00.000Z"
    }
  ],
  "audioUrl": "https://example.com/audio.wav"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "interviewId": "interview_id",
    "feedback": {
      "overallScore": 85,
      "technicalAccuracy": 82,
      "communicationSkill": 88,
      "confidenceEstimation": 80,
      "strengths": ["Clear structure"],
      "weaknesses": ["More examples needed"],
      "suggestions": ["Use STAR framing"]
    }
  }
}
```

### GET `/interviews/user/:id`

Auth: required

Response:

```json
{
  "success": true,
  "data": []
}
```

### GET `/interviews/:id`

Auth: required

Response:

```json
{
  "success": true,
  "data": {
    "id": "interview_id",
    "role": "Frontend Developer",
    "status": "completed"
  }
}
```

## AI

### POST `/ai/generate-questions`

Auth: required

Request:

```json
{
  "role": "Frontend Developer",
  "techStack": ["React", "TypeScript"],
  "difficulty": "Medium"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "q1",
        "question": "How does React's rendering model work?",
        "category": "technical",
        "expectedSignals": ["components", "state", "reconciliation"]
      }
    ]
  }
}
```

## Analytics

### GET `/analytics/user/:id`

Auth: required

Response:

```json
{
  "success": true,
  "data": {
    "totalInterviews": 4,
    "averageScore": 82,
    "scoreTrend": []
  }
}
```

## Contact

### POST `/contact`

Auth: public

Request:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "subject": "Support",
  "message": "I need help with my interview session."
}
```

Response:

```json
{
  "success": true,
  "message": "Thanks for contacting PrepWise. We will reply soon."
}
```

