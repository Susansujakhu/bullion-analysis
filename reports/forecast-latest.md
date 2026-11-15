# One-week outlook - from 2026-11-15

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,70,200 | NPR 3,600 |
| **Central, 5 sessions** | **NPR 2,68,113** | **NPR 3,513** |
| Change | -0.77% | -2.42% |
| 68% band | NPR 2,62,853 – NPR 2,78,376 | NPR 3,322 – NPR 3,713 |
| Markup now | +22.7% | +30.6% |
| Reversion half-life | 4.6 sessions | 1.9 sessions |
| Stickiness (corr) | -0.517 | -0.655 |
| World daily vol | 1.425% | 2.6% |
| Combined 5-session sd | ±2.99% | ±4.41% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-15) | NPR 2,70,200 | — |
| **Central, 5 sessions out** | **NPR 2,68,113** | -0.77% |
| 68% band | NPR 2,62,853 — NPR 2,78,376 | |
| 95% band | NPR 2,55,449 — NPR 2,89,839 | |

The markup is +22.67% against a trailing median of +20.87%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8602, half-life 4.6 sessions, R²=0.669). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±3.19% |
| Markup reversion | -0.95pp |
| Spot/markup correlation | -0.517 |
| **Combined sd** | **±2.99%** |
| Same, legs assumed independent | ±4.3% |

Local prices are sticky: the markup absorbs about 0.64pp of every 1% world move in the opposite direction, narrowing the band by 30.3% and leaving the Nepali rate 6.1% less volatile than the world price itself.

**Back-test** (111 tests, refit at each step on data available then): the 68% band held **59.5%**, the 95% band **93.7%**. Median absolute error 2.14%, worst 8.9%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 70.2% and 94.3%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 111 tests carry roughly 22 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3693.2 | +24.9% | **NPR 2,61,384** | -3.3% |
| -2% | $3809.8 | +23.0% | **NPR 2,65,501** | -1.7% |
| 0% | $3887.6 | +21.7% | **NPR 2,68,105** | -0.8% |
| +2% | $3965.4 | +20.4% | **NPR 2,70,596** | +0.1% |
| +5% | $4082 | +18.5% | **NPR 2,74,122** | +1.4% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-13) | $3,886 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $4,035 / $4,182 / $4,472 |
| Distance from 50 / 200-day | -7.1% / -13.1% |
| RSI(14) | 36 (neutral) |
| Realised vol, 30d / 90d | 1.43% / 1.40% |
| Resistance above | $4,152, $4,168, $4,216 |
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
| Nov | +1.63pp | 8 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-15) | NPR 3,600 | — |
| **Central, 5 sessions out** | **NPR 3,513** | -2.42% |
| 68% band | NPR 3,322 — NPR 3,713 | |
| 95% band | NPR 3,169 — NPR 3,886 | |

The markup is +30.60% against a trailing median of +26.83%; history says about 85% of that gap decays within 5 sessions (AR(1) φ=0.6878, half-life 1.9 sessions, R²=0.375). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±5.81% |
| Markup reversion | -3.19pp |
| Spot/markup correlation | -0.655 |
| **Combined sd** | **±4.41%** |
| Same, legs assumed independent | ±7.17% |

Local prices are sticky: the markup absorbs about 0.91pp of every 1% world move in the opposite direction, narrowing the band by 38.5% and leaving the Nepali rate 24.1% less volatile than the world price itself.

**Back-test** (111 tests, refit at each step on data available then): the 68% band held **61.3%**, the 95% band **94.6%**. Median absolute error 4.48%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 55.3% and 87.2%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 111 tests carry roughly 22 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $46.22 | +31.9% | **NPR 3,455** | -4.0% |
| -2% | $47.68 | +29.2% | **NPR 3,491** | -3.0% |
| 0% | $48.65 | +27.4% | **NPR 3,512** | -2.5% |
| +2% | $49.62 | +25.6% | **NPR 3,531** | -1.9% |
| +5% | $51.08 | +22.9% | **NPR 3,556** | -1.2% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-13) | $49.12 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $52.74 / $58.48 / $68.38 |
| Distance from 50 / 200-day | -16.0% / -28.2% |
| RSI(14) | 33 (neutral) |
| Realised vol, 30d / 90d | 2.60% / 2.36% |
| Resistance above | $60.02, $61.17, $61.92 |
| Support below | $49.1 |

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
| Nov | +3.26pp | 8 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-15T12:41:57.067Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
