import { Wifi, WifiOff, Activity } from 'lucide-react';
import type { Role } from '../types';

const ROLES: Role[] = ['Citizen', 'Coordinator', 'Volunteer', 'Planner', 'Admin'];

const ROLE_COLORS: Record<Role, string> = {
  Citizen:     'bg-nn-green/10 text-nn-green border-nn-green/30',
  Coordinator: 'bg-nn-blue/10 text-nn-blue border-nn-blue/30',
  Volunteer:   'bg-nn-cyan/10 text-nn-cyan border-nn-cyan/30',
  Planner:     'bg-purple-100 text-purple-700 border-purple-200',
  Admin:       'bg-nn-amber/10 text-nn-amber border-nn-amber/30',
};

interface Props {
  role: Role;
  setRole: (r: Role) => void;
  backendOnline: boolean | null;
  hasActiveIncident: boolean;
}

export function Header({ role, setRole, backendOnline, hasActiveIncident }: Props) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-nn-surface border-b border-nn-border shrink-0 shadow-sm">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-nn-blue text-white shadow-sm">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold tracking-tight text-nn-text">NAGAR NERVE</h1>
            {hasActiveIncident && (
                <span className="flex items-center gap-1 bg-nn-red/10 text-nn-red text-[10px] font-bold px-2 py-0.5 rounded-full border border-nn-red/20 animate-pulse">
                <Activity className="w-2.5 h-2.5" /> LIVE
              </span>
            )}
          </div>
          <p className="text-[10px] text-nn-muted uppercase tracking-widest">
            Neighborhood Response Intelligence
          </p>
        </div>
      </div>

      {/* Role Switcher */}
      <div className="flex items-center gap-2 max-w-full">
        <span className="hidden sm:inline text-[10px] text-nn-muted uppercase tracking-widest mr-1 font-semibold">
          Synthetic demo
        </span>
        <div className="relative flex items-center bg-nn-card rounded-xl border border-nn-border p-0.5 gap-0.5">
          <select
            value={role}
            onChange={event => setRole(event.target.value as Role)}
            aria-label="Choose demo role"
            className="sm:hidden appearance-none bg-transparent text-nn-text text-xs font-semibold pl-2 pr-7 py-1.5"
          >
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          {ROLES.map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                role === r
                  ? `border ${ROLE_COLORS[r]}`
                  : 'text-nn-muted hover:text-nn-text'
              } hidden sm:block`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Backend status indicator */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border ${
          backendOnline === null
            ? 'bg-nn-card border-nn-border text-nn-muted'
            : backendOnline
              ? 'bg-nn-green/10 border-nn-green/30 text-nn-green'
              : 'bg-nn-amber/10 border-nn-amber/30 text-nn-amber'
        }`}>
          {backendOnline === null ? (
            <><span className="w-1.5 h-1.5 rounded-full bg-nn-muted animate-pulse" />Checking</>
          ) : backendOnline ? (
            <><Wifi className="w-3 h-3" />Backend Online</>
          ) : (
            <><WifiOff className="w-3 h-3" />Fallback Mode</>
          )}
        </div>
      </div>
    </header>
  );
}
