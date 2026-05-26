import { useCallback, useEffect, useState } from 'react';
import { vapiInterviewService } from '../services/vapi.service';
import { useInterviewStore } from '../store/interview.store';

export const useVapiInterview = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addTranscript = useInterviewStore((state) => state.addTranscript);

  useEffect(() => {
    const unsubTranscript = vapiInterviewService.onTranscript(addTranscript);
    const unsubSpeaking = vapiInterviewService.onSpeaking(setIsSpeaking);
    const unsubError = vapiInterviewService.onError(setError);
    return () => {
      unsubTranscript();
      unsubSpeaking();
      unsubError();
    };
  }, [addTranscript]);

  const start = useCallback(async () => {
    setError(null);
    setIsRunning(true);
    try {
      await vapiInterviewService.start();
    } catch (err) {
      setError((err as Error).message);
      setIsRunning(false);
    }
  }, []);

  const stop = useCallback(() => {
    vapiInterviewService.stop();
    setIsRunning(false);
  }, []);

  return { isSpeaking, isRunning, error, start, stop };
};
