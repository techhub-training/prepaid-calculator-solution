// Straight-line amortization of a prepaid expense, worked in whole cents so the schedule always adds up.
// Every month gets the total divided by the number of months, rounded to the cent; the last month gets
// whatever is left, so the rounding difference lands there and the balance ends at exactly 0.00.
function amortize(totalCost, firstMonth, months) {
  const total = Math.round(Number(totalCost) * 100);           // cents
  const n = Number(months);
  if (!(total > 0)) throw new Error('Total cost must be more than 0.');
  if (!Number.isInteger(n) || n < 1 || n > 120) throw new Error('Months must be a whole number from 1 to 120.');
  const m = /^(\d{4})-(\d{2})$/.exec(String(firstMonth));
  if (!m || +m[2] < 1 || +m[2] > 12) throw new Error('First month must look like 2026-11.');
  const each = Math.round(total / n);
  let year = +m[1], month = +m[2], left = total;
  const rows = [];
  for (let i = 1; i <= n; i++) {
    const amt = i < n ? each : left;
    left -= amt;
    rows.push({ month: `${year}-${String(month).padStart(2, '0')}`, amortization: amt / 100, remaining: left / 100 });
    month += 1; if (month > 12) { month = 1; year += 1; }
  }
  return rows;
}

function toCsv(rows) {
  return 'Month,Amortization,RemainingBalance\n' + rows.map(r => `${r.month},${r.amortization.toFixed(2)},${r.remaining.toFixed(2)}`).join('\n') + '\n';
}

if (typeof module !== 'undefined') module.exports = { amortize, toCsv };
