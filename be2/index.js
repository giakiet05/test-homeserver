const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
  res.json({
    service: 'Backend 2 (Core Service)',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    host: os.hostname(),
    data: {
      message: 'Greetings from deep inside the Microservice chain (BE2)!',
      randomMetric: Math.floor(Math.random() * 100) + 1,
      environment: process.env.NODE_ENV || 'production'
    }
  });
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'be2' }));

app.listen(PORT, () => {
  console.log(`[BE2] Service is running on port ${PORT}`);
});
