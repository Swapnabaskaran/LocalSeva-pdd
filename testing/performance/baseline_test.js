import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuration for Baseline / Load Testing
export const options = {
  // 100 virtual users running continuously for 1 minute
  vus: 100,
  duration: '1m',
  
  // Define thresholds to automatically fail the test if metrics aren't met
  thresholds: {
    // 95% of requests must complete within 500ms
    http_req_duration: ['p(95)<500'], 
    // Failure rate must be less than 1%
    http_req_failed: ['rate<0.01'],   
  },
};

export default function () {
  // Target API - using a public sample API for reliable CI/CD execution
  // You can change this to your LocalSeva API endpoint (e.g., 'http://localhost:8000/api/health')
  const targetUrl = 'https://test-api.k6.io/public/crocodiles/';

  // Perform a GET request
  const res = http.get(targetUrl);

  // Assertions
  check(res, {
    'is status 200': (r) => r.status === 200,
    'response time < 1500ms': (r) => r.timings.duration < 1500,
  });

  // Short pause between iterations to simulate real user think time
  // Sleep 1 second ensures we aren't just DDOS'ing, but simulating sustained active users
  sleep(1);
}
