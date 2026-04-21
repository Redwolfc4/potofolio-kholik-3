import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * k6 Load Test Script
 * 
 * Environment Variables:
 * - BASE_URL: The target URL to test (default: http://localhost:3000)
 * - VUS: Number of virtual users
 * - DURATION: Duration of the test
 */

export const options = {
    stages: [
        { duration: '1m', target: 10 },    // Warm up
        { duration: '1m', target: 50 },
        { duration: '1m', target: 100 },
        { duration: '2m', target: 1000 },
        { duration: '2m', target: 1500 },
        { duration: '5m', target: 10000 }, // Peak load
        { duration: '2m', target: 1500 },
        { duration: '2m', target: 1000 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 0 },    // Gradual ramp down
    ],
    thresholds: {
        http_req_failed: ['rate<0.05'], // Allow up to 5% errors during extreme stress
        http_req_duration: ['p(95)<1000', 'p(99)<3000'], // Relaxed durations for high load
    },
    tags: {
        project: 'potofolio-kholik-3',
        test_type: 'ramping-load-test',
    },
};

export default function () {
    const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
    
    // Scenarios: Hit main pages
    const responses = http.batch([
        ['GET', `${baseUrl}/`, null, { tags: { name: 'Homepage' } }],
    ]);
    
    const res = responses[0];

    check(res, {
        'homepage status is 200': (r) => r && r.status === 200,
        'homepage body exists': (r) => r && r.body !== undefined && r.body !== null,
        'homepage body size > 0': (r) => r && r.body && r.body.length > 0,
    });

    sleep(1);
}
