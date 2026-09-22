# Nagar Nerve — Stakeholders, User Experience & Interaction Design

## Gemini-Powered Neighborhood Intelligence & Response Network

**Purpose of this document**

This document defines Nagar Nerve from the perspective of the people who use it.

It answers four important questions:

1. Who are the stakeholders?
2. What role does each stakeholder play?
3. How does each stakeholder interact with Nagar Nerve?
4. What should the UI/UX feel like for each user?

The goal is to avoid building one oversized dashboard for everyone.

Instead, Nagar Nerve should provide a **role-aware experience**:

> Show each person only what they need, when they need it, with enough context to act confidently.

---

# 1. Core UX Principle

Nagar Nerve should feel:

- calm during stressful situations;
- minimal but complete;
- modern but not flashy;
- trustworthy;
- fast to understand;
- accessible;
- explainable;
- mobile-friendly;
- human-centered.

The interface should never feel like:

- a complicated municipal ERP;
- a generic chatbot;
- an emergency-control-room simulator;
- a dashboard filled with meaningless charts;
- an AI system making unexplained decisions.

The core information hierarchy should always be:

```text
WHAT HAPPENED
      ↓
WHAT DO WE KNOW
      ↓
WHAT IS AVAILABLE
      ↓
WHAT IS RECOMMENDED
      ↓
WHAT HAPPENS NEXT
```

---

# 2. Stakeholder Map

The prototype can support the following stakeholders.

```text
                    NAGAR NERVE
                         │
       ┌─────────────────┼──────────────────┐
       │                 │                  │
    CITIZENS        COORDINATORS        OPERATORS
       │                 │                  │
       │                 │                  │
 Vulnerable          Volunteers         City / Campus
 Residents           Resources          Administrators
 Caregivers          Providers          Planners
```

For the MVP, not every stakeholder needs a separate application.

A single platform can expose different role-based views.

---

# 3. Primary Stakeholders

## 3.1 Citizen / Resident

### Who are they?

A normal person living, studying, or working in the neighborhood.

They are the person who notices a problem first.

Examples:

- resident;
- shop owner;
- student;
- pedestrian;
- commuter;
- local worker.

### Their main goal

> Report what is happening and quickly understand what they should do next.

### They should NOT need to understand

- routing algorithms;
- AI confidence models;
- internal resource IDs;
- system architecture;
- technical incident categories.

### Citizen actions

A citizen should be able to:

- report an issue;
- type a short description;
- upload a photo;
- optionally use voice;
- share/select location;
- view incident status;
- view basic recommended guidance;
- view a safe route where relevant;
- receive updates.

### Example interaction

```text
Citizen notices flooding
        ↓
Opens Nagar Nerve
        ↓
Taps "Report an Issue"
        ↓
Uploads photo
        ↓
Types:
"Road near Community Hall A is flooded."
        ↓
Gemini understands the report
        ↓
Citizen sees:
Road blocked
Alternative route available
Nearby support identified
```

### Citizen UI

The citizen experience should be extremely simple.

Home screen:

```text
┌─────────────────────────────┐
│ NAGAR NERVE                 │
│                             │
│ What's happening nearby?    │
│                             │
│ [ Report an Issue ]         │
│                             │
│ Nearby                      │
│ ● Flooding • 300 m          │
│ ● Road closure • 800 m      │
│                             │
│ Safe routes                 │
│ [ View Map ]                │
└─────────────────────────────┘
```

No giant analytics dashboard.

---

# 4. Vulnerable Resident / Caregiver

## Who are they?

A person who may need additional assistance because of:

- age;
- reduced mobility;
- temporary injury;
- dependency on medicine;
- caregiving responsibilities;
- accessibility needs.

The system should not require users to publicly disclose sensitive medical information.

### Their main goal

> Understand available support without navigating complex systems.

### Possible interactions

They may:

- request assistance;
- report access problems;
- identify a mobility/access need;
- view accessible routes;
- receive a simplified response plan;
- allow a caregiver to follow incident status.

### Example

```text
"My grandfather needs medicine,
but our normal road is flooded."
```

Nagar Nerve should focus on the operational need:

```text
Medicine access required
Road blocked
Alternative route available
Support resource identified
```

