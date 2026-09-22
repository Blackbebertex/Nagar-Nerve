import { useState, useEffect, useCallback } from 'react';
import { ShieldAlert, Wifi, WifiOff, Home, FilePlus2, Map, Activity, UserRound } from 'lucide-react';
import type { Role, AnalyzeResponse, SimulationResult, NeighborhoodState } from './types';
import { Header } from './components/Header';
import { CoordinatorView } from './components/CoordinatorView';
import { CitizenView } from './components/CitizenView';
import { VolunteerView } from './components/VolunteerView';
import { PlannerView } from './components/PlannerView';
import { AdminView } from './components/AdminView';
import { checkHealth, getDemoNeighborhoodState, getNeighborhoodState } from './services/api';

export default function App() {
  const [role, setRole] = useState<Role>('Coordinator');
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [neighborhoodState, setNeighborhoodState] = useState<NeighborhoodState | null>(null);
  const [incidentResult, setIncidentResult] = useState<AnalyzeResponse | null>(null);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  // Check backend health on load
  useEffect(() => {
    let cancelled = false;

    const syncBackendState = async () => {
      const online = await checkHealth();
      if (cancelled) return;

      setBackendOnline(online);
      try {
        const state = online ? await getNeighborhoodState() : await getDemoNeighborhoodState();
        if (!cancelled) setNeighborhoodState(state);
      } catch (error) {
        console.error(error);
      }
    };

    syncBackendState();
    const retryTimer = window.setInterval(syncBackendState, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(retryTimer);
    };
  }, []);

  const refreshState = useCallback(() => {
    getNeighborhoodState().then(setNeighborhoodState).catch(console.error);
  }, []);

  const handleReset = useCallback(() => {
    setIncidentResult(null);
    setSimulationResult(null);
    refreshState();
  }, [refreshState]);

  return (
    <div className="flex flex-col h-screen bg-nn-bg text-nn-text overflow-hidden">
      {/* Backend status banner */}
      {backendOnline === false && (
        <div className="bg-nn-amber/20 border-b border-nn-amber/40 px-4 py-2 flex items-center gap-2 text-nn-amber text-sm">
          <WifiOff className="w-4 h-4" />
          <span>Backend offline — running in demo fallback mode. Start the backend to enable live Gemini analysis.</span>
        </div>
      )}

      <Header
        role={role}
        setRole={setRole}
        backendOnline={backendOnline}
        hasActiveIncident={!!incidentResult}
      />

      <main className="flex-1 overflow-hidden">
        {role === 'Citizen' && (
          <CitizenView
            onIncidentAnalyzed={setIncidentResult}
            backendOnline={backendOnline ?? false}
          />
        )}
        {role === 'Coordinator' && (
          <CoordinatorView
            incidentResult={incidentResult}
            neighborhoodState={neighborhoodState}
            onApprove={() => setRole('Volunteer')}
          />
        )}
        {role === 'Volunteer' && (
          <VolunteerView incidentResult={incidentResult} />
        )}
        {role === 'Planner' && (
          <PlannerView
            simulationResult={simulationResult}
            onSimulate={setSimulationResult}
            neighborhoodState={neighborhoodState}
            backendOnline={backendOnline ?? false}
          />
        )}
        {role === 'Admin' && (
          <AdminView
            backendOnline={backendOnline ?? false}
            neighborhoodState={neighborhoodState}
            onReset={handleReset}
          />
        )}
      </main>

      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-nn-border px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 grid grid-cols-5 gap-1 shadow-[0_-8px_24px_rgba(23,37,34,0.08)]" aria-label="Mobile navigation">
        <MobileNavItem icon={<Home />} label="Home" active={role === 'Coordinator'} onClick={() => setRole('Coordinator')} />
        <MobileNavItem icon={<FilePlus2 />} label="Report" active={role === 'Citizen'} onClick={() => setRole('Citizen')} />
        <MobileNavItem icon={<Map />} label="Map" active={role === 'Planner'} onClick={() => setRole('Planner')} />
        <MobileNavItem icon={<Activity />} label="Activity" active={role === 'Volunteer'} onClick={() => setRole('Volunteer')} />
        <MobileNavItem icon={<UserRound />} label="More" active={role === 'Admin'} onClick={() => setRole('Admin')} />
      </nav>
    </div>
  );
}

function MobileNavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`min-h-12 flex flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-semibold ${active ? 'text-nn-blue bg-nn-blue/10' : 'text-nn-muted'}`}>
      <span className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">{icon}</span>
      {label}
    </button>
  );
}
