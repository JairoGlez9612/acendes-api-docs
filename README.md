# Acendes API Docs

Interactive API documentation for Acendes — a loan portfolio management engine built on Odoo.

## Features

- Two-panel layout: documentation on the left, code examples on the right
- Code examples in 4 languages: cURL, Python, JavaScript, PHP
- Interactive API playground (Test it)
- Bilingual support: Spanish / English
- Dark theme inspired by Mintlify / Unico DevCenter

## Endpoints

| Group | Endpoint | Method |
|-------|----------|--------|
| Auth | Login (XML-RPC) | `authenticate` |
| Partner | Create or Update (Upsert) | `create_or_update_partner` |
| Partner | Search | `search` |
| Partner | Read | `read` |
| PLD/AML | Run Scoring | `calcular_riesgo_score` |
| Loans | Create Loan | `create` |
| Loans | Calculate Amortization | `calcular` |
| Loans | Process (ap02) | `ap02` |
| Loans | Activate / Disburse (ap03) | `ap03` |
| Loans | Read Balances | `read` |
| Catalogs | Products | `search_read` |
| Catalogs | Subproducts | `search_read` |
| Catalogs | States (SEPOMEX) | `search_read` |

## Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USER/acendes-api-docs.git
cd acendes-api-docs

# Serve with any static server
python3 -m http.server 3001

# Open http://localhost:3001
```

## Deploy to GitHub Pages

The site is a static SPA (HTML + CSS + JS). Just enable GitHub Pages pointing to the `main` branch root.

## License

MIT
