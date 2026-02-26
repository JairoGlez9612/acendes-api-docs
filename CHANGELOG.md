# Changelog

---

## v1.1 — 2026-02-25

Interactive documentation site with two-panel layout.

### Added
- **Interactive site** with sidebar navigation, docs panel and code panel
- **Bilingual support:** Spanish / English toggle
- **Code examples** in 4 languages: cURL, Python, JavaScript, PHP
- **API Playground:** "Test it" button to send real requests from the browser
- **Loan flow diagram:** Visual `create → calcular → ap02 → ap03` flow
- **New endpoints:**
  - Partner: Search, Read
  - Loans: Calculate Amortization, Process (ap02), Activate (ap03), Read Balances
  - Catalogs: Products, Subproducts, States (SEPOMEX)

### Changed
- Layout: sidebar (~20%) + docs (~50%) + code examples (~30%)
- Orange accent color matching Acendes brand
- Postman collection cleaned and generalized (no client-specific data)

### Fixed
- `vor.cre_amortizacion` → `vor.cre_flujos` (correct model name)
- `pago` → `pago_total`, `iva_interes` → `iva_int` (correct field names)
- `saldo_actual` → `saldo_exigible` / `saldo_liquidar` (correct balance fields)
- `tipo_interes`: Documented all 16 options (was only 2)
- Added `tipo_calculo` as required field for loan creation
- Loan states corrected: `0 → 1 → 10 → 20 → 90 → 99`
- JSON-RPC required for methods returning `null` (not XML-RPC)

---

## v1.0 — 2026-02-25

First version of the API documentation.

### Includes

- **Partner:** Create, update, search. Upsert with automatic CURP/RFC deduplication
- **PLD/AML:** Risk scoring with 25 criteria. Levels: low, medium, high
- **Loans:** Create, calculate amortization, process (ap02), activate/disburse (ap03)
- **Catalogs:** Dynamic catalog queries (states, products, economic activities)
- **Name resolution:** Many2one fields accept name or ID (`"México"` → `156`)
- **Static values:** Complete documentation of 16 interest types, periodicities, states
- **Postman Collection:** 34 requests organized by flow
- **Validated data:** Amortization table validated in test environment
