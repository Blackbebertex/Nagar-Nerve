# Nagar Nerve — Implementation Plan

## Gemini-Powered Neighborhood Intelligence & Response Network

**Goal:** Build the Nagar Nerve prototype as a full-stack application using Google AI Studio, with a clear separation between frontend and backend responsibilities.

---

# 1. Implementation Objective

Nagar Nerve should demonstrate one complete end-to-end neighborhood coordination scenario:

> A road near a community hall is flooded while an elderly resident needs medicine.

The prototype should:

1. accept a citizen report;
2. optionally accept an image;
3. use Gemini to understand the incident;
4. retrieve verified neighborhood resources;
5. calculate a safe alternative route;
6. use Gemini to generate an explainable response plan;
7. visualize the result on a map;
8. simulate what happens if another road becomes unavailable.

The prototype should focus on one fictional neighborhood and one polished hero scenario instead of attempting to build a full smart-city platform.

---

# 2. Recommended Technology Approach

Use Google AI Studio as the primary development environment.

Recommended stack:

```text
Frontend:
React + TypeScript

Backend:
Node.js + TypeScript

AI:
Google Gemini API

Data:
JSON initially
Firestore optionally

Maps:
Leaflet or MapLibre

Routing:
Custom Dijkstra / A* implementation
or a suitable JavaScript graph library

Deployment:
Google AI Studio
→ GitHub
→ Google Cloud Run
```

The application should be organized as one full-stack project while keeping frontend and backend responsibilities clearly separated.

---

# 3. High-Level Architecture

```text
                        NAGAR NERVE
                             │
               ┌─────────────┴─────────────┐
               │                           │
          Citizen UI                  Operator UI
               │                           │
               └─────────────┬─────────────┘
                             │
                        API Layer
                             │
                   Incident Orchestrator
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
   Gemini Analysis     Resource Engine      Routing Engine
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                      Gemini Planner
                             │
                             ▼
                      Response Plan
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
        Map Visualization         Explanation Panel
                │
                ▼
          What-if Simulation
```

---

# 4. Frontend Responsibilities

The frontend is responsible for user interaction and visualization.

It should never contain sensitive API keys or directly call Gemini using secret credentials.

## Core Frontend Responsibilities

- incident submission;
- image upload;
- location input;
- displaying Gemini analysis;
- displaying verified resources;
- rendering the neighborhood map;
- highlighting blocked roads;
- showing the calculated safe route;
- displaying the response plan;
- displaying explainability sections;
- controlling what-if simulations;
- showing loading and error states;
- resetting the demo.

---

# 5. Backend Responsibilities

The backend is responsible for business logic, Gemini integration, deterministic calculations, validation, and access to neighborhood data.

## Core Backend Responsibilities

- receive incident requests;
- validate inputs;
- securely call Gemini;
- validate Gemini structured output;
- retrieve neighborhood resources;
- calculate routes;
- execute simulation logic;
- generate a grounded Gemini response plan;
- distinguish verified data from model inference;
- return structured responses to the frontend.

The backend should remain the source of truth for operational facts.

---

# 6. Recommended Project Structure

```text
nagar-nerve/
│
├── frontend/
│   ├── components/
│   │   ├── MapView.tsx
│   │   ├── IncidentReport.tsx
│   │   ├── IncidentComposer.tsx
│   │   ├── ResponsePlan.tsx
│   │   ├── ResourcePanel.tsx
│   │   ├── ReasoningPanel.tsx
│   │   ├── SimulationPanel.tsx
│   │   └── IncidentTimeline.tsx
│   │
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   ├── utils/
│   └── assets/
│
├── server/
│   ├── api/
│   │   ├── incidents.ts
│   │   ├── resources.ts
│   │   ├── routing.ts
│   │   ├── simulations.ts
│   │   └── reset.ts
│   │
│   ├── services/
│   │   ├── gemini.ts
│   │   ├── incidentService.ts
│   │   ├── resourceService.ts
│   │   ├── routingService.ts
│   │   ├── simulationService.ts
│   │   └── responsePlanner.ts
│   │
│   ├── schemas/
│   │   ├── incident.ts
│   │   ├── responsePlan.ts
│   │   └── resource.ts
│   │
│   ├── data/
│   │   ├── roads.json
│   │   ├── nodes.json
│   │   ├── resources.json
│   │   ├── incidents.json
│   │   └── demoState.json
│   │
│   ├── utils/
│   └── config/
│
├── shared/
│   ├── types/
│   └── constants/
│
├── docs/
│   ├── idea.md
│   ├── implementation.md
│   └── architecture.md
│
├── .env.example
├── package.json
└── README.md
```

