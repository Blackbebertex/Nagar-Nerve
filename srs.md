# Software Requirements Specification (SRS)

# Nagar Nerve

## Gemini-Powered Neighborhood Intelligence & Response Network

**Document Type:** Software Requirements Specification  
**Product Stage:** Fund My Crazy — Prototype / Round 2  
**Version:** 1.0  
**Status:** Draft for Implementation  
**System Type:** Full-stack web application  
**Primary Stack:** React + TypeScript frontend, Node.js + TypeScript backend, Gemini API, deterministic routing and resource services

---

# 1. Introduction

## 1.1 Purpose

This Software Requirements Specification defines the functional, technical, interface, data, AI, security, reliability, and quality requirements for the Nagar Nerve prototype.

The purpose of this document is to provide a testable implementation reference for:

- frontend development;
- backend development;
- Gemini integration;
- routing logic;
- neighborhood resource management;
- simulation;
- role-based user experiences;
- deployment;
- testing;
- demo readiness.

The SRS converts the business requirements into precise software behavior.

---

## 1.2 Product Summary

Nagar Nerve is a neighborhood intelligence and coordination platform.

It enables a user to report a local disruption using text and optional image input. Gemini interprets the report. Deterministic application services then retrieve trusted neighborhood resources and calculate routes. Gemini uses those verified facts to generate an explainable response recommendation.

The system follows the principle:

> **Gemini understands and reasons. Deterministic systems verify and calculate. Humans remain accountable.**

---

## 1.3 Primary Demo Scenario

The prototype must support the following hero scenario:

> A road near Community Hall A is flooded while an elderly resident needs medicine.

Expected system behavior:

```text
Citizen Report
    ↓
Gemini Incident Understanding
    ↓
Validated Structured Classification
    ↓
Neighborhood Resource Lookup
    ↓
Safe Route Calculation
    ↓
Gemini Response Plan
    ↓
Map Visualization
    ↓
Explainability Panel
    ↓
What-If Road Closure Simulation
```

---

# 2. Scope

## 2.1 In Scope

The MVP shall include:

- citizen incident reporting;
- optional image upload;
- location context;
- Gemini multimodal analysis;
- structured incident classification;
- seeded fictional neighborhood data;
- deterministic resource search;
- deterministic route calculation;
- Gemini response-plan generation;
- map visualization;
- explainability;
- incident timeline;
- role-based views;
- volunteer accept/decline flow;
- what-if road closure simulation;
- demo reset;
- error/fallback states;
- server-side Gemini API integration.

---

## 2.2 Out of Scope

The MVP shall not include:

- real emergency dispatch;
- automatic ambulance dispatch;
- police dispatch;
- medical diagnosis;
- real prescription authorization;
- real patient data;
- real pharmacy stock claims;
- real municipal command integration;
- production-scale user identity verification;
- payments;
- facial recognition;
- mass surveillance;
- autonomous city control;
- autonomous irreversible actions;
- scientifically validated disaster prediction.

---

# 3. System Goals

The system shall demonstrate that:

1. a local incident can be understood from multimodal input;
2. Gemini can convert unstructured user input into structured incident information;
3. neighborhood resources can be retrieved from trusted application data;
4. routes can be calculated without relying on Gemini;
5. recommendations can be generated from verified facts;
6. recommendations can be explained;
7. users can see the result on a map;
8. changing conditions can be simulated;
9. stakeholders can interact with the same system through role-specific views.

---

# 4. Definitions and Terminology

## Incident

A reported local disruption.

Examples:

- flooding;
- road closure;
- access disruption.

## Resource

A useful neighborhood entity.

Examples:

- pharmacy;
- clinic;
- volunteer;
- community hall.

## Verified Fact

Information supplied by deterministic application data.

Example:

```text
Road-01 status = blocked
```

## Computed Result

Information calculated by deterministic software.

Example:

```text
Safe Route = 1.6 km
ETA = 8 min
```

## Gemini Recommendation

A natural-language or structured recommendation generated from validated facts and calculations.

## Simulation

A temporary hypothetical modification to system state that must not alter the original live/demo state.

## Digital Twin

The fictional neighborhood representation consisting of roads, nodes, resources, incidents, and statuses.

---

# 5. User Roles

The system shall support the following roles.

## 5.1 Citizen

Capabilities:

- view nearby incidents;
- report incident;
- upload image;
- view incident status;
- view basic guidance;
- view safe route where applicable.

