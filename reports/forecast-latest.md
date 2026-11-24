# One-week outlook - from 2026-11-24

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,47,900 | NPR 3,145 |
| **Central, 5 sessions** | **NPR 2,43,891** | **NPR 2,943** |
| Change | -1.62% | -6.43% |
| 68% band | NPR 2,36,538 – NPR 2,55,258 | NPR 2,709 – NPR 3,150 |
| Markup now | +24.9% | +38.5% |
| Reversion half-life | 4.6 sessions | 1.9 sessions |
| Stickiness (corr) | -0.517 | -0.657 |
| World daily vol | 1.897% | 3.276% |
| Combined 5-session sd | ±3.68% | ±5.58% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-24) | NPR 2,47,900 | — |
| **Central, 5 sessions out** | **NPR 2,43,891** | -1.62% |
| 68% band | NPR 2,36,538 — NPR 2,55,258 | |
| 95% band | NPR 2,24,132 — NPR 2,68,413 | |

The markup is +24.95% against a trailing median of +21.11%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8597, half-life 4.6 sessions, R²=0.661). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±4.24% |
| Markup reversion | -2.04pp |
| Spot/markup correlation | -0.517 |
| **Combined sd** | **±3.68%** |
| Same, legs assumed independent | ±5.09% |

Local prices are sticky: the markup absorbs about 0.63pp of every 1% world move in the opposite direction, narrowing the band by 27.6% and leaving the Nepali rate 13.2% less volatile than the world price itself.

**Back-test** (119 tests, refit at each step on data available then): the 68% band held **55.5%**, the 95% band **89.9%**. Median absolute error 2.27%, worst 9.24%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 66.4% and 91.9%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 119 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3382.7 | +26.0% | **NPR 2,37,557** | -4.2% |
| -2% | $3489.5 | +24.2% | **NPR 2,41,412** | -2.6% |
| 0% | $3560.8 | +22.9% | **NPR 2,43,858** | -1.6% |
| +2% | $3632 | +21.7% | **NPR 2,46,204** | -0.7% |
| +5% | $3738.8 | +19.8% | **NPR 2,49,539** | +0.7% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-24) | $3,558 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,897 / $4,081 / $4,430 |
| Distance from 50 / 200-day | -12.8% / -19.7% |
| RSI(14) | 30 (stretched low) |
| Realised vol, 30d / 90d | 1.90% / 1.56% |
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
| Nov | +1.75pp | 16 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-24) | NPR 3,145 | — |
| **Central, 5 sessions out** | **NPR 2,943** | -6.43% |
| 68% band | NPR 2,709 — NPR 3,150 | |
| 95% band | NPR 2,565 — NPR 3,339 | |

The markup is +38.55% against a trailing median of +27.58%; history says about 84% of that gap decays within 5 sessions (AR(1) φ=0.6937, half-life 1.9 sessions, R²=0.362). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±7.33% |
| Markup reversion | -9.21pp |
| Spot/markup correlation | -0.657 |
| **Combined sd** | **±5.58%** |
| Same, legs assumed independent | ±8.34% |

Local prices are sticky: the markup absorbs about 0.90pp of every 1% world move in the opposite direction, narrowing the band by 33.1% and leaving the Nepali rate 23.8% less volatile than the world price itself.

**Back-test** (119 tests, refit at each step on data available then): the 68% band held **58%**, the 95% band **92.4%**. Median absolute error 4.81%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 53% and 85.2%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 119 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $38.7 | +33.9% | **NPR 2,886** | -8.2% |
| -2% | $39.93 | +31.1% | **NPR 2,917** | -7.2% |
| 0% | $40.74 | +29.3% | **NPR 2,936** | -6.7% |
| +2% | $41.55 | +27.5% | **NPR 2,953** | -6.1% |
| +5% | $42.78 | +24.8% | **NPR 2,975** | -5.4% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-24) | $40.76 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $48.7 / $55.53 / $67.14 |
| Distance from 50 / 200-day | -26.6% / -39.3% |
| RSI(14) | 26 (stretched low) |
| Realised vol, 30d / 90d | 3.28% / 2.65% |
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
| Nov | +3.52pp | 16 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-24T19:42:48.720Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