Not on diagnosing the resident.

### UX requirement

This role benefits from:

- larger touch targets;
- readable fonts;
- high contrast;
- minimal steps;
- plain language;
- voice input;
- multilingual support in future versions;
- no unnecessary forms.

---

# 5. Volunteer

## Who are they?

A verified community member who has opted in to provide local assistance.

Examples:

- student volunteer;
- resident volunteer;
- bicycle volunteer;
- community organization member.

### Their main goal

> Understand exactly what help is requested and decide whether to accept it.

### Important principle

Nagar Nerve should never silently assign a volunteer.

The volunteer must remain in control.

### Volunteer actions

A volunteer can:

- set availability;
- receive assistance requests;
- accept or decline;
- view safe route;
- view pickup/drop-off points;
- update task status;
- indicate temporary unavailability.

### Volunteer interaction

```text
System identifies Volunteer-07
        ↓
Volunteer receives request
        ↓
"Medicine pickup assistance needed"
        ↓
Volunteer sees:
Distance
Route
Pickup
Destination
        ↓
[ Accept ]   [ Decline ]
```

### Volunteer UI

```text
┌─────────────────────────────┐
│ Assistance Request          │
│                             │
│ Medicine Pickup             │
│ Community Hall Area         │
│                             │
│ Distance: 1.6 km            │
│ Estimated: 8 min            │
│                             │
│ Pharmacy → Resident         │
│                             │
│ [ View Safe Route ]         │
│                             │
│ [ Accept ]   [ Decline ]    │
└─────────────────────────────┘
```

The volunteer should not see unnecessary personal data.

---

# 6. Community Coordinator

## Who are they?

A trusted person responsible for understanding multiple incidents across the neighborhood.

Examples:

- resident welfare coordinator;
- campus coordinator;
- NGO coordinator;
- neighborhood operations lead;
- local disaster-response coordinator.

### Their main goal

> See the complete neighborhood situation and coordinate available resources.

This is one of the most important Nagar Nerve roles.

### Coordinator actions

They can:

- monitor active incidents;
- view neighborhood map;
- inspect Gemini analysis;
- see verified resources;
- view response recommendations;
- confirm or reject recommendations;
- monitor volunteer availability;
- view incident timeline;
- run limited simulations;
- escalate an incident for human review.

### Coordinator UI

This role gets the full command-center experience.

Recommended desktop layout:

```text
┌───────────────────────────────────────────────────────┐
│ Nagar Nerve     Search       Active: 3      Profile   │
├──────────────┬────────────────────────────┬───────────┤
│ INCIDENTS    │                            │ RESPONSE  │
│              │                            │           │
│ ● Flood      │          MAP               │ Situation │
│ ● Closure    │                            │ Resources │
│ ● Heat       │                            │ Route     │
│              │                            │ Action    │
│              │                            │           │
├──────────────┴────────────────────────────┴───────────┤
│ FACTS          COMPUTED          GEMINI RECOMMENDATION│
└───────────────────────────────────────────────────────┘
```

The map should remain the visual anchor.

---

# 7. Municipal / Campus / Operations User

## Who are they?

A professional operator responsible for overseeing a larger service area.

This could represent:

- municipal operator;
- campus administrator;
- industrial-zone operator;
- event operations team.

### Their main goal

> Understand the current operational picture across multiple incidents and resources.

### Operator actions

They can:

- monitor incidents;
- filter by severity;
- view resource availability;
- inspect affected roads;
- view response plans;
- review unresolved incidents;
- audit recommendations;
- monitor response times;
- run scenario simulations.

### Difference from coordinator

```text
Citizen
Sees their incident.

Volunteer
Sees tasks relevant to them.

Coordinator
Coordinates a neighborhood.

Operator
Monitors multiple neighborhoods / larger operational area.
```

For the hackathon MVP, Coordinator and Operator can share the same interface with permission differences.

---

# 8. City Planner / Scenario Analyst

## Who are they?

A stakeholder focused on preparedness rather than live response.

### Their main goal

> Understand what could happen before a disruption occurs.

### Planner interactions

They can ask questions such as:

```text
What happens if Road-07 closes?

What happens if the main bridge becomes inaccessible?

Which resources become unreachable?

Which community hall is the best backup location?

How does response time change?
```

