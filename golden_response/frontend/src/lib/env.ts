const required = ['VITE_API_BASE_URL', 'VITE_VAPI_PUBLIC_KEY', 'VITE_VAPI_ASSISTANT_ID'] as const;

export const env = {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  VITE_VAPI_PUBLIC_KEY: import.meta.env.VITE_VAPI_PUBLIC_KEY || '',
  VITE_VAPI_ASSISTANT_ID: import.meta.env.VITE_VAPI_ASSISTANT_ID || '',
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || ''
};

export const missingClientEnv = required.filter((key) => !env[key]);
