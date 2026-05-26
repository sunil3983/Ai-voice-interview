import { AnimatePresence } from 'framer-motion';
import { PhoneCall, Square } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '../components/Page';
import { SpeakingIndicator } from '../components/SpeakingIndicator';
import { TranscriptBubble } from '../components/TranscriptBubble';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useVapiInterview } from '../hooks/useVapiInterview';
import { interviewService } from '../services/interview.service';
import { useInterviewStore } from '../store/interview.store';

export default function LiveInterview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const transcript = useInterviewStore((state) => state.transcript);
  const clearTranscript = useInterviewStore((state) => state.clearTranscript);
  const setFeedback = useInterviewStore((state) => state.setFeedback);
  const { isRunning, isSpeaking, error, start, stop } = useVapiInterview();
  const [finishing, setFinishing] = useState(false);

  const endInterview = async () => {
    if (!id) return;
    stop();
    setFinishing(true);
    const result = await interviewService.complete({ interviewId: id, transcript });
    setFeedback(result.feedback ?? null);
    clearTranscript();
    navigate(`/feedback/${id}`);
  };

  return (
    <Page>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-black text-ink dark:text-white">Live interview</h1>
            <p className="text-slate-600 dark:text-slate-300">Speak naturally. PrepWise captures the transcript as the conversation unfolds.</p>
          </div>
          <div className="flex gap-3">
            {!isRunning ? <Button onClick={start}><PhoneCall size={18} /> Start interview</Button> : <Button variant="danger" onClick={endInterview} disabled={finishing}><Square size={18} /> End interview</Button>}
          </div>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <Card>
            <SpeakingIndicator active={isSpeaking} />
            {error && <p className="mt-4 rounded-md bg-coral/10 p-3 text-sm text-coral">{error}</p>}
            <div className="mt-6 rounded-lg bg-slate-100 p-5 text-center dark:bg-slate-800">
              <div className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-ink text-mint dark:bg-slate-950">
                <PhoneCall size={42} />
              </div>
              <p className="mt-4 text-sm text-slate-500">{isRunning ? 'Session active' : 'Ready to connect to Vapi'}</p>
            </div>
          </Card>
          <Card className="h-[620px] overflow-hidden">
            <h2 className="font-bold">Transcript</h2>
            <div className="mt-4 flex h-[540px] flex-col gap-3 overflow-y-auto pr-2">
              <AnimatePresence>
                {transcript.map((item, index) => <TranscriptBubble key={`${item.timestamp}-${index}`} item={item} />)}
              </AnimatePresence>
              {!transcript.length && <p className="text-sm text-slate-500">Transcript bubbles appear once the interview starts.</p>}
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
