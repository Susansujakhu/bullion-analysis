# One-week outlook - from 2026-11-13

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,71,700 | NPR 3,700 |
| **Central, 5 sessions** | **NPR 2,68,155** | **NPR 3,588** |
| Change | -1.30% | -3.03% |
| 68% band | NPR 2,63,071 – NPR 2,78,412 | NPR 3,392 – NPR 3,794 |
| Markup now | +24.0% | +31.6% |
| Reversion half-life | 4.6 sessions | 1.8 sessions |
| Stickiness (corr) | -0.518 | -0.656 |
| World daily vol | 1.425% | 2.603% |
| Combined 5-session sd | ±2.98% | ±4.41% |

Silver's markup reverts roughly 2.6× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-13) | NPR 2,71,700 | — |
| **Central, 5 sessions out** | **NPR 2,68,155** | -1.30% |
| 68% band | NPR 2,63,071 — NPR 2,78,412 | |
| 95% band | NPR 2,55,456 — NPR 2,89,813 | |

The markup is +23.96% against a trailing median of +20.87%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8611, half-life 4.6 sessions, R²=0.669). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±3.19% |
| Markup reversion | -1.63pp |
| Spot/markup correlation | -0.518 |
| **Combined sd** | **±2.98%** |
| Same, legs assumed independent | ±4.28% |

Local prices are sticky: the markup absorbs about 0.64pp of every 1% world move in the opposite direction, narrowing the band by 30.3% and leaving the Nepali rate 6.4% less volatile than the world price itself.

**Back-test** (110 tests, refit at each step on data available then): the 68% band held **60%**, the 95% band **93.6%**. Median absolute error 2.14%, worst 8.9%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 70% and 94.3%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 110 tests carry roughly 22 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3696.5 | +25.5% | **NPR 2,61,378** | -3.8% |
| -2% | $3813.2 | +23.6% | **NPR 2,65,514** | -2.3% |
| 0% | $3891.1 | +22.3% | **NPR 2,68,132** | -1.3% |
| +2% | $3968.9 | +21.1% | **NPR 2,70,638** | -0.4% |
| +5% | $4085.6 | +19.1% | **NPR 2,74,186** | +0.9% |

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
| Nov | +1.55pp | 7 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-13) | NPR 3,700 | — |
| **Central, 5 sessions out** | **NPR 3,588** | -3.03% |
| 68% band | NPR 3,392 — NPR 3,794 | |
| 95% band | NPR 3,236 — NPR 3,969 | |

The markup is +31.61% against a trailing median of +26.83%; history says about 85% of that gap decays within 5 sessions (AR(1) φ=0.6874, half-life 1.8 sessions, R²=0.375). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±5.82% |
| Markup reversion | -4.05pp |
| Spot/markup correlation | -0.656 |
| **Combined sd** | **±4.41%** |
| Same, legs assumed independent | ±7.17% |

Local prices are sticky: the markup absorbs about 0.91pp of every 1% world move in the opposite direction, narrowing the band by 38.5% and leaving the Nepali rate 24.2% less volatile than the world price itself.

**Back-test** (110 tests, refit at each step on data available then): the 68% band held **60.9%**, the 95% band **94.5%**. Median absolute error 4.55%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 55% and 87.1%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 110 tests carry roughly 22 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $47.41 | +32.1% | **NPR 3,528** | -4.6% |
| -2% | $48.91 | +29.4% | **NPR 3,565** | -3.7% |
| 0% | $49.91 | +27.6% | **NPR 3,586** | -3.1% |
| +2% | $50.91 | +25.7% | **NPR 3,606** | -2.5% |
| +5% | $52.41 | +23.0% | **NPR 3,631** | -1.9% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-13) | $49.03 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $52.74 / $58.48 / $68.38 |
| Distance from 50 / 200-day | -16.2% / -28.3% |
| RSI(14) | 33 (neutral) |
| Realised vol, 30d / 90d | 2.60% / 2.36% |
| Resistance above | $60.02, $61.17, $61.92 |
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
| Nov | +3.26pp | 7 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-14T13:53:40.828Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
