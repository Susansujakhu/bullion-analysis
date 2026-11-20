# One-week outlook - from 2026-11-20

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,45,400 | NPR 3,110 |
| **Central, 5 sessions** | **NPR 2,43,309** | **NPR 3,008** |
| Change | -0.85% | -3.27% |
| 68% band | NPR 2,37,499 – NPR 2,53,254 | NPR 2,813 – NPR 3,192 |
| Markup now | +23.1% | +32.6% |
| Reversion half-life | 4.6 sessions | 1.9 sessions |
| Stickiness (corr) | -0.509 | -0.651 |
| World daily vol | 1.587% | 2.837% |
| Combined 5-session sd | ±3.23% | ±4.82% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-20) | NPR 2,45,400 | — |
| **Central, 5 sessions out** | **NPR 2,43,309** | -0.85% |
| 68% band | NPR 2,37,499 — NPR 2,53,254 | |
| 95% band | NPR 2,28,845 — NPR 2,64,624 | |

The markup is +23.06% against a trailing median of +21.07%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8607, half-life 4.6 sessions, R²=0.667). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±3.55% |
| Markup reversion | -1.05pp |
| Spot/markup correlation | -0.509 |
| **Combined sd** | **±3.23%** |
| Same, legs assumed independent | ±4.55% |

Local prices are sticky: the markup absorbs about 0.62pp of every 1% world move in the opposite direction, narrowing the band by 29% and leaving the Nepali rate 9% less volatile than the world price itself.

**Back-test** (116 tests, refit at each step on data available then): the 68% band held **56.9%**, the 95% band **91.4%**. Median absolute error 2.27%, worst 8.9%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 67.8% and 93.2%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 116 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3372.1 | +25.1% | **NPR 2,36,999** | -3.4% |
| -2% | $3478.6 | +23.3% | **NPR 2,40,853** | -1.9% |
| 0% | $3549.6 | +22.0% | **NPR 2,43,300** | -0.9% |
| +2% | $3620.6 | +20.8% | **NPR 2,45,647** | +0.1% |
| +5% | $3727 | +18.9% | **NPR 2,48,983** | +1.5% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-20) | $3,557 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,944 / $4,112 / $4,445 |
| Distance from 50 / 200-day | -13.5% / -20.0% |
| RSI(14) | 23 (stretched low) |
| Realised vol, 30d / 90d | 1.59% / 1.45% |
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
| Nov | +1.70pp | 13 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-20) | NPR 3,110 | — |
| **Central, 5 sessions out** | **NPR 3,008** | -3.27% |
| 68% band | NPR 2,813 — NPR 3,192 | |
| 95% band | NPR 2,678 — NPR 3,356 | |

The markup is +32.60% against a trailing median of +27.36%; history says about 84% of that gap decays within 5 sessions (AR(1) φ=0.6932, half-life 1.9 sessions, R²=0.376). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±6.34% |
| Markup reversion | -4.4pp |
| Spot/markup correlation | -0.651 |
| **Combined sd** | **±4.82%** |
| Same, legs assumed independent | ±7.57% |

Local prices are sticky: the markup absorbs about 0.90pp of every 1% world move in the opposite direction, narrowing the band by 36.3% and leaving the Nepali rate 24.1% less volatile than the world price itself.

**Back-test** (116 tests, refit at each step on data available then): the 68% band held **58.6%**, the 95% band **93.1%**. Median absolute error 4.81%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 53.4% and 86.3%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 116 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $39.66 | +32.7% | **NPR 2,956** | -4.9% |
| -2% | $40.91 | +30.0% | **NPR 2,988** | -3.9% |
| 0% | $41.75 | +28.2% | **NPR 3,007** | -3.3% |
| +2% | $42.58 | +26.4% | **NPR 3,024** | -2.8% |
| +5% | $43.84 | +23.7% | **NPR 3,047** | -2.0% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-20) | $41.74 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $49.96 / $56.4 / $67.51 |
| Distance from 50 / 200-day | -26.0% / -38.2% |
| RSI(14) | 22 (stretched low) |
| Realised vol, 30d / 90d | 2.84% / 2.48% |
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
| Nov | +3.27pp | 13 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-20T15:47:02.135Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
