# One-week outlook - from 2026-11-23

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,47,400 | NPR 3,110 |
| **Central, 5 sessions** | **NPR 2,47,493** | **NPR 3,099** |
| Change | +0.04% | -0.35% |
| 68% band | NPR 2,40,199 – NPR 2,59,118 | NPR 2,856 – NPR 3,314 |
| Markup now | +21.0% | +28.0% |
| Reversion half-life | 4.6 sessions | 1.9 sessions |
| Stickiness (corr) | -0.512 | -0.653 |
| World daily vol | 1.893% | 3.227% |
| Combined 5-session sd | ±3.71% | ±5.48% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-23) | NPR 2,47,400 | — |
| **Central, 5 sessions out** | **NPR 2,47,493** | +0.04% |
| 68% band | NPR 2,40,199 — NPR 2,59,118 | |
| 95% band | NPR 2,27,245 — NPR 2,72,547 | |

The markup is +21.03% against a trailing median of +21.11%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8599, half-life 4.6 sessions, R²=0.667). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±4.23% |
| Markup reversion | +0.05pp |
| Spot/markup correlation | -0.512 |
| **Combined sd** | **±3.71%** |
| Same, legs assumed independent | ±5.12% |

Local prices are sticky: the markup absorbs about 0.62pp of every 1% world move in the opposite direction, narrowing the band by 27.6% and leaving the Nepali rate 12.4% less volatile than the world price itself.

**Back-test** (118 tests, refit at each step on data available then): the 68% band held **55.9%**, the 95% band **89.8%**. Median absolute error 2.27%, worst 9.24%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 66.9% and 91.9%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 118 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3485.4 | +24.2% | **NPR 2,41,118** | -2.5% |
| -2% | $3595.5 | +22.3% | **NPR 2,45,019** | -1.0% |
| 0% | $3668.8 | +21.1% | **NPR 2,47,493** | +0.0% |
| +2% | $3742.2 | +19.8% | **NPR 2,49,866** | +1.0% |
| +5% | $3852.3 | +18.0% | **NPR 2,53,236** | +2.4% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-23) | $3,667 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,924 / $4,097 / $4,438 |
| Distance from 50 / 200-day | -10.5% / -17.4% |
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
| Nov | +1.70pp | 15 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-23) | NPR 3,110 | — |
| **Central, 5 sessions out** | **NPR 3,099** | -0.35% |
| 68% band | NPR 2,856 — NPR 3,314 | |
| 95% band | NPR 2,708 — NPR 3,509 | |

The markup is +28.03% against a trailing median of +27.50%; history says about 84% of that gap decays within 5 sessions (AR(1) φ=0.6926, half-life 1.9 sessions, R²=0.375). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±7.22% |
| Markup reversion | -0.44pp |
| Spot/markup correlation | -0.653 |
| **Combined sd** | **±5.48%** |
| Same, legs assumed independent | ±8.38% |

Local prices are sticky: the markup absorbs about 0.90pp of every 1% world move in the opposite direction, narrowing the band by 34.6% and leaving the Nepali rate 24% less volatile than the world price itself.

**Back-test** (118 tests, refit at each step on data available then): the 68% band held **57.6%**, the 95% band **92.4%**. Median absolute error 4.84%, worst 15.01%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 52.7% and 85.1%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 118 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $41.42 | +32.1% | **NPR 3,048** | -2.0% |
| -2% | $42.73 | +29.4% | **NPR 3,080** | -1.0% |
| 0% | $43.6 | +27.6% | **NPR 3,099** | -0.3% |
| +2% | $44.47 | +25.8% | **NPR 3,117** | +0.2% |
| +5% | $45.78 | +23.1% | **NPR 3,140** | +1.0% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-23) | $43.51 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $49.4 / $55.98 / $67.34 |
| Distance from 50 / 200-day | -22.3% / -35.4% |
| RSI(14) | 31 (neutral) |
| Realised vol, 30d / 90d | 3.23% / 2.61% |
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
| Nov | +3.27pp | 15 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-23T15:27:01.528Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
