// Run with: node tests/amortize.test.js   (no installs needed)
const assert = require('assert');
const { amortize, toCsv } = require('../amortize.js');
const sum = rows => Math.round(rows.reduce((s, r) => s + r.amortization * 100, 0)) / 100;

let r = amortize(8280, '2026-11', 7);                       // rounds UP to 1182.86; last month 1182.84
assert.deepStrictEqual(r.map(x => x.month), ['2026-11', '2026-12', '2027-01', '2027-02', '2027-03', '2027-04', '2027-05']);
assert.strictEqual(r[0].amortization, 1182.86); assert.strictEqual(r[6].amortization, 1182.84);
assert.strictEqual(sum(r), 8280); assert.strictEqual(r[6].remaining, 0);
r = amortize(10000, '2026-01', 3);                           // 3333.33, 3333.33, 3333.34
assert.deepStrictEqual(r.map(x => x.amortization), [3333.33, 3333.33, 3333.34]);
r = amortize(54000, '2026-01', 12); assert.ok(r.every(x => x.amortization === 4500));
r = amortize(0.05, '2026-12', 1); assert.deepStrictEqual(r, [{ month: '2026-12', amortization: 0.05, remaining: 0 }]);
assert.throws(() => amortize(0, '2026-01', 3)); assert.throws(() => amortize(100, '2026-13', 3)); assert.throws(() => amortize(100, '2026-01', 2.5));
assert.ok(toCsv(amortize(8280, '2026-11', 7)).startsWith('Month,Amortization,RemainingBalance\n2026-11,1182.86,7097.14\n'));
console.log('All tests passed.');
