# One-week outlook - from 2026-11-13

> At five sessions, world gold is close to a random walk. This projection therefore gives world gold **no drift** — its central case is where it is now. What is actually forecast here is the Nepali markup, which mean-reverts measurably. Read the band, not the mid-point.

## The projection

| | NPR / tola | vs now |
|---|---:|---:|
| Now (2026-11-13) | NPR 2,71,700 | — |
| **Central, 5 sessions out** | **NPR 2,68,155** | -1.30% |
| 68% band | NPR 2,60,270 — NPR 2,76,279 | |
| 95% band | NPR 2,52,919 — NPR 2,84,309 | |

The central case is not "gold will be flat". It is "gold is unforecastable at this horizon, **and** the markup is currently +23.96% against a trailing median of +20.87%, which history says decays by about 53% over five sessions." That decay is the entire reason the central case is not simply today's price.

## Why the band is this wide, and not wider

| | |
|---|---|
| World gold, 5-session sd | ±3.19% |
| Markup reversion | -1.63pp expected (+23.96% → +22.34%) |
| Spot/markup correlation | -0.518 |
| **Combined sd** | **±2.98%** |
| Same, ignoring stickiness | ±4.28% |

Nepali retail prices are sticky: when world gold moves, local dealers follow only partly, so the markup absorbs about 0.64pp of every 1% spot move in the opposite direction. That correlation of -0.518 narrows the band by **30.3%** against the same model with the two legs assumed independent (±4.28% → ±2.98%), and leaves the Nepali rate 6.4% less volatile than world gold itself. It is the single most useful thing in this model, and it is invisible to any generic gold forecast.

## Does this method actually work?

Walked through history, refitting at each step on only the data available at that time (140 tests):

| | Claimed | Realised |
|---|---:|---:|
| 68% band contained the outcome | 68% | **70%** |
| 95% band contained the outcome | 95% | **94.3%** |

| Median absolute error | 1.84% |
|---|---:|
| Mean error (bias) | +0.83% |
| Worst error | 8.9% |

Both bands are close to honest. Treat them as roughly meaning what they say.

Note the sample is small and the windows overlap, so these figures are themselves uncertain.

## If world gold does X — the conditional table

This is the "everything goes to plan" view: pick a view on world gold, and read off what the Nepali rate does once the markup follows its measured behaviour.

| World gold | Spot | Markup then | Nepali rate | vs now |
|---|---:|---:|---:|---:|
| -5% | $3696.5 | +25.5% | **NPR 2,61,378** | -3.8% |
| -2% | $3813.2 | +23.6% | **NPR 2,65,514** | -2.3% |
| 0% | $3891.1 | +22.3% | **NPR 2,68,132** | -1.3% |
| +2% | $3968.9 | +21.1% | **NPR 2,70,638** | -0.4% |
| +5% | $4085.6 | +19.1% | **NPR 2,74,186** | +0.9% |

Notice the Nepali column moves less than the world column. That is the stickiness, not an arithmetic error.

## Technical state — world gold

| | |
|---|---|
| Last (2026-11-13) | $3,886.3 |
| Trend | downtrend |
| 20 / 50 / 200-day average | $4,035 / $4,182 / $4,472 |
| Distance from 50 / 200-day | -7.1% / -13.1% |
| RSI(14) | 36 (neutral) |
| Realised vol, 30d / 90d daily | 1.43% / 1.40% |
| 20-session slope | -0.20% per session |
| Resistance above | $4,152, $4,168, $4,216 |
| Support below | **none** — price is at or below every swing low in the lookback |

These describe the chart. They are not a forecast: at a one-week horizon the volatility estimate above carries far more information than any of these levels, which is why the projection uses the former and merely reports the latter.

## Fundamentals that are structural, not guessed

- **The rupee leg is an Indian story.** NPR is pegged to INR at 1.60, so USD/NPR moves only when USD/INR moves. Nepali gold cannot decouple from Indian gold while that peg holds, and the peg is policy, not a market rate.
- **Duty and VAT are fixed until the next Finance Act.** Nepal's budget lands in late Jestha (late May). This repo already caught one such step: the markup jumped +9.4pp around 2026-06-01. Until the next budget, markup moves are market behaviour, not tax changes — which is what makes the reversion model valid in the first place.
- **Physical-only market.** Nepal has no gold ETF and no sovereign gold bond, so every rupee of demand goes through imported physical metal and a dealer spread. That spread is why the markup exists and why it is sticky.

<details><summary>Monthly pattern in the markup (weak evidence — read the sample sizes)</summary>

Measured as deviation from each observation's own trailing median, in percentage points. Measuring raw markup instead would simply rediscover the 1 June duty step and dress it up as a summer season.

| Month | Markup vs its own normal | Observations |
|---|---:|---:|
| Feb | +0.06pp | 13 |
| Mar | +1.32pp | 21 |
| Apr | +0.52pp | 21 |
| May | +0.50pp | 20 |
| Aug | -0.50pp | 4 |
| Sep | -0.38pp | 21 |
| Oct | +0.90pp | 18 |
| Nov | +1.55pp | 7 |

One year of history is one observation of each month, and these windows overlap. 60 observations following the 2026-06-01 duty step were excluded, because the trailing median needs time to absorb a regime change and until it has, every deviation in that window is a tax change wearing a season's clothes. Treat what remains as a hint about wedding and festival demand at most — not a finding, and not something to act on.
</details>

---

Generated 2026-11-14T13:35:46.277Z · basis 2026-11-13 · 245 same-day observations · AR(1) φ=0.8611, half-life 4.6 sessions, R²=0.669

**Information only. Not investment advice.** This is a statistical description of published prices, not a recommendation to buy or sell anything. Dealer buy/sell spreads alone exceed most of the moves projected here, and gold in Nepal is a hold-for-years asset rather than a weekly trade.
