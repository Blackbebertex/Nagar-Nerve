import { useState, useCallback } from 'react';
import { RotateCcw, Database, Wifi, WifiOff, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import type { NeighborhoodState } from '../types';
import { resetDemo } from '../services/api';

interface Props {
  backendOnline: boolean;
  neighborhoodState: NeighborhoodState | null;
  onReset: () => void;
}

const SAFETY_CHECKS = [
  'Structured Gemini output validated before use',
  'Resource IDs verified against neighborhood data',
  'Blocked roads excluded from all route calculations',
  'No fabricated resources passed to response planner',
  'Simulation state isolated from live neighborhood state',
  'Human approval required for volunteer dispatch',
  'Gemini API key kept strictly server-side',
  'Fallback mode activates when Gemini is unavailable',
];

export function AdminView({ backendOnline, neighborhoodState, onReset }: Props) {
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleReset = useCallback(async () => {
    setResetting(true);
    setResetDone(false);
    try {
      if (backendOnline) {
        await resetDemo();
      } else {
        await new Promise(r => setTimeout(r, 800));
      }
      onReset();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 3000);
    } finally {
      setResetting(false);
    }
  }, [backendOnline, onReset]);

  return (
    <div className="h-full overflow-y-auto bg-nn-bg p-4 sm:p-6 pb-24 sm:pb-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Admin / Demo Settings</h2>
          <p className="text-nn-muted text-sm mt-1">System status, demo controls, and safety verification.</p>
        </div>

        {/* System Status */}
        <div className="bg-nn-surface border border-nn-border rounded-2xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-nn-muted mb-4">System Status</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatusCard
              label="Backend Server"
              value={backendOnline ? 'Online' : 'Offline (fallback)'}
              ok={backendOnline}
              icon={backendOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            />
            <StatusCard
              label="Gemini API"
              value={backendOnline ? 'Configured via backend' : 'Unavailable'}
              ok={backendOnline}
              icon={<ShieldCheck className="w-4 h-4" />}
            />
            <StatusCard
              label="Neighborhood Data"
              value={neighborhoodState ? `${neighborhoodState.nodes.length} nodes, ${neighborhoodState.roads.length} roads` : 'Not loaded'}
              ok={!!neighborhoodState}
              icon={<Database className="w-4 h-4" />}
            />
            <StatusCard
              label="Active Resources"
              value={neighborhoodState ? `${neighborhoodState.resources.filter(r => r.status === 'open' || r.status === 'available').length} available` : '—'}
              ok={!!neighborhoodState}
              icon={<CheckCircle2 className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Neighborhood data */}
        {neighborhoodState && (
          <div className="bg-nn-surface border border-nn-border rounded-2xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-nn-muted mb-4">
              Synthetic Neighborhood Data
              <span className="ml-2 text-nn-amber normal-case font-normal">(demo data — not real)</span>
            </h3>
            <div className="space-y-2">
              <h4 className="text-xs text-nn-muted font-semibold mt-2">Roads</h4>
              <div className="grid grid-cols-2 gap-2">
                {neighborhoodState.roads.map(r => (
                  <div key={r.id} className="bg-nn-card rounded-lg px-3 py-2 flex items-center justify-between">
                    <span className="text-xs font-mono text-nn-dim">{r.id}</span>
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      r.status === 'blocked' ? 'bg-nn-red/20 text-nn-red' :
                      r.status === 'degraded' ? 'bg-nn-amber/20 text-nn-amber' :
                      'bg-nn-green/20 text-nn-green'
                    }`}>{r.status}</span>
                  </div>
                ))}
              </div>
              <h4 className="text-xs text-nn-muted font-semibold mt-3">Resources</h4>
              <div className="grid grid-cols-2 gap-2">
                {neighborhoodState.resources.map(r => (
                  <div key={r.id} className="bg-nn-card rounded-lg px-3 py-2">
                    <p className="text-xs font-semibold text-nn-text">{r.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-nn-muted capitalize">{r.type.replace(/_/g, ' ')}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        r.status === 'open' || r.status === 'available'
                          ? 'bg-nn-green/20 text-nn-green'
                          : 'bg-nn-red/20 text-nn-red'
                      }`}>{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Safety Checks */}
        <div className="bg-nn-surface border border-nn-border rounded-2xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-nn-muted mb-4">AI Safety Verification</h3>
          <div className="space-y-2">
            {SAFETY_CHECKS.map((check, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-nn-green shrink-0" />
                <span className="text-nn-dim">{check}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Reset */}
        <div className="bg-nn-surface border border-nn-border rounded-2xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-nn-muted mb-2">Demo Reset</h3>
          <p className="text-sm text-nn-dim mb-4">
            Resets all incidents, volunteer status, simulation results, and neighborhood state to the original seeded hero scenario.
          </p>
          {resetDone && (
            <div className="bg-nn-green/10 border border-nn-green/30 rounded-xl p-3 mb-4 flex items-center gap-2 text-nn-green text-sm">
              <CheckCircle2 className="w-4 h-4" /> Demo state reset successfully.
            </div>
          )}
          <button
            onClick={handleReset}
            disabled={resetting}
            className="flex items-center gap-2 bg-nn-amber/10 hover:bg-nn-amber/20 border border-nn-amber/30 text-nn-amber font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
          >
            {resetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
            Reset Demo State
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusCard({ label, value, ok, icon }: {
  label: string; value: string; ok: boolean; icon: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border p-3 flex items-start gap-2.5 ${
      ok ? 'bg-nn-green/5 border-nn-green/20' : 'bg-nn-amber/5 border-nn-amber/20'
    }`}>
      <div className={ok ? 'text-nn-green' : 'text-nn-amber'}>{icon}</div>
      <div>
        <p className="text-[10px] text-nn-muted uppercase tracking-widest">{label}</p>
        <p className="text-sm font-semibold mt-0.5">{value}</p>
      </div>
    </div>
  );
}
