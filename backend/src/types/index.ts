// ─── Shared Domain Types ───────────────────────────────────────────────────

export type IncidentStatus =
  | 'reported'
  | 'analyzed'
  | 'resources_identified'
  | 'route_calculated'
  | 'plan_generated'
  | 'coordinator_review'
  | 'volunteer_request'
  | 'resolved'
  | 'escalated';

export interface Incident {
  id: string;
  description: string;
  locationReference: string;
  status: IncidentStatus;
  createdAt: string;
  imageBase64?: string;
  analysis?: IncidentAnalysis;
  verifiedFacts?: string[];
  computedRoute?: RouteResult;
  responsePlan?: ResponsePlan;
}

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

export type ResourceType = 'pharmacy' | 'clinic' | 'volunteer' | 'community_hall';
export type ResourceStatus = 'open' | 'closed' | 'available' | 'unavailable';

export interface Resource {
  id: string;
  type: ResourceType;
  name: string;
  coordinates: { lat: number; lng: number };
  status: ResourceStatus;
  verified: boolean;
  availability: Record<string, unknown>;
  synthetic: boolean;
  nodeId: string;
}

export type RoadStatus = 'open' | 'blocked' | 'degraded';

export interface Road {
  id: string;
  from: string;
  to: string;
  status: RoadStatus;
  distance: number;   // km
  travelTime: number; // minutes
}

export interface NeighborhoodNode {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
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

export interface SimulationResult {
  scenarioLabel: string;
  before: { distanceKm: number; estimatedTimeMin: number; accessibleResources: number };
  after:  { distanceKm: number; estimatedTimeMin: number; accessibleResources: number };
  affectedResourceIds: string[];
  newRoute: RouteResult | null;
  explanation: string;
  source: 'gemini' | 'fallback';
}

export interface VolunteerTask {
  id: string;
  volunteerId: string;
  pickup: string;
  destination: string;
  routeId: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}

export interface NeighborhoodState {
  nodes: NeighborhoodNode[];
  roads: Road[];
  resources: Resource[];
}
