/**
 * INESTYLE OUTLET — Load Testing & Concurrency Benchmark Harness
 * 
 * Replicates Apache JMeter profiles to measure:
 * - Samples count
 * - Average, Min, Max, Median, P90, P95, P99 response times
 * - Error rate (%)
 * - Throughput (req/sec)
 * - Bandwidth (KB/sec)
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

async function sendRequest(targetUrl, method = 'GET', postData = null, headers = {}) {
  const parsed = new URL(targetUrl);
  const client = parsed.protocol === 'https:' ? https : http;

  const defaultHeaders = {
    'User-Agent': 'Apache-JMeter-Benchmark/5.6.3',
    'Accept': 'text/html,application/xhtml+xml,application/json,*/*',
    ...headers,
  };

  if (postData) {
    defaultHeaders['Content-Type'] = 'application/json';
    defaultHeaders['Content-Length'] = Buffer.byteLength(postData);
  }

  const options = {
    protocol: parsed.protocol,
    hostname: parsed.hostname,
    port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
    path: parsed.pathname + parsed.search,
    method: method,
    headers: defaultHeaders,
    timeout: 30000,
  };

  return new Promise((resolve) => {
    const startTime = process.hrtime.bigint();
    const req = client.request(options, (res) => {
      let bodyBytes = 0;
      res.on('data', (chunk) => {
        bodyBytes += chunk.length;
      });
      res.on('end', () => {
        const endTime = process.hrtime.bigint();
        const durationMs = Number(endTime - startTime) / 1e6;
        resolve({
          status: res.statusCode,
          ok: res.statusCode >= 200 && res.statusCode < 400,
          durationMs,
          bytes: bodyBytes,
          error: null,
        });
      });
    });

    req.on('timeout', () => {
      req.destroy();
      const endTime = process.hrtime.bigint();
      const durationMs = Number(endTime - startTime) / 1e6;
      resolve({
        status: 408,
        ok: false,
        durationMs,
        bytes: 0,
        error: 'REQUEST_TIMEOUT',
      });
    });

    req.on('error', (err) => {
      const endTime = process.hrtime.bigint();
      const durationMs = Number(endTime - startTime) / 1e6;
      resolve({
        status: 0,
        ok: false,
        durationMs,
        bytes: 0,
        error: err.message,
      });
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

function calculatePercentiles(latencies) {
  if (latencies.length === 0) return { min: 0, max: 0, avg: 0, median: 0, p90: 0, p95: 0, p99: 0 };
  const sorted = [...latencies].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const avg = sum / sorted.length;
  const p = (pct) => sorted[Math.min(sorted.length - 1, Math.floor((pct / 100) * sorted.length))];

  return {
    min: Math.round(sorted[0]),
    max: Math.round(sorted[sorted.length - 1]),
    avg: Math.round(avg),
    median: Math.round(p(50)),
    p90: Math.round(p(90)),
    p95: Math.round(p(95)),
    p99: Math.round(p(99)),
  };
}

async function runLoadProfile({ targetUrl, concurrency = 1, totalRequests = 100, method = 'GET', postData = null, label = 'Test' }) {
  console.log(`\n--------------------------------------------------------------`);
  console.log(`▶ Starting Benchmark: ${label}`);
  console.log(`  Target:      ${targetUrl}`);
  console.log(`  Concurrency: ${concurrency} simultaneous workers`);
  console.log(`  Total Req:   ${totalRequests} requests`);
  console.log(`--------------------------------------------------------------`);

  // Warmup request
  await sendRequest(targetUrl, method, postData);

  const results = [];
  let completed = 0;
  let inFlight = 0;
  let cursor = 0;

  const wallClockStart = process.hrtime.bigint();

  await new Promise((resolve) => {
    function launchNext() {
      if (completed >= totalRequests) {
        resolve();
        return;
      }
      while (inFlight < concurrency && cursor < totalRequests) {
        cursor++;
        inFlight++;
        sendRequest(targetUrl, method, postData).then((res) => {
          results.push(res);
          inFlight--;
          completed++;
          launchNext();
        });
      }
    }
    launchNext();
  });

  const wallClockEnd = process.hrtime.bigint();
  const totalWallDurationSec = Number(wallClockEnd - wallClockStart) / 1e9;

  const latencies = results.map((r) => r.durationMs);
  const stats = calculatePercentiles(latencies);
  const errors = results.filter((r) => !r.ok);
  const errorRate = ((errors.length / results.length) * 100).toFixed(2);
  const throughput = (results.length / totalWallDurationSec).toFixed(2);
  const totalBytes = results.reduce((acc, r) => acc + r.bytes, 0);
  const throughputKb = (totalBytes / 1024 / totalWallDurationSec).toFixed(2);

  console.log(`\n  RESULTS for [${label}]:`);
  console.log(`  • Samples:        ${results.length}`);
  console.log(`  • Average Time:   ${stats.avg} ms`);
  console.log(`  • Median Time:    ${stats.median} ms`);
  console.log(`  • 90th %ile:      ${stats.p90} ms`);
  console.log(`  • 95th %ile:      ${stats.p95} ms`);
  console.log(`  • 99th %ile:      ${stats.p99} ms`);
  console.log(`  • Min / Max:      ${stats.min} ms / ${stats.max} ms`);
  console.log(`  • Error Rate:     ${errorRate}% (${errors.length} failed)`);
  console.log(`  • Throughput:     ${throughput} req/sec`);
  console.log(`  • Received:       ${throughputKb} KB/sec`);

  return {
    label,
    samples: results.length,
    stats,
    errorRate,
    throughput,
    throughputKb,
  };
}

// CLI runner
async function main() {
  const baseUrl = process.env.TARGET_URL || 'http://localhost:3000';
  console.log(`Running INESTYLE OUTLET Performance Test against: ${baseUrl}\n`);

  // Profile A: 1 concurrent user, 10 samples
  await runLoadProfile({
    targetUrl: `${baseUrl}/`,
    concurrency: 1,
    totalRequests: 10,
    label: 'Profile A (1 user, Homepage)',
  });

  // Profile B: 10 concurrent users, 100 samples
  await runLoadProfile({
    targetUrl: `${baseUrl}/`,
    concurrency: 10,
    totalRequests: 100,
    label: 'Profile B (10 concurrent users, Homepage)',
  });

  // Profile C: 25 concurrent users, 250 samples
  await runLoadProfile({
    targetUrl: `${baseUrl}/`,
    concurrency: 25,
    totalRequests: 250,
    label: 'Profile C (25 concurrent users, Homepage)',
  });

  // Profile D: 50 concurrent users, 500 samples
  await runLoadProfile({
    targetUrl: `${baseUrl}/`,
    concurrency: 50,
    totalRequests: 500,
    label: 'Profile D (50 concurrent users, Homepage)',
  });

  // API Profiles
  await runLoadProfile({
    targetUrl: `${baseUrl}/api/products`,
    concurrency: 10,
    totalRequests: 100,
    label: 'API Profile: GET /api/products',
  });

  await runLoadProfile({
    targetUrl: `${baseUrl}/api/navigation`,
    concurrency: 10,
    totalRequests: 100,
    label: 'API Profile: GET /api/navigation',
  });

  await runLoadProfile({
    targetUrl: `${baseUrl}/api/analytics`,
    concurrency: 10,
    totalRequests: 50,
    method: 'POST',
    postData: JSON.stringify({ type: 'product_view', targetId: 'prod-1', targetName: 'Nike Air Max 270' }),
    label: 'API Profile: POST /api/analytics (Write Path)',
  });
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { runLoadProfile, sendRequest };