---

## 5.2 Volunteer

Capabilities:

- manage availability;
- view relevant assistance request;
- accept request;
- decline request;
- view route;
- view task status.

---

## 5.3 Coordinator

Capabilities:

- view all neighborhood incidents;
- inspect Gemini analysis;
- view verified resources;
- view route calculations;
- view response recommendations;
- review incident timeline;
- coordinate resource actions;
- run limited simulation;
- view explainability information.

---

## 5.4 Planner

Capabilities:

- inspect neighborhood state;
- run what-if simulations;
- compare before/after states;
- view Gemini simulation explanation.

---

## 5.5 Administrator

Capabilities:

- view system state;
- reset demo;
- manage demo data;
- manage role configuration;
- review logs where enabled.

---

# 6. Role Permissions

| Capability | Citizen | Volunteer | Coordinator | Planner | Admin |
|---|---:|---:|---:|---:|---:|
| Submit incident | Yes | Yes | Yes | No | Yes |
| Upload image | Yes | Yes | Yes | No | Yes |
| View own incident | Yes | Yes | Yes | No | Yes |
| View all incidents | Limited | Limited | Yes | Yes | Yes |
| Accept volunteer request | No | Yes | No | No | No |
| View full resources | No | Limited | Yes | Yes | Yes |
| View Gemini analysis | Limited | Task-specific | Yes | Yes | Yes |
| Coordinate response | No | No | Yes | No | Yes |
| Run simulation | No | No | Limited | Yes | Yes |
| Reset demo | No | No | No | No | Yes |
| Switch demo role | Demo only | Demo only | Demo only | Demo only | Yes |

---

# 7. Product Architecture

## 7.1 Logical Architecture

```text
                    FRONTEND
              React + TypeScript
                       │
                       ▼
                   API LAYER
              Node.js + TypeScript
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
      Gemini       Resource      Routing
      Service       Service      Service
          │            │            │
          └────────────┼────────────┘
                       │
                       ▼
                Response Planner
                       │
                       ▼
                  API Response
                       │
               ┌───────┴────────┐
               ▼                ▼
              Map          Explainability
                                │
                                ▼
                           Simulation
```

---

# 8. Technology Requirements

## Frontend

Recommended:

- React;
- TypeScript;
- Tailwind CSS;
- shadcn/ui or equivalent;
- Lucide or Material icons;
- MapLibre or Leaflet.

## Backend

Recommended:

- Node.js;
- TypeScript;
- route handlers or server APIs;
- schema validation library.

## AI

- Google Gemini API;
- multimodal input;
- structured outputs where supported;
- server-side API usage only.

## Data

MVP:

- JSON demo data.

Optional:

- Firestore.

## Deployment

Preferred:

```text
Google AI Studio
→ GitHub
→ Google Cloud Run
```

---

# 9. Functional Requirements

# 9.1 Incident Reporting

## FR-INC-001

The system shall allow a Citizen to submit a text incident report.

### Input

```text
description
location reference
optional image
```

### Acceptance

A valid text report must be transmitted to the backend.

---

## FR-INC-002

The incident description shall be required.

Minimum validation:

```text
non-empty
trim whitespace
maximum configured length
```

---

## FR-INC-003

The system shall allow an optional image upload.

Supported prototype formats:

- JPG;
- JPEG;
- PNG.

---

## FR-INC-004

The backend shall validate:

- MIME type;
- file size;
- upload presence;
- malformed file input.

---

## FR-INC-005

The system shall allow a location reference.

Example:

```text
Community Hall A
```

The MVP may use selectable predefined neighborhood locations.

---

## FR-INC-006

On successful submission, the system shall create an incident record.

Minimum fields:

```text
id
description
location_reference
status
created_at
```

Initial status:

```text
reported
```

---

# 9.2 Gemini Incident Analysis

## FR-AI-001

The backend shall send the citizen report to Gemini.

When an image is present, the request shall contain:

```text
text
image
location context
classification instructions
```

---

## FR-AI-002

Gemini shall return structured incident analysis.

Expected schema:

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

---

## FR-AI-003

The backend shall validate Gemini output before use.

Validation shall include:

- required fields;
- supported incident types;
- supported severity values;
- valid confidence range;
- array shape;
- string lengths.

---

## FR-AI-004

If Gemini output fails validation, the backend may retry once.

If the second response fails:

```text
status = needs_review
```

The frontend shall show:

