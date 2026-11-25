# One-week outlook - from 2026-11-25

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,41,400 | NPR 3,040 |
| **Central, 5 sessions** | **NPR 2,37,857** | **NPR 2,818** |
| Change | -1.47% | -7.29% |
| 68% band | NPR 2,30,443 – NPR 2,49,006 | NPR 2,602 – NPR 3,011 |
| Markup now | +24.6% | +40.5% |
| Reversion half-life | 4.6 sessions | 2 sessions |
| Stickiness (corr) | -0.514 | -0.656 |
| World daily vol | 1.906% | 3.194% |
| Combined 5-session sd | ±3.71% | ±5.43% |

Silver's markup reverts roughly 2.3× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-25) | NPR 2,41,400 | — |
| **Central, 5 sessions out** | **NPR 2,37,857** | -1.47% |
| 68% band | NPR 2,30,443 — NPR 2,49,006 | |
| 95% band | NPR 2,18,536 — NPR 2,61,939 | |

The markup is +24.60% against a trailing median of +21.13%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8599, half-life 4.6 sessions, R²=0.661). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±4.26% |
| Markup reversion | -1.84pp |
| Spot/markup correlation | -0.514 |
| **Combined sd** | **±3.71%** |
| Same, legs assumed independent | ±5.1% |

Local prices are sticky: the markup absorbs about 0.62pp of every 1% world move in the opposite direction, narrowing the band by 27.4% and leaving the Nepali rate 13% less volatile than the world price itself.

**Back-test** (120 tests, refit at each step on data available then): the 68% band held **55%**, the 95% band **90%**. Median absolute error 2.31%, worst 9.24%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 66% and 92%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 120 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3294.8 | +25.9% | **NPR 2,31,639** | -4.0% |
| -2% | $3398.8 | +24.0% | **NPR 2,35,426** | -2.5% |
| 0% | $3468.2 | +22.8% | **NPR 2,37,831** | -1.5% |
| +2% | $3537.6 | +21.5% | **NPR 2,40,140** | -0.5% |
| +5% | $3641.6 | +19.7% | **NPR 2,43,424** | +0.8% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-25) | $3,486 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,869 / $4,063 / $4,423 |
| Distance from 50 / 200-day | -14.2% / -21.2% |
| RSI(14) | 28 (stretched low) |
| Realised vol, 30d / 90d | 1.91% / 1.57% |
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
| **Central, 5 sessions out** | **NPR 2,818** | -7.29% |
| 68% band | NPR 2,602 — NPR 3,011 | |
| 95% band | NPR 2,466 — NPR 3,187 | |

The markup is +40.52% against a trailing median of +27.67%; history says about 83% of that gap decays within 5 sessions (AR(1) φ=0.703, half-life 2 sessions, R²=0.371). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±7.14% |
| Markup reversion | -10.64pp |
| Spot/markup correlation | -0.656 |
| **Combined sd** | **±5.43%** |
| Same, legs assumed independent | ±8.18% |

Local prices are sticky: the markup absorbs about 0.90pp of every 1% world move in the opposite direction, narrowing the band by 33.6% and leaving the Nepali rate 23.9% less volatile than the world price itself.

**Back-test** (120 tests, refit at each step on data available then): the 68% band held **58.3%**, the 95% band **92.5%**. Median absolute error 4.84%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 52.7% and 85.3%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 120 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $36.79 | +34.4% | **NPR 2,762** | -9.2% |
| -2% | $37.96 | +31.7% | **NPR 2,792** | -8.2% |
| 0% | $38.73 | +29.9% | **NPR 2,810** | -7.6% |
| +2% | $39.5 | +28.1% | **NPR 2,826** | -7.0% |
| +5% | $40.67 | +25.4% | **NPR 2,848** | -6.3% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-25) | $38.98 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $47.98 / $55.02 / $66.93 |
| Distance from 50 / 200-day | -29.2% / -41.8% |
| RSI(14) | 24 (stretched low) |
| Realised vol, 30d / 90d | 3.19% / 2.65% |
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

Generated 2026-11-25T15:02:58.359Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
