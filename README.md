# Bullion Analysis

A scheduled job that answers one question every morning, without anyone running it:

> Gold is $X an ounce. The rupee is Y. **So what should a tola cost in Kathmandu today —
> and what is FENEGOSIDA actually charging?**

It runs on GitHub Actions, so it works with your machine switched off. The repository
is also the database: every day's record is committed back here, which means the price
history survives, diffs cleanly, and needs no server.

---

## What it tells you

**1. The indicated rate.** Today's world spot price and today's NRB rupee, carried
through the measured local markup. When FENEGOSIDA is closed for Tihar, this is the
number that says where the rate *should* reopen.

**2. The markup, measured not assumed.** The published Nepali rate against raw
international parity for the same day. Typically +20-22% — customs duty, VAT, import
cost and dealer margin, combined.

**3. Whether that markup is unusual.** Its percentile against its own history. This is
the actionable part, and it needs no assumption about the tax code: a markup in its 90th
percentile is a poor moment to buy whatever the duty happens to be.

**4. What actually moved.** A rupee price rise looks like a gold rally even when gold
fell and the rupee merely weakened. The report separates the three causes and names the
dominant one.

---

## The live Nepali rate

FENEGOSIDA prints once a day and then sits still. The world price does not. So the
dashboard polls spot every 60 seconds in the browser and carries each tick through
Nepal's costs, giving a live rupee rate for **both metals** between prints.

Two figures per metal, and the difference matters:

- **Market rate** (the headline) applies the markup *measured* against FENEGOSIDA.
  That markup already contains duty, VAT and margin, so this number assumes nothing
  about any of them.
- **Statutory build-up** adds each cost explicitly from `config/parameters.json`.
  For gold this is an independent calculation and the two currently agree to within
  0.1pp. For silver the duty was back-solved from observed prices, so its ladder
  *describes* the markup rather than confirming it — the dashboard marks it with `*`.

**The rupee leg is deliberately not live.** NRB publishes once a day, so the daily
rate is the correct one to hold until tomorrow's run. Only the metal price ticks.

Polling pauses when the tab is hidden and resumes on return. If the feed fails the
page keeps the last good number and says how old it is, rather than blanking out; if
it never connects at all, it falls back to the figures the scheduled run computed.

### Why not goldprice.org / silverprice.org

Their backend (`data-asg.goldprice.org`) returns **HTTP 403 to any non-browser
request**, with or without a Referer — it is Cloudflare-protected and cannot be read
from a static page or a CI runner. `api.gold-api.com` carries the same XAU/XAG spot
feed those sites display, sends `Access-Control-Allow-Origin: *`, and is already the
collector's primary source — so the live ticker and the committed daily record can
never disagree about where spot was.

## The one-week outlook

`npm run forecast` projects the Nepali rate five sessions out. The design rests on one
admission and one real edge.

**The admission:** at a one-week horizon world gold is close to a random walk. So it is
given **no drift** — its central case is where it is now. Any model quoting a single
number for gold next Friday is inventing precision.

**The edge:** the Nepali markup is forecastable in a way world gold is not, and both of
its properties are measured from this repo's own history on every run.

| Property | Measured | Meaning |
|---|---|---|
| Mean reversion | AR(1) φ ≈ 0.86, half-life ≈ 4.6 sessions, R² ≈ 0.67 | Roughly half of any markup stretch decays within a week |
| Stickiness | corr(spot move, markup change) ≈ **−0.52** | Local dealers follow world moves only partly, so the markup absorbs ~0.64pp of every 1% spot move |

Stickiness is why the Nepali rate is **less volatile than world gold**, and including that
covariance narrows the band by ~30% against treating the two legs as independent. No
generic gold forecast can see it, because it only exists in the gap between a world price
and a local print.

### The band is back-tested, and the result is printed whether it flatters or not

The method is walked through history, refitting at each step on only the data available
at that point:

| | Claimed | Realised |
|---|---:|---:|
| 68% band contained the outcome | 68% | **70%** |
| 95% band contained the outcome | 95% | **94.3%** |

Median absolute error 1.84% over 140 tests. If a future run comes out miscalibrated the
report says so in bold rather than quietly presenting the band anyway — that check is the
point of including it.

### Two traps this had to avoid

**Technicals are computed on a continuous Yahoo series**, not on `history.ndjson`. That
file splices backfilled COMEX futures onto live spot, and a moving average turns that
small step into a signal that is not there.

**Seasonality is measured on deviations, with the post-duty-change window excluded.** On
raw markup the table showed ~10% for Jan–May and ~20% for Jun–Oct, which looks like a
powerful summer seasonal and is entirely the 1 June duty step. Even on deviations the
step leaks for a further 60 observations while the trailing median absorbs it. With both
corrections the remaining monthly pattern is ±1.5pp — i.e. noise, which is the honest
answer with one year of data.

## The one distinction that matters

