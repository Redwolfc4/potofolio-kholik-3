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
    vus: __ENV.VUS || 10,
    duration: __ENV.DURATION || '30s',
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<500', 'p(99)<1500'], // 95% of requests < 500ms, 99% < 1.5s
    },
    tags: {
        project: 'potofolio-kholik-3',
        test_type: 'load-test',
    },
};

export default function () {
    const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
    
    // Scenarios: Hit main pages
    const responses = http.batch([
        ['GET', `${baseUrl}/`, null, { tags: { name: 'Homepage' } }],
    ]);
    
    check(responses[0], {
        'homepage status is 200': (r) => r.status === 200,
        'homepage body size > 0': (r) => r.body.length > 0,
    });

    sleep(1);
}
