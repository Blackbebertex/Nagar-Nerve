import axios from 'axios';
import { AnalyzeResponse, SimulationResult, NeighborhoodState } from '../types';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
  timeout: 15000,
});

export async function analyzeIncident(
  text: string,
  location: string,
  imageBase64?: string
): Promise<AnalyzeResponse> {
  const { data } = await API.post<AnalyzeResponse>('/api/incidents/analyze', {
    text,
    location,
    imageBase64,
  });
  return data;
}

export async function simulateRoadClosure(roadId: string): Promise<SimulationResult> {
  const { data } = await API.post<SimulationResult>('/api/simulations/road-closure', { roadId });
  return data;
}

export async function getNeighborhoodState(): Promise<NeighborhoodState> {
  const { data } = await API.get<{ success: boolean; state: NeighborhoodState }>('/api/neighborhood/state');
  return data.state;
}

export async function getDemoNeighborhoodState(): Promise<NeighborhoodState> {
  const response = await fetch('/demoState.json');
  if (!response.ok) {
    throw new Error('Demo neighborhood data is unavailable');
  }
  return response.json() as Promise<NeighborhoodState>;
}

export async function resetDemo(): Promise<void> {
  await API.post('/api/neighborhood/reset');
}

export async function checkHealth(): Promise<boolean> {
  try {
    await API.get('/api/health');
    return true;
  } catch {
    return false;
  }
}
