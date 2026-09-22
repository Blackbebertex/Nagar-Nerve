# Business Requirements Document (BRD)

# Nagar Nerve

## Gemini-Powered Neighborhood Intelligence & Response Network

**Document Type:** Business Requirements Document  
**Product Stage:** Fund My Crazy — Prototype / Round 2  
**Version:** 1.0  
**Status:** Draft for Implementation  
**Primary Objective:** Define the business, user, operational, and product requirements for building and demonstrating the Nagar Nerve MVP.

---

# 1. Executive Summary

Nagar Nerve is a neighborhood-scale intelligence and coordination platform designed to help communities respond more effectively when local infrastructure or services are disrupted.

The platform addresses a common problem:

> Useful neighborhood resources already exist, but the information needed to coordinate them is fragmented.

A pharmacy may know its availability.  
A clinic may know whether it is open.  
A volunteer may know whether they are available.  
A road network may indicate whether a route is blocked.  
A citizen may report what is happening on the ground.

These signals usually exist separately.

Most civic systems follow a simple model:

```text
Report Problem
    ↓
Create Ticket
    ↓
Wait
```

Nagar Nerve proposes a different model:

```text
Understand
    ↓
Connect
    ↓
Coordinate
    ↓
Explain
    ↓
Simulate
```

Gemini acts as the multimodal understanding and reasoning layer, while deterministic application services remain responsible for verified facts, resource lookup, route calculation, system state, and simulation.

The prototype will demonstrate this through a controlled fictional neighborhood and one primary use case:

> A road near a community hall is flooded while an elderly resident requires medicine.

The system will analyze the report, retrieve relevant local resources, calculate a safe alternative route, generate an explainable response plan, visualize the result, and simulate what happens if conditions change.

---

# 2. Business Context

## 2.1 Current Situation

Urban and neighborhood systems increasingly generate useful information through:

- citizen reports;
- maps;
- road networks;
- local facilities;
- resource databases;
- volunteer networks;
- environmental signals;
- mobility data;
- local operational systems.

However, these systems commonly operate independently.

The challenge is not only collecting data.

The challenge is understanding:

```text
What happened?

What is affected?

What resources are available?

What can be done next?

Why is that action appropriate?
```

---

# 3. Business Problem

Neighborhood disruptions often create coordination problems even when useful local resources already exist.

Examples include:

- flooded roads;
- blocked access routes;
- heatwaves;
- clinic disruptions;
- medicine-access issues;
- local infrastructure failure;
- temporary road closures;
- public-event disruptions.

Current systems frequently stop at issue reporting.

This creates several business and user problems:

1. Citizens may not know what support is available.
2. Operators may need to inspect multiple disconnected systems.
3. Local resources may be underused.
4. Changing conditions may invalidate previously selected routes.
5. AI systems may generate recommendations without reliable grounding.
6. Resource information may be difficult to understand quickly.
7. Planning teams may have limited ability to simulate disruption scenarios.

---

# 4. Business Opportunity

Nagar Nerve creates a reusable intelligence layer between:

```text
People
+
Neighborhood Infrastructure
+
Local Resources
+
Verified Operational Data
+
Gemini Reasoning
```

The business opportunity is to transform fragmented neighborhood signals into:

- understandable incidents;
- coordinated resources;
- safe route options;
- explainable recommendations;
- scenario simulations.

The long-term opportunity extends beyond residential neighborhoods to:

- university campuses;
- industrial zones;
- public events;
- disaster-prone communities;
- transport hubs;
- smart-city districts;
- municipal service zones.

---

# 5. Product Vision

## Vision Statement

> Build a lightweight intelligence layer over neighborhood infrastructure so communities can understand disruptions, connect available resources, and coordinate safer responses.

## Core Metaphor

> A nervous system for the neighborhood.

Different parts of a neighborhood produce signals.

Nagar Nerve connects those signals and helps users understand what should happen next.

---

# 6. Product Positioning

## Nagar Nerve Is

```text
Neighborhood State
        +
Multimodal Incident Understanding
        +
Verified Resource Lookup
        +
Deterministic Route Calculation
        +
Gemini Response-Plan Synthesis
        +
Explainable Recommendations
        +
What-If Simulation
```

