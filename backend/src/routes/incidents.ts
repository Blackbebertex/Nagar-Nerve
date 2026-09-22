import { Router, Request, Response } from 'express';
import { analyzeIncident, generateResponsePlan } from '../services/geminiService';
import { calculateSafeRoute, getState } from '../services/routingService';
import { Resource, Road } from '../types';

const router = Router();

// POST /api/incidents/analyze
router.post('/analyze', async (req: Request, res: Response) => {
  try {
    const { text, location, imageBase64 } = req.body as {
      text: string;
      location: string;
      imageBase64?: string;
    };

    if (typeof text !== 'string' || typeof location !== 'string' || !text.trim() || !location.trim()) {
      return res.status(400).json({ success: false, error: 'text and location are required' });
    }

    if (imageBase64 !== undefined && typeof imageBase64 !== 'string') {
      return res.status(400).json({ success: false, error: 'imageBase64 must be a base64 string when provided' });
    }

    // Step 1: Gemini multimodal analysis
    const analysis = await analyzeIncident(text, location, imageBase64);

    // Step 2: Gather verified facts from deterministic data
    const state = getState();
    const blockedRoads = state.roads.filter((r: Road) => r.status === 'blocked');
    const availableResources = state.resources.filter(
      (r: Resource) => r.status === 'open' || r.status === 'available'
    );

    const verifiedFacts: string[] = [
      ...blockedRoads.map((r: Road) => `${r.id} (${r.from} → ${r.to}) is blocked.`),
      ...availableResources.map((r: Resource) => `${r.name} [${r.id}] is ${r.status} and verified.`),
    ];

    // Step 3: Calculate safe route (pharmacy → resident as hero scenario)
    const route = calculateSafeRoute('node-inter-2', 'node-resident');
    const computedResults = route
      ? [
          `Safe route found: ${route.routeId}`,
          `Distance: ${route.distanceKm} km`,
          `Estimated time: ${route.estimatedTimeMin} minutes`,
          `Roads used: ${route.roads.join(', ')}`,
        ]
      : ['No safe route found. All paths may be blocked.'];

    // Step 4: Gemini grounded response plan
    const allowedTargetIds = new Set([
      ...blockedRoads.map((road: Road) => road.id),
      ...availableResources.map((resource: Resource) => resource.id),
    ]);
    const responsePlan = await generateResponsePlan(verifiedFacts, computedResults, allowedTargetIds);

    return res.json({
      success: true,
      analysis,
      verifiedFacts,
      route,
      computedResults,
      responsePlan,
    });
  } catch (err) {
    console.error('Incident analysis failed:', err);
    return res.status(500).json({ success: false, error: 'Unable to analyze the incident right now. Please try again.' });
  }
});

export default router;
