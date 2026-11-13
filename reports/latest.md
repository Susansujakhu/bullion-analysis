# Bullion read - 2026-11-13

**Nepali gold carried a +23.96% markup over the world price on 2026-11-13 - its 96th percentile. Dear by local standards.**

## 1. Where the world price is right now

| | |
|---|---|
| Gold | **$3,891.05 / troy oz** |
| Silver | $49.91 / troy oz |
| Gold per gram | $125.1 |
| USD/NPR (NRB selling, 2026-11-12) | 150.21 |
| INR/NPR | 1.6015 |

Sources: gold-api.com (spot); Nepal Rastra Bank (official).

## 2. What that makes a tola worth, before Nepal touches it

`3891.05 ÷ 31.1034768 × 150.21 × 11.6638038`

= **NPR 2,19,178 per tola** · NPR 1,87,913 per 10 g · NPR 18,791 per gram

Silver parity: NPR 2,811 per tola.

## 3. What a tola should cost in Kathmandu today

The local market published today, so this is a check rather than a forecast.

| | Per tola | Per 10 g |
|---|---:|---:|
| **Indicated gold rate** | **NPR 2,71,700** | NPR 2,32,943 |
| At the 1-year median markup instead | NPR 2,64,984 | — |
| Last actually published (2026-11-13) | NPR 2,71,700 | — |
| Indicated silver | NPR 3,700 | — |

### Where that markup goes

| Step | Adds | Running total / tola |
|---|---:|---:|
| International value of 1 tola | — | NPR 2,19,178 |
| Freight, insurance, bank commission | NPR 2,192 | NPR 2,21,370 |
| Customs duty | NPR 9,331 | NPR 2,30,701 |
| VAT @ 13% | NPR 29,991 | NPR 2,60,692 |
| Dealer margin | NPR 7,821 | NPR 2,68,513 |

This ladder totals +22.51% against a markup actually observed at +23.96%. The two are built differently on purpose: the ladder is an explanation assembled from tax assumptions, the observed figure is measured from published prices.

<details><summary>Unverified assumptions in that ladder</summary>

- `customsDutyNprPer10g` = 8000 — Finance Act, specific duty per 10g on gold imports - CONFIRM CURRENT VALUE
- `importHandlingRate` = 0.01 — bank import commission, insurance, freight, assay - estimate
- `dealerMarginRate` = 0.03 — FENEGOSIDA member retail margin on the published rate - estimate

Edit `config/parameters.json` to correct them. Nothing above section 3 depends on them.
</details>

## 4. The measured gap, on 2026-11-13

| | |
|---|---|
| Published rate | **NPR 2,71,700 / tola** (NPR 23,294/g) |
| World parity that same day | NPR 2,19,178 |
| Markup over parity | **+23.96%** (NPR 52,522) |
| Silver markup | +31.61% |
| Percentile over 110 same-day observations | **96.4th** |
| Mean / median / sd markup | +20.90% / +20.90% / 1.63pp |

> **Regime break detected around 2026-06-01**: the markup stepped up from +11.98% to +21.33% (+9.4pp) and stayed there — the signature of a Finance Act duty change rather than a market move. Everything ranked above compares only the 110 observations since that break, because ranking against the older regime would measure a tax change rather than today's market.

Duty and VAT barely move. So within one regime, a widening markup is the local market doing it — importer scarcity, dealer pricing, or rates that fall more slowly than the world price does.

## 5. What moved, and why

| Window | World gold | USD/NPR | Nepali rate | Markup |
|---|---:|---:|---:|---:|
| 1 week | -4.5% | -0.8% | -4.0% | +1.7pp |
| 1 month | -5.3% | -1.7% | -6.1% | +0.9pp |
| 3 months | -12.3% | -1.8% | -9.9% | +5.5pp |
| 1 year | -7.2% | +5.7% | +8.6% | +12.0pp |

Over 1 month the Nepali rate moved -6.1%: -5.3% of it from the world gold price, -1.7% from the rupee, +0.8% from the local markup. Mostly **the world gold price** (69% of the movement).

---

Generated 2026-11-13T13:03:25.714Z · 110 same-day observations · flags: premium-high