### Planner UI

The planner interface should focus on simulation.

```text
┌─────────────────────────────────────────────┐
│ WHAT-IF SIMULATION                          │
│                                             │
│ Change                                      │
│ [ Road-07 ▼ ] [ Close Road ]                │
│                                             │
│ BEFORE               AFTER                  │
│ 8 min                13 min                 │
│ 3 resources          2 resources            │
│                                             │
│                MAP                          │
│                                             │
│ GEMINI EXPLANATION                          │
│ Route B is no longer available...           │
│                                             │
│ [ Reset Simulation ]                        │
└─────────────────────────────────────────────┘
```

Simulation must always be clearly labeled as simulated.

---

# 9. Resource Provider

## Who are they?

Organizations or facilities represented inside the neighborhood network.

Examples:

- pharmacy;
- clinic;
- shelter;
- community hall;
- local NGO;
- campus health center.

### Their main goal

> Keep basic operational information accurate.

### Resource-provider actions

Depending on the future implementation, they may update:

- open / closed status;
- resource availability;
- capacity;
- operating hours;
- temporary unavailability.

For the prototype, this information should be synthetic and controlled through seeded data.

---

# 10. Platform Administrator

## Who are they?

A trusted technical or operational administrator.

### Their responsibilities

- manage user roles;
- manage verified resources;
- reset demo state;
- review system logs;
- manage synthetic neighborhood data;
- verify resources;
- monitor system health;
- manage API configuration.

### Important UX rule

Admin functions should be separate from normal user experiences.

Do not place administrative controls on the citizen interface.

---

# 11. Stakeholder Interaction Map

```text
CITIZEN
   │
   │ reports
   ▼
INCIDENT
   │
   ▼
GEMINI UNDERSTANDING
   │
   ▼
VERIFIED NEIGHBORHOOD DATA
   │
   ├──────────────► PHARMACY
   │
   ├──────────────► CLINIC
   │
   ├──────────────► VOLUNTEER
   │
   ├──────────────► COMMUNITY HALL
   │
   └──────────────► ROAD NETWORK
                         │
                         ▼
                  ROUTE CALCULATION
                         │
                         ▼
                  GEMINI RESPONSE PLAN
                         │
             ┌───────────┼────────────┐
             ▼           ▼            ▼
          CITIZEN    COORDINATOR   VOLUNTEER
                         │
                         ▼
                    HUMAN DECISION
```

---

# 12. Permission Model

A simple role model should define what each user can see and do.

| Capability | Citizen | Volunteer | Coordinator | Planner | Admin |
|---|---:|---:|---:|---:|---:|
| Report incident | ✓ | ✓ | ✓ |  | ✓ |
| Upload image | ✓ | ✓ | ✓ |  | ✓ |
| View nearby incidents | ✓ | ✓ | ✓ | ✓ | ✓ |
| View own requests | ✓ | ✓ | ✓ |  | ✓ |
| Accept assistance task |  | ✓ |  |  |  |
| See full neighborhood resources | Limited | Limited | ✓ | ✓ | ✓ |
| View AI recommendation | Limited | Task-specific | ✓ | ✓ | ✓ |
| Approve/coordinate response |  |  | ✓ |  | ✓ |
| Run what-if simulation |  |  | Limited | ✓ | ✓ |
| Edit resource state |  | Limited | Limited |  | ✓ |
| Manage users |  |  |  |  | ✓ |

For the prototype, authentication can be simplified into a role switcher.

Example:

```text
View as:
[ Citizen ▼ ]

Citizen
Volunteer
Coordinator
Planner
```

This makes it easy for judges to understand different stakeholder experiences.

---

# 13. Overall UX Philosophy

## 13.1 Progressive Disclosure

Do not show everything at once.

Start simple.

Allow users to expand detail when needed.

Example:

```text
Flooding • High Priority
Safe route available

[ View Details ]
```

Expanded:

```text
Verified Facts
Computed Route
Gemini Recommendation
Evidence
```

This makes the product useful for both normal users and professional operators.

---

# 14. Five-Second Rule

Every important screen should answer these questions within five seconds:

