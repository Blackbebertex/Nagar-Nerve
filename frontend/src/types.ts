// ─── Shared Frontend Types (mirror of backend types) ─────────────────────────

export type Role = 'Citizen' | 'Coordinator' | 'Volunteer' | 'Planner' | 'Admin';

export type IncidentStatus =
  | 'reported' | 'analyzed' | 'resources_identified'
  | 'route_calculated' | 'plan_generated' | 'coordinator_review'
  | 'volunteer_request' | 'resolved' | 'escalated';

export interface IncidentAnalysis {
  incidentType: string;
  secondaryNeed: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  locationReference: string;
  peopleAtRisk: number;
  observations: string[];
  confidence: number;
  source: 'gemini' | 'fallback';
}

export interface RouteResult {
  routeId: string;
  roads: string[];
  distanceKm: number;
  estimatedTimeMin: number;
}

export interface ResponseAction {
  order: number;
  action: string;
  targetId: string;
  reason: string;
}

export interface ResponsePlan {
  summary: string;
  actions: ResponseAction[];
  fallback: { type: string; targetId: string };
  source: 'gemini' | 'fallback';
}

export interface AnalyzeResponse {
  success: boolean;
  analysis: IncidentAnalysis;
  verifiedFacts: string[];
  route: RouteResult | null;
  computedResults: string[];
  responsePlan: ResponsePlan;
}

export interface SimulationResult {
  success: boolean;
  scenarioLabel: string;
  before: { distanceKm: number; estimatedTimeMin: number; accessibleResources: number };
  after:  { distanceKm: number; estimatedTimeMin: number; accessibleResources: number };
  newRoute: RouteResult | null;
  affectedResourceIds: string[];
  explanation: string;
}

export interface Resource {
  id: string;
  type: 'pharmacy' | 'clinic' | 'volunteer' | 'community_hall';
  name: string;
  coordinates: { lat: number; lng: number };
  status: string;
  verified: boolean;
  availability: Record<string, unknown>;
  synthetic: boolean;
  nodeId: string;
}

export interface Road {
  id: string;
  from: string;
  to: string;
  status: 'open' | 'blocked' | 'degraded';
  distance: number;
  travelTime: number;
}

export interface NeighborhoodNode {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
}

export interface NeighborhoodState {
  nodes: NeighborhoodNode[];
  roads: Road[];
  resources: Resource[];
}
