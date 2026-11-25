# One-week outlook - from 2026-11-25

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,41,400 | NPR 3,040 |
| **Central, 5 sessions** | **NPR 2,37,127** | **NPR 2,804** |
| Change | -1.77% | -7.76% |
| 68% band | NPR 2,29,706 – NPR 2,48,288 | NPR 2,588 – NPR 2,996 |
| Markup now | +25.4% | +41.5% |
| Reversion half-life | 4.6 sessions | 2 sessions |
| Stickiness (corr) | -0.515 | -0.657 |
| World daily vol | 1.918% | 3.204% |
| Combined 5-session sd | ±3.72% | ±5.45% |

Silver's markup reverts roughly 2.3× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-25) | NPR 2,41,400 | — |
| **Central, 5 sessions out** | **NPR 2,37,127** | -1.77% |
| 68% band | NPR 2,29,706 — NPR 2,48,288 | |
| 95% band | NPR 2,17,789 — NPR 2,61,239 | |

The markup is +25.37% against a trailing median of +21.13%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8609, half-life 4.6 sessions, R²=0.661). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±4.29% |
| Markup reversion | -2.24pp |
| Spot/markup correlation | -0.515 |
| **Combined sd** | **±3.72%** |
| Same, legs assumed independent | ±5.12% |

Local prices are sticky: the markup absorbs about 0.62pp of every 1% world move in the opposite direction, narrowing the band by 27.3% and leaving the Nepali rate 13.2% less volatile than the world price itself.

**Back-test** (120 tests, refit at each step on data available then): the 68% band held **55%**, the 95% band **90%**. Median absolute error 2.31%, worst 9.24%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 66% and 92%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 120 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3274.6 | +26.2% | **NPR 2,30,899** | -4.3% |
| -2% | $3378 | +24.4% | **NPR 2,34,685** | -2.8% |
| 0% | $3446.9 | +23.1% | **NPR 2,37,089** | -1.8% |
| +2% | $3515.8 | +21.9% | **NPR 2,39,398** | -0.8% |
| +5% | $3619.2 | +20.0% | **NPR 2,42,683** | +0.5% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-25) | $3,473 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,868 / $4,063 / $4,423 |
| Distance from 50 / 200-day | -14.5% / -21.5% |
| RSI(14) | 27 (stretched low) |
| Realised vol, 30d / 90d | 1.92% / 1.57% |
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
| Nov | +1.80pp | 17 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-25) | NPR 3,040 | — |
| **Central, 5 sessions out** | **NPR 2,804** | -7.76% |
| 68% band | NPR 2,588 — NPR 2,996 | |
| 95% band | NPR 2,452 — NPR 3,172 | |

The markup is +41.52% against a trailing median of +27.67%; history says about 83% of that gap decays within 5 sessions (AR(1) φ=0.7048, half-life 2 sessions, R²=0.371). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±7.16% |
| Markup reversion | -11.44pp |
| Spot/markup correlation | -0.657 |
| **Combined sd** | **±5.45%** |
| Same, legs assumed independent | ±8.19% |

Local prices are sticky: the markup absorbs about 0.90pp of every 1% world move in the opposite direction, narrowing the band by 33.5% and leaving the Nepali rate 23.9% less volatile than the world price itself.

**Back-test** (120 tests, refit at each step on data available then): the 68% band held **58.3%**, the 95% band **92.5%**. Median absolute error 4.84%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 52.7% and 85.3%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 120 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $36.53 | +34.6% | **NPR 2,746** | -9.7% |
| -2% | $37.69 | +31.9% | **NPR 2,776** | -8.7% |
| 0% | $38.45 | +30.1% | **NPR 2,794** | -8.1% |
| +2% | $39.22 | +28.3% | **NPR 2,811** | -7.5% |
| +5% | $40.38 | +25.6% | **NPR 2,833** | -6.8% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-25) | $38.88 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $47.98 / $55.02 / $66.93 |
| Distance from 50 / 200-day | -29.3% / -41.9% |
| RSI(14) | 24 (stretched low) |
| Realised vol, 30d / 90d | 3.20% / 2.65% |
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
| Nov | +3.78pp | 17 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-25T16:00:11.072Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
