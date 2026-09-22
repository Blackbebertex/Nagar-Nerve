import { useEffect, useRef, useState } from 'react';
import type { NeighborhoodState, AnalyzeResponse, Road, Resource } from '../types';

interface Props {
  neighborhoodState: NeighborhoodState | null;
  incidentResult: AnalyzeResponse | null;
}

// Simple SVG-based neighborhood map (no external tile servers needed)
// Coordinates projected into SVG space for reliability

const W = 900;
const H = 560;
const PAD = 82;

// Lat/lng bounds of our neighborhood
const LAT_MIN = 18.5180, LAT_MAX = 18.5250;
const LNG_MIN = 73.8525, LNG_MAX = 73.8620;

function project(lat: number, lng: number): [number, number] {
  const x = PAD + ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (W - 2 * PAD);
  const y = H - PAD - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * (H - 2 * PAD);
  return [x, y];
}

const RESOURCE_ICONS: Record<string, string> = {
  pharmacy:       '💊',
  clinic:         '🏥',
  volunteer:      '🚴',
  community_hall: '🏛️',
};

const RESOURCE_COLORS: Record<string, string> = {
  pharmacy:       '#10b981',
  clinic:         '#2e8175',
  volunteer:      '#23665a',
  community_hall: '#7556a3',
};

const LABEL_WIDTH = 104;
const LABEL_HEIGHT = 25;
const LABEL_GAP = 8;

interface LabelPlacement {
  x: number;
  y: number;
}

function getLabelPlacements(resources: Resource[]): Map<string, LabelPlacement> {
  const placements = new Map<string, LabelPlacement>();
  const occupied: Array<{ x: number; y: number }> = [];
  const candidates: Array<[number, number]> = [
    [0, -42], [0, 42], [60, 0], [-60, 0],
    [60, -34], [-60, -34], [60, 34], [-60, 34],
  ];

  resources.forEach((resource) => {
    const [rx, ry] = project(resource.coordinates.lat, resource.coordinates.lng);
    const placement = candidates
      .map(([dx, dy]) => ({
        x: Math.max(LABEL_WIDTH / 2 + LABEL_GAP, Math.min(W - LABEL_WIDTH / 2 - LABEL_GAP, rx + dx)),
        y: Math.max(LABEL_HEIGHT + LABEL_GAP, Math.min(H - LABEL_GAP, ry + dy)),
      }))
      .sort((first, second) => {
        const firstOverlaps = occupied.filter((item) =>
          Math.abs(first.x - item.x) < LABEL_WIDTH + LABEL_GAP &&
          Math.abs(first.y - item.y) < LABEL_HEIGHT + LABEL_GAP,
        ).length;
        const secondOverlaps = occupied.filter((item) =>
          Math.abs(second.x - item.x) < LABEL_WIDTH + LABEL_GAP &&
          Math.abs(second.y - item.y) < LABEL_HEIGHT + LABEL_GAP,
        ).length;
        return firstOverlaps - secondOverlaps ||
          Math.hypot(first.x - rx, first.y - ry) - Math.hypot(second.x - rx, second.y - ry);
      })[0];

    placements.set(resource.id, placement);
    occupied.push(placement);
  });

  return placements;
}

