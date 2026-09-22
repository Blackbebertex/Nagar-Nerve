import { useState } from 'react';
import { CheckCircle2, X, MapPin, Clock, Route, ShieldCheck, Bike } from 'lucide-react';
import type { AnalyzeResponse } from '../types';

interface Props {
  incidentResult: AnalyzeResponse | null;
}

export function VolunteerView({ incidentResult }: Props) {
  const [taskStatus, setTaskStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');

  if (!incidentResult) {
    return (
      <div className="h-full flex items-center justify-center bg-nn-bg pb-20">
        <div className="text-center text-nn-muted max-w-sm">
          <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <h2 className="text-lg font-bold mb-2">No Active Task</h2>
          <p className="text-sm">Switch to <strong>Citizen</strong> to submit an incident, then <strong>Coordinator</strong> to approve it. Your task will appear here.</p>
        </div>
      </div>
    );
  }

  const route = incidentResult.route;

  return (
    <div className="h-full overflow-y-auto bg-nn-bg flex justify-center p-4 sm:p-6 pb-24 sm:pb-6">
      <div className="w-full max-w-md space-y-4 animate-slide-up">
        {/* Task Header */}
        <div className="bg-nn-surface border border-nn-blue/30 rounded-2xl p-5 shadow-glow-blue">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-nn-blue/10 rounded-lg border border-nn-blue/20">
              <Bike className="w-5 h-5 text-nn-blue" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-nn-muted font-bold">Direct Assistance Request</p>
              <h2 className="text-base font-bold text-nn-text">Urgent Medicine Delivery</h2>
            </div>
          </div>

          {/* Task details */}
          <div className="space-y-3">
            <div className="bg-nn-card rounded-xl p-3">
              <p className="text-[10px] text-nn-muted uppercase tracking-widest mb-2">Pickup</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-nn-blue" />
                <p className="text-sm font-semibold">GreenCare Pharmacy</p>
              </div>
              <p className="text-[10px] text-nn-muted ml-4 mt-0.5">Medicine available · Verified open</p>
            </div>

            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1 py-1">
                <div className="w-px h-6 bg-nn-border" />
                <Route className="w-4 h-4 text-nn-blue" />
                <div className="w-px h-6 bg-nn-border" />
              </div>
            </div>

            <div className="bg-nn-card rounded-xl p-3">
              <p className="text-[10px] text-nn-muted uppercase tracking-widest mb-2">Delivery</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-nn-green" />
                <p className="text-sm font-semibold">Grandfather Residence</p>
              </div>
              <p className="text-[10px] text-nn-muted ml-4 mt-0.5">{incidentResult.analysis.locationReference} area</p>
            </div>
          </div>
        </div>

        {/* Route Info */}
        {route && (
          <div className="bg-nn-surface border border-nn-border rounded-2xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-nn-muted mb-3">Safe Route</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-nn-blue/10 border border-nn-blue/20 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-nn-blue">{route.distanceKm}</p>
                <p className="text-xs text-nn-muted">km</p>
              </div>
              <div className="bg-nn-green/10 border border-nn-green/20 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-nn-green" />
                  <p className="text-2xl font-bold text-nn-green">{route.estimatedTimeMin}</p>
                </div>
                <p className="text-xs text-nn-muted">min est.</p>
              </div>
            </div>
            <div className="bg-nn-red/5 border border-nn-red/20 rounded-lg p-2.5 flex items-center gap-2">
              <X className="w-3.5 h-3.5 text-nn-red shrink-0" />
              <p className="text-[10px] text-nn-red">
                <strong>Road-01 avoided</strong> — blocked due to flooding. Route calculated via safe alternative.
              </p>
            </div>
          </div>
        )}

        {/* Why this task */}
        <div className="bg-nn-surface border border-nn-border rounded-2xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-nn-muted mb-3">Why This Task?</h3>
          <div className="space-y-2">
            {[
              { label: 'Verified responder', ok: true },
              { label: 'Near pickup location', ok: true },
              { label: 'Safe route available (Road-01 avoided)', ok: true },
              { label: 'Medicine confirmed available at GreenCare', ok: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${item.ok ? 'text-nn-green' : 'text-nn-muted'}`} />
                <span className={item.ok ? 'text-nn-dim' : 'text-nn-muted'}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        {taskStatus === 'pending' && (
          <div className="flex gap-3">
            <button
              onClick={() => setTaskStatus('declined')}
              className="flex-1 py-3 border border-nn-border rounded-xl text-nn-muted font-semibold text-sm hover:border-nn-red/40 hover:text-nn-red transition-colors"
            >
              Decline
            </button>
            <button
              onClick={() => setTaskStatus('accepted')}
              className="flex-2 flex-1 py-3 bg-nn-green hover:bg-green-600 text-white font-bold rounded-xl text-sm transition-colors"
            >
              Accept Request
            </button>
          </div>
        )}

        {taskStatus === 'accepted' && (
          <div className="bg-nn-green/10 border border-nn-green/30 rounded-2xl p-5 text-center animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-nn-green mx-auto mb-2" />
            <h3 className="font-bold text-nn-green">Task Accepted</h3>
            <p className="text-sm text-nn-dim mt-1">
              Head to GreenCare Pharmacy via the safe route. Coordinator has been notified.
            </p>
          </div>
        )}

        {taskStatus === 'declined' && (
          <div className="bg-nn-surface border border-nn-border rounded-2xl p-5 text-center animate-fade-in">
            <X className="w-10 h-10 text-nn-muted mx-auto mb-2" />
            <h3 className="font-bold text-nn-muted">Task Declined</h3>
            <p className="text-sm text-nn-muted mt-1">
              Coordinator will assign the next available volunteer.
            </p>
          </div>
        )}

        <p className="text-[10px] text-nn-muted text-center">
          Volunteer-07 remains in full control. No automatic assignment occurs.
        </p>
      </div>
    </div>
  );
}