## Nagar Nerve Is Not

- a generic chatbot;
- a complaint-ticket portal;
- a healthcare application;
- a traffic-only application;
- an autonomous emergency-response system;
- a replacement for hospitals;
- a replacement for police;
- a replacement for emergency services;
- an autonomous municipal authority.

---

# 7. Business Objectives

The MVP must demonstrate that Nagar Nerve can:

## BO-01 — Understand Local Incidents

Interpret a citizen report using text and optional image input.

## BO-02 — Connect Incident Context to Verified Resources

Retrieve relevant roads, pharmacies, clinics, volunteers, and community spaces.

## BO-03 — Generate Safe, Grounded Recommendations

Use Gemini to generate response recommendations only after deterministic facts have been retrieved.

## BO-04 — Make Recommendations Explainable

Clearly separate:

- verified facts;
- computed results;
- Gemini recommendations.

## BO-05 — Visualize the Situation

Show incidents, resources, blocked roads, and recommended routes on a neighborhood map.

## BO-06 — Support Scenario Planning

Allow users to simulate at least one controlled disruption and compare before/after outcomes.

## BO-07 — Preserve Human Control

Important actions must remain decisions made by people.

## BO-08 — Demonstrate Meaningful Gemini Integration

Gemini must perform visible, useful reasoning rather than act as a decorative chatbot.

---

# 8. Success Criteria

The MVP will be considered successful when:

1. A judge understands the product's purpose within 10 seconds.
2. A citizen can submit the primary flood scenario.
3. Gemini successfully interprets text and image input.
4. Relevant neighborhood resources are retrieved from deterministic data.
5. A blocked road is excluded from route selection.
6. A valid alternative route is displayed.
7. Gemini generates a grounded response recommendation.
8. The user can see why the recommendation was produced.
9. One what-if scenario changes the calculated route or response metrics.
10. The original state can be restored.
11. The prototype works without using real patient or emergency-response data.
12. Gemini API credentials are not exposed to the frontend.

---

# 9. Scope

## 9.1 In Scope for MVP

### Incident Reporting

- text input;
- optional image upload;
- location reference;
- report submission;
- incident status display.

### Gemini Integration

- multimodal incident understanding;
- structured incident classification;
- response-plan synthesis;
- simulation explanation.

### Neighborhood Model

- fictional roads;
- fictional pharmacies;
- fictional clinics;
- fictional volunteers;
- fictional community halls;
- active incidents;
- resource availability.

### Routing

- road graph;
- blocked-road handling;
- deterministic route calculation;
- distance estimation;
- travel-time estimation.

### Response Coordination

- incident classification;
- resource identification;
- recommended route;
- recommended next step;
- fallback resource.

### Explainability

- facts;
- computed values;
- Gemini recommendation.

### Simulation

- road closure;
- before/after route comparison;
- before/after response-time comparison;
- Gemini explanation.

### User Experiences

- Citizen;
- Volunteer;
- Coordinator/Operator;
- Planner;
- lightweight Admin/demo controls.

---

# 10. Out of Scope for MVP

The following must not be implemented as production functionality:

- real emergency dispatch;
- automatic ambulance dispatch;
- police dispatch;
- medical diagnosis;
- prescription authorization;
- real patient records;
- real pharmacy inventory claims;
- real citizen identity verification;
- payment processing;
- city-wide deployment;
- predictive emergency forecasting presented as validated science;
- autonomous public-authority decisions;
- facial recognition;
- mass surveillance;
- irreversible actions initiated directly by Gemini.

---

# 11. Stakeholders

## 11.1 Citizen / Resident

### Goal

Report an incident and understand relevant guidance.

### Responsibilities

- submit accurate reports;
- optionally provide an image;
- confirm or select incident location;
- follow safe guidance;
- avoid treating AI output as emergency-service confirmation.

---

## 11.2 Vulnerable Resident / Caregiver

### Goal

Understand available assistance with minimum friction.

### Key Need

Simple, accessible interaction with limited disclosure of sensitive information.

---

## 11.3 Volunteer

### Goal

Receive and optionally accept appropriate local assistance requests.

### Responsibilities

- manage availability;
- review request;
- accept or decline;
- follow provided route;
- update task state where enabled.