```text
AI response could not be validated.
Please review the incident manually.
```

---

## FR-AI-005

Gemini shall not:

- diagnose medical conditions;
- invent addresses;
- invent resources;
- invent inventory;
- invent road states;
- generate authoritative coordinates.

---

## FR-AI-006

The system shall distinguish direct observation from inference.

Example:

```text
Observation:
Standing water visible on road.

Inference:
Road may be unsafe to use.
```

---

# 9.3 Resource Lookup

## FR-RES-001

The Resource Service shall retrieve resources from seeded neighborhood data.

Supported MVP types:

- pharmacy;
- clinic;
- volunteer;
- community hall.

---

## FR-RES-002

The system shall support filtering resources by availability.

Example:

```text
status = open
available = true
verified = true
```

---

## FR-RES-003

The system shall never return unknown resource IDs.

---

## FR-RES-004

The system shall support retrieving the nearest relevant resources based on the fictional neighborhood model.

---

## FR-RES-005

The system shall support demo pharmacy inventory.

All inventory data must be marked internally and externally as synthetic/demo data.

---

# 9.4 Routing

## FR-ROUTE-001

The system shall model neighborhood roads as a graph.

Each road edge shall include:

```text
id
from
to
distance_m
travel_time_s
status
```

---

## FR-ROUTE-002

Supported road statuses:

```text
open
blocked
degraded
```

---

## FR-ROUTE-003

Blocked roads shall be excluded from safe route calculation.

---

## FR-ROUTE-004

The Routing Service shall calculate paths using a deterministic algorithm.

Recommended:

- Dijkstra;
- A*.

Gemini shall not calculate shortest paths.

---

## FR-ROUTE-005

The route result shall include:

```text
route_id
nodes
road_ids
distance_m
estimated_time_s
```

---

## FR-ROUTE-006

The same graph state and same route request shall return materially identical route results.

---

## FR-ROUTE-007

If no route exists, the service shall return a typed no-route result.

Frontend message:

```text
No safe route found in the current neighborhood model.
```

---

# 9.5 Response Planning

## FR-PLAN-001

The backend shall generate the response plan only after:

- incident analysis is validated;
- resources are retrieved;
- route calculation completes.

---

## FR-PLAN-002

Gemini shall receive only validated context.

Example:

```text
Validated incident
Verified resources
Computed route
Safety constraints
```

---

## FR-PLAN-003

Expected response-plan schema:

```json
{
  "summary": "Use the available verified volunteer through Route B.",
  "actions": [
    {
      "order": 1,
      "action": "avoid_road",
      "target_id": "road-01",
      "reason": "Road is marked blocked."
    }
  ],
  "fallback": {
    "type": "clinic",
    "target_id": "clinic-01"
  },
  "escalation": {
    "required": false,
    "reason": null
  }
}
```

---

## FR-PLAN-004

Every `target_id` returned by Gemini shall be validated against application data.

Unknown target IDs shall invalidate the plan.

---

## FR-PLAN-005

Gemini shall never claim an action was executed unless system state confirms execution.

Allowed language:

```text
Recommended
Suggested
Available option
```

Disallowed unsupported language:

```text
Volunteer dispatched
Medicine delivered
Ambulance sent
```

unless application state explicitly confirms it.

---

# 9.6 Explainability

## FR-EXP-001

The UI shall display three distinct categories:

```text
VERIFIED
COMPUTED
GEMINI RECOMMENDATION
```

---

## FR-EXP-002

Verified information shall originate from application data.

---

## FR-EXP-003

Computed information shall originate from deterministic logic.

---

## FR-EXP-004

Gemini recommendation shall be visually labeled as AI-generated recommendation.

---

## FR-EXP-005

The UI shall not expose private hidden chain-of-thought.

It may display concise evidence-backed reasons.

Example:

```text
Selected because:
Volunteer-07 is verified and available.
Route B avoids Road-01.
```

---

# 9.7 Map

## FR-MAP-001

The map shall display the fictional neighborhood.

---

## FR-MAP-002

The map shall display:

- road segments;
- incidents;
- pharmacies;
- clinics;
- community halls;
- volunteers.

---

## FR-MAP-003

The map shall use semantic visual states.

Recommended:

```text
Red    = blocked / critical
Blue   = selected route
Green  = available resource
Amber  = warning / degraded
```

---

## FR-MAP-004

Selected routes shall be visually distinct.

---

## FR-MAP-005