---

# 7. Core User Flow

```text
Citizen opens application
        ↓
Citizen enters report
        ↓
Citizen optionally uploads image
        ↓
Frontend sends request to backend
        ↓
Backend sends text + image to Gemini
        ↓
Gemini returns structured incident interpretation
        ↓
Backend validates result
        ↓
Resource engine finds nearby verified resources
        ↓
Routing engine calculates safe route
        ↓
Backend sends facts + route to Gemini
        ↓
Gemini generates response plan
        ↓
Backend validates plan
        ↓
Frontend displays:
    - incident
    - map
    - resources
    - route
    - explanation
    - recommendation
        ↓
User optionally runs what-if simulation
```

---

# 8. Hero Demo Scenario

## Citizen Input

Example:

```text
The road near Community Hall A is flooded and my grandfather needs medicine.
```

Optional uploaded image:

```text
Photo showing standing water across the road.
```

---

# 9. Gemini Incident Analysis

Gemini receives:

- citizen text;
- image;
- location context.

Expected structured output:

```json
{
  "incident_type": "flooding",
  "secondary_need": "medicine_access",
  "severity": "high",
  "location_reference": "Community Hall A",
  "people_at_risk": 1,
  "observations": [
    "standing water visible on road"
  ],
  "confidence": 0.91
}
```

The backend must validate this response before using it.

---

# 10. Neighborhood Resource Lookup

After incident classification, the backend checks deterministic data.

Example:

```text
Road-01
status = blocked

Pharmacy-01
status = open
medicine_available = true

Volunteer-07
available = true
verified = true

Clinic-01
status = open

Road-07
status = open
```

Gemini must not invent these facts.

---

# 11. Routing Engine

The routing engine should use a deterministic graph algorithm.

Recommended approach:

```text
Input:
Road graph
Source node
Destination node
Blocked roads

        ↓

Remove or heavily penalize blocked edges

        ↓

Run Dijkstra or A*

        ↓

Return:
Path
Distance
Estimated travel time
```

Example result:

```json
{
  "route_id": "route-b",
  "distance_km": 1.6,
  "estimated_time_min": 8,
  "roads": [
    "road-03",
    "road-07",
    "road-09"
  ]
}
```

Gemini should not calculate shortest paths.

---

# 12. Gemini Response Planner

Gemini receives only validated facts.

Example input context:

```text
Incident:
Flooding + medicine access

Verified:
Road-01 blocked
Pharmacy-01 open
Volunteer-07 available
Clinic-01 open

Computed:
Route B
1.6 km
8 minutes

Constraints:
Do not use blocked roads.
Do not invent resources.
Do not claim an action was executed.
Do not provide medical diagnosis.
```

Expected response:

```json
{
  "summary": "Use the available verified volunteer to collect medicine through Route B.",
  "actions": [
    {
      "order": 1,
      "action": "avoid_road",
      "target_id": "road-01",
      "reason": "The road is marked blocked."
    },
    {
      "order": 2,
      "action": "contact_volunteer",
      "target_id": "volunteer-07",
      "reason": "This volunteer is verified and currently available."
    },
    {
      "order": 3,
      "action": "use_route",
      "target_id": "route-b",
      "reason": "This is the current safe alternative route."
    }
  ],
  "fallback": {
    "type": "clinic",
    "target_id": "clinic-01"
  }
}
```

---

# 13. Explainability Model

The frontend should clearly separate three types of information.

## Verified Facts

Examples:

```text
Road-01 blocked
Pharmacy-01 open
Volunteer-07 available
```