export function NeighborhoodMap({ neighborhoodState, incidentResult }: Props) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  if (!neighborhoodState) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-nn-bg text-nn-muted">
        <p className="text-sm">Loading map data...</p>
      </div>
    );
  }

  const { nodes, roads, resources } = neighborhoodState;
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const labelPlacements = getLabelPlacements(resources);

  // Which roads are part of the safe route?
  const safeRouteRoads = new Set(incidentResult?.route?.roads ?? []);

  return (
    <div className="w-full h-full bg-[#182b28] relative overflow-hidden">
      {/* Map Legend */}
      <div className="absolute bottom-3 right-3 bg-nn-surface/90 backdrop-blur-sm border border-nn-border rounded-xl p-3 text-[10px] z-10 shadow-lg">
        <p className="font-bold text-nn-muted uppercase tracking-widest mb-2">Map Legend</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          <LegendItem color="#ef4444" label="Blocked Road" dash />
          <LegendItem color="#55b89a" label="Safe Route" />
          <LegendItem color="#49655d" label="Open Road" />
          <LegendItem color="#10b981" label="Pharmacy" dot />
          <LegendItem color="#2e8175" label="Clinic" dot />
          <LegendItem color="#23665a" label="Volunteer" dot />
          <LegendItem color="#7556a3" label="Community Hall" dot />
        </div>
      </div>

      {/* Synthetic data label */}
      <div className="absolute top-3 right-3 bg-nn-amber/20 border border-nn-amber/30 rounded-lg px-2 py-1 text-[10px] text-nn-amber font-bold uppercase tracking-widest z-10">
        Synthetic Demo Neighborhood
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        {/* Background grid */}
        <rect width={W} height={H} fill="#182b28" />
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`vg-${i}`} x1={i * 90} y1={0} x2={i * 90} y2={H} stroke="#29443d" strokeWidth="1" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`hg-${i}`} x1={0} y1={i * 80} x2={W} y2={i * 80} stroke="#29443d" strokeWidth="1" />
        ))}

        {/* Roads */}
        {roads.map((road: Road) => {
          const from = nodeMap.get(road.from);
          const to   = nodeMap.get(road.to);
          if (!from || !to) return null;
          const [x1, y1] = project(from.coordinates.lat, from.coordinates.lng);
          const [x2, y2] = project(to.coordinates.lat, to.coordinates.lng);
          const isBlocked    = road.status === 'blocked';
          const isSafeRoute  = safeRouteRoads.has(road.id);
          const isDegraded   = road.status === 'degraded';

          return (
            <g key={road.id}>
              {/* Keep ordinary roads quiet so the response route reads first. */}
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isBlocked ? '#c96b4b55' : isSafeRoute ? '#55b89a55' : 'transparent'}
                strokeWidth={isBlocked ? 10 : isSafeRoute ? 12 : 0}
              />
              {/* Road line */}
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isBlocked ? '#c96b4b' : isSafeRoute ? '#55b89a' : isDegraded ? '#d99a3d' : '#49655d'}
                strokeWidth={isBlocked ? 4 : isSafeRoute ? 5 : isDegraded ? 3 : 2}
                strokeDasharray={isBlocked ? '8,6' : 'none'}
              />
              {(isBlocked || isSafeRoute || isDegraded) && (
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 8}
                  fontSize="9"
                  fill={isBlocked ? '#f4a08a' : isSafeRoute ? '#b7ead7' : '#f2c878'}
                  textAnchor="middle"
                  paintOrder="stroke"
                  stroke="#182b28"
                  strokeWidth="3"
                >
                  {road.id}
                </text>
              )}
            </g>
          );
        })}

        {/* Resource Markers */}
        {resources.map((res: Resource) => {
          const [rx, ry] = project(res.coordinates.lat, res.coordinates.lng);
          const color = RESOURCE_COLORS[res.type] ?? '#64748b';
          const isUnavailable = res.status === 'closed' || res.status === 'unavailable';
          const label = labelPlacements.get(res.id) ?? { x: rx, y: ry + 42 };

          return (
            <g key={res.id}
              className="cursor-pointer"
              onClick={() => setTooltip({ text: `${res.name} (${res.status})`, x: rx, y: ry - 50 })}
            >
              <line x1={rx} y1={ry} x2={label.x} y2={label.y - 10} stroke={isUnavailable ? '#4b5563' : color + '70'} strokeWidth="1" />
              <rect x={label.x - LABEL_WIDTH / 2} y={label.y - 11} width={LABEL_WIDTH} height={LABEL_HEIGHT} rx="6"
                      fill="#203a35" stroke="#4b6a61" strokeWidth="1" />
              <text x={label.x} y={label.y - 1} fontSize="9" fill={isUnavailable ? '#94a3b8' : '#dbeafe'} textAnchor="middle">
                {res.name.length > 18 ? res.name.slice(0, 17) + '…' : res.name}
              </text>
              <text x={label.x} y={label.y + 9} fontSize="7" fill={isUnavailable ? '#6b7280' : color} textAnchor="middle" fontWeight="bold">
                {res.status.toUpperCase()}
              </text>
              {/* Glow ring for active resources */}
              {!isUnavailable && (
                <circle cx={rx} cy={ry} r={22} fill={color + '15'} stroke={color + '40'} strokeWidth="1" />
              )}
              {/* Marker circle */}
              <circle cx={rx} cy={ry} r={14}
                fill={isUnavailable ? '#374151' : color + '25'}
                stroke={isUnavailable ? '#4b5563' : color}
                strokeWidth="2"
              />
              {/* Icon */}
              <text x={rx} y={ry + 5} fontSize="13" textAnchor="middle">
                {RESOURCE_ICONS[res.type] ?? '📍'}
              </text>
            </g>
          );
        })}

        {/* Tooltip */}
        {tooltip && (
          <g onClick={() => setTooltip(null)}>
            <rect x={tooltip.x - 70} y={tooltip.y - 14} width={140} height={24} rx={6}
              fill="#203a35" stroke="#55b89a" strokeWidth="1" />
            <text x={tooltip.x} y={tooltip.y + 3} fontSize="10" fill="#e2e8f0" textAnchor="middle">
              {tooltip.text}
            </text>
          </g>
        )}

        {/* Incident location indicator */}
        {incidentResult && (
          <>
            <circle cx={project(18.5204, 73.8567)[0]} cy={project(18.5204, 73.8567)[1]} r={28}
              fill="#ef444415" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4"
            >
              <animate attributeName="r" values="24;32;24" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <line x1={project(18.5204, 73.8567)[0] + 18} y1={project(18.5204, 73.8567)[1] - 18}
              x2={project(18.5204, 73.8567)[0] + 52} y2={project(18.5204, 73.8567)[1] - 42}
              stroke="#ef4444" strokeWidth="1" />
            <rect x={project(18.5204, 73.8567)[0] + 48} y={project(18.5204, 73.8567)[1] - 54} width="82" height="22" rx="6"
              fill="#2a121b" stroke="#ef4444" strokeWidth="1" />
            <text x={project(18.5204, 73.8567)[0] + 89} y={project(18.5204, 73.8567)[1] - 40}
              fontSize="9" fill="#f87171" textAnchor="middle" fontWeight="bold">
              INCIDENT
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

function LegendItem({ color, label, dash, dot }: { color: string; label: string; dash?: boolean; dot?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {dot ? (
        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
      ) : (
        <svg width="18" height="8">
          <line x1="0" y1="4" x2="18" y2="4"
            stroke={color} strokeWidth="2.5"
            strokeDasharray={dash ? '4,3' : 'none'}
          />
        </svg>
      )}
      <span style={{ color: '#94a3b8' }}>{label}</span>
    </div>
  );
}
