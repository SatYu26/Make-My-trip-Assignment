const FlightSearchService = require('./FlightSearchService');
const assert = require('assert');

test('should return flight search results', async () => {
    const results = await FlightSearchService.searchFlights('NYC', 'LAX', '2023-10-01');
    assert(Array.isArray(results));
    assert(results.length > 0);
});

test('should return empty array for no flights', async () => {
    const results = await FlightSearchService.searchFlights('XYZ', 'ABC', '2023-10-01');
    assert(Array.isArray(results));
    assert.strictEqual(results.length, 0);
});