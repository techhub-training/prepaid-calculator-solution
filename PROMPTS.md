# Prompts that work for this challenge

The pattern matters more than the wording: **give the rules, give a test case with its answer, then check.**

## 1. The spec

> Build a single-page web app (plain HTML, CSS and JavaScript, no frameworks, no build step) that calculates a
> straight-line amortization schedule for a prepaid expense. Inputs: prepaid ID, total cost, first month (YYYY-MM),
> number of months (1–120). Each month's amortization is the total divided by the number of months, rounded to the
> cent; the last month takes the rounding difference so the schedule adds up exactly. Show a table with Month,
> Amortization and Remaining balance, and a button that downloads a CSV with the columns
> Month,Amortization,RemainingBalance (months as YYYY-MM, amounts with two decimals, no $ or thousands separators).
> Put the calculation in its own file, amortize.js, separate from the page code.

## 2. A test case with the answer

> Check it against this case: 8280.00 over 7 months starting 2026-11. The months should be 2026-11 through 2027-05,
> six months of 1182.86 and a last month of 1182.84, ending at 0.00. Write tests/amortize.test.js that checks this
> and runs with plain `node`.

## 3. Mistakes to look for in AI-written finance code

* **Floating point.** Adding dollars as decimals gives balances like `-0.0000000001` and amounts like
  `1182.8600000000001`. Fix: *"Do the arithmetic in whole cents (integers) and convert to dollars only for display."*
* **Rounding down instead of rounding.** `Math.floor` or `toFixed` on a truncated value gives 1182.85 here instead of 1182.86.
* **Dates.** Building month labels with `new Date(...)` can shift a month for users west of UTC, or fail to roll
  12 over to the next year. Fix: *"Count year and month as integers; don't use Date for month labels."*
* **The last month.** Paying the same amount every month leaves a few cents unamortized (or over-amortized).

`amortize.js` in this repository avoids all four; `tests/amortize.test.js` checks them.