### Business Rule

A volunteer must never be assigned without consent.

---

## 11.4 Community Coordinator

### Goal

Understand incidents and coordinate available neighborhood resources.

### Responsibilities

- review incidents;
- inspect recommendations;
- review verified facts;
- review routes;
- coordinate resources;
- monitor incident progress;
- escalate when needed.

---

## 11.5 Municipal / Campus / Operations User

### Goal

Monitor multiple incidents and operational conditions.

### Responsibilities

- oversee incidents;
- review resource state;
- inspect route changes;
- review unresolved issues;
- monitor operational performance.

For the MVP, this role may share the Coordinator interface.

---

## 11.6 Planner / Scenario Analyst

### Goal

Understand how neighborhood resilience changes when conditions change.

### Responsibilities

- run what-if simulations;
- compare before/after results;
- identify affected resources;
- study potential interventions.

---

## 11.7 Resource Provider

Examples:

- pharmacy;
- clinic;
- shelter;
- community hall.

### Goal

Provide accurate operational resource information.

For the MVP, all resource data is synthetic.

---

## 11.8 Platform Administrator

### Goal

Maintain application configuration and demo state.

### Responsibilities

- manage roles;
- manage demo resources;
- reset demo;
- review system state;
- manage configuration.

---

# 12. Stakeholder Permission Matrix

| Capability | Citizen | Volunteer | Coordinator | Planner | Admin |
|---|---:|---:|---:|---:|---:|
| Report incident | Yes | Yes | Yes | No | Yes |
| Upload image | Yes | Yes | Yes | No | Yes |
| View nearby incidents | Limited | Limited | Yes | Yes | Yes |
| View personal requests | Yes | Yes | Yes | No | Yes |
| Accept volunteer task | No | Yes | No | No | No |
| View full neighborhood resources | Limited | Limited | Yes | Yes | Yes |
| View Gemini recommendation | Limited | Task-specific | Yes | Yes | Yes |
| Coordinate response | No | No | Yes | No | Yes |
| Run simulation | No | No | Limited | Yes | Yes |
| Modify resource state | No | Limited | Limited | No | Yes |
| Manage users/roles | No | No | No | No | Yes |

---

# 13. Primary Business Use Case

## UC-01 — Flooding + Medicine Access

### Scenario

A citizen reports:

> "The road near Community Hall A is flooded and my grandfather needs medicine."

The citizen may upload a photograph showing standing water.

### Expected Flow

```text
Citizen Report
    ↓
Gemini Incident Understanding
    ↓
Backend Validation
    ↓
Resource Lookup
    ↓
Safe Route Calculation
    ↓
Gemini Response Plan
    ↓
Coordinator Review
    ↓
Map Visualization
    ↓
Optional Volunteer Request
    ↓
What-If Simulation
```

### Expected Result

The system should identify:

```text
Incident:
Flooding + medicine access

Verified:
Road-01 blocked
Pharmacy-01 open
Volunteer-07 available
Clinic-01 open

Computed:
Alternative route = Route B
Distance = 1.6 km
ETA = 8 min

Recommendation:
Use Volunteer-07 through Route B
to access Pharmacy-01.
```

---

# 14. Secondary Use Cases

## UC-02 — Flooded Road Near School

Identify alternative access routes and affected resources.

## UC-03 — Clinic Access Disruption

Identify accessible alternative clinics and routes.

## UC-04 — Pharmacy Access Disruption

Find another suitable pharmacy or coordination path.

## UC-05 — Community Hall as Assistance Point

Evaluate whether a community hall becomes useful when access changes.

## UC-06 — Public Event Disruption

Coordinate road closures and assistance locations.

## UC-07 — Campus Mode

Use campus roads, clinic, hostels, student volunteers, and assembly points.

## UC-08 — Industrial Zone Mode

Use internal access roads, first-aid points, safety teams, and assembly areas.

## UC-09 — Disaster Preparedness

Study which resources become inaccessible during repeated disruptions.

## UC-10 — What-If Planning

Simulate:

```text
What if Road-07 closes?
```

and compare neighborhood access before and after.

---

# 15. Business Workflow

## Live Incident Workflow

