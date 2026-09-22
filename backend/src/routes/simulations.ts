import { Router, Request, Response } from 'express';
import { calculateSafeRoute, getState } from '../services/routingService';
import { explainSimulation } from '../services/geminiService';
import { Resource, Road } from '../types';

const router = Router();

// POST /api/simulations/road-closure
router.post('/road-closure', async (req: Request, res: Response) => {
  try {
    const { roadId } = req.body as { roadId: string };
    if (typeof roadId !== 'string' || !roadId.trim()) return res.status(400).json({ success: false, error: 'roadId is required' });

    const state = getState();
    const road = state.roads.find((r: Road) => r.id === roadId);
    if (!road) return res.status(404).json({ success: false, error: `Road ${roadId} not found` });

    // BEFORE: current live state
    const routeBefore = calculateSafeRoute('node-inter-2', 'node-resident');
    const accessibleBefore = state.resources.filter(
      (r: Resource) => r.status === 'open' || r.status === 'available'
    ).length;

    const before = {
      distanceKm: routeBefore?.distanceKm ?? 0,
      estimatedTimeMin: routeBefore?.estimatedTimeMin ?? 0,
      accessibleResources: accessibleBefore,
    };

    // AFTER: simulate by adding this road to blocked list (does NOT mutate live state)
    const routeAfter = calculateSafeRoute('node-inter-2', 'node-resident', [roadId]);
    const accessibleAfter = state.resources.filter(
      (r: Resource) =>
        (r.status === 'open' || r.status === 'available') &&
        r.nodeId !== road.from && r.nodeId !== road.to
    ).length;

    const after = {
      distanceKm: routeAfter?.distanceKm ?? 0,
      estimatedTimeMin: routeAfter?.estimatedTimeMin ?? 0,
      accessibleResources: Math.max(0, accessibleAfter),
    };

    // Resources near the closed road
    const affectedResourceIds = state.resources
      .filter((r: Resource) => r.nodeId === road.from || r.nodeId === road.to)
      .map((r: Resource) => r.id);

    // Gemini plain-language explanation
    const explanation = await explainSimulation(
      `Closing road ${roadId}`,
      before,
      after,
      affectedResourceIds
    );

    return res.json({
      success: true,
      scenarioLabel: `Closure of ${roadId}`,
      before,
      after,
      newRoute: routeAfter,
      affectedResourceIds,
      explanation,
    });
  } catch (err) {
    console.error('Road-closure simulation failed:', err);
    return res.status(500).json({ success: false, error: 'Unable to run the simulation right now. Please try again.' });
  }
});

export default router;