Selecting a resource marker shall display basic resource information.

---

# 9.8 Incident Timeline

## FR-TIME-001

An incident shall support statuses such as:

```text
reported
analyzing
analyzed
resources_identified
route_calculated
plan_ready
coordinating
resolved
needs_review
```

---

## FR-TIME-002

The UI shall show a simplified timeline.

---

# 9.9 Volunteer Interaction

## FR-VOL-001

A volunteer shall be able to set availability.

---

## FR-VOL-002

The system shall only consider volunteers where:

```text
verified = true
available = true
```

---

## FR-VOL-003

A volunteer request shall show:

- request type;
- general location;
- pickup location;
- destination;
- distance;
- estimated time;
- safe route.

---

## FR-VOL-004

The volunteer shall have:

```text
Accept
Decline
```

actions.

---

## FR-VOL-005

The system shall not automatically assign a volunteer without consent.

---

# 9.10 What-If Simulation

## FR-SIM-001

The system shall support a road-closure simulation.

Example:

```text
Close Road-07
```

---

## FR-SIM-002

Simulation shall use a cloned state.

The original neighborhood state shall remain unchanged.

---

## FR-SIM-003

The simulation shall recalculate:

- route;
- distance;
- travel time;
- affected resources.

---

## FR-SIM-004

The simulation response shall include before/after results.

Example:

```json
{
  "before": {
    "time_min": 8,
    "distance_km": 1.6
  },
  "after": {
    "time_min": 13,
    "distance_km": 2.5
  }
}
```

---

## FR-SIM-005

Gemini may generate a plain-language explanation of the simulation.

Gemini shall not modify the calculated values.

---

## FR-SIM-006

The UI shall visibly display:

```text
SIMULATION MODE
```

and state that current demo state has not been modified.

---

## FR-SIM-007

A Reset Simulation control shall restore the non-simulated view.

---

# 9.11 Demo Reset

## FR-RESET-001

The Admin/demo interface shall provide:

```text
Reset Demo
```

---

## FR-RESET-002

Reset shall restore:

- roads;
- resources;
- volunteers;
- incidents;
- simulation state;
- selected routes.

---

## FR-RESET-003

Reset shall produce the same initial hero-scenario state.

---

# 9.12 Role Switcher

## FR-ROLE-001

The prototype shall provide a demo role switcher.

Options:

```text
Citizen
Volunteer
Coordinator
Planner
```

---

## FR-ROLE-002

The switcher shall be clearly labeled as a demo feature.

---

# 10. API Requirements

# 10.1 Analyze Incident