```text
1. Incident reported
2. Input validated
3. Gemini interprets incident
4. Classification validated
5. Neighborhood facts retrieved
6. Relevant resources identified
7. Route calculated
8. Gemini plan generated
9. Plan validated
10. UI displays evidence and recommendation
11. Human reviews / coordinates
12. Incident status updated
```

---

# 16. Business Rules

## BR-01

Gemini must not be treated as the source of truth for resource availability.

## BR-02

Road, clinic, pharmacy, volunteer, and community-space status must come from trusted application data.

## BR-03

Gemini must never generate authoritative geographic coordinates.

## BR-04

Gemini must never diagnose a medical condition.

## BR-05

Gemini must never claim an action was completed unless application state confirms it.

## BR-06

Gemini cannot directly execute irreversible high-impact actions.

## BR-07

A volunteer must explicitly accept a request.

## BR-08

Simulated state must be clearly separated from live/current state.

## BR-09

The prototype must clearly state that it is not an emergency service.

## BR-10

All AI-generated structured outputs must be validated before use.

## BR-11

If evidence is insufficient, the system must indicate uncertainty.

## BR-12

The system must not invent unavailable resources.

## BR-13

Synthetic data must be clearly identified as demo data.

## BR-14

The user interface must distinguish:

```text
Verified
Computed
Gemini
```

## BR-15

No sensitive personal information should be displayed unless operationally necessary.

---

# 17. Functional Requirements

## FR-01 — Incident Submission

The system shall allow a user to submit an incident using text.

## FR-02 — Image Upload

The system shall allow an optional incident image.

## FR-03 — Location Context

The system shall allow a neighborhood location reference.

## FR-04 — Multimodal Gemini Analysis

The backend shall send text and image context to Gemini.

## FR-05 — Structured Classification

Gemini output shall be converted into a validated structured incident classification.

## FR-06 — Incident Type

The system shall identify a supported incident category.

## FR-07 — Operational Severity

The system shall identify operational urgency without performing medical diagnosis.

## FR-08 — Resource Search

The system shall retrieve relevant neighborhood resources.

## FR-09 — Volunteer Search

The system shall identify available, verified volunteers.

## FR-10 — Pharmacy Search

The system shall identify available demo pharmacies.

## FR-11 — Clinic Search

The system shall identify available demo clinics.

## FR-12 — Road-State Retrieval

The system shall retrieve current demo road status.

## FR-13 — Safe Route Calculation

The routing engine shall calculate a route excluding blocked roads.

## FR-14 — Route Metrics

The system shall provide route distance and estimated travel time.

## FR-15 — Response Plan

Gemini shall generate a recommendation using only validated context.

## FR-16 — Recommendation Validation

The system shall reject recommendations containing unknown resource IDs.

## FR-17 — Map Visualization

The frontend shall display relevant incidents, routes, and resources.

## FR-18 — Explainability

The frontend shall separate verified facts, computed results, and Gemini recommendations.

## FR-19 — Incident Timeline

The system shall display incident progression.

## FR-20 — Simulation

The system shall allow at least one road-closure simulation.

## FR-21 — Before/After Comparison

The simulation shall show differences in route and timing.

## FR-22 — Simulation Reset

The user shall be able to restore the original state.

## FR-23 — Demo Reset

The prototype shall support a full demo reset.

## FR-24 — Role Views

The system shall provide role-specific views for:

- Citizen;
- Volunteer;
- Coordinator;
- Planner.

## FR-25 — Demo Role Switcher

The prototype should provide a simple role switcher for demonstration.

## FR-26 — Volunteer Consent

A volunteer request shall support Accept and Decline.

## FR-27 — AI Failure Fallback

If Gemini is unavailable, verified neighborhood data shall remain accessible.

## FR-28 — Invalid AI Output

Invalid Gemini responses shall not be shown as trusted application state.

## FR-29 — Empty States

The interface shall display meaningful empty states.

## FR-30 — Error Handling

The system shall display human-readable error messages.

---

# 18. Non-Functional Requirements

## NFR-01 — Usability

A citizen should be able to report an incident without training.

## NFR-02 — Understandability

An operator should understand the core incident within approximately five seconds.

## NFR-03 — Responsiveness

The user interface must adapt to desktop, tablet, and mobile layouts.