```text
1. What happened?
2. Where?
3. How serious is it?
4. What should I do?
5. What evidence supports this?
```

If a screen cannot answer these quickly, the interface is too complicated.

---

# 15. UI Design Direction

The design language should feel like:

```text
Google Maps
+
Modern civic dashboard
+
Calm AI assistant
```

Not:

```text
Cyberpunk control room
+
Crypto dashboard
+
College project portal
```

---

# 16. Visual Style

## General Style

Use:

- clean surfaces;
- generous whitespace;
- subtle borders;
- rounded cards;
- limited shadows;
- clear typography;
- muted backgrounds;
- strong visual hierarchy;
- restrained animation.

Avoid:

- excessive gradients;
- glowing neon everywhere;
- glassmorphism on every element;
- tiny text;
- unnecessary charts;
- huge menus;
- constant animations.

---

# 17. Color System

Recommended semantic color usage:

## Blue

Primary interaction and intelligence.

Used for:

- primary buttons;
- selected items;
- safe route;
- Gemini intelligence layer.

---

## Green

Available / safe / confirmed.

Used for:

- available volunteer;
- open pharmacy;
- safe resource;
- completed action.

---

## Amber

Warning / degraded / attention.

Used for:

- road degraded;
- moderate uncertainty;
- pending decision.

---

## Red

Critical incident only.

Used for:

- blocked road;
- critical incident;
- unavailable route.

Red should be rare.

If everything is red, nothing feels urgent.

---

## Neutral

Use neutral whites, grays, and soft backgrounds for most surfaces.

---

# 18. Typography

Use a modern sans-serif font.

Good options:

```text
Inter
Roboto
Google Sans / similar system font
```

Recommended hierarchy:

```text
Page title        28–32 px
Section heading   20–24 px
Card heading      16–18 px
Body              14–16 px
Metadata          12–14 px
```

Important operational text should never be tiny.

---

# 19. Spacing

Use an 8-point spacing system.

Example:

```text
4 px  → micro spacing
8 px  → small spacing
16 px → standard
24 px → section spacing
32 px → major spacing
48 px → page sections
```

Consistency matters more than decoration.

---

# 20. Icons

Use a consistent icon library.

Good options:

- Material Symbols;
- Lucide;
- Heroicons.

Avoid mixing multiple unrelated icon styles.

Suggested icons:

```text
Incident        triangle-alert
Pharmacy        cross / pill
Clinic          hospital
Volunteer       user-round
Community Hall  building
Route           route
Flooding        waves
Simulation      flask / sliders
Verified        badge-check
AI              sparkles
```

Icons should support text, not replace it.

---

# 21. Navigation

Keep navigation minimal.

Coordinator desktop:

```text
Nagar Nerve

Overview
Incidents
Map
Resources
Simulations
```

Everything else can live under:

```text
More
Settings
Profile
```

Citizen mobile:

```text
Home
Map
Report
Updates
```

Four items maximum.

---

# 22. Command Center Layout

This should be the strongest screen in the prototype.

Recommended structure:

```text
┌────────────────────────────────────────────────────────────┐
│ NAGAR NERVE       Search         Notifications     Profile │
├───────────────┬────────────────────────────┬───────────────┤
│               │                            │               │
│ INCIDENTS     │                            │ RESPONSE      │
│               │                            │               │
│ Flooding      │         MAP                │ Situation     │
│ Road Closure  │                            │ Resources     │
│ Medicine      │                            │ Route         │
│               │                            │ Recommendation│
│               │                            │               │
├───────────────┴────────────────────────────┴───────────────┤
│ VERIFIED FACTS        COMPUTED        GEMINI RECOMMENDATION│
└────────────────────────────────────────────────────────────┘
```

Recommended width proportions:

```text
Incident List      20%
Map                55%
Response Panel     25%
```

---

# 23. Map Experience

The map is the product's visual anchor.

It should display:

```text
RED
Blocked road

BLUE
Recommended route

GREEN
Available resources

AMBER
Warning / degraded road
```

Resource markers should have clear icons.

Clicking a resource opens a small card.

Example:

```text
GreenCare Pharmacy

OPEN
1.1 km away

Synthetic inventory:
Medicine available

[ View Details ]
```

Do not open giant modal windows for simple map interactions.

