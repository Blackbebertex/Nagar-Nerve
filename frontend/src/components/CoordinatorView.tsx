import { useState } from 'react';
import {
  AlertTriangle, CheckCircle2, Route, Lightbulb, ChevronDown,
  ChevronUp, Clock, MapPin, Users, ShieldCheck, Info, Activity,
  HeartPulse, Bike, Building2, ArrowRight, Sparkles
} from 'lucide-react';
import type { AnalyzeResponse, NeighborhoodState } from '../types';
import { NeighborhoodMap } from './NeighborhoodMap';

interface Props {
  incidentResult: AnalyzeResponse | null;
  neighborhoodState: NeighborhoodState | null;
  onApprove: () => void;
}

export function CoordinatorView({ incidentResult, neighborhoodState, onApprove }: Props) {
  const [expanded, setExpanded] = useState<string | null>('facts');
  const [approved, setApproved] = useState(false);

  const toggle = (s: string) => setExpanded(prev => (prev === s ? null : s));

  const availableResources = neighborhoodState?.resources.filter(resource =>
    resource.status === 'open' || resource.status === 'available',
  ).length ?? 0;

  return (
    <div className="h-full overflow-y-auto bg-nn-bg pb-20 lg:pb-0">
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-4 lg:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-nn-muted font-bold">Coordinator home</p>
            <h2 className="text-xl font-bold text-nn-text mt-1">Good morning, response team</h2>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-nn-green/10 border border-nn-green/20 px-2 py-1 text-[10px] font-bold text-nn-green">
            <span className="w-1.5 h-1.5 rounded-full bg-nn-green" /> Live
          </span>
        </div>

        <div className="rounded-2xl border border-nn-red/20 bg-gradient-to-br from-[#f8e2d5] to-[#fffaf5] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-nn-red text-white px-2 py-1 text-[9px] font-bold uppercase tracking-wide">
              <AlertTriangle className="w-3 h-3" /> {incidentResult ? incidentResult.analysis.severity : 'High priority'}
            </span>
            <span className="text-[10px] text-nn-muted">{incidentResult ? 'just now' : 'Demo scenario'}</span>
          </div>
          <h3 className="text-sm font-bold text-nn-text">
            {incidentResult ? `${incidentResult.analysis.incidentType.replace(/_/g, ' ')} & ${incidentResult.analysis.secondaryNeed.replace(/_/g, ' ')}` : 'Flooding & urgent medicine access'}
          </h3>
          <p className="flex items-center gap-1 text-xs text-nn-dim mt-1">
            <MapPin className="w-3 h-3 text-nn-red" /> {incidentResult?.analysis.locationReference ?? 'Sahyadri Community Hall'}
          </p>
          <button onClick={() => document.getElementById('response-intelligence')?.scrollIntoView({ behavior: 'smooth' })} className="mt-3 w-full flex items-center justify-between rounded-xl bg-white/75 px-3 py-2 text-xs font-bold text-nn-red">
            View incident <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-nn-text">Neighborhood status</h3>
            <span className="text-[10px] text-nn-muted">Updated now</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <CapacityCard icon={<HeartPulse />} label="Healthcare" value="82%" color="green" />
            <CapacityCard icon={<Bike />} label="Mobility" value="61%" color="terracotta" />
            <CapacityCard icon={<Users />} label="Volunteers" value={`${availableResources ? 100 : 0}%`} color="plum" />
            <CapacityCard icon={<Building2 />} label="Facilities" value="74%" color="amber" />
          </div>
        </div>

        <div className="rounded-2xl bg-[#eaf4f0] border border-nn-green/20 p-3 flex items-center gap-3">
          <div className="rounded-xl bg-nn-blue text-white p-2"><Activity className="w-4 h-4" /></div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-widest text-nn-muted font-bold">Current response</p>
            <p className="text-xs font-bold text-nn-text truncate">GreenCare Pharmacy → Volunteer-07 → Resident</p>
            <p className="text-[10px] text-nn-dim mt-0.5">ETA · 8 min · Safe route</p>
          </div>
          <ArrowRight className="w-4 h-4 text-nn-green" />
        </div>

        <div className="rounded-2xl bg-[#eee8f8] border border-purple-200 p-3">
          <div className="flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4 text-nn-plum" /><p className="text-xs font-bold text-nn-text">Ask Nagar Nerve</p></div>
          <div className="flex items-center gap-2 rounded-xl bg-white p-2 border border-purple-100">
            <span className="text-[11px] text-nn-muted flex-1">What happens if Road-07 closes?</span>
            <span className="rounded-full bg-nn-blue text-white p-1"><ArrowRight className="w-3 h-3" /></span>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row overflow-hidden bg-nn-bg lg:h-[calc(100%-430px)] lg:min-h-[520px] lg:mt-4">
      {/* LEFT: Incident List */}
      <div className="w-full lg:w-56 xl:w-64 shrink-0 bg-nn-surface border-b lg:border-b-0 lg:border-r border-nn-border flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-nn-border">
          <h2 className="text-xs font-bold uppercase tracking-widest text-nn-muted">Active Incidents</h2>
        </div>

        {incidentResult ? (
          <div className="p-3">
            <div className="bg-nn-card border border-nn-red/40 rounded-xl p-4 shadow-glow-red cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-nn-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {incidentResult.analysis.severity}
                </span>
                <span className="text-[10px] text-nn-muted">just now</span>
              </div>
              <p className="text-sm font-semibold text-nn-text capitalize">
                {incidentResult.analysis.incidentType.replace(/_/g, ' ')}
              </p>
              <p className="text-xs text-nn-muted mt-1 capitalize">
                {incidentResult.analysis.secondaryNeed.replace(/_/g, ' ')}
              </p>
              <div className="flex items-center gap-1 mt-2 text-[10px] text-nn-muted">
                <MapPin className="w-3 h-3" />
                {incidentResult.analysis.locationReference}
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-nn-muted">
                <Users className="w-3 h-3" />
                {incidentResult.analysis.peopleAtRisk} at risk
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4 min-h-28">
            <div className="text-center text-nn-muted">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">No active incidents.</p>
              <p className="text-xs mt-1">Switch to <strong>Citizen</strong> to submit one.</p>
            </div>
          </div>
        )}
      </div>

      {/* CENTER: Map */}
      <div className="min-w-0 flex-none lg:flex-1 h-[48vh] lg:h-auto bg-nn-bg relative">
        <NeighborhoodMap
          neighborhoodState={neighborhoodState}
          incidentResult={incidentResult}
        />
        {!neighborhoodState && (
          <div className="absolute inset-0 flex items-center justify-center bg-nn-bg/80">
            <div className="text-center text-nn-muted">
              <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Map loading... (backend may be offline)</p>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: Response Intelligence */}
      <div id="response-intelligence" className="w-full lg:w-72 xl:w-80 shrink-0 bg-nn-surface border-t lg:border-t-0 lg:border-l border-nn-border flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-nn-border">
          <h2 className="text-xs font-bold uppercase tracking-widest text-nn-muted">Response Intelligence</h2>
        </div>

        {incidentResult ? (
          <div className="p-4 space-y-3 flex-1">
            {/* Verified Facts */}
            <Section
              id="facts"
              title="Verified Facts"
              icon={<ShieldCheck className="w-4 h-4 text-nn-green" />}
              color="green"
              expanded={expanded === 'facts'}
              onToggle={() => toggle('facts')}
            >
              <ul className="space-y-1.5">
                {incidentResult.verifiedFacts.map((f, i) => (
                  <li key={i} className="text-xs text-nn-dim flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-nn-green mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Computed Route */}
            {incidentResult.route && (
              <Section
                id="route"
                title="Computed Route"
                icon={<Route className="w-4 h-4 text-nn-blue" />}
                color="blue"
                expanded={expanded === 'route'}
                onToggle={() => toggle('route')}
              >
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-nn-blue/10 border border-nn-blue/20 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-nn-blue">{incidentResult.route.distanceKm} km</p>
                    <p className="text-[10px] text-nn-muted">Distance</p>
                  </div>
                  <div className="bg-nn-green/10 border border-nn-green/20 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-nn-green">{incidentResult.route.estimatedTimeMin} min</p>
                    <p className="text-[10px] text-nn-muted">ETA</p>
                  </div>
                </div>
                <p className="text-[10px] text-nn-muted">
                  Algorithm: Dijkstra (deterministic) · Blocked roads excluded
                </p>
                <p className="text-[10px] text-nn-muted mt-1">
                  Via: {incidentResult.route.roads.join(' → ')}
                </p>
              </Section>
            )}

            {/* Gemini Recommendation */}
            {incidentResult.responsePlan && (
              <Section
                id="plan"
                title="Gemini Recommendation"
                icon={<Lightbulb className="w-4 h-4 text-nn-blue" />}
                color="blue"
                expanded={expanded === 'plan'}
                onToggle={() => toggle('plan')}
              >
                <div className={`text-[10px] mb-2 px-1.5 py-0.5 rounded inline-block font-bold uppercase tracking-widest ${
                  incidentResult.responsePlan.source === 'gemini'
                    ? 'text-nn-blue bg-nn-blue/10'
                    : 'text-nn-amber bg-nn-amber/10'
                }`}>
                  {incidentResult.responsePlan.source === 'gemini' ? '✦ Gemini' : '⚠ Fallback'}
                </div>
                <p className="text-xs text-nn-dim mb-3">{incidentResult.responsePlan.summary}</p>
                <div className="space-y-2">
                  {incidentResult.responsePlan.actions.map(action => (
                    <div key={action.order} className="bg-nn-card rounded-lg p-2.5">
                      <p className="text-[10px] font-bold text-nn-blue uppercase tracking-widest mb-0.5">
                        Step {action.order}: {action.action.replace(/_/g, ' ')}
                      </p>
                      <p className="text-[10px] text-nn-muted">→ {action.targetId}</p>
                      <p className="text-[10px] text-nn-dim mt-0.5">{action.reason}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-2 bg-nn-amber/5 border border-nn-amber/20 rounded-lg p-2">
                  <p className="text-[10px] text-nn-amber font-bold mb-0.5">Fallback</p>
                  <p className="text-[10px] text-nn-dim">
                    {incidentResult.responsePlan.fallback.type}: {incidentResult.responsePlan.fallback.targetId}
                  </p>
                </div>
              </Section>
            )}

            {/* Observations */}
            {incidentResult.analysis.observations.length > 0 && (
              <div className="bg-nn-amber/5 border border-nn-amber/20 rounded-xl p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-nn-amber mb-2 flex items-center gap-1">
                  <Info className="w-3 h-3" /> AI Observations (unverified)
                </p>
                {incidentResult.analysis.observations.map((o, i) => (
                  <p key={i} className="text-[10px] text-nn-dim">• {o}</p>
                ))}
              </div>
            )}

            {/* Human Approval */}
            <div className="mt-4 bg-nn-surface border border-nn-border rounded-xl p-4">
              <p className="text-[10px] uppercase tracking-widest text-nn-muted mb-3 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Human Approval Required
              </p>
              {approved ? (
                <div className="bg-nn-green/10 border border-nn-green/30 rounded-lg p-3 text-center">
                  <CheckCircle2 className="w-6 h-6 text-nn-green mx-auto mb-1" />
                  <p className="text-xs text-nn-green font-bold">Approved & Dispatched</p>
                  <p className="text-[10px] text-nn-muted mt-1">Volunteer-07 has been notified.</p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] text-nn-muted mb-3">
                    This action will notify Volunteer-07 to collect medicine via the safe route.
                  </p>
                  <button
                    onClick={() => { setApproved(true); onApprove(); }}
                    className="w-full bg-nn-green hover:bg-green-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors"
                  >
                    Approve & Dispatch
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6 text-center">
            <div className="text-nn-muted">
              <Lightbulb className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-xs">Response intelligence will appear once a citizen submits an incident report.</p>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

function CapacityCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: 'green' | 'terracotta' | 'plum' | 'amber' }) {
  const styles = {
    green: 'bg-[#eef7f1] text-nn-green',
    terracotta: 'bg-[#f8e2d5] text-nn-terracotta',
    plum: 'bg-[#eee8f8] text-nn-plum',
    amber: 'bg-[#f8e8c8] text-nn-amber',
  };
  return (
    <div className={`rounded-xl p-2 ${styles[color]}`}>
      <span className="flex justify-center [&>svg]:w-4 [&>svg]:h-4">{icon}</span>
      <p className="text-[9px] text-center text-nn-dim mt-1 truncate">{label}</p>
      <p className="text-sm font-bold text-center text-nn-text">{value}</p>
    </div>
  );
}

// Collapsible section component
interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: 'green' | 'blue' | 'amber';
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const COLOR_MAP = {
  green: 'border-nn-green/30 bg-nn-green/5',
  blue:  'border-nn-blue/30 bg-nn-blue/5',
  amber: 'border-nn-amber/30 bg-nn-amber/5',
};

function Section({ title, icon, color, expanded, onToggle, children }: SectionProps) {
  return (
    <div className={`border ${COLOR_MAP[color]} rounded-xl overflow-hidden`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-nn-muted">
          {icon} {title}
        </span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5 text-nn-muted" /> : <ChevronDown className="w-3.5 h-3.5 text-nn-muted" />}
      </button>
      {expanded && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}