## NFR-04 — Accessibility

The interface should support:

- keyboard navigation;
- readable contrast;
- large touch targets;
- non-color-only status indicators;
- screen-reader labels;
- reduced motion;
- clear focus states.

## NFR-05 — Security

Gemini API credentials must remain server-side.

## NFR-06 — Privacy

Only necessary user information should be displayed or stored.

## NFR-07 — Reliability

Deterministic services should return repeatable results for the same demo state.

## NFR-08 — Explainability

Every major recommendation should be traceable to available evidence.

## NFR-09 — Performance

Target prototype performance:

```text
Initial page load           < 3 seconds
Local route calculation     < 100 ms
Resource lookup             < 100 ms
Gemini classification       < 8 seconds typical
Gemini plan generation      < 8 seconds typical
End-to-end hero flow        < 15 seconds typical
```

These are prototype targets rather than production guarantees.

## NFR-10 — Maintainability

Frontend, backend, AI services, routing, and data access should remain logically separated.

## NFR-11 — Auditability

The system should preserve enough structured context to explain why a recommendation was presented.

---

# 19. UI/UX Requirements

## UX-01 — Minimal Information Hierarchy

Every incident screen should prioritize:

```text
Situation
→ Recommended Action
→ Evidence
→ Details
```

## UX-02 — Progressive Disclosure

Advanced technical detail should remain collapsed unless requested.

## UX-03 — Map as Visual Anchor

Coordinator and Planner views should use the map as the central interface.

## UX-04 — Calm Design

The interface should avoid excessive warnings, animations, gradients, and visual noise.

## UX-05 — Semantic Colors

```text
Blue  = primary / route / intelligence
Green = available / safe
Amber = warning / degraded
Red   = critical / blocked
```

## UX-06 — Loading Feedback

AI processing should show meaningful progress such as:

```text
Understanding report...
Checking nearby resources...
Calculating safe route...
Preparing recommendation...
```

## UX-07 — Trust Labels

The interface should visibly label:

```text
VERIFIED
COMPUTED
GEMINI
```

## UX-08 — Simulation Banner

Simulation mode must clearly state that live/current data has not been modified.

---

# 20. Data Requirements

The MVP should use a fictional neighborhood dataset.

## Recommended Dataset

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
1 initially blocked road
```

---

# 21. Core Data Entities

## Incident

Fields may include:

```text
id
type
severity
location
status
description
created_at
confidence
```

## Road

```text
id
name
from
to
distance
travel_time
status
```

## Resource

```text
id
type
name
location
status
availability
```

## Volunteer

```text
id
name
location
available
verified
vehicle
```

## Route

```text
id
path
distance
estimated_time
blocked_edges_avoided
```

## Response Plan

```text
summary
actions
evidence
fallback
escalation
```

---

# 22. AI Requirements

Gemini shall be used for:

## AI-01

Multimodal incident interpretation.

## AI-02

Incident classification.

## AI-03

Identification of relevant needs.

## AI-04

Plain-language response-plan synthesis.

## AI-05

Explainable recommendation generation.

## AI-06

Plain-language explanation of simulation changes.

Gemini shall not be used for:

- shortest-path calculation;
- authoritative resource availability;
- geographic coordinate generation;
- medical diagnosis;
- autonomous emergency dispatch;
- authoritative real-world inventory.

---

# 23. Technical Architecture Requirement

Recommended architecture:

```text
                   FRONTEND
             React + TypeScript
                      │
                      ▼
                  API LAYER
             Node.js + TypeScript
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
 Gemini Service   Resource      Routing
                  Service       Service
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ▼
               Response Planner
                      │
                      ▼
                  Frontend
                      │
            ┌─────────┴─────────┐
            ▼                   ▼
           Map             Explanation
                                │
                                ▼
                           Simulation
