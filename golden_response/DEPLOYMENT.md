# PrepWise Deployment

## MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Add your server IP or `0.0.0.0/0` for managed platform access.
3. Create a database user.
4. Copy the connection string into `MONGODB_URI`.

## Redis

Use Railway Redis, Render Redis, Upstash, or another hosted Redis provider. Set `REDIS_URL` to the provider connection URL.

## Vercel Frontend

1. Import the repository in Vercel.
2. Set the project root to `frontend`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add:
   - `VITE_VAPI_PUBLIC_KEY`
   - `VITE_VAPI_ASSISTANT_ID`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_API_BASE_URL`

## Railway Backend

1. Create a Railway service from the repository.
2. Set the root directory to `backend`.
3. Start command: `npm start`.
4. Add all backend variables from `.env.example`.
5. Ensure `PORT` is available from Railway or set to `5000`.

## Render Backend

1. Create a Web Service.
2. Root directory: `backend`.
3. Build command: `npm install && npm run build`.
4. Start command: `npm start`.
5. Add all backend variables from `.env.example`.

## Backend Environment Variables

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY`
- `VAPI_PRIVATE_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `REDIS_URL`
- `CLOUDINARY_URL`
- `SUPPORT_EMAIL`
- `SUPPORT_EMAIL_PASSWORD`
- `ADMIN_EMAIL`

## Health Check

Use `/health` for platform health checks.