These come from application data.

---

## Computed Results

Examples:

```text
Route B = 1.6 km
Estimated travel time = 8 min
Nearest available volunteer = Volunteer-07
```

These come from deterministic algorithms.

---

## Gemini Recommendation

Example:

```text
Use Volunteer-07 via Route B to collect medicine from Pharmacy-01.
```

This comes from Gemini reasoning over verified context.

---

# 14. Main Frontend Screens

## 14.1 Command Center

Should contain:

- neighborhood map;
- active incidents;
- resource summary;
- incident submission button;
- status indicators;
- response-time metric.

---

## 14.2 Incident Analysis Screen

Example:

```text
INCIDENT
Flooding + Medicine Access

GEMINI UNDERSTANDING
High operational urgency

VERIFIED FACTS
✓ Road-01 blocked
✓ Pharmacy-01 open
✓ Volunteer-07 available

COMPUTED
Route B
1.6 km
8 min

GEMINI RECOMMENDATION
Use Volunteer-07 via Route B
```

---

## 14.3 Map Screen

The map should display:

### Red

- blocked road;
- active critical incident.

### Green

- pharmacy;
- clinic;
- available volunteer.

### Blue

- safe calculated route.

### Amber

- warning;
- degraded road;
- uncertain status.

---

## 14.4 Reasoning Panel

Recommended structure:

```text
FACTS
│
├── Road-01 blocked
├── Pharmacy-01 open
└── Volunteer-07 available

COMPUTED
│
├── Route B = 1.6 km
└── ETA = 8 min

GEMINI RECOMMENDATION
│
└── Volunteer-07 → Pharmacy-01 → Resident
```

---

# 15. What-If Simulation

The simulation should initially support one controlled scenario.

## Example

User selects:

```text
What if Road-07 closes?
```

Original state:

```text
Distance: 1.6 km
ETA: 8 min
```

Simulated state:

```text
Distance: 2.5 km
ETA: 13 min
```

Gemini explanation:

```text
Road-07 was part of the original safe route.
With this road unavailable, the remaining path is longer.
Community Hall B may become a more useful temporary coordination point.
```

The simulation must not permanently alter the original demo state.

---

# 16. Suggested API Endpoints

## Analyze Incident

```text
POST /api/incidents/analyze
```

Request:

```json
{
  "text": "The road near Community Hall A is flooded and medicine is needed.",
  "location": "community-hall-a"
}
```

Response:

```json
{
  "incident": {},
  "classification": {},
  "resources": [],
  "route": {},
  "response_plan": {},
  "explanations": []
}
```

---

## Analyze Incident With Image

```text
POST /api/incidents/analyze-image
```

Input:

```text
multipart/form-data

image
text
location
```

---

## Get Neighborhood State

```text
GET /api/neighborhood/state
```

Returns:

- roads;
- nodes;
- pharmacies;
- clinics;
- volunteers;
- community halls;
- incidents.

---

## Road Closure Simulation

```text
POST /api/simulations/road-closure
```

Request:

```json
{
  "road_id": "road-07"
}
```

Response:

```json
{
  "before": {
    "time_min": 8
  },
  "after": {
    "time_min": 13
  },
  "affected_resources": [],
  "new_route": {}
}
```

---

## Demo Reset

```text
POST /api/demo/reset
```

Resets all demo state to the original seeded condition.

---

# 17. Data Model

## Road

```json
{
  "id": "road-01",
  "name": "Lake Road",
  "from": "node-01",
  "to": "node-02",
  "distance_m": 620,
  "travel_time_s": 95,
  "status": "blocked"
}
```

Allowed status:

```text
open
blocked
degraded
```

---

## Pharmacy

```json
{
  "id": "pharmacy-01",
  "type": "pharmacy",
  "name": "GreenCare Pharmacy",
  "status": "open",
  "inventory": [
    "paracetamol",
    "insulin-demo",
    "blood-pressure-demo"
  ]
}
```

All inventory should be clearly synthetic for the prototype.

---

## Volunteer

