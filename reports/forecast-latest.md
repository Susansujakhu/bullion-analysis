# One-week outlook - from 2026-11-20

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,45,400 | NPR 3,110 |
| **Central, 5 sessions** | **NPR 2,44,276** | **NPR 3,022** |
| Change | -0.46% | -2.84% |
| 68% band | NPR 2,38,486 – NPR 2,54,184 | NPR 2,827 – NPR 3,204 |
| Markup now | +22.1% | +31.9% |
| Reversion half-life | 4.6 sessions | 1.9 sessions |
| Stickiness (corr) | -0.508 | -0.651 |
| World daily vol | 1.563% | 2.813% |
| Combined 5-session sd | ±3.2% | ±4.78% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-20) | NPR 2,45,400 | — |
| **Central, 5 sessions out** | **NPR 2,44,276** | -0.46% |
| 68% band | NPR 2,38,486 — NPR 2,54,184 | |
| 95% band | NPR 2,29,860 — NPR 2,65,508 | |

The markup is +22.12% against a trailing median of +21.07%; history says about 53% of that gap decays within 5 sessions (AR(1) φ=0.8597, half-life 4.6 sessions, R²=0.667). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±3.49% |
| Markup reversion | -0.56pp |
| Spot/markup correlation | -0.508 |
| **Combined sd** | **±3.2%** |
| Same, legs assumed independent | ±4.52% |

Local prices are sticky: the markup absorbs about 0.62pp of every 1% world move in the opposite direction, narrowing the band by 29.1% and leaving the Nepali rate 8.3% less volatile than the world price itself.

**Back-test** (116 tests, refit at each step on data available then): the 68% band held **56.9%**, the 95% band **91.4%**. Median absolute error 2.27%, worst 8.9%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 67.8% and 93.2%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 116 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3398 | +24.7% | **NPR 2,37,983** | -3.0% |
| -2% | $3505.3 | +22.8% | **NPR 2,41,832** | -1.4% |
| 0% | $3576.8 | +21.6% | **NPR 2,44,273** | -0.5% |
| +2% | $3648.4 | +20.3% | **NPR 2,46,614** | +0.5% |
| +5% | $3755.7 | +18.5% | **NPR 2,49,939** | +1.9% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-20) | $3,571 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,945 / $4,112 / $4,445 |
| Distance from 50 / 200-day | -13.2% / -19.7% |
| RSI(14) | 23 (stretched low) |
| Realised vol, 30d / 90d | 1.56% / 1.44% |
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
| Nov | +1.55pp | 13 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-20) | NPR 3,110 | — |
| **Central, 5 sessions out** | **NPR 3,022** | -2.84% |
| 68% band | NPR 2,827 — NPR 3,204 | |
| 95% band | NPR 2,692 — NPR 3,368 | |

The markup is +31.89% against a trailing median of +27.36%; history says about 84% of that gap decays within 5 sessions (AR(1) φ=0.6925, half-life 1.9 sessions, R²=0.376). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±6.29% |
| Markup reversion | -3.81pp |
| Spot/markup correlation | -0.651 |
| **Combined sd** | **±4.78%** |
| Same, legs assumed independent | ±7.53% |

Local prices are sticky: the markup absorbs about 0.90pp of every 1% world move in the opposite direction, narrowing the band by 36.6% and leaving the Nepali rate 24.1% less volatile than the world price itself.

**Back-test** (116 tests, refit at each step on data available then): the 68% band held **58.6%**, the 95% band **93.1%**. Median absolute error 4.81%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 53.4% and 86.3%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 116 tests carry roughly 23 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $39.88 | +32.6% | **NPR 2,970** | -4.5% |
| -2% | $41.14 | +29.9% | **NPR 3,001** | -3.5% |
| 0% | $41.98 | +28.1% | **NPR 3,020** | -2.9% |
| +2% | $42.81 | +26.3% | **NPR 3,038** | -2.3% |
| +5% | $44.07 | +23.6% | **NPR 3,060** | -1.6% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-20) | $41.92 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $49.97 / $56.4 / $67.51 |
| Distance from 50 / 200-day | -25.7% / -37.9% |
| RSI(14) | 23 (stretched low) |
| Realised vol, 30d / 90d | 2.81% / 2.47% |
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

Generated 2026-11-20T14:19:46.240Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
