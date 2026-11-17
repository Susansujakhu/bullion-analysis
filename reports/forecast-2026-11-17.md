# One-week outlook - from 2026-11-17

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,67,200 | NPR 3,490 |
| **Central, 5 sessions** | **NPR 2,66,015** | **NPR 3,428** |
| Change | -0.44% | -1.79% |
| 68% band | NPR 2,60,340 – NPR 2,76,144 | NPR 3,228 – NPR 3,627 |
| Markup now | +21.9% | +29.9% |
| Reversion half-life | 4.6 sessions | 1.9 sessions |
| Stickiness (corr) | -0.517 | -0.654 |
| World daily vol | 1.423% | 2.693% |
| Combined 5-session sd | ±2.99% | ±4.56% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-17) | NPR 2,67,200 | — |
| **Central, 5 sessions out** | **NPR 2,66,015** | -0.44% |
| 68% band | NPR 2,60,340 — NPR 2,76,144 | |
| 95% band | NPR 2,51,911 — NPR 2,87,563 | |

The markup is +21.92% against a trailing median of +20.90%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8601, half-life 4.6 sessions, R²=0.669). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±3.18% |
| Markup reversion | -0.54pp |
| Spot/markup correlation | -0.517 |
| **Combined sd** | **±2.99%** |
| Same, legs assumed independent | ±4.3% |

Local prices are sticky: the markup absorbs about 0.64pp of every 1% world move in the opposite direction, narrowing the band by 30.3% and leaving the Nepali rate 5.9% less volatile than the world price itself.

**Back-test** (113 tests, refit at each step on data available then): the 68% band held **58.4%**, the 95% band **92.9%**. Median absolute error 2.15%, worst 8.9%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 69.2% and 94.4%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 113 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3674.6 | +24.6% | **NPR 2,59,359** | -2.9% |
| -2% | $3790.6 | +22.7% | **NPR 2,63,435** | -1.4% |
| 0% | $3868 | +21.4% | **NPR 2,66,013** | -0.4% |
| +2% | $3945.4 | +20.1% | **NPR 2,68,478** | +0.5% |
| +5% | $4061.4 | +18.2% | **NPR 2,71,966** | +1.8% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-17) | $3,868 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $4,006 / $4,158 / $4,464 |
| Distance from 50 / 200-day | -7.0% / -13.4% |
| RSI(14) | 36 (neutral) |
| Realised vol, 30d / 90d | 1.42% / 1.38% |
| Resistance above | $4,115, $4,152, $4,168 |
| Support below | **none** — at or below every swing low in the lookback |

These describe the chart. At a one-week horizon the volatility estimate carries far more information than any level here, which is why the projection uses the former and merely reports the latter.
</details>

<details><summary>Monthly pattern in the markup (weak evidence)</summary>

Deviation from each observation's own trailing median, in percentage points.

| Month | vs its own normal | Observations |
|---|---:|---:|
| Feb | +0.06pp | 13 |
| Mar | +1.32pp | 21 |
| Apr | +0.52pp | 21 |
| May | +0.50pp | 20 |
| Aug | -0.50pp | 4 |
| Sep | -0.38pp | 21 |
| Oct | +0.90pp | 18 |
| Nov | +1.55pp | 10 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-17) | NPR 3,490 | — |
| **Central, 5 sessions out** | **NPR 3,428** | -1.79% |
| 68% band | NPR 3,228 — NPR 3,627 | |
| 95% band | NPR 3,081 — NPR 3,803 | |

The markup is +29.87% against a trailing median of +27.10%; history says about 85% of that gap decays within 5 sessions (AR(1) φ=0.6885, half-life 1.9 sessions, R²=0.376). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±6.02% |
| Markup reversion | -2.34pp |
| Spot/markup correlation | -0.654 |
| **Combined sd** | **±4.56%** |
| Same, legs assumed independent | ±7.35% |

Local prices are sticky: the markup absorbs about 0.91pp of every 1% world move in the opposite direction, narrowing the band by 37.9% and leaving the Nepali rate 24.2% less volatile than the world price itself.

**Back-test** (113 tests, refit at each step on data available then): the 68% band held **60.2%**, the 95% band **94.7%**. Median absolute error 4.55%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 54.5% and 87.4%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 113 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $45.06 | +32.1% | **NPR 3,372** | -3.4% |
| -2% | $46.48 | +29.3% | **NPR 3,406** | -2.4% |
| 0% | $47.43 | +27.5% | **NPR 3,427** | -1.8% |
| +2% | $48.38 | +25.7% | **NPR 3,446** | -1.3% |
| +5% | $49.8 | +23.0% | **NPR 3,470** | -0.6% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-17) | $47.49 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $51.72 / $57.71 / $68.08 |
| Distance from 50 / 200-day | -17.7% / -30.2% |
| RSI(14) | 32 (neutral) |
| Realised vol, 30d / 90d | 2.69% / 2.39% |
| Resistance above | $52.56, $60.02, $61.17 |
| Support below | **none** — at or below every swing low in the lookback |

These describe the chart. At a one-week horizon the volatility estimate carries far more information than any level here, which is why the projection uses the former and merely reports the latter.
</details>

<details><summary>Monthly pattern in the markup (weak evidence)</summary>

Deviation from each observation's own trailing median, in percentage points.

| Month | vs its own normal | Observations |
|---|---:|---:|
| Feb | +2.64pp | 13 |
| Mar | +2.74pp | 21 |
| Apr | -0.77pp | 21 |
| May | -1.70pp | 20 |
| Aug | -1.09pp | 4 |
| Sep | -1.12pp | 21 |
| Oct | +0.85pp | 18 |
| Nov | +3.20pp | 10 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-17T17:53:35.033Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
