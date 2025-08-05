import { exec } from 'child_process';
import path from 'path';

const services = [
    'api-gateway',
    'flight-search-service',
    'booking-service',
    'seat-service',
    'payment-service',
    'discount-service',
    'ticket-service',
    'notification-service',
    'auth-service'
];

const runTests = (service: string): Promise<void> => {
    const cwd = path.join(__dirname, service);
    return new Promise((resolve, reject) => {
        console.log(`\n🔍 Running tests in ${service}...\n`);

        exec('npx jest --passWithNoTests --silent=false', { cwd }, (error, stdout, stderr) => {
            console.log(stdout);
            if (error) {
                console.error(`❌ Tests failed in ${service}`);
                console.error(stderr);
                reject(error);
            } else {
                console.log(`✅ Tests passed in ${service}`);
                resolve();
            }
        });
    });
};

(async () => {
    let failed = false;

    for (const service of services) {
        try {
            await runTests(service);
        } catch {
            failed = true;
        }
    }

    if (failed) {
        console.error('\n❌ Some tests failed.\n');
        process.exit(1);
    } else {
        console.log('\n🎉 All tests passed.\n');
        process.exit(0);
    }
})();