```

---

# 24. Integration Requirements

## INT-01 — Gemini API

Secure backend integration.

## INT-02 — Map Library

Leaflet or MapLibre.

## INT-03 — Demo Dataset

JSON for initial implementation.

## INT-04 — Optional Database

Firestore may be introduced if persistence is needed.

## INT-05 — Deployment

Google AI Studio / GitHub / Cloud Run workflow preferred.

---

# 25. Security Requirements

## SEC-01

Never expose `GEMINI_API_KEY` in frontend code.

## SEC-02

Validate uploaded image type.

## SEC-03

Validate uploaded image size.

## SEC-04

Limit request payload size.

## SEC-05

Do not log secrets.

## SEC-06

Sanitize user-generated strings.

## SEC-07

Do not collect unnecessary personal information.

## SEC-08

Use synthetic identities in demo data.

## SEC-09

Do not expose internal secret prompts or configuration.

---

# 26. Privacy Requirements

The prototype should follow data minimization.

Example:

Prefer:

```text
Resident requesting medicine assistance
```

instead of:

```text
Full name
Age
Detailed diagnosis
Medical history
```

Volunteer screens should only receive task-relevant data.

---

# 27. Assumptions

1. The MVP operates on synthetic neighborhood data.
2. Gemini API access is available.
3. One fictional neighborhood is sufficient for the prototype.
4. Users understand that the platform is a prototype.
5. Route calculations use simplified demo travel-time assumptions.
6. Volunteer records are fictional.
7. Pharmacy and clinic status is synthetic.
8. Internet connectivity is available for live Gemini calls.
9. A mock/fallback mode may be available for demonstration reliability.

---

# 28. Constraints

## C-01

Prototype-development time is limited.

## C-02

The project should remain understandable during a short judging demo.

## C-03

Real emergency systems are not integrated.

## C-04

Real municipal data is not required for the MVP.

## C-05

Live Gemini latency may vary.

## C-06

The application must avoid unsupported real-world claims.

## C-07

The hero scenario must remain reliable and repeatable.

---

# 29. Dependencies

The MVP depends on:

- Gemini API availability;
- Google AI Studio environment;
- map library;
- Node.js runtime;
- browser image upload;
- seeded neighborhood data;
- stable deployment environment.

Optional dependencies:

- Firestore;
- Firebase Authentication;
- Google Cloud Run;
- GitHub.

---

# 30. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Gemini latency/outage | High | Fallback/mock analysis mode |
| Model hallucination | High | Deterministic grounding + validation |
| Over-scoping | High | One neighborhood + one hero scenario |
| Map complexity | Medium | Small synthetic graph |
| Weak UI clarity | High | Map-first design + progressive disclosure |
| Unsupported real-world claims | High | Label all demo data as synthetic |
| Exposed API key | High | Server-side secret handling |
| Invalid Gemini JSON | Medium | Schema validation + one retry |
| No safe route | Medium | Show explicit no-route state |
| Volunteer privacy concerns | Medium | Minimal task data + explicit consent |
| Confusion between simulation/live | High | Persistent simulation-mode banner |

---

# 31. Business KPIs / Prototype Metrics

The MVP may track:

## User Experience

```text
Incident reporting time
Time to understand incident
Time to identify route
Time to run simulation
```

## System

```text
Gemini classification latency
Gemini plan latency
Route calculation latency
Resource lookup latency
```

## Quality

```text
Structured-output validation success
Unknown-resource rejection count
Route consistency
Simulation reset success
```

## Demo

```text
Hero scenario success rate
End-to-end demo duration
```

---

# 32. Acceptance Criteria

## AC-01

Citizen can submit:

```text
"The road near Community Hall A is flooded
and my grandfather needs medicine."
```

## AC-02

Citizen can upload a flood image.

## AC-03

Gemini returns a valid incident classification.

## AC-04

Backend validates Gemini output.

## AC-05

System retrieves only known seeded resources.

## AC-06

Blocked road is excluded from the safe route.

## AC-07

Safe route includes distance and ETA.

## AC-08

Gemini response plan refers only to valid resource IDs.

## AC-09

Frontend visually separates:

```text
Verified
Computed
Gemini
```

## AC-10

Map displays:

- incident;
- blocked road;
- selected route;
- pharmacy;
- clinic;
- volunteer.

## AC-11

Coordinator can review recommendation before action.

## AC-12

Volunteer can Accept or Decline.

## AC-13

Road-closure simulation changes route metrics.

## AC-14

Simulation does not permanently mutate original state.

## AC-15

Demo reset restores seeded state.

## AC-16

No API key is exposed to browser code.

## AC-17

Prototype contains clear non-emergency-service disclaimer.

---

# 33. MVP Screen Requirements

The MVP should include:

```text
01. Landing / Overview
02. Citizen Report
03. Citizen Incident Status
04. Coordinator Command Center
05. Incident Detail
06. Volunteer Request
07. Resource Detail
08. What-If Simulation
09. Explainability View
10. Demo Settings / Reset
```

---

# 34. Role-Specific Experience Requirements

## Citizen

Must answer:

```text
What happened?
What should I do?
What route should I avoid?
```

## Volunteer

Must answer:

```text
What help is requested?
Where?
How far?
Can I accept or decline?
```

## Coordinator

Must answer:

```text
What is happening?
What is verified?
What resources are available?
What does Gemini recommend?
What action should I review?
```

## Planner

Must answer:

```text
What changes if this road/resource becomes unavailable?
```

---

# 35. Demo Scenario

## Initial State

```text
Road-01       blocked by flooding
Community Hall A near incident
Pharmacy-01   open
Volunteer-07  available
Clinic-01     open
Road-07       open alternative route
```

## Initial Result

```text
Route B
Distance: 1.6 km
ETA: 8 min
```

## Simulation

```text
Close Road-07
```

## Simulated Result

```text
New Route
Distance: ~2.5 km
ETA: ~13 min
```

Possible Gemini explanation:

```text
The original alternative route is unavailable.
The replacement path increases travel time.
Community Hall B may become a more useful
temporary coordination point.
```

---

# 36. Development Priority

Build in this order:

```text
1. Hero flood + medicine scenario
2. Neighborhood dataset
3. Citizen incident input
4. Gemini multimodal analysis
5. Resource lookup
6. Deterministic route calculation
7. Gemini response planner
8. Map visualization
9. Explainability
10. Volunteer interaction
11. What-if simulation
12. Role switcher
13. Responsive design
14. UI polish
15. Everything else
```

---

# 37. Deployment Requirement

Recommended path:

```text
Google AI Studio
        ↓
