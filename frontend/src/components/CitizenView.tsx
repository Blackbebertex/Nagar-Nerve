import { useState, useRef, useCallback } from 'react';
import {
  AlertCircle, Camera, MapPin, Send, CheckCircle2,
  Loader2, X, ImagePlus, Info
} from 'lucide-react';
import type { AnalyzeResponse } from '../types';
import { analyzeIncident } from '../services/api';

interface Props {
  onIncidentAnalyzed: (result: AnalyzeResponse) => void;
  backendOnline: boolean;
}

type Step =
  | 'idle'
  | 'submitting'
  | 'step1_understanding'
  | 'step2_resources'
  | 'step3_routing'
  | 'step4_planning'
  | 'done'
  | 'error';

const STEPS = [
  { key: 'step1_understanding', label: 'Understanding report with Gemini...' },
  { key: 'step2_resources',     label: 'Checking neighborhood resources...' },
  { key: 'step3_routing',       label: 'Calculating safe route...' },
  { key: 'step4_planning',      label: 'Generating grounded response plan...' },
];

const DEMO_TEXT = 'The road near Community Hall A is flooded and my grandfather needs medicine.';

export function CitizenView({ onIncidentAnalyzed, backendOnline }: Props) {
  const [text, setText] = useState('');
  const [location, setLocation] = useState('Community Hall A');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [step, setStep] = useState<Step>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = ev => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setStep('submitting');
    setErrorMsg('');
    setStepIdx(0);

    try {
      // Animate through steps
      for (let i = 0; i < STEPS.length; i++) {
        setStep(STEPS[i].key as Step);
        setStepIdx(i);
        await new Promise(r => setTimeout(r, 700));
      }

      let imageBase64: string | undefined;
      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);
        imageBase64 = btoa(uint8.reduce((d, b) => d + String.fromCharCode(b), ''));
      }

      const data = await analyzeIncident(text, location, imageBase64);
      setResult(data);
      setStep('done');
      onIncidentAnalyzed(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to analyze incident');
      setStep('error');
    }
  }, [text, location, imageFile, onIncidentAnalyzed]);

  const reset = useCallback(() => {
    setText('');
    setStep('idle');
    setResult(null);
    setImageFile(null);
    setImagePreview(null);
    setErrorMsg('');
  }, []);

  const isProcessing = ['submitting', 'step1_understanding', 'step2_resources', 'step3_routing', 'step4_planning'].includes(step);

  if (step === 'done' && result) {
    const { analysis } = result;
    const severityColor = { low: 'text-nn-green', medium: 'text-nn-amber', high: 'text-orange-400', critical: 'text-nn-red' }[analysis.severity] ?? 'text-nn-text';
    return (
      <div className="h-full overflow-y-auto p-4 sm:p-6 pb-24 sm:pb-6 bg-nn-bg flex justify-center">
        <div className="w-full max-w-2xl space-y-4 animate-slide-up">
          {/* Success header */}
          <div className="flex items-center gap-3 bg-nn-green/10 border border-nn-green/30 rounded-xl p-4">
            <CheckCircle2 className="w-8 h-8 text-nn-green shrink-0" />
            <div>
              <h2 className="font-bold text-nn-green">Report Received & Analyzed</h2>
              <p className="text-sm text-nn-dim mt-0.5">Gemini has understood your report. A coordinator has been notified.</p>
            </div>
          </div>

          {/* Gemini Analysis */}
          <div className="bg-nn-surface border border-nn-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-nn-blue px-2 py-0.5 bg-nn-blue/10 border border-nn-blue/30 rounded">
                {analysis.source === 'gemini' ? '✦ Gemini Analysis' : '⚠ Fallback Analysis'}
              </span>
              <span className={`text-xs font-bold uppercase tracking-widest ${severityColor}`}>
                {analysis.severity} severity
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div className="bg-nn-card rounded-lg p-3">
                <p className="text-nn-muted text-xs mb-1">Incident Type</p>
                <p className="font-semibold capitalize">{analysis.incidentType.replace(/_/g, ' ')}</p>
              </div>
              <div className="bg-nn-card rounded-lg p-3">
                <p className="text-nn-muted text-xs mb-1">Secondary Need</p>
                <p className="font-semibold capitalize">{analysis.secondaryNeed.replace(/_/g, ' ')}</p>
              </div>
              <div className="bg-nn-card rounded-lg p-3">
                <p className="text-nn-muted text-xs mb-1">Location</p>
                <p className="font-semibold">{analysis.locationReference}</p>
              </div>
              <div className="bg-nn-card rounded-lg p-3">
                <p className="text-nn-muted text-xs mb-1">People at Risk</p>
                <p className="font-semibold">{analysis.peopleAtRisk}</p>
              </div>
            </div>

            {analysis.observations.length > 0 && (
              <div className="bg-nn-amber/5 border border-nn-amber/20 rounded-lg p-3">
                <p className="text-nn-amber text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
                  <Info className="w-3 h-3" /> AI Observations (not verified)
                </p>
                <ul className="text-sm space-y-1">
                  {analysis.observations.map((obs, i) => (
                    <li key={i} className="text-nn-dim flex items-start gap-2">
                      <span className="text-nn-amber mt-0.5">•</span> {obs}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Safe route */}
          {result.route && (
            <div className="bg-nn-surface border border-nn-border rounded-xl p-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-nn-muted mb-3">Safe Route Calculated</h3>
              <div className="flex gap-4">
                <div className="flex-1 bg-nn-blue/10 border border-nn-blue/20 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-nn-blue">{result.route.distanceKm} km</p>
                  <p className="text-xs text-nn-muted">Distance</p>
                </div>
                <div className="flex-1 bg-nn-green/10 border border-nn-green/20 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-nn-green">{result.route.estimatedTimeMin} min</p>
                  <p className="text-xs text-nn-muted">Estimated ETA</p>
                </div>
              </div>
              <p className="text-xs text-nn-muted mt-3">
                Via: {result.route.roads.join(' → ')}
              </p>
            </div>
          )}

          {/* Gemini plan summary */}
          {result.responsePlan && (
            <div className="bg-nn-blue/5 border border-nn-blue/20 rounded-xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-nn-blue mb-2">
                ✦ Gemini Recommendation
              </p>
              <p className="text-sm text-nn-dim">{result.responsePlan.summary}</p>
            </div>
          )}

          <p className="text-xs text-nn-muted text-center flex items-center justify-center gap-1">
            <Info className="w-3 h-3" />
            This prototype uses synthetic demo data and does not replace emergency services.
          </p>

          <button onClick={reset} className="w-full py-2 border border-nn-border rounded-lg text-nn-muted text-sm hover:text-nn-text hover:border-nn-blue/40 transition-colors">
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-nn-bg flex justify-center p-4 sm:p-6 pb-24 sm:pb-6">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Report an Issue</h2>
          <p className="text-nn-muted text-sm mt-1">
            Describe what you see. Gemini will understand your report and find available resources nearby.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Demo fill button */}
          <button
            type="button"
            onClick={() => setText(DEMO_TEXT)}
            className="w-full text-left bg-nn-blue/5 border border-nn-blue/20 rounded-xl p-3 text-sm text-nn-blue hover:bg-nn-blue/10 transition-colors flex items-center gap-2"
          >
            <span className="text-xs bg-nn-blue/20 px-2 py-0.5 rounded font-bold">DEMO</span>
            Click to fill hero scenario: "{DEMO_TEXT}"
          </button>

          {/* Text area */}
          <div>
            <label className="block text-sm font-medium text-nn-dim mb-2">What happened?</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Describe what you see in plain language..."
              disabled={isProcessing}
              className="w-full bg-nn-surface border border-nn-border rounded-xl p-4 text-nn-text placeholder-nn-muted focus:outline-none focus:border-nn-blue focus:ring-1 focus:ring-nn-blue/30 min-h-[120px] resize-none transition-colors"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-nn-dim mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nn-muted" />
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                disabled={isProcessing}
                className="w-full bg-nn-surface border border-nn-border rounded-xl pl-9 pr-4 py-3 text-nn-text focus:outline-none focus:border-nn-blue appearance-none"
              >
                <option>Community Hall A</option>
                <option>Community Hall B</option>
                <option>GreenCare Pharmacy</option>
                <option>Central Clinic</option>
              </select>
            </div>
          </div>

          {/* Image upload */}
          <div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-nn-border">
                <img src={imagePreview} alt="Uploaded" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 bg-nn-bg/80 rounded-full p-1 hover:bg-nn-red/20 transition-colors"
                >
                  <X className="w-4 h-4 text-nn-text" />
                </button>
                <div className="absolute bottom-2 left-2 bg-nn-bg/80 text-xs px-2 py-1 rounded">
                  ⚠ AI observation only — requires verification
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={isProcessing}
                className="w-full border-2 border-dashed border-nn-border rounded-xl p-6 text-nn-muted hover:border-nn-blue/40 hover:text-nn-blue transition-colors flex flex-col items-center gap-2"
              >
                <ImagePlus className="w-8 h-8" />
                <span className="text-sm">Add photo (optional) — enables multimodal Gemini analysis</span>
              </button>
            )}
          </div>

          {/* Processing steps */}
          {isProcessing && (
            <div className="bg-nn-surface border border-nn-border rounded-xl p-5 space-y-3 animate-fade-in">
              {STEPS.map((s, i) => (
                <div key={s.key} className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                  i < stepIdx ? 'text-nn-green' : i === stepIdx ? 'text-nn-text' : 'text-nn-muted'
                }`}>
                  {i < stepIdx ? (
                    <CheckCircle2 className="w-4 h-4 text-nn-green shrink-0" />
                  ) : i === stepIdx ? (
                    <Loader2 className="w-4 h-4 shrink-0 animate-spin text-nn-blue" />
                  ) : (
                    <span className="w-4 h-4 shrink-0 rounded-full border border-nn-border flex items-center justify-center text-[10px]">{i + 1}</span>
                  )}
                  {s.label}
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {step === 'error' && (
            <div className="bg-nn-red/10 border border-nn-red/30 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-nn-red shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-nn-red">Analysis Failed</p>
                <p className="text-sm text-nn-dim mt-0.5">{errorMsg}</p>
                <button onClick={reset} className="text-xs text-nn-blue mt-2 hover:underline">Try again</button>
              </div>
            </div>
          )}

          {/* Submit */}
          {!isProcessing && step !== 'done' && (
            <button
              type="submit"
              disabled={!text.trim()}
              className="w-full flex items-center justify-center gap-2 bg-nn-blue hover:bg-nn-blue-d disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <Send className="w-5 h-5" />
              Submit Report
            </button>
          )}
        </form>

        <p className="text-xs text-nn-muted text-center mt-6 flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Synthetic demo data. Does not replace emergency services (112/108).
        </p>
      </div>
    </div>
  );
}