---

# 24. Incident Card Design

Compact incident card:

```text
┌────────────────────────────┐
│ ● HIGH                     │
│ Flooding                   │
│ Community Hall A           │
│                            │
│ Medicine access required   │
│                            │
│ 2 min ago                  │
└────────────────────────────┘
```

Selected card gains a subtle border/highlight.

---

# 25. Response Panel

The response panel should answer:

```text
What happened?
What is known?
What should happen next?
```

Example:

```text
SITUATION

Flooding + Medicine Access

VERIFIED

✓ Road-01 blocked
✓ Pharmacy open
✓ Volunteer available

ROUTE

Route B
1.6 km • 8 min

RECOMMENDED

Use Volunteer-07
via Route B

[ View Why ]
```

---

# 26. Explainability UX

Avoid displaying hidden AI reasoning.

Instead show concise evidence.

Recommended tabs:

```text
[ Facts ] [ Computed ] [ Recommendation ]
```

### Facts

```text
Road-01 is marked blocked.
Pharmacy-01 is open.
Volunteer-07 is available.
```

### Computed

```text
Route B = 1.6 km
Estimated travel time = 8 min
```

### Recommendation

```text
Use Volunteer-07 through Route B.
```

Each recommendation should be traceable to evidence.

---

# 27. Gemini UI Presence

Gemini should be visible but not overwhelming.

Use subtle labels:

```text
Gemini Analysis
Gemini Recommendation
Gemini Explanation
```

Avoid:

```text
ASK AI EVERYTHING
MAGICAL AI ENGINE
AI DECIDES
```

Gemini should appear as the reasoning layer.

---

# 28. AI Confidence UX

Confidence should not normally appear as raw decimals to citizens.

Avoid:

```text
Confidence: 0.7138
```

Use understandable states:

```text
High confidence
Some uncertainty
Needs review
```

For operator screens, the numeric value can appear inside expanded technical details.

---

# 29. Loading States

Never leave the user staring at an empty spinner.

Show progress stages.

Example:

```text
Understanding report...
Checking nearby resources...
Calculating safe route...
Preparing recommendation...
```

This also makes Gemini latency feel purposeful.

---

# 30. Error States

Errors should explain what still works.

Bad:

```text
ERROR 500
```

Better:

```text
Gemini analysis is temporarily unavailable.

Neighborhood map and verified resources are still available.

[ Retry Analysis ]
```

---

# 31. Empty States

Example:

```text
No active incidents

Your neighborhood is currently clear.

[ View Map ]
```

Avoid blank panels.

---

# 32. What-If UX

Simulation mode should visibly differ from live state.

When simulation begins:

```text
SIMULATION MODE
```

Use a banner:

```text
You are viewing a simulated scenario.
No live neighborhood data has been changed.
```

Then show:

```text
BEFORE        AFTER

8 min         13 min
3 resources   2 resources
```

Button:

```text
[ Reset Simulation ]
```

---

# 33. Mobile UX

Citizen and volunteer experiences should be mobile-first.

Coordinator and planner experiences can be desktop-first but responsive.

Citizen report flow:

```text
Screen 1
What's happening?

Screen 2
Add photo

Screen 3
Confirm location

Screen 4
Review

Screen 5
Response
```

However, the UI should avoid unnecessary steps.

If location is known and no image is required, the report should be possible in one screen.

---

# 34. Accessibility

The product should support:

- keyboard navigation;
- high color contrast;
- large touch targets;
- screen-reader labels;
- text labels with icons;
- no color-only status communication;
- reduced-motion support;
- readable font sizes;
- clear focus indicators.

Example:

Do not use only:

```text
●
```

Use:

```text
● BLOCKED
```

---

# 35. Accessibility for Stressful Situations

Users may be interacting while worried or distracted.

Therefore:

- keep sentences short;
- avoid jargon;
- avoid hidden actions;
- make primary actions obvious;
- limit decisions per screen;
- confirm destructive actions;
- never require users to interpret complex graphs during an active incident.

---

# 36. Notification UX

Notifications should be useful, not constant.

Examples:

```text
Road-01 status changed to BLOCKED.

A safer route is now available.

Volunteer request accepted.

Simulation complete.
```

