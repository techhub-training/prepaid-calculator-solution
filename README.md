# Prepaid Amortization Calculator – TechHub solution

**Live:** https://techhub-training.github.io/prepaid-calculator-solution/

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/techhub-training/prepaid-calculator-solution?quickstart=1)

TechHub.training's solution to the vibe-coding challenge *Build a Prepaid Amortization Calculator with an AI Assistant*.
Ridgeline Home & Tool is fictional.

## Three ways to look at it

| You want to… | Do this | Needs |
|---|---|---|
| Use it | Open the **Live** link above | A browser |
| Run it and read the code without installing anything | Click **Open in GitHub Codespaces**; the preview opens by itself | A free GitHub account |
| Run it on your computer | Download the code (**Code › Download ZIP**), unzip, double-click `index.html` | A browser |

## What's in it

| File | What it does |
|---|---|
| `amortize.js` | The accounting: the schedule, worked in whole cents |
| `app.js` | Connects the form, the table and the CSV download |
| `index.html`, `style.css` | The page |
| `tests/amortize.test.js` | Checks the rules (`node tests/amortize.test.js`) |
| `PROMPTS.md` | Prompts that work for this challenge, and the mistakes AI assistants commonly make on it |
| `.devcontainer/` | The Codespaces setup: Python serves the page on port 8000 |

## The rules it implements

1. Monthly amortization = total cost ÷ number of months, **rounded to the cent**.
2. The **last month takes the rounding difference**, so the months add up to the total and the balance ends at 0.00.
3. Months run consecutively from the first month and **roll over into the next year** (2026-12, then 2027-01).
4. The CSV has the columns `Month,Amortization,RemainingBalance`, months as `YYYY-MM`, amounts with two decimals and no `$` or commas.
