# Bullion read - 2026-11-13

**Nepali gold carried a +22.38% markup over the world price on 2026-11-09 - its 83rd percentile. Dear by local standards.**

## 1. Where the world price is right now

| | |
|---|---|
| Gold | **$3,881.7 / troy oz** |
| Silver | $50.283 / troy oz |
| Gold per gram | $124.8 |
| USD/NPR (NRB selling, 2026-11-11) | 150.59 |
| INR/NPR | 1.6015 |

Sources: gold-api.com (spot); Nepal Rastra Bank (official).

## 2. What that makes a tola worth, before Nepal touches it

`3881.7 ÷ 31.1034768 × 150.59 × 11.6638038`

= **NPR 2,19,204 per tola** · NPR 1,87,936 per 10 g · NPR 18,794 per gram

Silver parity: NPR 2,840 per tola.

## 3. What a tola should cost in Kathmandu today

FENEGOSIDA last published on **2026-11-09**, 4 days ago — the local market is closed or has not reprinted. The figure below is what today's world price and rupee imply once the measured local markup of +22.38% is applied.

| | Per tola | Per 10 g |
|---|---:|---:|
| **Indicated gold rate** | **NPR 2,68,268** | NPR 2,30,000 |
| At the 1-year median markup instead | NPR 2,65,005 | — |
| Last actually published (2026-11-09) | NPR 2,84,300 | — |
| Indicated silver | NPR 3,688 | — |

**Expect the next print around -5.6% lower** than the last one (NPR -16,032 per tola), if the markup holds.

### Where that markup goes

| Step | Adds | Running total / tola |
|---|---:|---:|
| International value of 1 tola | — | NPR 2,19,204 |
| Freight, insurance, bank commission | NPR 2,192 | NPR 2,21,396 |
| Customs duty | NPR 9,331 | NPR 2,30,728 |
| VAT @ 13% | NPR 29,995 | NPR 2,60,722 |
| Dealer margin | NPR 7,822 | NPR 2,68,544 |

This ladder totals +22.51% against a markup actually observed at +22.38%. The two are built differently on purpose: the ladder is an explanation assembled from tax assumptions, the observed figure is measured from published prices.

<details><summary>Unverified assumptions in that ladder</summary>

- `customsDutyNprPer10g` = 8000 — Finance Act, specific duty per 10g on gold imports - CONFIRM CURRENT VALUE
- `importHandlingRate` = 0.01 — bank import commission, insurance, freight, assay - estimate
- `dealerMarginRate` = 0.03 — FENEGOSIDA member retail margin on the published rate - estimate

Edit `config/parameters.json` to correct them. Nothing above section 3 depends on them.
</details>

## 4. The measured gap, on 2026-11-09

| | |
|---|---|
| Published rate | **NPR 2,84,300 / tola** (NPR 24,375/g) |
| World parity that same day | NPR 2,32,305 |
| Markup over parity | **+22.38%** (NPR 51,995) |
| Silver markup | +29.90% |
| Percentile over 109 same-day observations | **83.5th** |
| Mean / median / sd markup | +20.87% / +20.89% / 1.61pp |

> **Regime break detected around 2026-06-01**: the markup stepped up from +11.98% to +21.33% (+9.4pp) and stayed there — the signature of a Finance Act duty change rather than a market move. Everything ranked above compares only the 109 observations since that break, because ranking against the older regime would measure a tax change rather than today's market.

Duty and VAT barely move. So within one regime, a widening markup is the local market doing it — importer scarcity, dealer pricing, or rates that fall more slowly than the world price does.

## 5. What moved, and why

| Window | World gold | USD/NPR | Nepali rate | Markup |
|---|---:|---:|---:|---:|
| 1 week | +3.7% | -1.1% | +3.6% | +1.3pp |
| 1 month | -2.4% | -3.0% | -3.9% | +1.8pp |
| 3 months | -7.4% | -1.5% | -7.7% | +1.4pp |
| 1 year | -2.4% | +6.0% | +16.9% | +14.0pp |

Over 1 month the Nepali rate moved -3.9%: -2.4% of it from the world gold price, -3.0% from the rupee, +1.5% from the local markup. Mostly **the rupee** (43% of the movement).

---

Generated 2026-11-12T18:26:22.084Z · 109 same-day observations · flags: premium-high, nepal-market-closed, nepal-data-stale, reprice-pending
