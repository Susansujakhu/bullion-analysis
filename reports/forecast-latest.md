# One-week outlook - from 2026-11-27

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,46,100 | NPR 3,195 |
| **Central, 5 sessions** | **NPR 2,45,193** | **NPR 3,091** |
| Change | -0.37% | -3.27% |
| 68% band | NPR 2,37,435 – NPR 2,56,912 | NPR 2,838 – NPR 3,323 |
| Markup now | +22.2% | +33.1% |
| Reversion half-life | 4.5 sessions | 1.9 sessions |
| Stickiness (corr) | -0.514 | -0.656 |
| World daily vol | 1.949% | 3.456% |
| Combined 5-session sd | ±3.79% | ±5.91% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-27) | NPR 2,46,100 | — |
| **Central, 5 sessions out** | **NPR 2,45,193** | -0.37% |
| 68% band | NPR 2,37,435 — NPR 2,56,912 | |
| 95% band | NPR 2,25,007 — NPR 2,70,585 | |

The markup is +22.21% against a trailing median of +21.37%; history says about 54% of that gap decays within 5 sessions (AR(1) φ=0.8574, half-life 4.5 sessions, R²=0.66). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±4.36% |
| Markup reversion | -0.45pp |
| Spot/markup correlation | -0.514 |
| **Combined sd** | **±3.79%** |
| Same, legs assumed independent | ±5.2% |

Local prices are sticky: the markup absorbs about 0.62pp of every 1% world move in the opposite direction, narrowing the band by 27.2% and leaving the Nepali rate 13.1% less volatile than the world price itself.

**Back-test** (122 tests, refit at each step on data available then): the 68% band held **55.7%**, the 95% band **90.2%**. Median absolute error 2.29%, worst 9.24%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 66.4% and 92.1%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 122 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3449.6 | +24.9% | **NPR 2,38,848** | -3.0% |
| -2% | $3558.6 | +23.0% | **NPR 2,42,729** | -1.4% |
| 0% | $3631.2 | +21.8% | **NPR 2,45,192** | -0.4% |
| +2% | $3703.8 | +20.5% | **NPR 2,47,555** | +0.6% |
| +5% | $3812.8 | +18.7% | **NPR 2,50,912** | +2.0% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-27) | $3,640 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,852 / $4,049 / $4,416 |
| Distance from 50 / 200-day | -10.1% / -17.6% |
| RSI(14) | 37 (neutral) |
| Realised vol, 30d / 90d | 1.95% / 1.57% |
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
| Nov | +1.70pp | 19 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Silver

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-27) | NPR 3,195 | — |
| **Central, 5 sessions out** | **NPR 3,091** | -3.27% |
| 68% band | NPR 2,838 — NPR 3,323 | |
| 95% band | NPR 2,673 — NPR 3,531 | |

The markup is +33.10% against a trailing median of +27.81%; history says about 84% of that gap decays within 5 sessions (AR(1) φ=0.697, half-life 1.9 sessions, R²=0.37). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±7.73% |
| Markup reversion | -4.42pp |
| Spot/markup correlation | -0.656 |
| **Combined sd** | **±5.91%** |
| Same, legs assumed independent | ±8.77% |

Local prices are sticky: the markup absorbs about 0.90pp of every 1% world move in the opposite direction, narrowing the band by 32.7% and leaving the Nepali rate 23.6% less volatile than the world price itself.

**Back-test** (122 tests, refit at each step on data available then): the 68% band held **58.2%**, the 95% band **92.6%**. Median absolute error 4.84%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 52.6% and 85.5%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 122 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $41.12 | +33.2% | **NPR 3,037** | -5.0% |
| -2% | $42.42 | +30.5% | **NPR 3,069** | -3.9% |
| 0% | $43.28 | +28.7% | **NPR 3,089** | -3.3% |
| +2% | $44.15 | +26.9% | **NPR 3,107** | -2.8% |
| +5% | $45.45 | +24.2% | **NPR 3,130** | -2.0% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-27) | $43.17 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $47.58 / $54.59 / $66.73 |
| Distance from 50 / 200-day | -20.9% / -35.3% |
| RSI(14) | 36 (neutral) |
| Realised vol, 30d / 90d | 3.46% / 2.74% |
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
| Nov | +4.78pp | 19 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-28T13:44:17.021Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
