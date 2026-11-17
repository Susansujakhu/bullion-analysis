# One-week outlook - from 2026-11-17

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,67,200 | NPR 3,490 |
| **Central, 5 sessions** | **NPR 2,65,369** | **NPR 3,423** |
| Change | -0.69% | -1.92% |
| 68% band | NPR 2,59,729 – NPR 2,75,433 | NPR 3,224 – NPR 3,622 |
| Markup now | +22.5% | +30.1% |
| Reversion half-life | 4.6 sessions | 1.9 sessions |
| Stickiness (corr) | -0.517 | -0.654 |
| World daily vol | 1.418% | 2.686% |
| Combined 5-session sd | ±2.98% | ±4.55% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-17) | NPR 2,67,200 | — |
| **Central, 5 sessions out** | **NPR 2,65,369** | -0.69% |
| 68% band | NPR 2,59,729 — NPR 2,75,433 | |
| 95% band | NPR 2,51,352 — NPR 2,86,778 | |

The markup is +22.49% against a trailing median of +20.90%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8604, half-life 4.6 sessions, R²=0.669). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±3.17% |
| Markup reversion | -0.84pp |
| Spot/markup correlation | -0.517 |
| **Combined sd** | **±2.98%** |
| Same, legs assumed independent | ±4.28% |

Local prices are sticky: the markup absorbs about 0.64pp of every 1% world move in the opposite direction, narrowing the band by 30.3% and leaving the Nepali rate 6% less volatile than the world price itself.

**Back-test** (113 tests, refit at each step on data available then): the 68% band held **58.4%**, the 95% band **92.9%**. Median absolute error 2.15%, worst 8.9%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 69.2% and 94.4%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 113 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3657.5 | +24.8% | **NPR 2,58,709** | -3.2% |
| -2% | $3773 | +22.9% | **NPR 2,62,785** | -1.6% |
| 0% | $3850 | +21.6% | **NPR 2,65,363** | -0.7% |
| +2% | $3927 | +20.4% | **NPR 2,67,829** | +0.2% |
| +5% | $4042.5 | +18.5% | **NPR 2,71,320** | +1.5% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-17) | $3,849 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $4,005 / $4,157 / $4,464 |
| Distance from 50 / 200-day | -7.4% / -13.8% |
| RSI(14) | 34 (neutral) |
| Realised vol, 30d / 90d | 1.42% / 1.37% |
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
| Nov | +1.57pp | 10 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-17) | NPR 3,490 | — |
| **Central, 5 sessions out** | **NPR 3,423** | -1.92% |
| 68% band | NPR 3,224 — NPR 3,622 | |
| 95% band | NPR 3,078 — NPR 3,797 | |

The markup is +30.09% against a trailing median of +27.10%; history says about 85% of that gap decays within 5 sessions (AR(1) φ=0.6886, half-life 1.9 sessions, R²=0.375). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±6.01% |
| Markup reversion | -2.53pp |
| Spot/markup correlation | -0.654 |
| **Combined sd** | **±4.55%** |
| Same, legs assumed independent | ±7.33% |

Local prices are sticky: the markup absorbs about 0.91pp of every 1% world move in the opposite direction, narrowing the band by 37.9% and leaving the Nepali rate 24.2% less volatile than the world price itself.

**Back-test** (113 tests, refit at each step on data available then): the 68% band held **60.2%**, the 95% band **94.7%**. Median absolute error 4.55%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 54.5% and 87.4%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 113 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $44.98 | +32.1% | **NPR 3,367** | -3.5% |
| -2% | $46.4 | +29.4% | **NPR 3,401** | -2.5% |
| 0% | $47.35 | +27.6% | **NPR 3,422** | -1.9% |
| +2% | $48.3 | +25.8% | **NPR 3,441** | -1.4% |
| +5% | $49.72 | +23.0% | **NPR 3,466** | -0.7% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-17) | $47.35 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $51.71 / $57.71 / $68.08 |
| Distance from 50 / 200-day | -17.9% / -30.4% |
| RSI(14) | 31 (neutral) |
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

Generated 2026-11-17T13:55:42.911Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
