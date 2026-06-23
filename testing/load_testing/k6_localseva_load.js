import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 }, // Ramp up to 100 VUs
    { duration: '1m', target: 100 },  // Sustained load
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<1000', 'avg<500'], // 95% of requests should be below 1000ms
  },
};

const BASE_URL = 'http://localhost:8000/api/v1';

export default function () {
  // 1. Authentication Module
  let loginRes = http.post(`${BASE_URL}/login`, JSON.stringify({ userId: "1781096350731" }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(loginRes, { 'Login status is 200': (r) => r.status === 200 });
  sleep(1);

  // 2. Dashboard
  let dashRes = http.get(`${BASE_URL}/dashboard`);
  check(dashRes, { 'Dashboard status is 200': (r) => r.status === 200 });
  sleep(1);

  // 3. Service Discovery
  let searchRes = http.get(`${BASE_URL}/search-services?q=plumber`);
  check(searchRes, { 'Search status is 200': (r) => r.status === 200 });
  sleep(1);

  // 4. Booking Flow
  let bookRes = http.post(`${BASE_URL}/booking-confirmation`, JSON.stringify({ serviceId: "123" }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(bookRes, { 'Booking status is 201': (r) => r.status === 201 || r.status === 200 });
  sleep(1);
}