```http
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

# 10.2 Analyze Image

```http
POST /api/incidents/analyze-image
```

Content type:

```text
multipart/form-data
```

Fields:

```text
image
text
location
```

---

# 10.3 Neighborhood State

```http
GET /api/neighborhood/state
```

Response shall include:

```text
roads
nodes
resources
incidents
metadata
```

---

# 10.4 Road Closure Simulation

```http
POST /api/simulations/road-closure
```

Request:

```json
{
  "road_id": "road-07"
}
```

---

# 10.5 Reset Demo

```http
POST /api/demo/reset
```

---

# 10.6 Health

```http
GET /health
```

Expected response:

```json
{
  "status": "ok"
}
```

---

# 11. Data Model Requirements

# 11.1 Road

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

---

# 11.2 Node

```json
{
  "id": "node-01",
  "name": "Community Junction",
  "lat": 18.5204,
  "lon": 73.8567
}
```

Coordinates may be synthetic.

---

# 11.3 Pharmacy

```json
{
  "id": "pharmacy-01",
  "type": "pharmacy",
  "name": "GreenCare Pharmacy",
  "lat": 18.5204,
  "lon": 73.8567,
  "status": "open",
  "inventory": [
    "paracetamol",
    "insulin-demo",
    "blood-pressure-demo"
  ]
}
```

---

# 11.4 Volunteer

```json
{
  "id": "volunteer-07",
  "type": "volunteer",
  "name": "Volunteer 07",
  "lat": 18.522,
  "lon": 73.858,
  "available": true,
  "verified": true,
  "vehicle": "bicycle"
}
```

---

# 11.5 Clinic

```json
{
  "id": "clinic-01",
  "type": "clinic",
  "name": "Community Clinic",
  "status": "open"
}
```

---

# 11.6 Incident

```json
{
  "id": "inc-1001",
  "type": "flooding",
  "severity": "high",
  "lat": 18.5211,
  "lon": 73.8574,
  "status": "active",
  "description": "Road near Community Hall A is flooded"
}
```

---

# 11.7 Response Plan

```json
{
  "summary": "Use Volunteer-07 via Route B.",
  "actions": [],
  "fallback": {},
  "escalation": {}
}
```

---

# 12. Seed Data Requirements

The MVP should provide one coherent fictional neighborhood.

Recommended:

```text
12–20 road segments
6 community nodes
3 pharmacies
2 clinics
2 community halls
8 volunteers
1 school
1 market
3 seeded incidents
2 alternative routes
1 blocked road
```

Required hero-state data:

```text
Road-01 = blocked
Community Hall A = near incident
Pharmacy-01 = open
Volunteer-07 = available
Clinic-01 = open
Road-07 = open alternate road
```

---

# 13. UI Requirements

# 13.1 Landing Screen

The landing screen shall display:

- Nagar Nerve name;
- tagline;
- Report an Issue action;
- Enter Command Center action;
- subtle neighborhood visual.

---

# 13.2 Citizen Home

Must prioritize:

```text
Report an Issue
Nearby incidents
Safe routes
Updates
```

---

# 13.3 Citizen Report

Must contain:

- text area;
- image upload;
- location;
- submit button.

---

# 13.4 Coordinator Command Center

Recommended layout:

```text
┌──────────────┬────────────────────────────┬───────────────┐
│ INCIDENTS    │            MAP             │ RESPONSE      │
│              │                            │               │
│              │                            │               │
└──────────────┴────────────────────────────┴───────────────┘
│ VERIFIED          COMPUTED          GEMINI                │
└────────────────────────────────────────────────────────────┘
```

---

# 13.5 Volunteer Task Screen

Must show:

- task summary;
- pickup;
- destination;
- distance;
- ETA;
- route;
- Accept;
- Decline.

---

# 13.6 Simulation Screen

Must show:

```text
selected change
before values
after values
map
Gemini explanation
reset action
```

---

# 14. UX Requirements

## UX-001

Critical information shall be understandable within approximately five seconds.

---

## UX-002

The system shall use progressive disclosure.

Default view:

```text
summary first
details second
technical detail last
```

---

## UX-003

The system shall use minimal primary navigation.

Coordinator:

```text
Overview
Incidents
Map
Resources
Simulations
```

Citizen mobile:

```text
Home
Map
Report
Updates
```

---

## UX-004

Users shall not be required to understand internal AI terminology.

---

## UX-005

Icons shall not be the only status indicator.

Example:

```text
● BLOCKED
```

rather than only a red dot.

---

# 15. Loading Requirements

When a report is processed, the UI should display stages.

Example:

```text
Understanding report...
Checking nearby resources...
Calculating safe route...
Preparing recommendation...
```

---

# 16. Error Handling Requirements

# 16.1 Gemini Unavailable

The system shall display:

```text
AI analysis is currently unavailable.
Verified neighborhood data is still accessible.
```

---

# 16.2 Invalid Model Output

The backend shall reject the output.

After one failed retry:

```text
AI response could not be validated.
Please review the incident manually.
```

---

# 16.3 No Safe Route

Display:

```text
No safe route found in the current neighborhood model.
```

---

# 16.4 No Volunteer

Display:

```text
No verified volunteer is currently available.
Showing alternative resources.
```

---

# 16.5 No Relevant Resource

The application shall return an explicit empty/alternative state rather than inventing a resource.

---

# 17. Security Requirements

## SEC-001

The Gemini API key shall exist only in server-side secrets.

---

## SEC-002

The frontend shall not contain embedded production secrets.

---

## SEC-003

`.env` files containing credentials shall not be committed.

---

## SEC-004

Uploaded file type and size shall be validated.

---

## SEC-005

Request payload size shall be limited.

---

## SEC-006

User-generated text shall be safely rendered.

---

## SEC-007

Secrets shall not be written to application logs.

---

## SEC-008

Internal prompts and secret configuration shall not be exposed through frontend APIs.

---

# 18. Privacy Requirements

## PRI-001

The prototype shall minimize personal data.

---

## PRI-002

Synthetic identities shall be used for volunteers and demo residents.

---

## PRI-003

The system shall not store medical histories.

---

## PRI-004

Volunteer views shall receive only task-relevant information.

---

## PRI-005

Exact personal information shall not be displayed unless necessary for the demonstrated workflow.

---

# 19. AI Safety Requirements

## AI-SAFE-001

The system shall not provide medical diagnosis.

---

## AI-SAFE-002

The system shall not authorize prescription medicine.

---

## AI-SAFE-003

The system shall not automatically dispatch emergency services.

---

## AI-SAFE-004

The system shall not claim resources exist unless they are present in application data.

---

## AI-SAFE-005

The system shall not use model-generated coordinates as authoritative coordinates.

---

## AI-SAFE-006

The system shall label recommendations as recommendations.

---

## AI-SAFE-007

Low-confidence interpretations shall be surfaced as uncertain.

Suggested prototype rules:

```text
>= 0.80    normal recommendation