Two kinds of number live in this repo and they are never mixed:

| | How it is produced | Depends on assumptions? |
|---|---|---|
| **Parity, markup, percentile** | Measured from published prices | **No** |
| **The cost ladder** (duty → VAT → margin) | Assembled from `config/parameters.json` | **Yes** |

The ladder exists to explain *where* the markup goes. If its duty figure is wrong, the
explanation is wrong and the signal is untouched. Edit the assumptions freely.

As a sanity check, the ladder currently totals +22.5% against a markup independently
measured at +22.4% — which suggests the duty assumption is close, but does not confirm it.
Anything in the ladder marked `verified: false` is exactly that.

---

## Correctness notes, learned the hard way

**Never compare today's spot against a stale Nepali rate.** FENEGOSIDA stops publishing
over Dashain and Tihar. Pairing today's gold price with a rate printed three days ago
does not measure a markup, it measures how far gold moved in between — during the
November 2026 close that error was ~7 percentage points. A day only enters the premium
series when `staleDays === 0`.

**Rank within a tax regime, not across one.** Nepal changes gold duty by Finance Act and
the markup then steps to a new level permanently. A step of +9.4pp was detected around
**2026-06-01** (markup +12.0% → +21.3%). Ranking today against a 365-day window that
straddles it would report "92nd percentile" when the honest answer within the current
regime is 83rd. The analysis finds the break and ranks only after it.

**Stamp records in Kathmandu time.** The job fires at 05:15 UTC; naive UTC dating puts
records on the wrong day near midnight.

**`ratehistory` is broken upstream.** FENEGOSIDA's bulk history endpoint returns HTTP 500
for every parameter value. Backfill therefore walks `datewisehistory` one date at a time,
throttled. Do not spend time looking for a bulk route — it is not that it is undocumented,
it is that it does not work.

---

## Data sources

| Leg | Source | Key? |
|---|---|---|
| Nepali gold & silver | `api.fenegosida.org/api/website/v1/Dashboard/today` | no |
| International spot | `api.gold-api.com/price/XAU` · `/XAG` | no |
| Spot fallback + history | Yahoo `GC=F` / `SI=F` | no |
| USD/NPR, INR peg | Nepal Rastra Bank official forex API | no |

No account, no API key, no paid tier anywhere in the pipeline.

The spot fallback is COMEX **futures**, which trade slightly above spot. When it is used,
the run flags `spot-degraded-to-futures` and the report says so, because every rupee
figure is then marginally overstated.

---

## Schedule

| Workflow | When | Does |
|---|---|---|
| `daily.yml` | 05:15 UTC / 11:00 NPT daily | fetch → analyse → outlook → commit → publish dashboard → email **only if flagged** |
| `weekly.yml` | 05:45 UTC Sunday | the digest that always arrives |

The daily job stays quiet by design. A mail that says "gold did nothing again" trains you
to ignore the one that matters, so it only writes when `premium-high`, `premium-low`,
`big-daily-move` or `reprice-pending` fires.

---

## Running it yourself

```bash
npm run fetch          # today's three legs -> data/history.ndjson
npm run analyse        # -> data/analysis.json, reports/<date>.md, site/analysis.json
npm run forecast       # -> data/forecast.json, reports/forecast-latest.md
npm run serve          # dashboard at http://localhost:4010
npm run backfill 365   # one-time history build (slow: one request per date)
npm run notify -- --dry-run   # render the email without sending
```

Only `notify` has a dependency (nodemailer). Fetching and analysis run on the Node
standard library alone, so the pipeline works before email is ever configured.

## Email setup

Set these as repository secrets — **Settings → Secrets and variables → Actions**. They are
read from the environment and never stored in this repo:

`SMTP_HOST` · `SMTP_PORT` · `SMTP_USER` · `SMTP_PASS` · `MAIL_TO` · `MAIL_FROM`

With no `SMTP_HOST` set, both workflows skip the email step and everything else still runs.

---

## Layout

```
config/parameters.json   assumptions and thresholds - the only file to edit
lib/sources.mjs          the four fetchers, each with its own asOf
lib/parity.mjs           the maths: parity, cost ladder, percentile, attribution
lib/store.mjs            NDJSON history, one line per day
scripts/fetch.mjs        daily collector
scripts/analyse.mjs      the read
scripts/forecast.mjs     the one-week outlook, with its own back-test
lib/technical.mjs        SMA, RSI, realised vol, swing levels
lib/forecast.mjs         AR(1) reversion, stickiness, the cone, the back-test
scripts/backfill.mjs     one-time history builder
scripts/notify.mjs       email
site/index.html          dashboard, dependency-free, published to Pages
data/history.ndjson      the dataset
reports/<date>.md        dated written reports
```

---

Information only. Not investment advice. Dealer buy/sell spreads are real and are not
reflected in any figure here — gold is a hold-for-years asset in Nepal, not a trade.
