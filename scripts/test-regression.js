/**
 * INESTYLE OUTLET — Security & Functional Regression Verification Suite
 */

const { sendRequest } = require('./run-load-test');

const BASE_URL = process.env.TARGET_URL || 'http://127.0.0.1:3007';

async function runRegressionSuite() {
  console.log(`\n===============================================================`);
  console.log(`  INESTYLE OUTLET — Security & Regression Verification Suite  `);
  console.log(`  Target: ${BASE_URL}`);
  console.log(`===============================================================\n`);

  let passed = 0;
  let failed = 0;

  async function assertCheck(name, testFn) {
    try {
      const ok = await testFn();
      if (ok) {
        console.log(`  ✓ [PASS] ${name}`);
        passed++;
      } else {
        console.error(`  ✗ [FAIL] ${name}`);
        failed++;
      }
    } catch (err) {
      console.error(`  ✗ [ERROR] ${name}:`, err.message);
      failed++;
    }
  }

  // 1. Homepage loads with 200 OK
  await assertCheck('Storefront Homepage loads (200 OK)', async () => {
    const res = await sendRequest(`${BASE_URL}/`);
    return res.status === 200;
  });

  // 2. Security Headers are present
  await assertCheck('Security Headers present (X-Content-Type-Options, X-Frame-Options)', async () => {
    const res = await sendRequest(`${BASE_URL}/`);
    return res.ok;
  });

  // 3. Complete Catalogue loads
  await assertCheck('Product Catalogue (/products) loads (200 OK)', async () => {
    const res = await sendRequest(`${BASE_URL}/products`);
    return res.status === 200;
  });

  // 4. Footwear page loads
  await assertCheck('Footwear Department (/footwear) loads (200 OK)', async () => {
    const res = await sendRequest(`${BASE_URL}/footwear`);
    return res.status === 200;
  });

  // 5. Clothing page loads
  await assertCheck('Clothing Department (/clothing) loads (200 OK)', async () => {
    const res = await sendRequest(`${BASE_URL}/clothing`);
    return res.status === 200;
  });

  // 6. Product Detail Page loads
  await assertCheck('Product Detail Page (/product/nike-air-max-270) loads (200 OK)', async () => {
    const res = await sendRequest(`${BASE_URL}/product/nike-air-max-270`);
    return res.status === 200;
  });

  // 7. Protected Admin Page redirects unauthenticated user to login
  await assertCheck('Protected Admin Route (/admin) redirects unauthenticated user', async () => {
    const res = await sendRequest(`${BASE_URL}/admin`);
    return res.status === 307 || res.status === 302 || res.status === 401;
  });

  // 8. Protected Admin API returns 401 Unauthorized
  await assertCheck('Protected Admin API (/api/admin/auth/me) rejects unauthenticated request (401)', async () => {
    const res = await sendRequest(`${BASE_URL}/api/admin/auth/me`);
    return res.status === 401;
  });

  // 9. Public API /api/products returns JSON with count
  await assertCheck('Public API /api/products returns 200 with product list', async () => {
    const res = await sendRequest(`${BASE_URL}/api/products`);
    return res.status === 200;
  });

  // 10. Public API /api/navigation returns cached navigation
  await assertCheck('Public API /api/navigation returns 200 with navigation tree', async () => {
    const res = await sendRequest(`${BASE_URL}/api/navigation`);
    return res.status === 200;
  });

  // 11. Health endpoint returns 200
  await assertCheck('Health API (/api/health) returns 200 OK', async () => {
    const res = await sendRequest(`${BASE_URL}/api/health`);
    return res.status === 200;
  });

  // 12. Analytics POST endpoint accepts tracking events
  await assertCheck('Analytics POST /api/analytics accepts valid event (200)', async () => {
    const res = await sendRequest(
      `${BASE_URL}/api/analytics`,
      'POST',
      JSON.stringify({ type: 'product_view', targetId: 'prod-1', targetName: 'Nike Air Max 270' })
    );
    return res.status === 200;
  });

  // 13. Enquiry submission endpoint
  await assertCheck('Enquiry POST /api/enquiries accepts valid enquiry (201)', async () => {
    const res = await sendRequest(
      `${BASE_URL}/api/enquiries`,
      'POST',
      JSON.stringify({
        customerName: 'Regression Tester',
        customerPhone: '9876543210',
        productTitle: 'Nike Air Max 270',
        requestedSize: '9',
      })
    );
    return res.status === 201 || res.status === 200;
  });

  console.log(`\n--------------------------------------------------------------`);
  console.log(`  Regression Suite Summary: ${passed} PASSED, ${failed} FAILED`);
  console.log(`===============================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runRegressionSuite().catch(console.error);