Avoid meaningless messages like:

```text
Your AI analysis has been optimized.
```

---

# 37. Search and Command Interface

For coordinator/planner roles, include a command/search bar.

Example:

```text
Search roads, incidents, resources...
```

It may also accept natural language:

```text
Show pharmacies near Community Hall A

What happens if Road-07 closes?

Show active high-priority incidents
```

Natural-language commands should complement the UI, not replace it.

---

# 38. Recommended User Journeys

## Journey A — Citizen Reports Flooding

```text
Home
 ↓
Report Issue
 ↓
Text + Photo
 ↓
Gemini Understanding
 ↓
Incident Confirmed
 ↓
Guidance + Safe Route
 ↓
Status Updates
```

---

## Journey B — Coordinator Handles Incident

```text
New Incident
 ↓
Open Incident
 ↓
Review Gemini Analysis
 ↓
Review Verified Facts
 ↓
Review Route
 ↓
Review Recommendation
 ↓
Coordinate Resource
 ↓
Monitor Status
```

---

## Journey C — Volunteer Accepts Assistance

```text
Notification
 ↓
View Task
 ↓
View Safe Route
 ↓
Accept
 ↓
Task Active
 ↓
Complete
```

---

## Journey D — Planner Runs Simulation

```text
Simulation
 ↓
Select Road
 ↓
Close Road
 ↓
Recalculate
 ↓
Compare Before / After
 ↓
Gemini Explanation
 ↓
Reset
```

---

# 39. MVP Role Strategy

For the hackathon prototype, do not build six completely separate applications.

Build four role views:

```text
1. Citizen
2. Volunteer
3. Coordinator
4. Planner
```

Combine:

```text
Municipal Operator
+
Community Coordinator
```

into one command-center view.

Keep:

```text
Admin
```

as a lightweight internal/settings screen.

---

# 40. Demo Role Switcher

For presentation purposes, add:

```text
Demo Mode

View as:
[ Citizen ▼ ]
```

Options:

```text
Citizen
Volunteer
Coordinator
Planner
```

This allows judges to experience stakeholder perspectives without logging into multiple accounts.

Make it clear this role switcher is a demo feature.

---

# 41. Recommended Prototype Screens

The MVP should contain:

```text
01 Landing / Overview
02 Citizen Report
03 Citizen Incident Status
04 Coordinator Command Center
05 Incident Detail
06 Volunteer Request
07 Resource Detail
08 What-If Simulation
09 Explainability Panel
10 Demo Settings / Reset
```

Ten well-designed screens are better than thirty unfinished ones.

---

# 42. Landing Screen

Minimal landing screen:

```text
NAGAR NERVE

From reporting problems
to coordinating solutions.

[ Enter Command Center ]

[ Report an Issue ]

Gemini-powered neighborhood intelligence
```

Optional background:

Subtle map/network visualization.

Do not make the landing page a marketing website.

The prototype should reach functionality quickly.

---

# 43. Microinteractions

Use small modern interactions:

- smooth panel expansion;
- route animation when calculated;
- subtle marker pulse for active incident;
- status transition animation;
- toast notification after actions;
- skeleton loading cards;
- hover details on desktop;
- haptic-friendly touch behavior on mobile where supported.

Animations should communicate state.

Do not animate things merely because CSS permits civilization to make poor choices.

---

# 44. Modern Component Patterns

Use:

- command palette;
- bottom sheets on mobile;
- side panels on desktop;
- sticky action bars;
- contextual map cards;
- segmented controls;
- progress steps;
- skeleton loaders;
- toast notifications;
- responsive cards;
- accessible dialogs;
- searchable dropdowns.

Use sparingly.

The best interface is not the one that uses every component library feature.

---

# 45. Component Library Strategy

For implementation, use one consistent component system.

Possible approach:

```text
Tailwind CSS
+
shadcn/ui
+
Lucide Icons
```

This provides modern, accessible components while allowing customization.

Avoid mixing three UI frameworks.

---

# 46. Responsive Layout

Desktop:

```text
Sidebar + Map + Context Panel
```

Tablet:

```text
Collapsible Sidebar
Map
Bottom / Right Panel
```

Mobile:

```text
Full-screen Map
Bottom Sheet
Bottom Navigation
```