GitHub
        ↓
Cloud Run
        ↓
Public Prototype URL
```

A deployment should:

- start without manual database repair;
- load the seeded neighborhood;
- complete the primary scenario;
- support reset;
- keep API secrets server-side.

---

# 38. Competition Evidence Requirement

Maintain a development evidence folder:

```text
competition-proof/
│
├── gemini-brainstorming/
├── gemini-architecture/
├── gemini-ui-design/
├── gemini-api-integration/
├── gemini-debugging/
├── gemini-visual-generation/
├── prototype-screenshots/
└── demo-video/
```

Preserve:

- Gemini conversations;
- prompt screenshots;
- architecture iterations;
- visual-generation evidence;
- Gemini integration evidence;
- prototype milestones;
- final demo screenshots.

---

# 39. Future Scope

Future versions may add:

- live weather feeds;
- multilingual citizen input;
- voice-first interaction;
- real geospatial feeds;
- authenticated real users;
- role-based municipal dashboards;
- live resource telemetry;
- historical incident analytics;
- privacy-preserving aggregate insights;
- multi-neighborhood coordination;
- campus mode;
- industrial-zone mode;
- event-management mode.

Any real-world deployment would require additional legal, safety, security, privacy, and operational review.

---

# 40. Definition of Done

Nagar Nerve MVP is complete when a fresh user can:

1. open the application;
2. understand the product quickly;
3. select Citizen mode;
4. submit the flood + medicine report;
5. upload an image;
6. receive Gemini incident understanding;
7. see verified resources;
8. see a safe route;
9. see a grounded Gemini recommendation;
10. switch to Coordinator mode;
11. review evidence and recommendation;
12. switch to Volunteer mode;
13. review the assistance request;
14. run a Planner what-if simulation;
15. compare before/after values;
16. reset the application to its original state.

---

# 41. Final Business Requirement

The product must preserve one core principle throughout every feature and user journey:

> **Gemini understands and reasons. Deterministic systems verify and calculate. Humans remain accountable.**

Nagar Nerve succeeds when it makes a neighborhood easier to understand, easier to coordinate, and easier to prepare for without pretending that an AI model should autonomously control public infrastructure.
