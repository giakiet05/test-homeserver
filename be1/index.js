const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 4001;
const BE2_URL = process.env.BE2_URL || 'http://be2:4002';
const COMMIT_SHA = process.env.COMMIT_SHA || 'unknown';
const APP_VERSION = process.env.APP_VERSION || '6.0.0';

app.use(cors());
app.use(express.json());

app.get('/api/status', async (req, res) => {
  const startTime = Date.now();
  let be2Data = null;
  let be2Error = null;
  let be2Latency = null;

  try {
    const be2Start = Date.now();
    const response = await fetch(`${BE2_URL}/api/data`);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    be2Data = await response.json();
    be2Latency = `${Date.now() - be2Start}ms`;
  } catch (err) {
    be2Error = err.message;
  }

  const totalLatency = `${Date.now() - startTime}ms`;

  res.json({
    service: 'Backend 1 (Gateway / Aggregator)',
    version: APP_VERSION,
    commitSha: COMMIT_SHA,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    host: os.hostname(),
    totalLatency,
    be2Connection: {
      url: `${BE2_URL}/api/data`,
      status: be2Error ? 'error' : 'connected',
      latency: be2Latency,
      error: be2Error,
      response: be2Data
    }
  });
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'be1', commitSha: COMMIT_SHA }));

app.listen(PORT, () => {
  console.log(`[BE1] Gateway v${APP_VERSION} (${COMMIT_SHA}) is running on port ${PORT}`);
});