0.60–0.79  recommendation + uncertainty notice

< 0.60     review / clarification state
```

These thresholds are prototype UX settings only.

---

# 20. Accessibility Requirements

## ACC-001

The application should support keyboard navigation.

---

## ACC-002

Interactive targets should have accessible labels.

---

## ACC-003

Text shall maintain readable contrast.

---

## ACC-004

Color shall not be the sole carrier of status.

---

## ACC-005

Primary touch targets shall be large enough for mobile interaction.

---

## ACC-006

Reduced-motion preferences should be respected.

---

## ACC-007

Critical instructions shall use plain language.

---

# 21. Performance Requirements

Prototype targets:

| Metric | Target |
|---|---:|
| Initial load | < 3 s |
| Resource query | < 100 ms |
| Local route calculation | < 100 ms |
| Cached UI interaction | < 300 ms |
| Gemini incident classification | < 8 s typical |
| Gemini plan generation | < 8 s typical |
| Hero scenario end-to-end | < 15 s typical |

These are prototype engineering goals, not service-level guarantees.

---

# 22. Reliability Requirements

## REL-001

Deterministic calculations shall remain reproducible.

---

## REL-002

The seeded hero scenario shall be repeatable after reset.

---

## REL-003

The frontend shall remain usable if Gemini is unavailable.

---

## REL-004

Simulation state shall not corrupt base state.

---

## REL-005

Invalid model responses shall not alter trusted system state.

---

# 23. Logging Requirements

The backend may log:

```text
request timestamp
incident id
service name
validation status
route calculation status
Gemini request success/failure
simulation action
```

The backend shall not log:

```text
API keys
secret configuration
unnecessary personal data
full sensitive uploads
```

---

# 24. Observability Requirements

Prototype observability should support:

- backend health;
- API failures;
- Gemini failures;
- validation failures;
- route errors;
- demo reset success/failure.

---

# 25. Test Requirements

# 25.1 Unit Tests

Must cover:

- road graph creation;
- Dijkstra/A* result;
- blocked-road exclusion;
- nearest-resource logic;
- volunteer availability filter;
- schema validation;
- response-plan resource validation;
- simulation clone/reset.

---

# 25.2 AI Contract Tests

Use mocked Gemini responses.

Test:

- valid JSON;
- malformed JSON;
- missing field;
- unsupported incident type;
- low confidence;
- invented resource ID;
- invalid severity;
- empty observations.

---

# 25.3 Integration Tests

Hero happy path:

```text
Incident report
→ classification
→ resource lookup
→ route
→ response plan
→ frontend payload
```

---

# 25.4 Simulation Tests

Test:

```text
Road-07 closes
→ route changes
→ before/after values differ
→ original state remains unchanged
```

---

# 25.5 UI Tests

Verify:

- citizen can report incident;
- loading states appear;
- map renders;
- response card renders;
- role switcher works;
- volunteer can accept/decline;
- simulation banner appears;
- reset restores state.

---

# 26. API Validation Requirements

All API endpoints shall validate request inputs.

Validation errors should return:

```text
4xx response
structured error code
human-readable message
```

Example:

```json
{
  "error": "INVALID_INCIDENT",
  "message": "Incident description is required."
}
```

---

# 27. HTTP Error Guidance

Recommended:

```text
200 success
201 created
400 invalid request
404 resource not found
409 invalid state/conflict
413 file too large
415 unsupported file type
422 schema validation failure
500 internal service failure
503 Gemini/service unavailable
```

---

# 28. State Management Requirements

The frontend shall maintain:

- selected role;
- selected incident;
- map state;
- active route;
- current simulation;
- loading status;
- error status.

Trusted neighborhood data should be retrieved from the backend rather than duplicated as authoritative frontend state.

---

# 29. Simulation State Requirements

Base state:

```text
immutable during simulation
```

Simulation state:

```text
temporary clone
```

Required flow:

```text
Base State
   ↓ clone
