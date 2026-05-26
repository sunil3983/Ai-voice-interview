import Vapi from '@vapi-ai/web';
import { env } from '../lib/env';
import type { TranscriptItem } from '../types';

type Listener = (item: TranscriptItem) => void;
type SpeakingListener = (speaking: boolean) => void;
type ErrorListener = (message: string) => void;

class VapiInterviewService {
  private client: any | null = null;
  private transcriptListeners = new Set<Listener>();
  private speakingListeners = new Set<SpeakingListener>();
  private errorListeners = new Set<ErrorListener>();

  private getClient() {
    if (!this.client) this.client = new Vapi(env.VITE_VAPI_PUBLIC_KEY);
    return this.client;
  }

  onTranscript(listener: Listener) {
    this.transcriptListeners.add(listener);
    return () => this.transcriptListeners.delete(listener);
  }

  onSpeaking(listener: SpeakingListener) {
    this.speakingListeners.add(listener);
    return () => this.speakingListeners.delete(listener);
  }

  onError(listener: ErrorListener) {
    this.errorListeners.add(listener);
    return () => this.errorListeners.delete(listener);
  }

  async start() {
    if (!env.VITE_VAPI_PUBLIC_KEY || !env.VITE_VAPI_ASSISTANT_ID) {
      this.errorListeners.forEach((listener) => listener('Vapi environment variables are missing.'));
      return;
    }

    const client = this.getClient();
    client.on('speech-start', () => this.speakingListeners.forEach((listener) => listener(true)));
    client.on('speech-end', () => this.speakingListeners.forEach((listener) => listener(false)));
    client.on('message', (message: any) => {
      const text = message?.transcript || message?.message || message?.content;
      if (!text) return;
      const role = message?.role === 'user' ? 'user' : 'assistant';
      this.transcriptListeners.forEach((listener) => listener({ role, content: text, timestamp: new Date().toISOString() }));
    });
    client.on('error', (error: Error) => this.errorListeners.forEach((listener) => listener(error.message)));
    await client.start(env.VITE_VAPI_ASSISTANT_ID);
  }

  stop() {
    this.client?.stop();
    this.speakingListeners.forEach((listener) => listener(false));
  }
}

export const vapiInterviewService = new VapiInterviewService();
