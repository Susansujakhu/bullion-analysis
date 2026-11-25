# One-week outlook - from 2026-11-25

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,41,400 | NPR 3,040 |
| **Central, 5 sessions** | **NPR 2,38,860** | **NPR 2,854** |
| Change | -1.05% | -6.10% |
| 68% band | NPR 2,31,482 – NPR 2,49,950 | NPR 2,640 – NPR 3,046 |
| Markup now | +23.6% | +38.1% |
| Reversion half-life | 4.5 sessions | 1.9 sessions |
| Stickiness (corr) | -0.514 | -0.656 |
| World daily vol | 1.882% | 3.135% |
| Combined 5-session sd | ±3.67% | ±5.32% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-25) | NPR 2,41,400 | — |
| **Central, 5 sessions out** | **NPR 2,38,860** | -1.05% |
| 68% band | NPR 2,31,482 — NPR 2,49,950 | |
| 95% band | NPR 2,19,629 — NPR 2,62,809 | |

The markup is +23.58% against a trailing median of +21.13%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8586, half-life 4.5 sessions, R²=0.66). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±4.21% |
| Markup reversion | -1.31pp |
| Spot/markup correlation | -0.514 |
| **Combined sd** | **±3.67%** |
| Same, legs assumed independent | ±5.07% |

Local prices are sticky: the markup absorbs about 0.62pp of every 1% world move in the opposite direction, narrowing the band by 27.6% and leaving the Nepali rate 12.7% less volatile than the world price itself.

**Back-test** (120 tests, refit at each step on data available then): the 68% band held **55%**, the 95% band **90%**. Median absolute error 2.31%, worst 9.24%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 66% and 92%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 120 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3322.1 | +25.4% | **NPR 2,32,659** | -3.6% |
| -2% | $3427.1 | +23.5% | **NPR 2,36,444** | -2.0% |
| 0% | $3497 | +22.3% | **NPR 2,38,847** | -1.1% |
| +2% | $3566.9 | +21.0% | **NPR 2,41,152** | -0.1% |
| +5% | $3671.9 | +19.2% | **NPR 2,44,429** | +1.3% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-25) | $3,557 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,872 / $4,065 / $4,423 |
| Distance from 50 / 200-day | -12.5% / -19.6% |
| RSI(14) | 30 (stretched low) |
| Realised vol, 30d / 90d | 1.88% / 1.55% |
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
| **Central, 5 sessions out** | **NPR 2,854** | -6.10% |
| 68% band | NPR 2,640 — NPR 3,046 | |
| 95% band | NPR 2,504 — NPR 3,220 | |

The markup is +38.11% against a trailing median of +27.67%; history says about 83% of that gap decays within 5 sessions (AR(1) φ=0.6988, half-life 1.9 sessions, R²=0.369). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±7.01% |
| Markup reversion | -8.7pp |
| Spot/markup correlation | -0.656 |
| **Combined sd** | **±5.32%** |
| Same, legs assumed independent | ±8.08% |

Local prices are sticky: the markup absorbs about 0.90pp of every 1% world move in the opposite direction, narrowing the band by 34.1% and leaving the Nepali rate 24.1% less volatile than the world price itself.

**Back-test** (120 tests, refit at each step on data available then): the 68% band held **58.3%**, the 95% band **92.5%**. Median absolute error 4.84%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 52.7% and 85.3%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 120 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $37.43 | +33.9% | **NPR 2,800** | -7.9% |
| -2% | $38.62 | +31.2% | **NPR 2,830** | -6.9% |
| 0% | $39.41 | +29.4% | **NPR 2,849** | -6.3% |
| +2% | $40.19 | +27.6% | **NPR 2,865** | -5.8% |
| +5% | $41.38 | +24.9% | **NPR 2,887** | -5.0% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-25) | $40.57 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $48.06 / $55.05 / $66.94 |
| Distance from 50 / 200-day | -26.3% / -39.4% |
| RSI(14) | 26 (stretched low) |
| Realised vol, 30d / 90d | 3.14% / 2.61% |
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

Generated 2026-11-25T18:50:38.741Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
