# One-week outlook - from 2026-11-24

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,47,900 | NPR 3,145 |
| **Central, 5 sessions** | **NPR 2,44,856** | **NPR 2,972** |
| Change | -1.23% | -5.49% |
| 68% band | NPR 2,37,568 – NPR 2,56,119 | NPR 2,742 – NPR 3,177 |
| Markup now | +24.0% | +36.8% |
| Reversion half-life | 4.6 sessions | 1.9 sessions |
| Stickiness (corr) | -0.515 | -0.656 |
| World daily vol | 1.864% | 3.204% |
| Combined 5-session sd | ±3.63% | ±5.45% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-24) | NPR 2,47,900 | — |
| **Central, 5 sessions out** | **NPR 2,44,856** | -1.23% |
| 68% band | NPR 2,37,568 — NPR 2,56,119 | |
| 95% band | NPR 2,25,264 — NPR 2,69,145 | |

The markup is +24.00% against a trailing median of +21.11%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8597, half-life 4.6 sessions, R²=0.663). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±4.17% |
| Markup reversion | -1.53pp |
| Spot/markup correlation | -0.515 |
| **Combined sd** | **±3.63%** |
| Same, legs assumed independent | ±5.03% |

Local prices are sticky: the markup absorbs about 0.62pp of every 1% world move in the opposite direction, narrowing the band by 27.7% and leaving the Nepali rate 12.8% less volatile than the world price itself.

**Back-test** (119 tests, refit at each step on data available then): the 68% band held **55.5%**, the 95% band **89.9%**. Median absolute error 2.27%, worst 9.24%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 66.4% and 91.9%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 119 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3408.7 | +25.6% | **NPR 2,38,504** | -3.8% |
| -2% | $3516.3 | +23.7% | **NPR 2,42,379** | -2.2% |
| 0% | $3588.1 | +22.5% | **NPR 2,44,838** | -1.2% |
| +2% | $3659.9 | +21.2% | **NPR 2,47,197** | -0.3% |
| +5% | $3767.5 | +19.4% | **NPR 2,50,549** | +1.1% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-24) | $3,604 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,899 / $4,082 / $4,431 |
| Distance from 50 / 200-day | -11.7% / -18.7% |
| RSI(14) | 31 (neutral) |
| Realised vol, 30d / 90d | 1.86% / 1.55% |
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
| **Central, 5 sessions out** | **NPR 2,972** | -5.49% |
| 68% band | NPR 2,742 — NPR 3,177 | |
| 95% band | NPR 2,599 — NPR 3,363 | |

The markup is +36.77% against a trailing median of +27.58%; history says about 84% of that gap decays within 5 sessions (AR(1) φ=0.6936, half-life 1.9 sessions, R²=0.366). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±7.16% |
| Markup reversion | -7.72pp |
| Spot/markup correlation | -0.656 |
| **Combined sd** | **±5.45%** |
| Same, legs assumed independent | ±8.22% |

Local prices are sticky: the markup absorbs about 0.90pp of every 1% world move in the opposite direction, narrowing the band by 33.7% and leaving the Nepali rate 23.9% less volatile than the world price itself.

**Back-test** (119 tests, refit at each step on data available then): the 68% band held **58%**, the 95% band **92.4%**. Median absolute error 4.81%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 53% and 85.2%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 119 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $39.21 | +33.5% | **NPR 2,917** | -7.2% |
| -2% | $40.44 | +30.9% | **NPR 2,949** | -6.2% |
| 0% | $41.27 | +29.1% | **NPR 2,968** | -5.6% |
| +2% | $42.1 | +27.3% | **NPR 2,985** | -5.1% |
| +5% | $43.33 | +24.6% | **NPR 3,007** | -4.4% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-24) | $41.54 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $48.74 / $55.54 / $67.14 |
| Distance from 50 / 200-day | -25.2% / -38.1% |
| RSI(14) | 27 (stretched low) |
| Realised vol, 30d / 90d | 3.20% / 2.61% |
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

Generated 2026-11-24T15:22:10.298Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
