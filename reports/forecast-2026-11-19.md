# One-week outlook - from 2026-11-19

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,57,600 | NPR 3,335 |
| **Central, 5 sessions** | **NPR 2,55,045** | **NPR 3,245** |
| Change | -0.99% | -2.71% |
| 68% band | NPR 2,49,230 – NPR 2,65,025 | NPR 3,043 – NPR 3,438 |
| Markup now | +23.4% | +31.6% |
| Reversion half-life | 4.6 sessions | 1.9 sessions |
| Stickiness (corr) | -0.517 | -0.654 |
| World daily vol | 1.509% | 2.783% |
| Combined 5-session sd | ±3.09% | ±4.71% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-19) | NPR 2,57,600 | — |
| **Central, 5 sessions out** | **NPR 2,55,045** | -0.99% |
| 68% band | NPR 2,49,230 — NPR 2,65,025 | |
| 95% band | NPR 2,40,905 — NPR 2,76,390 | |

The markup is +23.39% against a trailing median of +21.05%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8608, half-life 4.6 sessions, R²=0.668). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±3.37% |
| Markup reversion | -1.23pp |
| Spot/markup correlation | -0.517 |
| **Combined sd** | **±3.09%** |
| Same, legs assumed independent | ±4.41% |

Local prices are sticky: the markup absorbs about 0.64pp of every 1% world move in the opposite direction, narrowing the band by 30% and leaving the Nepali rate 8.5% less volatile than the world price itself.

**Back-test** (115 tests, refit at each step on data available then): the 68% band held **57.4%**, the 95% band **92.2%**. Median absolute error 2.27%, worst 8.9%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 68.3% and 93.8%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 115 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3529.3 | +25.3% | **NPR 2,48,581** | -3.5% |
| -2% | $3640.7 | +23.4% | **NPR 2,52,531** | -2.0% |
| 0% | $3715 | +22.2% | **NPR 2,55,032** | -1.0% |
| +2% | $3789.3 | +20.9% | **NPR 2,57,426** | -0.1% |
| +5% | $3900.8 | +19.0% | **NPR 2,60,819** | +1.3% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-19) | $3,715 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,968 / $4,129 / $4,452 |
| Distance from 50 / 200-day | -10.0% / -16.5% |
| RSI(14) | 28 (stretched low) |
| Realised vol, 30d / 90d | 1.51% / 1.41% |
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
| Nov | +1.63pp | 12 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-19) | NPR 3,335 | — |
| **Central, 5 sessions out** | **NPR 3,245** | -2.71% |
| 68% band | NPR 3,043 — NPR 3,438 | |
| 95% band | NPR 2,901 — NPR 3,611 | |

The markup is +31.64% against a trailing median of +27.36%; history says about 84% of that gap decays within 5 sessions (AR(1) φ=0.6906, half-life 1.9 sessions, R²=0.375). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±6.22% |
| Markup reversion | -3.61pp |
| Spot/markup correlation | -0.654 |
| **Combined sd** | **±4.71%** |
| Same, legs assumed independent | ±7.48% |

Local prices are sticky: the markup absorbs about 0.91pp of every 1% world move in the opposite direction, narrowing the band by 37.1% and leaving the Nepali rate 24.4% less volatile than the world price itself.

**Back-test** (115 tests, refit at each step on data available then): the 68% band held **59.1%**, the 95% band **93.9%**. Median absolute error 4.69%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 53.8% and 86.9%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 115 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $42.83 | +32.6% | **NPR 3,190** | -4.3% |
| -2% | $44.18 | +29.8% | **NPR 3,224** | -3.3% |
| 0% | $45.08 | +28.0% | **NPR 3,244** | -2.7% |
| +2% | $45.98 | +26.2% | **NPR 3,262** | -2.2% |
| +5% | $47.33 | +23.5% | **NPR 3,285** | -1.5% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-19) | $45.06 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $50.6 / $56.87 / $67.69 |
| Distance from 50 / 200-day | -20.8% / -33.4% |
| RSI(14) | 27 (stretched low) |
| Realised vol, 30d / 90d | 2.78% / 2.41% |
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
| Nov | +3.26pp | 12 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-19T13:58:25.887Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
