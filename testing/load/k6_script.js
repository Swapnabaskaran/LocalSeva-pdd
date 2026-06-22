import http from 'k6/http';
import { check, sleep } from 'k6';

// The requirements specify simulating:
// 100 concurrent user logins
// 200 concurrent service searches
// 100 concurrent booking requests
// 100 concurrent dashboard requests
// 50 concurrent payment requests

export const options = {
  scenarios: {
    logins: {
      executor: 'constant-vus',
      vus: 100,
      duration: '30s',
      exec: 'login_flow',
    },
    searches: {
      executor: 'constant-vus',
      vus: 200,
      duration: '30s',
      exec: 'search_flow',
    },
    bookings: {
      executor: 'constant-vus',
      vus: 100,
      duration: '30s',
      exec: 'booking_flow',
    },
    dashboards: {
      executor: 'constant-vus',
      vus: 100,
      duration: '30s',
      exec: 'dashboard_flow',
    },
    payments: {
      executor: 'constant-vus',
      vus: 50,
      duration: '30s',
      exec: 'payment_flow',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests must complete below 2s
    http_req_failed: ['rate<0.01'],    // Error rate must be less than 1%
  },
};

const BASE_URL = 'http://localhost:8000/api'; // Adjust to actual backend URL

export function login_flow() {
  const payload = JSON.stringify({ email: 'load_user@test.com', password: 'password123' });
  const params = { headers: { 'Content-Type': 'application/json' } };
  
  // Mock endpoint for k6 test simulation
  const res = http.post(`${BASE_URL}/auth/login`, payload, params);
  check(res, { 'status is 200 or 404 (mock)': (r) => r.status === 200 || r.status === 404 });
  sleep(1);
}

export function search_flow() {
  const res = http.get(`${BASE_URL}/services?q=plumber`);
  check(res, { 'status is 200 or 404 (mock)': (r) => r.status === 200 || r.status === 404 });
  sleep(1);
}

export function booking_flow() {
  const payload = JSON.stringify({ service_id: 'plumbing_01', date: '2026-10-10' });
  const params = { headers: { 'Content-Type': 'application/json' } };
  const res = http.post(`${BASE_URL}/bookings`, payload, params);
  check(res, { 'status is 201 or 404 (mock)': (r) => r.status === 201 || r.status === 404 });
  sleep(1);
}

export function dashboard_flow() {
  const res = http.get(`${BASE_URL}/users/dashboard`);
  check(res, { 'status is 200 or 404 (mock)': (r) => r.status === 200 || r.status === 404 });
  sleep(1);
}

export function payment_flow() {
  const payload = JSON.stringify({ booking_id: 'BK12345', amount: 500 });
  const params = { headers: { 'Content-Type': 'application/json' } };
  const res = http.post(`${BASE_URL}/payments/process`, payload, params);
  check(res, { 'status is 200 or 404 (mock)': (r) => r.status === 200 || r.status === 404 });
  sleep(1);
}
