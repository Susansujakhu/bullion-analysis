# One-week outlook - from 2026-11-18

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,60,900 | NPR 3,380 |
| **Central, 5 sessions** | **NPR 2,59,335** | **NPR 3,294** |
| Change | -0.60% | -2.55% |
| 68% band | NPR 2,53,602 – NPR 2,69,355 | NPR 3,097 – NPR 3,486 |
| Markup now | +22.4% | +31.3% |
| Reversion half-life | 4.6 sessions | 1.9 sessions |
| Stickiness (corr) | -0.516 | -0.654 |
| World daily vol | 1.466% | 2.717% |
| Combined 5-session sd | ±3.04% | ±4.6% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-18) | NPR 2,60,900 | — |
| **Central, 5 sessions out** | **NPR 2,59,335** | -0.60% |
| 68% band | NPR 2,53,602 — NPR 2,69,355 | |
| 95% band | NPR 2,45,155 — NPR 2,80,711 | |

The markup is +22.37% against a trailing median of +20.97%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8603, half-life 4.6 sessions, R²=0.669). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±3.28% |
| Markup reversion | -0.74pp |
| Spot/markup correlation | -0.516 |
| **Combined sd** | **±3.04%** |
| Same, legs assumed independent | ±4.36% |

Local prices are sticky: the markup absorbs about 0.64pp of every 1% world move in the opposite direction, narrowing the band by 30.1% and leaving the Nepali rate 7.1% less volatile than the world price itself.

**Back-test** (114 tests, refit at each step on data available then): the 68% band held **57.9%**, the 95% band **92.1%**. Median absolute error 2.27%, worst 8.9%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 68.8% and 93.8%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 114 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3587.1 | +24.8% | **NPR 2,52,798** | -3.1% |
| -2% | $3700.3 | +22.9% | **NPR 2,56,799** | -1.6% |
| 0% | $3775.8 | +21.6% | **NPR 2,59,331** | -0.6% |
| +2% | $3851.4 | +20.4% | **NPR 2,61,754** | +0.3% |
| +5% | $3964.6 | +18.4% | **NPR 2,65,186** | +1.6% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-18) | $3,774 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,987 / $4,144 / $4,458 |
| Distance from 50 / 200-day | -8.9% / -15.4% |
| RSI(14) | 31 (neutral) |
| Realised vol, 30d / 90d | 1.47% / 1.39% |
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
| Nov | +1.55pp | 11 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-18) | NPR 3,380 | — |
| **Central, 5 sessions out** | **NPR 3,294** | -2.55% |
| 68% band | NPR 3,097 — NPR 3,486 | |
| 95% band | NPR 2,952 — NPR 3,658 | |

The markup is +31.27% against a trailing median of +27.25%; history says about 84% of that gap decays within 5 sessions (AR(1) φ=0.6894, half-life 1.9 sessions, R²=0.375). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±6.08% |
| Markup reversion | -3.39pp |
| Spot/markup correlation | -0.654 |
| **Combined sd** | **±4.6%** |
| Same, legs assumed independent | ±7.36% |

Local prices are sticky: the markup absorbs about 0.91pp of every 1% world move in the opposite direction, narrowing the band by 37.5% and leaving the Nepali rate 24.3% less volatile than the world price itself.

**Back-test** (114 tests, refit at each step on data available then): the 68% band held **59.6%**, the 95% band **93.9%**. Median absolute error 4.69%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 54.2% and 86.8%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 114 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $43.32 | +32.4% | **NPR 3,239** | -4.2% |
| -2% | $44.69 | +29.7% | **NPR 3,273** | -3.2% |
| 0% | $45.6 | +27.9% | **NPR 3,293** | -2.6% |
| +2% | $46.51 | +26.1% | **NPR 3,311** | -2.0% |
| +5% | $47.88 | +23.4% | **NPR 3,335** | -1.3% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-18) | $45.65 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $51.12 / $57.26 / $67.89 |
| Distance from 50 / 200-day | -20.3% / -32.8% |
| RSI(14) | 28 (stretched low) |
| Realised vol, 30d / 90d | 2.72% / 2.40% |
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
| Nov | +3.26pp | 11 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-18T13:31:23.487Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