Simulation State
   ↓ modify
Recalculate
   ↓
Compare
   ↓
Discard / Reset
```

---

# 30. File Upload Requirements

The application shall:

- accept supported images;
- reject unsupported files;
- enforce size limits;
- show preview;
- allow removal before submit;
- handle failed upload gracefully.

---

# 31. Gemini Prompt Requirements

Incident prompt must instruct Gemini to:

- use only provided text/image evidence;
- return structured output;
- distinguish observation from inference;
- avoid medical diagnosis;
- reduce confidence when uncertain;
- not invent local facts.

Response-plan prompt must instruct Gemini to:

- use only validated facts;
- never invent resources;
- never claim action execution;
- explain recommendation using supplied evidence;
- return structured output.

---

# 32. Gemini Service Interface

Recommended internal service contract:

```text
GeminiService
├── analyzeIncident(input)
├── analyzeIncidentImage(input)
├── generateResponsePlan(context)
└── explainSimulation(context)
```

---

# 33. Resource Service Interface

Recommended:

```text
ResourceService
├── getResources()
├── findNearbyPharmacies()
├── findOpenClinics()
├── findAvailableVolunteers()
├── findCommunitySpaces()
└── validateResourceIds()
```

---

# 34. Routing Service Interface

Recommended:

```text
RoutingService
├── buildGraph()
├── findRoute()
├── calculateDistance()
├── calculateTravelTime()
└── applyRoadState()
```

---

# 35. Simulation Service Interface

Recommended:

```text
SimulationService
├── cloneState()
├── closeRoad()
├── recalculate()
├── compare()
└── reset()
```

---

# 36. Incident Service Interface

Recommended:

```text
IncidentService
├── createIncident()
├── getIncident()
├── updateIncidentStatus()
├── listIncidents()
└── resetIncidents()
```

---

# 37. Frontend Component Requirements

Recommended major components:

```text
MapView
IncidentComposer
IncidentList
IncidentCard
IncidentDetail
ResponsePlan
ResourcePanel
ReasoningPanel
SimulationPanel
VolunteerTaskCard
IncidentTimeline
RoleSwitcher
DemoReset
```

---

# 38. Responsive Requirements

Desktop:

```text
Sidebar + Map + Context Panel
```

Tablet:

```text
Collapsible list
Map
Expandable panel
```

Mobile:

```text
Full-width content
Map
Bottom sheet
Bottom navigation
```

Citizen and volunteer workflows should be mobile-first.

Coordinator and Planner workflows may be desktop-first.

---

# 39. User Feedback Requirements

Actions should return visible feedback.

Examples:

```text
Incident submitted
Volunteer request accepted
Simulation started
Simulation reset
Demo restored
```

Use toast/status messages sparingly.

---

# 40. Design Requirements

The UI should use:

- restrained neutral background;
- blue primary;
- green success/resource availability;
- amber warning;
- red critical only;
- rounded cards;
- clear typography;
- subtle shadows;
- minimal gradients;
- consistent iconography.

Avoid:

- cyberpunk aesthetic;
- excessive glass effects;
- dense dashboards;
- unnecessary charts;
- decorative animation overload.

---

# 41. Security Architecture

Correct pattern:

```text
Browser
   ↓
Backend API
   ↓
Gemini API
```

Disallowed pattern:

```text
Browser
   ↓
Gemini API with secret key
```

---

# 42. Deployment Requirements

A demo deployment shall:

- start without manual repair;
- expose a public HTTPS URL;
- load seeded data;
- support Gemini integration;
- support fallback state;
- support demo reset;
- keep credentials server-side.

Preferred deployment path:

```text
Google AI Studio
→ GitHub
→ Cloud Run
```

---

# 43. Environment Variables

Example:

```env
GEMINI_API_KEY=replace_me
APP_ENV=development
```

Optional:

```env
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

No secret shall be committed to source control.

---

# 44. Demo Requirements

The demonstration shall support:

```text
1. Open command center
2. Switch to Citizen
3. Submit flood report
4. Upload image
5. Show Gemini analysis
6. Show resources
7. Show route
8. Show Gemini recommendation
9. Switch to Coordinator
10. Show explainability
11. Switch to Volunteer
12. Show assistance task
13. Switch to Planner
14. Close Road-07
15. Show before/after
16. Reset
```

