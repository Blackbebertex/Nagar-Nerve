import fs from 'fs';
import path from 'path';
import { NeighborhoodState, RouteResult, Road, NeighborhoodNode } from '../types';

const DATA_PATH = path.join(__dirname, '../data/demoState.json');

// Live mutable state (in-memory, seeded from JSON)
let liveState: NeighborhoodState = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
const originalState: NeighborhoodState = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

export function getState(): NeighborhoodState {
  return liveState;
}

export function resetState(): void {
  liveState = JSON.parse(JSON.stringify(originalState));
}

/**
 * Dijkstra shortest-path on the neighborhood road graph.
 * Blocked roads are treated as impassable.
 */
export function calculateSafeRoute(
  fromNodeId: string,
  toNodeId: string,
  overrideBlockedRoads: string[] = []
): RouteResult | null {
  const { nodes, roads } = liveState;

  // Only open roads (union with override blocked)
  const passable = roads.filter(
    (r: Road) => r.status === 'open' && !overrideBlockedRoads.includes(r.id)
  );

  // Build adjacency list
  type Edge = { to: string; distKm: number; timeMin: number; roadId: string };
  const graph: Record<string, Edge[]> = {};
  nodes.forEach((n: NeighborhoodNode) => { graph[n.id] = []; });
  passable.forEach((r: Road) => {
    graph[r.from]?.push({ to: r.to, distKm: r.distance, timeMin: r.travelTime, roadId: r.id });
    graph[r.to]?.push({ to: r.from, distKm: r.distance, timeMin: r.travelTime, roadId: r.id });
  });

  // Dijkstra by distance
  const dist: Record<string, number> = {};
  const prev: Record<string, { node: string; roadId: string; timeMin: number } | null> = {};
  const unvisited = new Set<string>(nodes.map((n: NeighborhoodNode) => n.id));

  nodes.forEach((n: NeighborhoodNode) => { dist[n.id] = Infinity; prev[n.id] = null; });
  dist[fromNodeId] = 0;

  while (unvisited.size > 0) {
    // Pick min-dist unvisited
    let u: string | null = null;
    for (const n of unvisited) {
      if (u === null || dist[n] < dist[u]) u = n;
    }
    if (!u || u === toNodeId || dist[u] === Infinity) break;
    unvisited.delete(u);

    for (const edge of (graph[u] ?? [])) {
      if (!unvisited.has(edge.to)) continue;
      const alt = dist[u] + edge.distKm;
      if (alt < dist[edge.to]) {
        dist[edge.to] = alt;
        prev[edge.to] = { node: u, roadId: edge.roadId, timeMin: edge.timeMin };
      }
    }
  }

  if (dist[toNodeId] === Infinity) return null;

  // Reconstruct path
  const roadsUsed: string[] = [];
  let totalTime = 0;
  let cur = toNodeId;
  while (cur !== fromNodeId) {
    const p = prev[cur];
    if (!p) break;
    roadsUsed.unshift(p.roadId);
    totalTime += p.timeMin;
    cur = p.node;
  }

  return {
    routeId: `route-${Date.now()}`,
    roads: roadsUsed,
    distanceKm: Math.round(dist[toNodeId] * 10) / 10,
    estimatedTimeMin: totalTime,
  };
}
