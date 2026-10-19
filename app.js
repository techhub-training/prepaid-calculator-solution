// Wires the form to amortize() and draws the schedule.
const $ = id => document.getElementById(id);
const money = v => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
let lastRows = null;

function show() {
  $('error').textContent = '';
  try {
    lastRows = amortize($('total').value, $('first').value, Number($('months').value));
  } catch (e) {
    lastRows = null; $('error').textContent = e.message; $('schedule').hidden = true; $('download').disabled = true; return;
  }
  $('tbody').innerHTML = lastRows.map(r => `<tr><td>${r.month}</td><td>${money(r.amortization)}</td><td>${money(r.remaining)}</td></tr>`).join('');
  $('totalOut').textContent = money(lastRows.reduce((s, r) => s + r.amortization, 0));
  $('schedule').hidden = false; $('download').disabled = false;
}

$('form').addEventListener('submit', e => { e.preventDefault(); show(); });
$('download').addEventListener('click', () => {
  if (!lastRows) return;
  const id = ($('pid').value.trim() || 'prepaid').replace(/[^A-Za-z0-9_-]+/g, '_');
  const url = URL.createObjectURL(new Blob([toCsv(lastRows)], { type: 'text/csv' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: `${id}_schedule.csv` });
  document.body.append(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});
show();
