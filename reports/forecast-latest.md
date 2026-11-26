# One-week outlook - from 2026-11-26

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,42,800 | NPR 3,075 |
| **Central, 5 sessions** | **NPR 2,42,374** | **NPR 2,973** |
| Change | -0.18% | -3.32% |
| 68% band | NPR 2,34,847 – NPR 2,53,675 | NPR 2,746 – NPR 3,177 |
| Markup now | +21.6% | +33.1% |
| Reversion half-life | 4.5 sessions | 1.9 sessions |
| Stickiness (corr) | -0.515 | -0.657 |
| World daily vol | 1.894% | 3.216% |
| Combined 5-session sd | ±3.69% | ±5.45% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-26) | NPR 2,42,800 | — |
| **Central, 5 sessions out** | **NPR 2,42,374** | -0.18% |
| 68% band | NPR 2,34,847 — NPR 2,53,675 | |
| 95% band | NPR 2,22,829 — NPR 2,66,812 | |

The markup is +21.64% against a trailing median of +21.24%; history says about 54% of that gap decays within 5 sessions (AR(1) φ=0.8572, half-life 4.5 sessions, R²=0.66). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±4.23% |
| Markup reversion | -0.21pp |
| Spot/markup correlation | -0.515 |
| **Combined sd** | **±3.69%** |
| Same, legs assumed independent | ±5.11% |

Local prices are sticky: the markup absorbs about 0.62pp of every 1% world move in the opposite direction, narrowing the band by 27.8% and leaving the Nepali rate 12.8% less volatile than the world price itself.

**Back-test** (121 tests, refit at each step on data available then): the 68% band held **55.4%**, the 95% band **90.1%**. Median absolute error 2.27%, worst 9.24%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 66.2% and 92.1%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 121 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3394.6 | +24.5% | **NPR 2,36,149** | -2.7% |
| -2% | $3501.8 | +22.7% | **NPR 2,39,958** | -1.2% |
| 0% | $3573.3 | +21.4% | **NPR 2,42,373** | -0.2% |
| +2% | $3644.8 | +20.2% | **NPR 2,44,689** | +0.8% |
| +5% | $3752 | +18.3% | **NPR 2,47,977** | +2.1% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-26) | $3,600 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,850 / $4,048 / $4,415 |
| Distance from 50 / 200-day | -11.1% / -18.5% |
| RSI(14) | 34 (neutral) |
| Realised vol, 30d / 90d | 1.89% / 1.55% |
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
| Nov | +1.75pp | 18 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-26) | NPR 3,075 | — |
| **Central, 5 sessions out** | **NPR 2,973** | -3.32% |
| 68% band | NPR 2,746 — NPR 3,177 | |
| 95% band | NPR 2,600 — NPR 3,363 | |

The markup is +33.13% against a trailing median of +27.76%; history says about 84% of that gap decays within 5 sessions (AR(1) φ=0.6956, half-life 1.9 sessions, R²=0.369). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±7.19% |
| Markup reversion | -4.49pp |
| Spot/markup correlation | -0.657 |
| **Combined sd** | **±5.45%** |
| Same, legs assumed independent | ±8.31% |

Local prices are sticky: the markup absorbs about 0.90pp of every 1% world move in the opposite direction, narrowing the band by 34.3% and leaving the Nepali rate 24.2% less volatile than the world price itself.

**Back-test** (121 tests, refit at each step on data available then): the 68% band held **58.7%**, the 95% band **92.6%**. Median absolute error 4.81%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 53% and 85.4%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 121 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $39.28 | +33.1% | **NPR 2,922** | -5.0% |
| -2% | $40.52 | +30.4% | **NPR 2,953** | -4.0% |
| 0% | $41.35 | +28.6% | **NPR 2,971** | -3.4% |
| +2% | $42.18 | +26.8% | **NPR 2,988** | -2.8% |
| +5% | $43.42 | +24.1% | **NPR 3,011** | -2.1% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-26) | $41.71 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $47.51 / $54.57 / $66.72 |
| Distance from 50 / 200-day | -23.6% / -37.5% |
| RSI(14) | 32 (neutral) |
| Realised vol, 30d / 90d | 3.22% / 2.65% |
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
| Nov | +4.28pp | 18 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-26T14:32:47.910Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