```json
{
  "id": "volunteer-07",
  "type": "volunteer",
  "name": "Volunteer 07",
  "available": true,
  "verified": true,
  "vehicle": "bicycle"
}
```

---

## Clinic

```json
{
  "id": "clinic-01",
  "type": "clinic",
  "name": "Community Clinic",
  "status": "open"
}
```

---

# 18. Gemini Service Design

Recommended backend abstraction:

```text
GeminiService

├── analyzeIncident()
├── analyzeIncidentImage()
├── generateResponsePlan()
└── explainSimulation()
```

The rest of the application should not call Gemini directly.

This keeps AI logic isolated and easier to test.

---

# 19. Resource Service Design

Recommended service:

```text
ResourceService

├── findNearbyPharmacies()
├── findOpenClinics()
├── findAvailableVolunteers()
├── findCommunitySpaces()
└── validateResourceIds()
```

---

# 20. Routing Service Design

Recommended service:

```text
RoutingService

├── buildGraph()
├── getSafeRoute()
├── calculateDistance()
├── calculateTravelTime()
└── applyRoadClosures()
```

---

# 21. Simulation Service Design

Recommended service:

```text
SimulationService

├── cloneCurrentState()
├── closeRoad()
├── removeResource()
├── recalculateRoutes()
├── compareBeforeAfter()
└── restoreOriginalState()
```

---

# 22. Development Phases

## Phase 0 — Project Setup

Build:

- React frontend;
- Node backend;
- environment configuration;
- health endpoint;
- GitHub repository;
- demo JSON data.

Acceptance:

```text
Frontend loads.
Backend starts.
GET /health returns success.
```

---

## Phase 1 — Neighborhood Digital Twin

Build:

- fictional map;
- road network;
- pharmacies;
- clinics;
- volunteers;
- community halls;
- incident markers.

Acceptance:

```text
All resources display correctly.
Blocked road is visually different.
Map state is reproducible.
```

---

## Phase 2 — Incident Submission

Build:

- text input;
- image upload;
- location input;
- submit action;
- loading state.

Acceptance:

```text
User can submit text.
User can upload an image.
Backend receives the complete request.
```

---

## Phase 3 — Gemini Incident Understanding

Build:

- Gemini API integration;
- multimodal prompt;
- structured result;
- schema validation;
- error handling.

Acceptance:

```text
Flood scenario returns valid structured output.
Invalid Gemini output is rejected.
No resource is invented.
```

---

## Phase 4 — Resource Engine

Build:

- pharmacy lookup;
- clinic lookup;
- volunteer lookup;
- community-space lookup.

Acceptance:

```text
Resources come only from the seeded dataset.
Unavailable resources are excluded.
```

---

## Phase 5 — Routing Engine

Build:

- graph creation;
- blocked-road handling;
- Dijkstra or A*;
- route metrics.

Acceptance:

```text
Blocked roads are avoided.
Same input returns same route.
Distance and ETA are deterministic.
```

---

## Phase 6 — Gemini Response Planning

Build:

- grounded planning prompt;
- structured response;
- factual validation;
- response explanation.

Acceptance:

```text
Gemini uses only known resource IDs.
Every recommendation is linked to evidence.
```

---

## Phase 7 — End-to-End Integration

Connect:

```text
Frontend
→ Backend
→ Gemini
→ Resources
→ Routing
→ Gemini
→ Frontend
```

Acceptance:

```text
Hero flood scenario completes successfully.
Map updates.
Recommendation appears.
```

---

## Phase 8 — What-If Simulation

Build:

```text
Close Road-07
→ recalculate
→ compare
→ explain
```

Acceptance:

```text
Before/after values are visible.
Original state is not permanently changed.
```

---

## Phase 9 — Polish

Add:

- responsive design;
- loading skeletons;
- errors;
- empty states;
- animations only where useful;
- clear Gemini attribution;
- demo reset;
- seeded scenario button.

---

# 23. Security Rules

## Never expose the Gemini API key in frontend code.

Correct:

```text
Browser
   ↓
Backend
   ↓
Gemini API
```

Incorrect:

```text
Browser
   ↓
Gemini API directly with secret key
```