---

# 45. Hero Scenario Expected Data

Input:

```text
The road near Community Hall A is flooded
and my grandfather needs medicine.
```

Expected verified state:

```text
Road-01 = blocked
Pharmacy-01 = open
Volunteer-07 = available
Clinic-01 = open
Road-07 = open
```

Expected computed state:

```text
Route = Route B
Distance ≈ 1.6 km
ETA ≈ 8 min
```

Expected recommendation:

```text
Use Volunteer-07 through Route B to access Pharmacy-01.
```

---

# 46. What-If Expected Result

Simulation:

```text
Close Road-07
```

Expected behavior:

```text
original route invalidated
new route calculated
ETA increases
before/after displayed
simulation clearly labeled
base state unchanged
```

Target demo values may be:

```text
Before: 8 min
After: 13 min
```

---

# 47. Acceptance Criteria

The MVP shall be accepted when:

## AC-001

A citizen can create an incident.

## AC-002

An image can be uploaded.

## AC-003

Gemini returns validated structured classification.

## AC-004

Resource lookup uses seeded data only.

## AC-005

Blocked roads are excluded.

## AC-006

A safe route is calculated.

## AC-007

Route metrics are shown.

## AC-008

Gemini produces a grounded response plan.

## AC-009

Unknown Gemini resource IDs are rejected.

## AC-010

The map displays the route and resources.

## AC-011

Facts, computed values, and recommendations are separated.

## AC-012

Volunteer Accept and Decline actions exist.

## AC-013

The road-closure simulation changes results.

## AC-014

Simulation does not alter base state.

## AC-015

Demo reset restores seed state.

## AC-016

No Gemini key is visible in frontend code.

## AC-017

The prototype shows a non-emergency-service disclaimer.

## AC-018

A full demo can be performed reliably.

---

# 48. Traceability Matrix

| Business Goal | Software Requirement |
|---|---|
| Understand incidents | FR-AI-001 to FR-AI-006 |
| Connect resources | FR-RES-001 to FR-RES-005 |
| Calculate safe routes | FR-ROUTE-001 to FR-ROUTE-007 |
| Generate response plan | FR-PLAN-001 to FR-PLAN-005 |
| Explain decisions | FR-EXP-001 to FR-EXP-005 |
| Visualize neighborhood | FR-MAP-001 to FR-MAP-005 |
| Preserve human control | FR-VOL-005, AI safety requirements |
| Support future planning | FR-SIM-001 to FR-SIM-007 |
| Reliable demo | FR-RESET requirements, reliability requirements |
| Protect secrets | SEC-001 to SEC-008 |

---

# 49. Implementation Priority

Priority 1:

```text
Seed neighborhood
Citizen report
Gemini incident analysis
```

Priority 2:

```text
Resource lookup
Routing
Response planning
```

Priority 3:

```text
Map
Explainability
Coordinator view
```

Priority 4:

```text
Volunteer flow
Simulation
Role switcher
```

Priority 5:

```text
Responsive polish
Accessibility
Animations
Additional scenarios
```

---

# 50. Definition of Done

The software is considered ready for the prototype round when a fresh deployment can:

1. load the fictional neighborhood;
2. submit the hero incident;
3. upload a flood image;
4. obtain Gemini analysis;
5. validate structured AI output;
6. retrieve seeded resources;
7. calculate a deterministic route;
8. generate a grounded Gemini response plan;
9. visualize route/resources on a map;
10. show verified/computed/Gemini separation;
11. display a volunteer request;
12. accept or decline the request;
13. run the Road-07 closure simulation;
14. display before/after results;
15. explain the simulated impact;
16. reset to the original state;
17. complete the workflow without exposing secret credentials.

---

# 51. Core System Principle

All implementation decisions shall preserve this architecture rule:

```text
USER INPUT
    ↓
GEMINI INTERPRETATION
    ↓
SCHEMA VALIDATION
    ↓
DETERMINISTIC DATA + TOOLS
    ↓
GEMINI PLAN SYNTHESIS
    ↓
SCHEMA / RESOURCE VALIDATION
    ↓
HUMAN-READABLE UI
    ↓
HUMAN DECISION
```

The system must never blur the distinction between:

```text
what is known,
what is calculated,
and what Gemini recommends.
```

That separation is a core requirement of Nagar Nerve.
