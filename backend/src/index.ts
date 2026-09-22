import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import incidentRoutes from './routes/incidents';
import simulationRoutes from './routes/simulations';
import neighborhoodRoutes from './routes/neighborhood';

const app = express();

const frontendOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost',
  'capacitor://localhost',
].filter((origin): origin is string => Boolean(origin));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || frontendOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Origin is not allowed by CORS'));
  },
}));
app.use(express.json({ limit: '10mb' })); // allow image uploads

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/incidents',    incidentRoutes);
app.use('/api/simulations',  simulationRoutes);
app.use('/api/neighborhood', neighborhoodRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Nagar Nerve Backend',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

const PORT = Number(process.env.PORT ?? 3001);
app.listen(PORT, () => {
  console.log(`\n🌐 Nagar Nerve Backend running on http://localhost:${PORT}`);
  console.log(`   Gemini configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
  console.log(`   Environment: ${process.env.NODE_ENV ?? 'development'}\n`);
});