Use environment secrets.

Example:

```env
GEMINI_API_KEY=replace_me
```

Do not commit secrets to GitHub.

---

# 24. AI Safety Rules

The prototype must not:

- provide medical diagnosis;
- authorize prescriptions;
- automatically dispatch ambulances;
- make irreversible municipal decisions;
- invent pharmacy inventory;
- invent road status;
- invent volunteers;
- fabricate coordinates;
- claim real emergency integration unless it actually exists.

The product should be presented as:

> Decision support and neighborhood coordination.

Not:

> Autonomous emergency management.

---

# 25. Error Handling

## Gemini Unavailable

Display:

```text
AI analysis is currently unavailable.
Verified neighborhood data is still accessible.
```

---

## Invalid Gemini Response

Process:

```text
Validate response
      ↓
Invalid
      ↓
Retry once
      ↓
Still invalid
      ↓
Show manual review state
```

---

## No Safe Route

Display:

```text
No safe route found in the current neighborhood model.
```

Do not invent one.

---

## No Available Volunteer

Display:

```text
No verified volunteer is currently available.
Showing alternative resources.
```

---

# 26. Demo Data Strategy

For Round 2, use synthetic neighborhood data.

Suggested dataset:

```text
15 road segments
6 neighborhood nodes
3 pharmacies
2 clinics
2 community halls
8 volunteers
1 school
1 market
3 incidents
2 alternate routes
1 initially blocked road
```

This keeps the demo reliable and avoids unsupported real-world claims.

---

# 27. Deployment Strategy

Recommended flow:

```text
Google AI Studio
        ↓
GitHub Repository
        ↓
Cloud Run Deployment
        ↓
Public Demo URL
```

Keep separate environments where practical:

```text
development
staging
production/demo
```

---

# 28. Gemini Development Evidence

Since the project is being developed for the Gemini Fund My Crazy challenge, keep a clear development trail.

Suggested folder:

```text
competition-proof/
│
├── 01-gemini-brainstorming/
├── 02-gemini-architecture/
├── 03-gemini-ui-design/
├── 04-gemini-api-integration/
├── 05-gemini-debugging/
├── 06-gemini-visual-generation/
├── 07-prototype-screenshots/
└── 08-demo-video/
```

Preserve:

- Gemini prompt screenshots;
- Gemini conversation history;
- architecture iterations;
- UI generation prompts;
- debugging sessions;
- Gemini API integration evidence;
- generated visual evidence;
- final prototype screenshots.

---

# 29. Build Priority

If time becomes limited, preserve this order:

```text
1. Hero flood + medicine scenario
2. Real Gemini multimodal analysis
3. Neighborhood demo data
4. Resource search
5. Deterministic route calculation
6. Gemini response plan
7. Map visualization
8. Explainability panel
9. What-if simulation
10. UI polish
11. Everything else
```

Anything after item 9 is optional if the core demo is not yet stable.

---

# 30. Definition of Done

The prototype is ready when a judge can:

1. open the application;
2. understand its purpose within a few seconds;
3. submit the flood + medicine incident;
4. upload an image;
5. see Gemini interpret the report;
6. see verified neighborhood resources;
7. see a deterministic safe route;
8. see a Gemini-generated response recommendation;
9. understand why that recommendation was made;
10. run one what-if road closure;
11. see the route and timing change;
12. reset the demo.

---

# 31. Final Architecture Summary

```text
                  FRONTEND
              React + TypeScript
                     │
                     │
                     ▼
                 API LAYER
              Node + TypeScript
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
       Gemini    Resources    Routing
       Service    Service     Service
          │          │          │
          └──────────┼──────────┘
                     │
                     ▼
             Response Planner
                     │
                     ▼
                 Frontend
                     │
              ┌──────┴──────┐
              ▼             ▼
             Map       Explanation
              │
              ▼
          Simulation
```

---

# 32. Core Principle

The architecture should preserve this rule:

> **Gemini understands and reasons. Deterministic services verify and calculate. Humans remain accountable.**

That principle should be visible in both the implementation and the final demo.
