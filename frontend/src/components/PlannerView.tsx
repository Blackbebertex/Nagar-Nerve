import { useState, useCallback } from 'react';
import { Play, RotateCcw, ArrowRight, AlertTriangle, Loader2, Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';
import type { SimulationResult, NeighborhoodState } from '../types';
import { simulateRoadClosure } from '../services/api';

interface Props {
  simulationResult: SimulationResult | null;
  onSimulate: (result: SimulationResult) => void;
  neighborhoodState: NeighborhoodState | null;
  backendOnline: boolean;
}

const SCENARIOS = [
  { id: 'road-07', label: 'Close Road-07 (Intersection West → East)', icon: '🚧' },
  { id: 'road-03', label: 'Close Road-03 (Hall A → Intersection West)', icon: '🚧' },
  { id: 'road-08', label: 'Close Road-08 (Intersection East → Resident)', icon: '🚧' },
];

// Static fallback simulation for when backend is offline
const FALLBACK_SIMULATION = (roadId: string): SimulationResult => ({
  success: true,
  scenarioLabel: `Closure of ${roadId}`,
  before: { distanceKm: 1.6, estimatedTimeMin: 9, accessibleResources: 4 },
  after: { distanceKm: 2.5, estimatedTimeMin: 14, accessibleResources: 3 },
  newRoute: null,
  affectedResourceIds: [],
  explanation: `Closing ${roadId} removes a key alternative route, increasing estimated response time by approximately 5 minutes. The reduced number of accessible resources means the coordinator should identify backup coordination points.`,
});

export function PlannerView({ simulationResult, onSimulate, neighborhoodState, backendOnline }: Props) {
  const [selectedRoad, setSelectedRoad] = useState(SCENARIOS[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runSimulation = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      if (backendOnline) {
        const result = await simulateRoadClosure(selectedRoad);
        onSimulate(result);
      } else {
        await new Promise(r => setTimeout(r, 1500));
        onSimulate(FALLBACK_SIMULATION(selectedRoad));
      }
    } catch (err: any) {
      setError(err.message || 'Simulation failed');
    } finally {
      setLoading(false);
    }
  }, [selectedRoad, backendOnline, onSimulate]);

  return (
    <div className="h-full overflow-y-auto bg-nn-bg flex justify-center p-4 sm:p-6 pb-24 sm:pb-6">
      <div className="w-full max-w-2xl space-y-5">
        <div>
          <h2 className="text-2xl font-bold">What-If Simulation</h2>
          <p className="text-nn-muted text-sm mt-1">
            Model impact of infrastructure changes. Simulations never modify live state.
          </p>
          {!backendOnline && (
            <div className="mt-2 bg-nn-amber/10 border border-nn-amber/30 rounded-lg px-3 py-2 text-xs text-nn-amber flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              Backend offline — using demo fallback simulation data.
            </div>
          )}
        </div>

        {/* Scenario Selector */}
        <div className="bg-nn-surface border border-nn-border rounded-2xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-nn-muted mb-4">Choose Scenario</h3>
          <div className="space-y-2">
            {SCENARIOS.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedRoad(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  selectedRoad === s.id
                    ? 'bg-nn-blue/10 border-nn-blue/40 text-nn-blue'
                    : 'bg-nn-card border-nn-border text-nn-dim hover:border-nn-border/80 hover:text-nn-text'
                }`}
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Run button */}
        <button
          onClick={runSimulation}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-nn-blue hover:bg-nn-blue-d disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-colors"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" />Running Simulation...</>
          ) : (
            <><Play className="w-5 h-5" />Run Simulation</>
          )}
        </button>

        {error && (
          <div className="bg-nn-red/10 border border-nn-red/30 rounded-xl p-4 text-nn-red text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> {error}
          </div>
        )}

        {/* Results */}
        {simulationResult && (
          <div className="space-y-4 animate-slide-up">
            {/* SIMULATED STATE banner */}
            <div className="bg-nn-amber/10 border border-nn-amber/30 rounded-xl px-4 py-2.5 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-nn-amber shrink-0" />
              <p className="text-xs text-nn-amber font-bold uppercase tracking-widest">
                Simulated State — Original Demo State Unchanged
              </p>
            </div>

            {/* Before vs After */}
            <div className="bg-nn-surface border border-nn-border rounded-2xl p-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-nn-muted mb-4">Impact: Before → After</h3>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  label="ETA"
                  before={`${simulationResult.before.estimatedTimeMin} min`}
                  after={`${simulationResult.after.estimatedTimeMin} min`}
                  worse={simulationResult.after.estimatedTimeMin > simulationResult.before.estimatedTimeMin}
                />
                <MetricCard
                  label="Distance"
                  before={`${simulationResult.before.distanceKm} km`}
                  after={`${simulationResult.after.distanceKm} km`}
                  worse={simulationResult.after.distanceKm > simulationResult.before.distanceKm}
                />
                <MetricCard
                  label="Accessible Resources"
                  before={`${simulationResult.before.accessibleResources}`}
                  after={`${simulationResult.after.accessibleResources}`}
                  worse={simulationResult.after.accessibleResources < simulationResult.before.accessibleResources}
                />
                <MetricCard
                  label="Route Available"
                  before="Yes"
                  after={simulationResult.newRoute ? 'Yes (longer)' : 'No safe route'}
                  worse={!simulationResult.newRoute}
                />
              </div>
            </div>

            {/* Gemini Explanation */}
            <div className="bg-nn-blue/5 border border-nn-blue/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-nn-blue" />
                <p className="text-xs font-bold uppercase tracking-widest text-nn-blue">
                  Gemini Interpretation
                </p>
              </div>
              <p className="text-sm text-nn-dim leading-relaxed">{simulationResult.explanation}</p>
              <p className="text-[10px] text-nn-muted mt-3">
                Note: Gemini explains deterministic results. It does not invent simulation numbers.
              </p>
            </div>

            {/* Reset */}
            <button
              onClick={() => onSimulate(null as any)}
              className="w-full flex items-center justify-center gap-2 py-3 border border-nn-border rounded-xl text-nn-muted text-sm hover:border-nn-blue/40 hover:text-nn-blue transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Reset Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ label, before, after, worse }: {
  label: string; before: string; after: string; worse: boolean;
}) {
  return (
    <div className="bg-nn-card rounded-xl p-3">
      <p className="text-[10px] text-nn-muted uppercase tracking-widest mb-2">{label}</p>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-nn-green font-semibold">{before}</span>
        <ArrowRight className="w-3.5 h-3.5 text-nn-muted" />
        <span className={`font-bold ${worse ? 'text-nn-red' : 'text-nn-green'}`}>{after}</span>
        {worse ? <TrendingDown className="w-3.5 h-3.5 text-nn-red" /> : <TrendingUp className="w-3.5 h-3.5 text-nn-green" />}
      </div>
    </div>
  );
}
