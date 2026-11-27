# One-week outlook - from 2026-11-27

> At five sessions, world metal prices are close to a random walk. This projection therefore gives them **no drift** — the central case is where they are now. What is actually forecast is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## Gold and silver at a glance

| | Gold | Silver |
|---|---:|---:|
| Now | NPR 2,46,100 | NPR 3,195 |
| **Central, 5 sessions** | **NPR 2,45,615** | **NPR 3,110** |
| Change | -0.20% | -2.67% |
| 68% band | NPR 2,37,715 – NPR 2,57,555 | NPR 2,843 – NPR 3,356 |
| Markup now | +21.8% | +32.1% |
| Reversion half-life | 4.5 sessions | 1.9 sessions |
| Stickiness (corr) | -0.514 | -0.656 |
| World daily vol | 1.985% | 3.619% |
| Combined 5-session sd | ±3.85% | ±6.21% |

Silver's markup reverts roughly 2.4× faster than gold's, and silver is the more volatile metal by a wide margin. The two are not one asset with different price tags.

## Gold

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-27) | NPR 2,46,100 | — |
| **Central, 5 sessions out** | **NPR 2,45,615** | -0.20% |
| 68% band | NPR 2,37,715 — NPR 2,57,555 | |
| 95% band | NPR 2,25,070 — NPR 2,71,498 | |

The markup is +21.82% against a trailing median of +21.37%; history says about 54% of that gap decays within 5 sessions (AR(1) φ=0.8573, half-life 4.5 sessions, R²=0.66). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±4.44% |
| Markup reversion | -0.24pp |
| Spot/markup correlation | -0.514 |
| **Combined sd** | **±3.85%** |
| Same, legs assumed independent | ±5.28% |

Local prices are sticky: the markup absorbs about 0.62pp of every 1% world move in the opposite direction, narrowing the band by 27% and leaving the Nepali rate 13.3% less volatile than the world price itself.

**Back-test** (122 tests, refit at each step on data available then): the 68% band held **55.7%**, the 95% band **90.2%**. Median absolute error 2.29%, worst 9.24%. **Miscalibrated — weight this projection accordingly.**

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 66.4% and 92.1%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 122 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world gold does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3460.8 | +24.7% | **NPR 2,39,268** | -2.8% |
| -2% | $3570 | +22.8% | **NPR 2,43,151** | -1.2% |
| 0% | $3642.9 | +21.6% | **NPR 2,45,614** | -0.2% |
| +2% | $3715.8 | +20.3% | **NPR 2,47,978** | +0.8% |
| +5% | $3825 | +18.5% | **NPR 2,51,336** | +2.1% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-27) | $3,661 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $3,853 / $4,050 / $4,416 |
| Distance from 50 / 200-day | -9.6% / -17.1% |
| RSI(14) | 38 (neutral) |
| Realised vol, 30d / 90d | 1.99% / 1.59% |
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
| **Central, 5 sessions out** | **NPR 3,110** | -2.67% |
| 68% band | NPR 2,843 — NPR 3,356 | |
| 95% band | NPR 2,669 — NPR 3,578 | |

The markup is +32.08% against a trailing median of +27.81%; history says about 84% of that gap decays within 5 sessions (AR(1) φ=0.6961, half-life 1.9 sessions, R²=0.37). That decay is why the central case is not simply today's price.

| Band composition | |
|---|---|
| World price, 5-session sd | ±8.09% |
| Markup reversion | -3.57pp |
| Spot/markup correlation | -0.656 |
| **Combined sd** | **±6.21%** |
| Same, legs assumed independent | ±9.11% |

Local prices are sticky: the markup absorbs about 0.90pp of every 1% world move in the opposite direction, narrowing the band by 31.8% and leaving the Nepali rate 23.2% less volatile than the world price itself.

**Back-test** (122 tests, refit at each step on data available then): the 68% band held **58.2%**, the 95% band **92.6%**. Median absolute error 4.84%, worst 15.01%. Both bands are close to honest.

The band uses empirical quantiles of this model's own past errors rather than a normal distribution. A plain Gaussian band would have covered 52.6% and 85.5%. Coverage above is scored out-of-sample, using only errors seen before each test.

<sub>Consecutive tests overlap by 4 of 5 sessions, so 122 tests carry roughly 24 independent observations — about ±10pp of standard error on a coverage figure. Differences smaller than that are noise.</sub>

| If world silver does | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $41.44 | +33.0% | **NPR 3,056** | -4.3% |
| -2% | $42.75 | +30.3% | **NPR 3,089** | -3.3% |
| 0% | $43.62 | +28.5% | **NPR 3,109** | -2.7% |
| +2% | $44.49 | +26.7% | **NPR 3,127** | -2.1% |
| +5% | $45.8 | +24.0% | **NPR 3,150** | -1.4% |

<details><summary>Technical state</summary>

| | |
|---|---|
| Last (2026-11-27) | $43.95 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $47.62 / $54.61 / $66.74 |
| Distance from 50 / 200-day | -19.5% / -34.1% |
| RSI(14) | 38 (neutral) |
| Realised vol, 30d / 90d | 3.62% / 2.80% |
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
| Nov | +4.27pp | 19 |

60 observations after the 2026-06-01 duty step were excluded — until the trailing median absorbs a regime change, every deviation in that window is a tax change wearing a season's clothes. One year of history is one observation of each month and the windows overlap. A hint at most.
</details>

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali bullion cannot decouple from Indian bullion while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo caught the last one in both metals independently: gold's markup stepped +9.4pp and silver's +11.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour rather than tax changes — which is what makes the reversion model valid at all.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand runs through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.
- **Silver is the more volatile metal, locally as well as internationally.** Its markup swings wider, reverts faster, and its dealer spread is proportionally larger. Treating it as "cheap gold" is a mistake the numbers above contradict.

---

Generated 2026-11-27T14:27:25.508Z · horizon 5 sessions

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and bullion in Nepal is a hold-for-years asset rather than a weekly trade.
