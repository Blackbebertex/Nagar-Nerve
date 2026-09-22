import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateSafeRoute, getState, resetState } from './routingService';

test('calculates a route that excludes seeded blocked roads', () => {
  resetState();
  const route = calculateSafeRoute('node-inter-2', 'node-resident');

  assert.ok(route, 'a safe route should exist in the demo neighborhood');
  const blockedRoadIds = new Set(getState().roads.filter((road) => road.status === 'blocked').map((road) => road.id));
  assert.ok(route.roads.length > 0, 'the route should contain road segments');
  assert.ok(route.roads.every((roadId) => !blockedRoadIds.has(roadId)), 'the route must not use blocked roads');
  assert.ok(route.distanceKm > 0);
  assert.ok(route.estimatedTimeMin > 0);
});

test('treats an explicitly closed route segment as impassable without mutating seeded state', () => {
  resetState();
  const originalRoads = getState().roads.map((road) => ({ ...road }));
  const route = calculateSafeRoute('node-inter-2', 'node-resident', ['road-08']);

  assert.ok(route, 'an alternate route should remain available in the demo graph');
  assert.ok(!route.roads.includes('road-08'), 'the simulated closure must be excluded from the route');
  assert.deepEqual(getState().roads, originalRoads, 'a simulation must not mutate live neighborhood data');
});
