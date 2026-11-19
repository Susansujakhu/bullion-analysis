# One-week outlook - from 2026-11-19

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,57,600 | NPR 3,335 |
| **Central, 5 sessions** | **NPR 2,54,219** | **NPR 3,216** |
| Change | -1.31% | -3.58% |
| 68% band | NPR 2,48,409 – NPR 2,64,193 | NPR 3,016 – NPR 3,407 |
| Markup now | +24.2% | +33.1% |
| Reversion half-life | 4.6 sessions | 1.9 sessions |
| Stickiness (corr) | -0.518 | -0.654 |
| World daily vol | 1.519% | 2.776% |
| Combined 5-session sd | ±3.1% | ±4.69% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-19) | NPR 2,57,600 | — |
| **Central, 5 sessions out** | **NPR 2,54,219** | -1.31% |
| 68% band | NPR 2,48,409 — NPR 2,64,193 | |
| 95% band | NPR 2,40,091 — NPR 2,75,551 | |

The markup is +24.17% against a trailing median of +21.05%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8614, half-life 4.6 sessions, R²=0.668). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±3.4% |
| Markup reversion | -1.64pp |
| Spot/markup correlation | -0.518 |
| **Combined sd** | **±3.1%** |
| Same, legs assumed independent | ±4.42% |

Local prices are sticky: the markup absorbs about 0.64pp of every 1% world move in the opposite direction, narrowing the band by 30% and leaving the Nepali rate 8.9% less volatile than the world price itself.

**Back-test** (115 tests, refit at each step on data available then): the 68% band held **57.4%**, the 95% band **92.2%**. Median absolute error 2.27%, worst 8.9%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 68.3% and 93.8%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 115 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3506.9 | +25.7% | **NPR 2,47,752** | -3.8% |
| -2% | $3617.6 | +23.8% | **NPR 2,51,698** | -2.3% |
| 0% | $3691.4 | +22.5% | **NPR 2,54,197** | -1.3% |
| +2% | $3765.3 | +21.3% | **NPR 2,56,590** | -0.4% |
| +5% | $3876 | +19.4% | **NPR 2,59,983** | +0.9% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-19) | $3,690 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,967 / $4,129 / $4,452 |
| Distance from 50 / 200-day | -10.6% / -17.1% |
| RSI(14) | 27 (stretched low) |
| Realised vol, 30d / 90d | 1.52% / 1.41% |
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
| **Central, 5 sessions out** | **NPR 3,216** | -3.58% |
| 68% band | NPR 3,016 — NPR 3,407 | |
| 95% band | NPR 2,876 — NPR 3,578 | |

The markup is +33.12% against a trailing median of +27.36%; history says about 84% of that gap decays within 5 sessions (AR(1) φ=0.692, half-life 1.9 sessions, R²=0.375). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±6.21% |
| Markup reversion | -4.85pp |
| Spot/markup correlation | -0.654 |
| **Combined sd** | **±4.69%** |
| Same, legs assumed independent | ±7.44% |

Local prices are sticky: the markup absorbs about 0.91pp of every 1% world move in the opposite direction, narrowing the band by 36.9% and leaving the Nepali rate 24.4% less volatile than the world price itself.

**Back-test** (115 tests, refit at each step on data available then): the 68% band held **59.1%**, the 95% band **93.9%**. Median absolute error 4.69%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 53.8% and 86.9%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 115 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $42.35 | +32.8% | **NPR 3,161** | -5.2% |
| -2% | $43.69 | +30.1% | **NPR 3,194** | -4.2% |
| 0% | $44.58 | +28.3% | **NPR 3,214** | -3.6% |
| +2% | $45.47 | +26.5% | **NPR 3,232** | -3.1% |
| +5% | $46.81 | +23.8% | **NPR 3,255** | -2.4% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-19) | $44.52 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $50.57 / $56.86 / $67.69 |
| Distance from 50 / 200-day | -21.7% / -34.2% |
| RSI(14) | 26 (stretched low) |
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

Generated 2026-11-19T17:39:09.352Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
