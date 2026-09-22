import 'dotenv/config';
import { GoogleGenAI, Type, Schema } from '@google/genai';
import { IncidentAnalysis, ResponsePlan } from '../types';

// Gemini client — lazily created with API key from environment
function getGenAI(): GoogleGenAI {
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });
}

// ─── FALLBACK DATA (used when Gemini is unavailable) ─────────────────────────
const FALLBACK_ANALYSIS: IncidentAnalysis = {
  incidentType: 'flooding',
  secondaryNeed: 'medicine_access',
  severity: 'high',
  locationReference: 'Community Hall A',
  peopleAtRisk: 1,
  observations: ['Standing water visible on road', 'Road appears impassable'],
  confidence: 0.91,
  source: 'fallback',
};

const FALLBACK_PLAN: ResponsePlan = {
  summary:
    'Deploy Volunteer-07 via the safe alternative Route B to collect medicine from GreenCare Pharmacy and deliver it to the resident.',
  actions: [
    { order: 1, action: 'avoid_road',        targetId: 'road-01',       reason: 'Road-01 is verified blocked due to flooding.' },
    { order: 2, action: 'contact_volunteer', targetId: 'volunteer-07',  reason: 'Volunteer-07 is verified, available, and near the pickup point.' },
    { order: 3, action: 'use_route',         targetId: 'route-b',       reason: 'Alternative route avoids the blocked road and reaches the pharmacy safely.' },
  ],
  fallback: { type: 'clinic', targetId: 'clinic-01' },
  source: 'fallback',
};

// ─── INCIDENT ANALYSIS ───────────────────────────────────────────────────────
export async function analyzeIncident(
  text: string,
  locationReference: string,
  imageBase64?: string
): Promise<IncidentAnalysis> {
  try {
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        incidentType:      { type: Type.STRING },
        secondaryNeed:     { type: Type.STRING },
        severity:          { type: Type.STRING, enum: ['low', 'medium', 'high', 'critical'] },
        locationReference: { type: Type.STRING },
        peopleAtRisk:      { type: Type.INTEGER },
        observations:      { type: Type.ARRAY, items: { type: Type.STRING } },
        confidence:        { type: Type.NUMBER },
      },
      required: ['incidentType', 'secondaryNeed', 'severity', 'locationReference', 'peopleAtRisk', 'observations', 'confidence'],
    };

    const contents: any[] = [
      {
        role: 'user',
        parts: [
          {
            text: `You are an emergency incident classifier. Analyze the following neighborhood incident report.
Location context: "${locationReference}"
Report: "${text}"

Return a structured JSON with incidentType, secondaryNeed, severity (low/medium/high/critical), locationReference, peopleAtRisk (integer), observations (array of strings - factual observations only, NOT inferences), and confidence (0-1 float).

Important: observations must be factual observations only. Do NOT include inferences or recommendations.`,
          },
        ],
      },
    ];

    if (imageBase64) {
      contents[0].parts.push({
        inlineData: { mimeType: 'image/jpeg', data: imageBase64 },
      });
    }

    const response = await getGenAI().models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature: 0.1,
      },
    });

    if (!response.text) throw new Error('Empty Gemini response');
    const parsed = JSON.parse(response.text);
    return { ...parsed, source: 'gemini' };
  } catch (err) {
    console.error('[GeminiService] analyzeIncident failed, using fallback:', err);
    return FALLBACK_ANALYSIS;
  }
}

// ─── RESPONSE PLAN GENERATION ────────────────────────────────────────────────
export async function generateResponsePlan(
  verifiedFacts: string[],
  computedResults: string[]
): Promise<ResponsePlan> {
  try {
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        actions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              order:    { type: Type.INTEGER },
              action:   { type: Type.STRING },
              targetId: { type: Type.STRING },
              reason:   { type: Type.STRING },
            },
            required: ['order', 'action', 'targetId', 'reason'],
          },
        },
        fallback: {
          type: Type.OBJECT,
          properties: {
            type:     { type: Type.STRING },
            targetId: { type: Type.STRING },
          },
          required: ['type', 'targetId'],
        },
      },
      required: ['summary', 'actions', 'fallback'],
    };

    const response = await getGenAI().models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a neighborhood coordination assistant. Generate a concise response plan using ONLY the verified facts and computed results below.

CONSTRAINTS:
- Do NOT invent resources, roads, or volunteers not listed below.
- Do NOT claim any action was already executed.
- Do NOT give medical diagnosis or prescriptions.
- All targetId values must come from the verified facts list.

VERIFIED FACTS:
${verifiedFacts.map((f, i) => `${i + 1}. ${f}`).join('\n')}

COMPUTED RESULTS:
${computedResults.map((c, i) => `${i + 1}. ${c}`).join('\n')}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature: 0.1,
      },
    });

    if (!response.text) throw new Error('Empty Gemini response');
    const parsed = JSON.parse(response.text);
    return { ...parsed, source: 'gemini' };
  } catch (err) {
    console.error('[GeminiService] generateResponsePlan failed, using fallback:', err);
    return FALLBACK_PLAN;
  }
}

// ─── SIMULATION EXPLANATION ──────────────────────────────────────────────────
export async function explainSimulation(
  scenario: string,
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  affectedResources: string[]
): Promise<string> {
  try {
    const response = await getGenAI().models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are explaining a neighborhood simulation result in plain language to a coordinator.

Scenario: "${scenario}"

Before simulation: ETA ${before.estimatedTimeMin} min, ${before.accessibleResources} accessible resources.
After simulation: ETA ${after.estimatedTimeMin} min, ${after.accessibleResources} accessible resources.
Affected resources: ${affectedResources.join(', ') || 'none'}.

Write 2-3 sentences explaining the impact in simple, clear language. Do not invent numbers not given above.`,
      config: { temperature: 0.3 },
    });

    return response.text ?? 'Simulation explanation unavailable.';
  } catch {
    return `Closing ${scenario} increases estimated response time from ${before.estimatedTimeMin} to ${after.estimatedTimeMin} minutes and reduces accessible resources from ${before.accessibleResources} to ${after.accessibleResources}.`;
  }
}
