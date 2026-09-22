import { Router, Request, Response } from 'express';
import { getState, resetState } from '../services/routingService';

const router = Router();

// GET /api/neighborhood/state — returns the live neighborhood state
router.get('/state', (_req: Request, res: Response) => {
  res.json({ success: true, state: getState() });
});

// POST /api/neighborhood/reset — resets to original seeded data
router.post('/reset', (_req: Request, res: Response) => {
  resetState();
  res.json({ success: true, message: 'Demo state reset to original.' });
});

export default router;