---

# 47. Trust Design

Users should always understand where information came from.

Use small source labels.

Example:

```text
VERIFIED
Neighborhood dataset

COMPUTED
Routing engine

GEMINI
AI recommendation
```

This becomes part of the Nagar Nerve brand.

Trust is not a separate legal page.

It should be visible inside the interface.

---

# 48. Privacy UX

Only display information required for coordination.

Examples:

Instead of:

```text
Rahul Sharma
Age 71
House 27
Medical history...
```

use:

```text
Resident requesting medicine assistance
Approximate service location
```

Volunteer screens should receive only the information necessary to perform a task.

---

# 49. Human Control

Every important AI recommendation should have human-controlled actions.

Example:

```text
GEMINI RECOMMENDATION

Use Volunteer-07 via Route B.

[ Coordinate ]
[ Review Alternatives ]
```

Avoid:

```text
Executing recommendation...
```

without confirmation.

---

# 50. Design Tokens

Example design system:

```text
Border Radius

Small     8px
Medium    12px
Large     16px
Panel     20px
```

```text
Shadows

Default:
very subtle

Elevated:
only menus, dialogs, floating cards
```

```text
Transitions

150–250 ms
```

Keep the experience quick.

---

# 51. Core UX Metrics

For the prototype, evaluate:

### Citizen

```text
Can report incident in < 30 seconds.
```

### Coordinator

```text
Can understand incident in < 5 seconds.
```

### Volunteer

```text
Can understand request and accept/decline in < 10 seconds.
```

### Planner

```text
Can run a simulation in < 20 seconds.
```

These are prototype UX goals, not production guarantees.

---

# 52. Key Experience Principle by Role

```text
Citizen
"Make reporting effortless."

Volunteer
"Make the task unambiguous."

Coordinator
"Make the situation understandable."

Planner
"Make consequences visible."

Admin
"Make control safe and auditable."
```

---

# 53. End-to-End Stakeholder Scenario

## Situation

Flooding blocks Road-01.

An elderly resident needs medicine.

### Citizen

Reports:

```text
"The road near Community Hall A is flooded
and my grandfather needs medicine."
```

### Gemini

Understands:

```text
Flooding
Medicine access
High operational urgency
```

### Resource Engine

Finds:

```text
Pharmacy-01
Volunteer-07
Clinic-01
Route B
```

### Coordinator

Reviews:

```text
Verified facts
Route
Gemini recommendation
```

### Volunteer

Receives:

```text
Medicine pickup request
1.6 km
8 min
```

Volunteer accepts.

### Citizen

Sees:

```text
Assistance coordinated.
Safe route identified.
```

### Planner

Later simulates:

```text
What if Route B closes?
```

Nagar Nerve shows:

```text
8 min → 13 min

Community Hall B becomes
a stronger backup coordination point.
```

This single scenario demonstrates the interaction between all major stakeholders.

---

# 54. Prototype Design Priorities

Prioritize in this order:

```text
1. Clear stakeholder roles
2. Citizen reporting
3. Coordinator command center
4. Map visualization
5. Explainability
6. Volunteer interaction
7. Simulation
8. Accessibility
9. Responsive design
10. Animation and polish
```

Never sacrifice clarity for visual effects.

---

# 55. Experience Definition of Done

The UX is ready when:

- a citizen can report an issue without instruction;
- a judge understands the active incident within five seconds;
- verified facts and Gemini recommendations are visibly different;
- map markers are understandable;
- the safe route is obvious;
- a volunteer understands exactly what is being requested;
- a coordinator can review before acting;
- simulation is clearly separated from live state;
- all major actions have loading/error states;
- mobile layouts remain usable;
- important information is accessible without relying only on color;
- users remain in control of important actions.

---

# 56. Final UX Vision

Nagar Nerve should not feel like software designed for a control room.

It should feel like the neighborhood suddenly became easier to understand.

For a citizen:

> "I can explain what is happening."

For a volunteer:

> "I know exactly how I can help."

For a coordinator:

> "I understand the situation and available options."

For a planner:

> "I can see what happens when conditions change."

For everyone:

> **The neighborhood's resources become visible, connected, and understandable when they matter most.**
