import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Enable CORS
app.use('/*', cors({
  origin: ['https://emdr-ai.pages.dev', 'http://localhost:3000'],
  credentials: true,
}));

// Health check
app.get('/', (c) => {
  return c.json({ 
    status: 'ok',
    service: 'EMDR-AI API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Get EMDR patterns
app.get('/api/patterns', (c) => {
  return c.json({
    patterns: [
      { id: 'horizontal', name: 'Horizontal', speed: 1.0, description: 'Classic EMDR horizontal movement' },
      { id: 'infinity', name: 'Infinity', speed: 0.8, description: 'Figure-8 pattern for smooth tracking' },
      { id: 'butterfly', name: 'Butterfly', speed: 0.6, description: 'Butterfly wing pattern' },
      { id: 'spiral', name: 'Spiral', speed: 0.7, description: 'Expanding and contracting spiral' },
      { id: 'wave', name: 'Wave', speed: 0.9, description: 'Wave-like motion' },
      { id: 'diagonal', name: 'Diagonal', speed: 0.85, description: 'Diagonal movement pattern' },
      { id: 'circular', name: 'Circular', speed: 0.75, description: 'Circular motion for relaxation' }
    ]
  });
});

// Create session
app.post('/api/sessions', async (c) => {
  const { userId, pattern, duration } = await c.req.json();
  const sessionId = crypto.randomUUID();
  
  // Store in KV
  if (c.env?.SESSIONS) {
    await c.env.SESSIONS.put(sessionId, JSON.stringify({
      userId, 
      pattern, 
      duration, 
      timestamp: Date.now(),
      status: 'active'
    }), { expirationTtl: 3600 });
  }
  
  return c.json({ 
    sessionId, 
    status: 'created',
    message: 'Session started successfully'
  });
});

// Get session
app.get('/api/sessions/:id', async (c) => {
  const sessionId = c.req.param('id');
  
  if (c.env?.SESSIONS) {
    const session = await c.env.SESSIONS.get(sessionId);
    if (session) {
      return c.json(JSON.parse(session));
    }
  }
  
  return c.json({ error: 'Session not found' }, 404);
});

// Update progress
app.post('/api/sessions/:id/progress', async (c) => {
  const sessionId = c.req.param('id');
  const { stressLevel, engagementLevel, positivityLevel } = await c.req.json();
  
  const progressData = {
    sessionId,
    stressLevel,
    engagementLevel, 
    positivityLevel,
    timestamp: Date.now()
  };
  
  // Store progress in KV
  if (c.env?.SESSIONS) {
    const key = `progress:${sessionId}:${Date.now()}`;
    await c.env.SESSIONS.put(key, JSON.stringify(progressData), { 
      expirationTtl: 86400 // 24 hours
    });
  }
  
  return c.json({ 
    status: 'recorded',
    data: progressData
  });
});

export default app;