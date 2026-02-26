// ═══════════════════════════════════════════════════════
// Acendes API Docs — App (i18n + all endpoints)
// ═══════════════════════════════════════════════════════

// ── i18n ──
const I18N = {
  es: {
    // UI
    body: 'Body', responses: 'Respuestas', successResponse: 'Respuesta exitosa',
    endpoint: 'Endpoint', model: 'Modelo', method: 'Método',
    required: 'requerido', optional: 'opcional',
    testIt: 'Probar', send: 'Enviar', sending: 'Enviando...',
    playground: 'API Playground',
    corsError: 'El login XML-RPC no se puede ejecutar desde el navegador por restricciones CORS.\nUsar Postman, curl o un script.',
    connError: 'Error de conexión',
    connHint: 'Verifica:\n- URL correcta\n- CORS habilitado\n- Servidor accesible',
    // Groups
    grp_overview: 'Inicio', grp_auth: 'Autenticación', grp_partner: 'Partner', grp_pld: 'PLD',
    grp_loans: 'Préstamos', grp_catalogs: 'Catálogos', grp_ref: 'Referencia',
    // Flow
    flow: 'Flujo',
    // Overview
    ov_title: 'Acendes API',
    ov_subtitle: 'Documentación de APIs para integración externa con el motor de cartera de crédito.',
    ov_desc: 'Acendes es el motor de cartera para instituciones financieras. Los sistemas externos se integran usando las APIs nativas de Odoo v16 vía JSON-RPC.',
    ov_quickstart: 'Inicio Rápido',
    ov_quickstart_desc: 'Autenticación, estructura JSON-RPC y primera llamada en 5 minutos.',
    ov_partner_title: 'Partner',
    ov_partner_desc: 'Crear, actualizar y buscar clientes. Upsert con deduplicación automática por CURP/RFC.',
    ov_pld_title: 'PLD / AML',
    ov_pld_desc: 'Evaluación de riesgo con 25 criterios. Niveles: bajo, medio, alto.',
    ov_loans_title: 'Préstamos',
    ov_loans_desc: 'Crear préstamos, calcular amortización, procesar y activar.',
    ov_catalogs_title: 'Catálogos',
    ov_catalogs_desc: 'Consultar productos, subproductos, estados y más.',
    ov_postman_title: 'Colección Postman',
    ov_postman_desc: '34 requests organizados por flujo, listos para importar.',
    ov_download: 'Descargar Colección Postman',
    ov_changelog: 'Changelog',
    ov_flow_title: 'Flujo Completo de Integración',
    ov_protocol: 'Protocolo: JSON-RPC',
    ov_auth: 'Autenticación: UID + Password',
    ov_format: 'Formato: JSON',
    // Reference pages
    ref_postman: 'Colección Postman',
    ref_changelog: 'Changelog',
    ref_errors: 'Errores',
    ref_environments: 'Ambientes',
    ref_static: 'Valores Estáticos',
  },
  en: {
    body: 'Body', responses: 'Responses', successResponse: 'Successful response',
    endpoint: 'Endpoint', model: 'Model', method: 'Method',
    required: 'required', optional: 'optional',
    testIt: 'Test it', send: 'Send', sending: 'Sending...',
    playground: 'API Playground',
    corsError: 'XML-RPC login cannot be executed from the browser due to CORS restrictions.\nUse Postman, curl or a script.',
    connError: 'Connection error',
    connHint: 'Check:\n- Correct URL\n- CORS enabled\n- Server reachable',
    grp_overview: 'Overview', grp_auth: 'Authentication', grp_partner: 'Partner', grp_pld: 'AML',
    grp_loans: 'Loans', grp_catalogs: 'Catalogs', grp_ref: 'Reference',
    flow: 'Flow',
    ov_title: 'Acendes API',
    ov_subtitle: 'API documentation for external integration with the credit portfolio engine.',
    ov_desc: 'Acendes is the credit portfolio engine for financial institutions. External systems integrate using Odoo v16 native APIs via JSON-RPC.',
    ov_quickstart: 'Quick Start',
    ov_quickstart_desc: 'Authentication, JSON-RPC structure and first call in 5 minutes.',
    ov_partner_title: 'Partner',
    ov_partner_desc: 'Create, update and search customers. Upsert with automatic CURP/RFC deduplication.',
    ov_pld_title: 'AML Scoring',
    ov_pld_desc: 'Risk evaluation with 25 criteria. Levels: low, medium, high.',
    ov_loans_title: 'Loans',
    ov_loans_desc: 'Create loans, calculate amortization, process and activate.',
    ov_catalogs_title: 'Catalogs',
    ov_catalogs_desc: 'Query products, subproducts, states and more.',
    ov_postman_title: 'Postman Collection',
    ov_postman_desc: '34 requests organized by flow, ready to import.',
    ov_download: 'Download Postman Collection',
    ov_changelog: 'Changelog',
    ov_flow_title: 'Full Integration Flow',
    ov_protocol: 'Protocol: JSON-RPC',
    ov_auth: 'Authentication: UID + Password',
    ov_format: 'Format: JSON',
    ref_postman: 'Postman Collection',
    ref_changelog: 'Changelog',
    ref_errors: 'Errors',
    ref_environments: 'Environments',
    ref_static: 'Static Values',
  }
};

let lang = 'es';
function t(key) { return I18N[lang][key] || I18N.es[key] || key; }

// ── Helper: JSON-RPC code generators ──
function jsonrpcCurl(model, method, argsStr) {
  return `curl -X POST {base_url}/jsonrpc \\
  -H "Content-Type: application/json" \\
  -d '{
  "jsonrpc": "2.0",
  "method": "call",
  "params": {
    "service": "object",
    "method": "execute_kw",
    "args": [
      "{db}", {uid}, "{password}",
      "${model}", "${method}",
      ${argsStr}
    ]
  },
  "id": 1
}'`;
}

function jsonrpcPython(model, method, argsStr, resultLine) {
  return `import requests

payload = {
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "service": "object",
        "method": "execute_kw",
        "args": [
            "{db}", {uid}, "{password}",
            "${model}", "${method}",
            ${argsStr}
        ]
    },
    "id": 1
}

resp = requests.post("{base_url}/jsonrpc", json=payload)
${resultLine}`;
}

function jsonrpcJS(model, method, argsStr, resultLine) {
  return `const resp = await fetch('{base_url}/jsonrpc', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0', method: 'call',
    params: {
      service: 'object', method: 'execute_kw',
      args: [
        '{db}', {uid}, '{password}',
        '${model}', '${method}',
        ${argsStr}
      ]
    }, id: 1
  })
});

const data = await resp.json();
${resultLine}`;
}

function jsonrpcPHP(model, method, argsStr, resultLine) {
  return `<?php
$payload = [
    "jsonrpc" => "2.0",
    "method" => "call",
    "params" => [
        "service" => "object",
        "method" => "execute_kw",
        "args" => [
            "{db}", {uid}, "{password}",
            "${model}", "${method}",
            ${argsStr}
        ]
    ],
    "id" => 1
];

$ch = curl_init("{base_url}/jsonrpc");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = json_decode(curl_exec($ch), true);
${resultLine}`;
}

// ── Special pages (non-endpoint) ──
const SPECIAL_PAGES = {
  'overview': true,
  'ref-postman': true,
  'ref-changelog': true,
  'ref-errors': true,
  'ref-static': true,
};

// ── Endpoints data ──
const ENDPOINTS = [
  // ════════════════════════════════════
  // OVERVIEW (landing page)
  // ════════════════════════════════════
  {
    id: 'overview',
    group: { es: 'Inicio', en: 'Overview' },
    name: { es: 'Descripción General', en: 'Overview' },
    special: 'overview',
  },

  // ════════════════════════════════════
  // AUTH
  // ════════════════════════════════════
  {
    id: 'auth-login',
    group: { es: 'Autenticación', en: 'Authentication' },
    name: { es: 'Login', en: 'Login' },
    method: 'POST',
    path: '{base_url}/xmlrpc/2/common',
    desc: {
      es: 'Autenticar y obtener UID. Este es el único endpoint que usa XML-RPC. Todas las demás llamadas usan JSON-RPC vía <code>/jsonrpc</code>.',
      en: 'Authenticate and obtain UID. This is the only endpoint using XML-RPC. All other calls use JSON-RPC via <code>/jsonrpc</code>.'
    },
    fields: [
      { name: 'db', type: 'string', required: true, desc: { es: 'Nombre de la base de datos', en: 'Database name' } },
      { name: 'username', type: 'string', required: true, desc: { es: 'Usuario API', en: 'API user' } },
      { name: 'password', type: 'string', required: true, desc: { es: 'Contraseña o API key', en: 'Password or API key' } },
    ],
    responseFields: [
      { name: 'result', type: 'integer', desc: { es: 'UID del usuario. Usar en todas las llamadas posteriores.', en: 'User UID. Use in all subsequent calls.' } },
    ],
    model: null,
    odooMethod: 'authenticate',
    codes: {
      curl: `curl -X POST {base_url}/xmlrpc/2/common \\
  -H "Content-Type: text/xml" \\
  -d '<?xml version="1.0"?>
<methodCall>
  <methodName>authenticate</methodName>
  <params>
    <param><value>{db}</value></param>
    <param><value>{username}</value></param>
    <param><value>{password}</value></param>
    <param><value><struct></struct></value></param>
  </params>
</methodCall>'`,
      python: `import xmlrpc.client

URL = "{base_url}"
DB  = "{db}"
USER = "{username}"
PWD  = "{password}"

common = xmlrpc.client.ServerProxy(f"{URL}/xmlrpc/2/common")
uid = common.authenticate(DB, USER, PWD, {})
print(f"UID: {uid}")`,
      javascript: `const xmlrpc = require('xmlrpc');

const client = xmlrpc.createClient({
  url: '{base_url}/xmlrpc/2/common'
});

client.methodCall('authenticate', [
  '{db}', '{username}', '{password}', {}
], (err, uid) => {
  console.log('UID:', uid);
});`,
      php: `<?php
$url = "{base_url}/xmlrpc/2/common";

$client = ripcord::client($url);
$uid = $client->authenticate(
    "{db}", "{username}", "{password}", []
);
echo "UID: " . $uid;`,
    },
    responseExample: {
      success: `<?xml version="1.0"?>
<methodResponse>
  <params>
    <param><value><int>42</int></value></param>
  </params>
</methodResponse>`,
    },
  },

  // ════════════════════════════════════
  // PARTNER
  // ════════════════════════════════════
  {
    id: 'partner-upsert',
    group: { es: 'Partner', en: 'Partner' },
    name: { es: 'Crear o Actualizar (Upsert)', en: 'Create or Update (Upsert)' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Crea o actualiza un partner usando CURP (PF) o RFC (PM) como llave de deduplicación. Los campos de catálogo aceptan tanto ID como nombre.',
      en: 'Creates or updates a partner using CURP (individual) or RFC (company) as dedup key. Catalog fields accept both ID and name.'
    },
    callout: {
      type: 'info',
      text: {
        es: 'Los campos <code>integer | string</code> aceptan el nombre del catálogo en vez del ID. Ejemplo: <code>"México"</code> en vez de <code>156</code>. La resolución es automática.',
        en: 'Fields marked <code>integer | string</code> accept catalog name instead of ID. Example: <code>"México"</code> instead of <code>156</code>. Resolution is automatic.'
      }
    },
    fields: [
      { name: 'name', type: 'string', required: true, desc: { es: 'Nombre completo (ApPaterno + ApMaterno + Nombre)', en: 'Full name (LastName + SecondLastName + FirstName)' } },
      { name: 'company_type', type: 'string', required: true, desc: { es: '<code>"person"</code> PF, <code>"company"</code> PM', en: '<code>"person"</code> individual, <code>"company"</code> company' } },
      { name: 'type', type: 'string', required: true, desc: { es: 'Siempre <code>"contact"</code>', en: 'Always <code>"contact"</code>' } },
      { name: 'bp_tipo_persona', type: 'string', required: true, desc: { es: '<code>"f"</code> Física, <code>"m"</code> Moral, <code>"a"</code> PFAE', en: '<code>"f"</code> Individual, <code>"m"</code> Company, <code>"a"</code> PFAE' } },
      { name: 'bp_es_cliente', type: 'boolean', required: true, desc: { es: 'Siempre <code>true</code>', en: 'Always <code>true</code>' } },
      { name: 'bp_curp', type: 'string', required: true, desc: { es: 'CURP (18 caracteres). Llave de deduplicación para PF', en: 'CURP (18 chars). Dedup key for individuals' } },
      { name: 'vat', type: 'string', required: true, desc: { es: 'RFC. 13 chars PF, 12 chars PM', en: 'RFC tax ID. 13 chars individual, 12 chars company' } },
      { name: 'bp_nom_primero', type: 'string', required: true, desc: { es: 'Primer nombre', en: 'First name' } },
      { name: 'bp_ape_paterno', type: 'string', required: true, desc: { es: 'Apellido paterno', en: 'Last name' } },
      { name: 'bp_ape_materno', type: 'string', required: false, desc: { es: 'Apellido materno', en: 'Second last name' } },
      { name: 'bp_fecha_nacimiento', type: 'date', required: true, desc: { es: 'Fecha nacimiento <code>YYYY-MM-DD</code>', en: 'Birth date <code>YYYY-MM-DD</code>' } },
      { name: 'bp_sexo', type: 'string', required: true, desc: { es: '<code>"m"</code> Masculino, <code>"f"</code> Femenino, <code>"i"</code> Indefinido', en: '<code>"m"</code> Male, <code>"f"</code> Female, <code>"i"</code> Undefined' } },
      { name: 'mobile', type: 'string', required: false, desc: { es: 'Teléfono celular', en: 'Mobile phone' } },
      { name: 'email', type: 'string', required: false, desc: { es: 'Correo electrónico', en: 'Email' } },
      { name: 'country_id', type: 'integer | string', required: false, desc: { es: 'País. <code>156</code> o <code>"México"</code>', en: 'Country. <code>156</code> or <code>"México"</code>' } },
      { name: 'rel_estado', type: 'integer | string', required: false, desc: { es: 'Estado SEPOMEX', en: 'State (SEPOMEX)' } },
      { name: 'bp_pais_nacimiento', type: 'integer | string', required: false, desc: { es: 'País nacimiento (PLD)', en: 'Birth country (AML)' } },
      { name: 'bp_nacionalidad', type: 'integer | string', required: false, desc: { es: 'Nacionalidad (PLD)', en: 'Nationality (AML)' } },
    ],
    responseFields: [
      { name: 'partner_id', type: 'integer', desc: { es: 'ID del partner (nuevo o existente)', en: 'Partner ID (new or existing)' } },
      { name: 'operation', type: 'string', desc: { es: '<code>"created"</code> o <code>"updated"</code>', en: '<code>"created"</code> or <code>"updated"</code>' } },
      { name: 'resolved_fields', type: 'object', desc: { es: 'Campos resueltos de nombre a ID', en: 'Fields resolved from name to ID' } },
    ],
    model: 'res.partner',
    odooMethod: 'create_or_update_partner',
    codes: {
      curl: jsonrpcCurl('res.partner', 'create_or_update_partner', `[{
        "name": "Garcia Lopez Maria",
        "company_type": "person",
        "type": "contact",
        "bp_tipo_persona": "f",
        "bp_es_cliente": true,
        "bp_curp": "GALM900101MJCRNR01",
        "vat": "GALM900101AB1",
        "bp_nom_primero": "Maria",
        "bp_ape_paterno": "Garcia",
        "bp_fecha_nacimiento": "1990-01-01",
        "bp_sexo": "f",
        "country_id": "México"
      }]`),
      python: jsonrpcPython('res.partner', 'create_or_update_partner', `[{
                "name": "Garcia Lopez Maria",
                "company_type": "person",
                "type": "contact",
                "bp_tipo_persona": "f",
                "bp_es_cliente": True,
                "bp_curp": "GALM900101MJCRNR01",
                "vat": "GALM900101AB1",
                "bp_nom_primero": "Maria",
                "bp_ape_paterno": "Garcia",
                "bp_fecha_nacimiento": "1990-01-01",
                "bp_sexo": "f",
                "country_id": "México"
            }]`, `result = resp.json()["result"]
print(f"Partner ID: {result['partner_id']}")
print(f"Operation: {result['operation']}")`),
      javascript: jsonrpcJS('res.partner', 'create_or_update_partner', `[{
          name: 'Garcia Lopez Maria',
          company_type: 'person',
          type: 'contact',
          bp_tipo_persona: 'f',
          bp_es_cliente: true,
          bp_curp: 'GALM900101MJCRNR01',
          vat: 'GALM900101AB1',
          bp_nom_primero: 'Maria',
          bp_ape_paterno: 'Garcia',
          bp_fecha_nacimiento: '1990-01-01',
          bp_sexo: 'f',
          country_id: 'México'
        }]`, `console.log('Partner ID:', data.result.partner_id);`),
      php: jsonrpcPHP('res.partner', 'create_or_update_partner', `[[
            "name" => "Garcia Lopez Maria",
            "company_type" => "person",
            "type" => "contact",
            "bp_tipo_persona" => "f",
            "bp_es_cliente" => true,
            "bp_curp" => "GALM900101MJCRNR01",
            "vat" => "GALM900101AB1",
            "bp_nom_primero" => "Maria",
            "bp_ape_paterno" => "Garcia",
            "bp_fecha_nacimiento" => "1990-01-01",
            "bp_sexo" => "f"
        ]]`, `echo "Partner ID: " . $response["result"]["partner_id"];`),
    },
    responseExample: {
      success: JSON.stringify({
        jsonrpc: "2.0", id: 1,
        result: {
          partner_id: 123, operation: "created",
          name: "Garcia Lopez Maria",
          bp_curp: "GALM900101MJCRNR01", vat: "GALM900101AB1",
          resolved_fields: { country_id: { name: "México", id: 156, model: "res.country" } },
          not_found_fields: {}
        }
      }, null, 2),
    },
  },

  {
    id: 'partner-search',
    group: { es: 'Partner', en: 'Partner' },
    name: { es: 'Buscar Partner', en: 'Search Partner' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Busca partners por dominio Odoo. Retorna lista de IDs que coinciden con los criterios.',
      en: 'Search partners by Odoo domain. Returns list of IDs matching criteria.'
    },
    fields: [
      { name: 'domain', type: 'list', required: true, desc: { es: 'Dominio Odoo. Ej: <code>[["bp_curp","=","GALM900101MJCRNR01"]]</code>', en: 'Odoo domain. Ex: <code>[["bp_curp","=","GALM900101MJCRNR01"]]</code>' } },
    ],
    responseFields: [
      { name: 'result', type: 'list[integer]', desc: { es: 'Lista de IDs encontrados', en: 'List of matching IDs' } },
    ],
    model: 'res.partner',
    odooMethod: 'search',
    codes: {
      curl: jsonrpcCurl('res.partner', 'search', `[[["bp_curp", "=", "GALM900101MJCRNR01"]]]`),
      python: jsonrpcPython('res.partner', 'search', `[[["bp_curp", "=", "GALM900101MJCRNR01"]]]`, `ids = resp.json()["result"]
print(f"IDs encontrados: {ids}")`),
      javascript: jsonrpcJS('res.partner', 'search', `[[['bp_curp', '=', 'GALM900101MJCRNR01']]]`, `console.log('IDs:', data.result);`),
      php: jsonrpcPHP('res.partner', 'search', `[[["bp_curp", "=", "GALM900101MJCRNR01"]]]`, `print_r($response["result"]);`),
    },
    responseExample: {
      success: JSON.stringify({ jsonrpc: "2.0", id: 1, result: [123] }, null, 2),
    },
  },

  {
    id: 'partner-read',
    group: { es: 'Partner', en: 'Partner' },
    name: { es: 'Leer Partner', en: 'Read Partner' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Lee campos específicos de uno o más partners por ID.',
      en: 'Read specific fields from one or more partners by ID.'
    },
    fields: [
      { name: 'ids', type: 'list[integer]', required: true, desc: { es: 'Lista de IDs a leer', en: 'List of IDs to read' } },
      { name: 'fields', type: 'list[string]', required: false, desc: { es: 'Campos a retornar. Si se omite, retorna todos.', en: 'Fields to return. If omitted, returns all.' } },
    ],
    responseFields: [
      { name: 'result', type: 'list[object]', desc: { es: 'Lista de diccionarios con los campos solicitados', en: 'List of dicts with requested fields' } },
    ],
    model: 'res.partner',
    odooMethod: 'read',
    codes: {
      curl: jsonrpcCurl('res.partner', 'read', `[[123]],
      {"fields": ["name", "bp_curp", "vat", "vor_pld_nivel_riesgo"]}`),
      python: jsonrpcPython('res.partner', 'read', `[[123]],
            {"fields": ["name", "bp_curp", "vat", "vor_pld_nivel_riesgo"]}`, `result = resp.json()["result"]
print(result[0]["name"])
print(result[0]["vor_pld_nivel_riesgo"])`),
      javascript: jsonrpcJS('res.partner', 'read', `[[123]],
        { fields: ['name', 'bp_curp', 'vat', 'vor_pld_nivel_riesgo'] }`, `console.log(data.result[0]);`),
      php: jsonrpcPHP('res.partner', 'read', `[[123]],
        ["fields" => ["name", "bp_curp", "vat", "vor_pld_nivel_riesgo"]]`, `print_r($response["result"][0]);`),
    },
    responseExample: {
      success: JSON.stringify({
        jsonrpc: "2.0", id: 1,
        result: [{
          id: 123, name: "Garcia Lopez Maria",
          bp_curp: "GALM900101MJCRNR01", vat: "GALM900101AB1",
          vor_pld_nivel_riesgo: "bajo"
        }]
      }, null, 2),
    },
  },

  // ════════════════════════════════════
  // PLD
  // ════════════════════════════════════
  {
    id: 'pld-scoring',
    group: { es: 'PLD', en: 'AML' },
    name: { es: 'Ejecutar Scoring', en: 'Run Scoring' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Evalúa 25 criterios de riesgo PLD y asigna nivel: bajo, medio o alto. El partner debe tener los campos mínimos de PLD completados.',
      en: 'Evaluates 25 AML risk criteria and assigns level: low, medium or high. Partner must have minimum AML fields filled.'
    },
    callout: {
      type: 'warning',
      text: {
        es: 'El método retorna <code>null</code>. Usar JSON-RPC, no XML-RPC. Leer el resultado con <code>read</code> en un paso separado.',
        en: 'Method returns <code>null</code>. Use JSON-RPC, not XML-RPC. Read the result with <code>read</code> in a separate step.'
      }
    },
    fields: [
      { name: 'partner_ids', type: 'list[integer]', required: true, desc: { es: 'Lista con el ID del partner', en: 'List with partner ID' } },
    ],
    responseFields: [
      { name: 'result', type: 'null', desc: { es: 'Retorna null. Leer resultado con <code>read</code> sobre <code>vor_pld_nivel_riesgo</code>.', en: 'Returns null. Read result with <code>read</code> on <code>vor_pld_nivel_riesgo</code>.' } },
    ],
    model: 'res.partner',
    odooMethod: 'calcular_riesgo_score',
    codes: {
      curl: jsonrpcCurl('res.partner', 'calcular_riesgo_score', `[[123]]`),
      python: `import requests

# Step 1: Run scoring
payload = {
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "service": "object",
        "method": "execute_kw",
        "args": ["{db}", {uid}, "{password}",
                 "res.partner", "calcular_riesgo_score", [[123]]]
    },
    "id": 1
}
requests.post("{base_url}/jsonrpc", json=payload)

# Step 2: Read result
payload_read = {
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "service": "object",
        "method": "execute_kw",
        "args": ["{db}", {uid}, "{password}",
                 "res.partner", "read", [[123]],
                 {"fields": ["vor_pld_nivel_riesgo",
                             "vor_pld_score"]}]
    },
    "id": 2
}
resp = requests.post("{base_url}/jsonrpc", json=payload_read)
nivel = resp.json()["result"][0]["vor_pld_nivel_riesgo"]
print(f"Risk level: {nivel}")`,
      javascript: `// Step 1: Run scoring
await fetch('{base_url}/jsonrpc', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0', method: 'call',
    params: {
      service: 'object', method: 'execute_kw',
      args: ['{db}', {uid}, '{password}',
             'res.partner', 'calcular_riesgo_score', [[123]]]
    }, id: 1
  })
});

// Step 2: Read result
const resp = await fetch('{base_url}/jsonrpc', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0', method: 'call',
    params: {
      service: 'object', method: 'execute_kw',
      args: ['{db}', {uid}, '{password}',
             'res.partner', 'read', [[123]],
             { fields: ['vor_pld_nivel_riesgo'] }]
    }, id: 2
  })
});
const { result } = await resp.json();
console.log('Level:', result[0].vor_pld_nivel_riesgo);`,
      php: jsonrpcPHP('res.partner', 'calcular_riesgo_score', `[[123]]`, `// Result is null — read with a separate call
echo "Scoring executed. Read result with 'read' method.";`),
    },
    responseExample: {
      success: JSON.stringify({ jsonrpc: "2.0", id: 1, result: null }, null, 2),
    },
  },

  // ════════════════════════════════════
  // LOANS
  // ════════════════════════════════════
  {
    id: 'prestamo-crear',
    group: { es: 'Préstamos', en: 'Loans' },
    name: { es: 'Crear Préstamo', en: 'Create Loan' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Crea un nuevo préstamo vinculado a un partner. Estado inicial: <code>0</code> (Borrador).',
      en: 'Creates a new loan linked to a partner. Initial state: <code>0</code> (Draft).'
    },
    flow: ['create', 'calcular', 'ap02', 'ap03'],
    flowActive: 0,
    fields: [
      { name: 'cliente', type: 'integer', required: true, desc: { es: '<code>partner_id</code> del cliente', en: '<code>partner_id</code> of the customer' } },
      { name: 'producto', type: 'integer', required: true, desc: { es: 'ID del producto (<code>vor.cre_productos</code>)', en: 'Product ID (<code>vor.cre_productos</code>)' } },
      { name: 'monto', type: 'float', required: true, desc: { es: 'Monto del préstamo', en: 'Loan amount' } },
      { name: 'tasa', type: 'float', required: true, desc: { es: 'Tasa de interés anual (%)', en: 'Annual interest rate (%)' } },
      { name: 'periodicidad', type: 'string', required: true, desc: { es: '<code>"7"</code> Semanal, <code>"14"</code> Catorcenal, <code>"15"</code> Quincenal, <code>"30"</code> Mensual', en: '<code>"7"</code> Weekly, <code>"14"</code> Biweekly, <code>"15"</code> Semi-monthly, <code>"30"</code> Monthly' } },
      { name: 'periodos', type: 'integer', required: true, desc: { es: 'Número de pagos', en: 'Number of payments' } },
      { name: 'fecha_desembolso', type: 'date', required: true, desc: { es: 'Fecha desembolso <code>YYYY-MM-DD</code>', en: 'Disbursement date <code>YYYY-MM-DD</code>' } },
      { name: 'fecha_ini', type: 'date', required: true, desc: { es: 'Fecha primer pago <code>YYYY-MM-DD</code>', en: 'First payment date <code>YYYY-MM-DD</code>' } },
      { name: 'tipo_interes', type: 'string', required: true, desc: { es: 'Método de cálculo. <code>"0"</code> = 30/360 Pagos Iguales (más común)', en: 'Calculation method. <code>"0"</code> = 30/360 Equal Payments (most common)' } },
      { name: 'tipo_calculo', type: 'string', required: true, desc: { es: '<code>"0"</code> Calcular Pago, <code>"1"</code> Calcular Fecha Fin', en: '<code>"0"</code> Calculate Payment, <code>"1"</code> Calculate End Date' } },
      { name: 'subproducto', type: 'integer', required: false, desc: { es: 'ID subproducto. Aplica defaults automáticamente', en: 'Subproduct ID. Applies defaults automatically' } },
      { name: 'tasa_iva', type: 'float', required: false, desc: { es: 'IVA sobre intereses. Default: <code>16.0</code>', en: 'VAT on interest. Default: <code>16.0</code>' } },
      { name: 'comision_a', type: 'float', required: false, desc: { es: 'Comisión de apertura (%)', en: 'Origination fee (%)' } },
      { name: 'dias_gracia', type: 'integer', required: false, desc: { es: 'Días de gracia. Default: <code>0</code>', en: 'Grace days. Default: <code>0</code>' } },
    ],
    responseFields: [
      { name: 'result', type: 'integer', desc: { es: 'ID del préstamo creado', en: 'Created loan ID' } },
    ],
    model: 'vor.cre_prestamos',
    odooMethod: 'create',
    codes: {
      curl: jsonrpcCurl('vor.cre_prestamos', 'create', `[{
        "cliente": 123,
        "producto": 5,
        "monto": 50000.00,
        "tasa": 36.0,
        "periodicidad": "30",
        "periodos": 12,
        "fecha_desembolso": "2026-03-01",
        "fecha_ini": "2026-04-01",
        "tipo_interes": "0",
        "tipo_calculo": "0"
      }]`),
      python: jsonrpcPython('vor.cre_prestamos', 'create', `[{
                "cliente": 123,
                "producto": 5,
                "monto": 50000.00,
                "tasa": 36.0,
                "periodicidad": "30",
                "periodos": 12,
                "fecha_desembolso": "2026-03-01",
                "fecha_ini": "2026-04-01",
                "tipo_interes": "0",
                "tipo_calculo": "0"
            }]`, `loan_id = resp.json()["result"]
print(f"Loan ID: {loan_id}")`),
      javascript: jsonrpcJS('vor.cre_prestamos', 'create', `[{
          cliente: 123,
          producto: 5,
          monto: 50000.00,
          tasa: 36.0,
          periodicidad: '30',
          periodos: 12,
          fecha_desembolso: '2026-03-01',
          fecha_ini: '2026-04-01',
          tipo_interes: '0',
          tipo_calculo: '0'
        }]`, `console.log('Loan ID:', data.result);`),
      php: jsonrpcPHP('vor.cre_prestamos', 'create', `[[
            "cliente" => 123,
            "producto" => 5,
            "monto" => 50000.00,
            "tasa" => 36.0,
            "periodicidad" => "30",
            "periodos" => 12,
            "fecha_desembolso" => "2026-03-01",
            "fecha_ini" => "2026-04-01",
            "tipo_interes" => "0",
            "tipo_calculo" => "0"
        ]]`, `echo "Loan ID: " . $response["result"];`),
    },
    responseExample: {
      success: JSON.stringify({ jsonrpc: "2.0", id: 1, result: 456 }, null, 2),
    },
  },

  {
    id: 'prestamo-calcular',
    group: { es: 'Préstamos', en: 'Loans' },
    name: { es: 'Calcular Amortización', en: 'Calculate Amortization' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Genera la tabla de amortización (flujos) del préstamo. El estado permanece en <code>0</code>. Los flujos se almacenan en <code>vor.cre_flujos</code>.',
      en: 'Generates the amortization table (flows) for the loan. State remains <code>0</code>. Flows are stored in <code>vor.cre_flujos</code>.'
    },
    flow: ['create', 'calcular', 'ap02', 'ap03'],
    flowActive: 1,
    callout: {
      type: 'warning',
      text: {
        es: 'Retorna <code>true</code>. Usar JSON-RPC (no XML-RPC). Leer flujos con <code>search_read</code> sobre <code>vor.cre_flujos</code>.',
        en: 'Returns <code>true</code>. Use JSON-RPC (not XML-RPC). Read flows with <code>search_read</code> on <code>vor.cre_flujos</code>.'
      }
    },
    fields: [
      { name: 'loan_ids', type: 'list[integer]', required: true, desc: { es: 'Lista con el ID del préstamo', en: 'List with loan ID' } },
    ],
    responseFields: [
      { name: 'result', type: 'boolean', desc: { es: 'Retorna <code>true</code> si el cálculo fue exitoso', en: 'Returns <code>true</code> if calculation was successful' } },
    ],
    model: 'vor.cre_prestamos',
    odooMethod: 'calcular',
    codes: {
      curl: jsonrpcCurl('vor.cre_prestamos', 'calcular', `[[456]]`),
      python: `import requests

# Step 1: Calculate
payload = {
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "service": "object",
        "method": "execute_kw",
        "args": ["{db}", {uid}, "{password}",
                 "vor.cre_prestamos", "calcular", [[456]]]
    },
    "id": 1
}
requests.post("{base_url}/jsonrpc", json=payload)

# Step 2: Read amortization table
payload_read = {
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "service": "object",
        "method": "execute_kw",
        "args": ["{db}", {uid}, "{password}",
                 "vor.cre_flujos", "search_read",
                 [[["credito", "=", 456]]],
                 {"fields": ["numero", "fecha_vence",
                             "capital", "interes", "iva_int",
                             "pago_total", "saldo_exigible"],
                  "order": "numero asc"}]
    },
    "id": 2
}
resp = requests.post("{base_url}/jsonrpc", json=payload_read)
for row in resp.json()["result"]:
    print(f"#{row['numero']} | {row['fecha_vence']} | "
          f"\${row['pago_total']:,.2f}")`,
      javascript: jsonrpcJS('vor.cre_prestamos', 'calcular', `[[456]]`, `console.log('Calculated:', data.result);

// Read amortization table
const flows = await fetch('{base_url}/jsonrpc', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0', method: 'call',
    params: {
      service: 'object', method: 'execute_kw',
      args: ['{db}', {uid}, '{password}',
             'vor.cre_flujos', 'search_read',
             [[['credito', '=', 456]]],
             { fields: ['numero', 'fecha_vence', 'pago_total'],
               order: 'numero asc' }]
    }, id: 2
  })
});
const table = (await flows.json()).result;
table.forEach(r => console.log(\`#\${r.numero} \${r.fecha_vence} $\${r.pago_total}\`));`),
      php: jsonrpcPHP('vor.cre_prestamos', 'calcular', `[[456]]`, `echo "Calculated: " . ($response["result"] ? "true" : "false");`),
    },
    responseExample: {
      success: JSON.stringify({ jsonrpc: "2.0", id: 1, result: true }, null, 2),
    },
  },

  {
    id: 'prestamo-ap02',
    group: { es: 'Préstamos', en: 'Loans' },
    name: { es: 'Procesar (ap02)', en: 'Process (ap02)' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Procesa el préstamo: genera número de contrato, aplica comisiones y cambia el estado a <code>1</code> (En Proceso). Requiere que la amortización esté calculada.',
      en: 'Processes the loan: generates contract number, applies fees, and changes state to <code>1</code> (In Process). Requires calculated amortization.'
    },
    flow: ['create', 'calcular', 'ap02', 'ap03'],
    flowActive: 2,
    callout: {
      type: 'info',
      text: {
        es: 'Retorna <code>null</code>. Usar JSON-RPC. Después de ap02, el préstamo tiene número de contrato y está listo para activación.',
        en: 'Returns <code>null</code>. Use JSON-RPC. After ap02, the loan has a contract number and is ready for activation.'
      }
    },
    fields: [
      { name: 'loan_ids', type: 'list[integer]', required: true, desc: { es: 'Lista con el ID del préstamo', en: 'List with loan ID' } },
    ],
    responseFields: [
      { name: 'result', type: 'null', desc: { es: 'Retorna null. Leer estado con <code>read</code>.', en: 'Returns null. Read state with <code>read</code>.' } },
    ],
    model: 'vor.cre_prestamos',
    odooMethod: 'ap02',
    codes: {
      curl: jsonrpcCurl('vor.cre_prestamos', 'ap02', `[[456]]`),
      python: jsonrpcPython('vor.cre_prestamos', 'ap02', `[[456]]`, `# State is now "1" (In Process)
print("Loan processed")`),
      javascript: jsonrpcJS('vor.cre_prestamos', 'ap02', `[[456]]`, `console.log('Loan processed');`),
      php: jsonrpcPHP('vor.cre_prestamos', 'ap02', `[[456]]`, `echo "Loan processed";`),
    },
    responseExample: {
      success: JSON.stringify({ jsonrpc: "2.0", id: 1, result: null }, null, 2),
    },
  },

  {
    id: 'prestamo-ap03',
    group: { es: 'Préstamos', en: 'Loans' },
    name: { es: 'Activar / Desembolsar (ap03)', en: 'Activate / Disburse (ap03)' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Activa el préstamo y registra el desembolso. Cambia estado a <code>10</code> (Vigente). Genera asientos contables.',
      en: 'Activates the loan and registers disbursement. Changes state to <code>10</code> (Active). Creates accounting entries.'
    },
    flow: ['create', 'calcular', 'ap02', 'ap03'],
    flowActive: 3,
    callout: {
      type: 'danger',
      text: {
        es: '<strong>IRREVERSIBLE.</strong> Una vez activado, el préstamo no puede cancelarse. Genera asientos contables y compromete fondos.',
        en: '<strong>IRREVERSIBLE.</strong> Once activated, the loan cannot be cancelled. Creates accounting entries and commits funds.'
      }
    },
    fields: [
      { name: 'loan_ids', type: 'list[integer]', required: true, desc: { es: 'Lista con el ID del préstamo', en: 'List with loan ID' } },
    ],
    responseFields: [
      { name: 'result', type: 'null', desc: { es: 'Retorna null. El préstamo ahora está vigente.', en: 'Returns null. Loan is now active.' } },
    ],
    model: 'vor.cre_prestamos',
    odooMethod: 'ap03',
    codes: {
      curl: jsonrpcCurl('vor.cre_prestamos', 'ap03', `[[456]]`),
      python: jsonrpcPython('vor.cre_prestamos', 'ap03', `[[456]]`, `# State is now "10" (Active)
print("Loan activated and disbursed")`),
      javascript: jsonrpcJS('vor.cre_prestamos', 'ap03', `[[456]]`, `console.log('Loan activated');`),
      php: jsonrpcPHP('vor.cre_prestamos', 'ap03', `[[456]]`, `echo "Loan activated and disbursed";`),
    },
    responseExample: {
      success: JSON.stringify({ jsonrpc: "2.0", id: 1, result: null }, null, 2),
    },
  },

  {
    id: 'prestamo-read',
    group: { es: 'Préstamos', en: 'Loans' },
    name: { es: 'Leer Saldos', en: 'Read Balances' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Lee los saldos y estado actual de un préstamo.',
      en: 'Reads current balances and state of a loan.'
    },
    fields: [
      { name: 'ids', type: 'list[integer]', required: true, desc: { es: 'Lista con el ID del préstamo', en: 'List with loan ID' } },
      { name: 'fields', type: 'list[string]', required: false, desc: { es: 'Campos a leer', en: 'Fields to read' } },
    ],
    responseFields: [
      { name: 'monto', type: 'float', desc: { es: 'Monto original', en: 'Original amount' } },
      { name: 'saldo_exigible', type: 'float', desc: { es: 'Saldo exigible actual', en: 'Current due balance' } },
      { name: 'saldo_liquidar', type: 'float', desc: { es: 'Saldo para liquidar', en: 'Payoff balance' } },
      { name: 'state', type: 'string', desc: { es: 'Estado: <code>0</code> Borrador, <code>1</code> En Proceso, <code>10</code> Vigente, <code>20</code> Vencido, <code>90</code> Liquidado, <code>99</code> Cancelado', en: 'State: <code>0</code> Draft, <code>1</code> Processing, <code>10</code> Active, <code>20</code> Past Due, <code>90</code> Paid Off, <code>99</code> Cancelled' } },
    ],
    model: 'vor.cre_prestamos',
    odooMethod: 'read',
    codes: {
      curl: jsonrpcCurl('vor.cre_prestamos', 'read', `[[456]],
      {"fields": ["name", "monto", "saldo_exigible", "saldo_liquidar", "state"]}`),
      python: jsonrpcPython('vor.cre_prestamos', 'read', `[[456]],
            {"fields": ["name", "monto", "saldo_exigible",
                        "saldo_liquidar", "state"]}`, `loan = resp.json()["result"][0]
print(f"Loan: {loan['name']}")
print(f"Balance: \${loan['saldo_exigible']:,.2f}")
print(f"State: {loan['state']}")`),
      javascript: jsonrpcJS('vor.cre_prestamos', 'read', `[[456]],
        { fields: ['name', 'monto', 'saldo_exigible', 'saldo_liquidar', 'state'] }`, `const loan = data.result[0];
console.log(\`\${loan.name}: $\${loan.saldo_exigible}\`);`),
      php: jsonrpcPHP('vor.cre_prestamos', 'read', `[[456]],
        ["fields" => ["name", "monto", "saldo_exigible", "saldo_liquidar", "state"]]`, `$loan = $response["result"][0];
echo $loan["name"] . ": $" . $loan["saldo_exigible"];`),
    },
    responseExample: {
      success: JSON.stringify({
        jsonrpc: "2.0", id: 1,
        result: [{
          id: 456, name: "PREST-00456",
          monto: 50000.0,
          saldo_exigible: 45231.50,
          saldo_liquidar: 48500.00,
          state: "10"
        }]
      }, null, 2),
    },
  },

  // ════════════════════════════════════
  // CATALOGS
  // ════════════════════════════════════
  {
    id: 'catalogo-productos',
    group: { es: 'Catálogos', en: 'Catalogs' },
    name: { es: 'Productos', en: 'Products' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Consulta los productos de crédito disponibles. Cada producto define las reglas base del préstamo.',
      en: 'Query available credit products. Each product defines the base loan rules.'
    },
    fields: [
      { name: 'domain', type: 'list', required: false, desc: { es: 'Filtro. <code>[]</code> para todos', en: 'Filter. <code>[]</code> for all' } },
      { name: 'fields', type: 'list[string]', required: false, desc: { es: 'Campos a retornar', en: 'Fields to return' } },
    ],
    responseFields: [
      { name: 'id', type: 'integer', desc: { es: 'ID del producto', en: 'Product ID' } },
      { name: 'name', type: 'string', desc: { es: 'Nombre del producto', en: 'Product name' } },
      { name: 'tipo', type: 'string', desc: { es: 'Tipo de crédito', en: 'Credit type' } },
    ],
    model: 'vor.cre_productos',
    odooMethod: 'search_read',
    codes: {
      curl: jsonrpcCurl('vor.cre_productos', 'search_read', `[[]],
      {"fields": ["name", "tipo"]}`),
      python: jsonrpcPython('vor.cre_productos', 'search_read', `[[]],
            {"fields": ["name", "tipo"]}`, `products = resp.json()["result"]
for p in products:
    print(f"{p['id']}: {p['name']}")`),
      javascript: jsonrpcJS('vor.cre_productos', 'search_read', `[[]],
        { fields: ['name', 'tipo'] }`, `data.result.forEach(p => console.log(\`\${p.id}: \${p.name}\`));`),
      php: jsonrpcPHP('vor.cre_productos', 'search_read', `[[]],
        ["fields" => ["name", "tipo"]]`, `foreach ($response["result"] as $p) {
    echo $p["id"] . ": " . $p["name"] . "\\n";
}`),
    },
    responseExample: {
      success: JSON.stringify({
        jsonrpc: "2.0", id: 1,
        result: [
          { id: 1, name: "Crédito Simple", tipo: "simple" },
          { id: 2, name: "Crédito Grupal", tipo: "grupal" },
          { id: 3, name: "Línea de Crédito", tipo: "revolvente" }
        ]
      }, null, 2),
    },
  },

  {
    id: 'catalogo-subproductos',
    group: { es: 'Catálogos', en: 'Catalogs' },
    name: { es: 'Subproductos', en: 'Subproducts' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Consulta subproductos. Cada subproducto hereda de un producto y define valores por defecto (tasa, plazo, periodicidad).',
      en: 'Query subproducts. Each subproduct inherits from a product and defines defaults (rate, term, periodicity).'
    },
    fields: [
      { name: 'domain', type: 'list', required: false, desc: { es: 'Filtro. Ej: <code>[["producto", "=", 1]]</code>', en: 'Filter. Ex: <code>[["producto", "=", 1]]</code>' } },
    ],
    responseFields: [
      { name: 'id', type: 'integer', desc: { es: 'ID del subproducto', en: 'Subproduct ID' } },
      { name: 'name', type: 'string', desc: { es: 'Nombre', en: 'Name' } },
      { name: 'producto', type: 'many2one', desc: { es: 'Producto padre', en: 'Parent product' } },
    ],
    model: 'vor.cre_subproductos',
    odooMethod: 'search_read',
    codes: {
      curl: jsonrpcCurl('vor.cre_subproductos', 'search_read', `[[]],
      {"fields": ["name", "producto"]}`),
      python: jsonrpcPython('vor.cre_subproductos', 'search_read', `[[]],
            {"fields": ["name", "producto"]}`, `subproducts = resp.json()["result"]
for s in subproducts:
    print(f"{s['id']}: {s['name']} -> {s['producto'][1]}")`),
      javascript: jsonrpcJS('vor.cre_subproductos', 'search_read', `[[]],
        { fields: ['name', 'producto'] }`, `data.result.forEach(s => console.log(\`\${s.id}: \${s.name}\`));`),
      php: jsonrpcPHP('vor.cre_subproductos', 'search_read', `[[]],
        ["fields" => ["name", "producto"]]`, `foreach ($response["result"] as $s) {
    echo $s["id"] . ": " . $s["name"] . "\\n";
}`),
    },
    responseExample: {
      success: JSON.stringify({
        jsonrpc: "2.0", id: 1,
        result: [
          { id: 1, name: "Simple 12M", producto: [1, "Crédito Simple"] },
          { id: 2, name: "Simple 24M", producto: [1, "Crédito Simple"] }
        ]
      }, null, 2),
    },
  },

  {
    id: 'catalogo-estados',
    group: { es: 'Catálogos', en: 'Catalogs' },
    name: { es: 'Estados (SEPOMEX)', en: 'States (SEPOMEX)' },
    method: 'POST',
    path: '{base_url}/jsonrpc',
    desc: {
      es: 'Consulta el catálogo de estados de la república (SEPOMEX). Útil para resolver IDs de estado.',
      en: 'Query the states catalog (SEPOMEX). Useful for resolving state IDs.'
    },
    fields: [
      { name: 'domain', type: 'list', required: false, desc: { es: 'Filtro. <code>[]</code> para todos', en: 'Filter. <code>[]</code> for all' } },
    ],
    responseFields: [
      { name: 'id', type: 'integer', desc: { es: 'ID del estado', en: 'State ID' } },
      { name: 'name', type: 'string', desc: { es: 'Nombre del estado', en: 'State name' } },
    ],
    model: 'vor.sepo_estados',
    odooMethod: 'search_read',
    codes: {
      curl: jsonrpcCurl('vor.sepo_estados', 'search_read', `[[]],
      {"fields": ["name"]}`),
      python: jsonrpcPython('vor.sepo_estados', 'search_read', `[[]],
            {"fields": ["name"]}`, `states = resp.json()["result"]
for s in states:
    print(f"{s['id']}: {s['name']}")`),
      javascript: jsonrpcJS('vor.sepo_estados', 'search_read', `[[]],
        { fields: ['name'] }`, `data.result.forEach(s => console.log(\`\${s.id}: \${s.name}\`));`),
      php: jsonrpcPHP('vor.sepo_estados', 'search_read', `[[]],
        ["fields" => ["name"]]`, `foreach ($response["result"] as $s) {
    echo $s["id"] . ": " . $s["name"] . "\\n";
}`),
    },
    responseExample: {
      success: JSON.stringify({
        jsonrpc: "2.0", id: 1,
        result: [
          { id: 1, name: "Aguascalientes" },
          { id: 14, name: "Jalisco" },
          { id: 9, name: "Ciudad de México" }
        ]
      }, null, 2),
    },
  },

  // ════════════════════════════════════
  // REFERENCE PAGES
  // ════════════════════════════════════
  {
    id: 'ref-postman',
    group: { es: 'Referencia', en: 'Reference' },
    name: { es: 'Colección Postman', en: 'Postman Collection' },
    special: 'ref-postman',
  },
  {
    id: 'ref-static',
    group: { es: 'Referencia', en: 'Reference' },
    name: { es: 'Valores Estáticos', en: 'Static Values' },
    special: 'ref-static',
  },
  {
    id: 'ref-computed',
    group: { es: 'Referencia', en: 'Reference' },
    name: { es: 'Campos Computados', en: 'Computed Fields' },
    special: 'ref-computed',
  },
  {
    id: 'ref-errors',
    group: { es: 'Referencia', en: 'Reference' },
    name: { es: 'Errores', en: 'Errors' },
    special: 'ref-errors',
  },
  {
    id: 'ref-environments',
    group: { es: 'Referencia', en: 'Reference' },
    name: { es: 'Ambientes', en: 'Environments' },
    special: 'ref-environments',
  },
  {
    id: 'ref-changelog',
    group: { es: 'Referencia', en: 'Reference' },
    name: { es: 'Changelog', en: 'Changelog' },
    special: 'ref-changelog',
  },
];

// ── Config ──
const LANGS = ['curl', 'python', 'javascript', 'php'];
const LANG_LABELS = { curl: 'cURL', python: 'Python', javascript: 'JavaScript', php: 'PHP' };
const LANG_PRISM = { curl: 'bash', python: 'python', javascript: 'javascript', php: 'php' };

let currentLang = 'python';
let currentEndpoint = ENDPOINTS[0].id;

// ── i18n field helper ──
function localize(val) {
  if (val && typeof val === 'object' && !Array.isArray(val) && (val.es || val.en)) {
    return val[lang] || val.es;
  }
  return val;
}

// ── Build sidebar ──
function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  let html = '';
  let currentGroup = '';

  ENDPOINTS.forEach(ep => {
    const groupName = localize(ep.group);
    if (groupName !== currentGroup) {
      currentGroup = groupName;
      html += `<div class="nav-group-label">${currentGroup}</div>`;
    }
    if (ep.special) {
      html += `<a class="nav-item ${ep.id === currentEndpoint ? 'active' : ''}" data-id="${ep.id}">
        ${localize(ep.name)}
      </a>`;
    } else {
      const methodClass = ep.method === 'POST' ? 'nav-method-post' : 'nav-method-get';
      html += `<a class="nav-item ${ep.id === currentEndpoint ? 'active' : ''}" data-id="${ep.id}">
        <span class="nav-method ${methodClass}">${ep.method}</span>${localize(ep.name)}
      </a>`;
    }
  });

  nav.innerHTML = html;
  nav.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      currentEndpoint = item.dataset.id;
      render();
    });
  });
}

// ── Render field item ──
function renderField(f) {
  const tag = f.required
    ? `<span class="field-tag tag-required">${t('required')}</span>`
    : `<span class="field-tag tag-optional">${t('optional')}</span>`;
  return `<div class="field-item">
    <span class="field-name">${f.name}</span>
    <span class="field-type">${f.type}</span>
    ${tag}
    <div class="field-desc">${localize(f.desc)}</div>
  </div>`;
}

// ── Render flow diagram ──
function renderFlow(ep) {
  if (!ep.flow) return '';
  const steps = ep.flow.map((step, i) => {
    const cls = i === ep.flowActive ? 'flow-step active' : 'flow-step';
    return `<span class="${cls}">${step}</span>`;
  });
  return `<div class="subsection-title">${t('flow')}</div>
    <div class="flow-diagram">${steps.join('<span class="flow-arrow">→</span>')}</div>`;
}

// ── Render left panel ──
function renderLeft(ep) {
  const panel = document.getElementById('panel-left');
  let html = `
    <h1>${localize(ep.name)}</h1>
    <div class="endpoint-url">
      <span class="method-badge method-${ep.method.toLowerCase()}">${ep.method}</span>
      <span class="endpoint-path">${ep.path}</span>
    </div>
    <p class="desc">${localize(ep.desc)}</p>`;

  html += renderFlow(ep);

  if (ep.callout) {
    html += `<div class="callout callout-${ep.callout.type}">${localize(ep.callout.text)}</div>`;
  }

  if (ep.model) {
    html += `<div class="subsection-title">${t('endpoint')}</div>
    <table><tr><td><strong>${t('model')}:</strong> <code>${ep.model}</code></td></tr>
    <tr><td><strong>${t('method')}:</strong> <code>${ep.odooMethod}</code></td></tr></table>`;
  }

  if (ep.fields && ep.fields.length) {
    html += `<div class="section-title">${t('body')}</div><div class="field-list">`;
    html += ep.fields.map(renderField).join('');
    html += `</div>`;
  }

  html += `<hr class="divider"><div class="section-title">${t('responses')}</div>`;
  html += `<div class="response-header">
    <span class="status-badge status-200">200</span>
    <span class="response-label">${t('successResponse')}</span>
  </div>`;
  if (ep.responseFields) {
    html += `<div class="field-list">`;
    html += ep.responseFields.map(f => renderField({ ...f, required: false })).join('');
    html += `</div>`;
  }

  if (ep.responseExample?.error) {
    html += `<div class="response-header">
      <span class="status-badge status-error">error</span>
      <span class="response-label">ValidationError</span>
    </div>`;
  }

  panel.innerHTML = html;
}

// ── Render right panel ──
function renderRight(ep) {
  const panel = document.getElementById('panel-right');

  const tabs = LANGS.map(l =>
    `<button class="lang-tab ${l === currentLang ? 'active' : ''}" data-lang="${l}">${LANG_LABELS[l]}</button>`
  ).join('');

  const panels = LANGS.map(l => {
    const code = ep.codes[l] || '// N/A';
    const prismLang = LANG_PRISM[l];
    return `<div class="code-panel ${l === currentLang ? 'active' : ''}" data-lang="${l}">
      <pre><code class="language-${prismLang}">${escapeHtml(code)}</code></pre>
    </div>`;
  }).join('');

  const badge = ep.model ? `${ep.model}.${ep.odooMethod}` : ep.path.split('/').pop();

  let html = `
    <div class="code-section">
      <div class="code-header">
        <div class="code-header-left">
          <div class="code-endpoint-badge">
            <span class="method-badge method-${ep.method.toLowerCase()}">${ep.method}</span>
            <span>${badge}</span>
          </div>
        </div>
        <div class="lang-tabs">${tabs}</div>
      </div>
      <div class="code-body">${panels}</div>
      <div class="test-btn-container">
        <button class="test-btn" id="test-btn">${t('testIt')} <span class="play-icon">▶</span></button>
      </div>
    </div>`;

  // Response examples
  if (ep.responseExample?.success) {
    const isXml = ep.responseExample.success.trim().startsWith('<');
    const langClass = isXml ? 'language-xml' : 'language-json';
    html += `<div class="response-code">
      <div class="code-header">
        <div class="code-header-left">
          <div class="code-endpoint-badge">
            <span class="status-badge status-200">200</span>
            <span>${t('successResponse')}</span>
          </div>
        </div>
      </div>
      <div class="code-body">
        <pre><code class="${langClass}">${escapeHtml(ep.responseExample.success)}</code></pre>
      </div>
    </div>`;
  }

  if (ep.responseExample?.error) {
    html += `<div class="response-code" style="margin-top:12px">
      <div class="code-header">
        <div class="code-header-left">
          <div class="code-endpoint-badge">
            <span class="status-badge status-error">error</span>
            <span>ValidationError</span>
          </div>
        </div>
      </div>
      <div class="code-body">
        <pre><code class="language-json">${escapeHtml(ep.responseExample.error)}</code></pre>
      </div>
    </div>`;
  }

  // Playground
  html += `<div class="playground" id="playground" style="display:none">
    <div class="playground-header">
      <span class="playground-title">${t('playground')}</span>
    </div>
    <div class="playground-config">
      <div class="config-row">
        <span class="config-label">URL</span>
        <input class="config-input" id="cfg-url" value="https://demo.example.com" />
      </div>
      <div class="config-row">
        <span class="config-label">DB</span>
        <input class="config-input" id="cfg-db" value="my_database" />
      </div>
      <div class="config-row">
        <span class="config-label">UID</span>
        <input class="config-input" id="cfg-uid" value="2" />
      </div>
      <div class="config-row">
        <span class="config-label">Password</span>
        <input class="config-input" id="cfg-pwd" type="password" value="" placeholder="API key" />
      </div>
    </div>
    <div style="padding: 0 12px 10px; display:flex; justify-content:flex-end;">
      <button class="test-btn" id="send-btn">${t('send')} <span class="play-icon">▶</span></button>
    </div>
    <div class="playground-result" id="playground-result" style="display:none">
      <div class="result-header">
        <span class="result-status" id="result-status"></span>
        <span class="result-time" id="result-time"></span>
      </div>
      <div class="result-body">
        <pre><code class="language-json" id="result-body"></code></pre>
      </div>
    </div>
  </div>`;

  panel.innerHTML = html;

  // Tab listeners
  panel.querySelectorAll('.lang-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentLang = tab.dataset.lang;
      render();
    });
  });

  // Test button
  document.getElementById('test-btn').addEventListener('click', () => {
    const pg = document.getElementById('playground');
    pg.style.display = pg.style.display === 'none' ? 'block' : 'none';
  });

  // Send button
  document.getElementById('send-btn').addEventListener('click', () => sendRequest(ep));

  Prism.highlightAllUnder(panel);
}

// ── Send real request ──
async function sendRequest(ep) {
  const url = document.getElementById('cfg-url').value;
  const db = document.getElementById('cfg-db').value;
  const uid = parseInt(document.getElementById('cfg-uid').value);
  const pwd = document.getElementById('cfg-pwd').value;

  const resultDiv = document.getElementById('playground-result');
  const statusEl = document.getElementById('result-status');
  const timeEl = document.getElementById('result-time');
  const bodyEl = document.getElementById('result-body');

  resultDiv.style.display = 'block';
  statusEl.className = 'result-status loading';
  statusEl.textContent = t('sending');
  timeEl.textContent = '';
  bodyEl.textContent = '';

  const start = Date.now();

  try {
    if (ep.id === 'auth-login') {
      statusEl.className = 'result-status error';
      statusEl.textContent = 'N/A';
      bodyEl.textContent = t('corsError');
      return;
    }

    // Build args based on endpoint
    let args;
    const m = ep.model;
    const method = ep.odooMethod;

    if (method === 'search_read') {
      args = [db, uid, pwd, m, method, [[]], { fields: ['name'], limit: 5 }];
    } else if (method === 'search') {
      args = [db, uid, pwd, m, method, [[['bp_es_cliente', '=', true]]], { limit: 5 }];
    } else if (method === 'read') {
      args = [db, uid, pwd, m, method, [[1]], { fields: ['name'] }];
    } else if (method === 'calcular_riesgo_score' || method === 'calcular' || method === 'ap02' || method === 'ap03') {
      args = [db, uid, pwd, m, method, [[1]]];
    } else if (method === 'create') {
      // Don't actually create in playground
      statusEl.className = 'result-status error';
      statusEl.textContent = 'N/A';
      bodyEl.textContent = lang === 'es'
        ? 'El método "create" no se ejecuta desde el playground para evitar crear datos de prueba.\nUsa Postman o un script.'
        : '"create" method is not executed from playground to avoid creating test data.\nUse Postman or a script.';
      return;
    } else if (method === 'create_or_update_partner') {
      statusEl.className = 'result-status error';
      statusEl.textContent = 'N/A';
      bodyEl.textContent = lang === 'es'
        ? 'El método upsert no se ejecuta desde el playground.\nUsa Postman o un script.'
        : 'Upsert method is not executed from playground.\nUse Postman or a script.';
      return;
    } else {
      args = [db, uid, pwd, m, method, []];
    }

    const payload = {
      jsonrpc: '2.0', method: 'call',
      params: { service: 'object', method: 'execute_kw', args },
      id: 1
    };

    const resp = await fetch(`${url}/jsonrpc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const elapsed = Date.now() - start;
    const data = await resp.json();

    if (data.error) {
      statusEl.className = 'result-status error';
      statusEl.textContent = 'Error';
    } else {
      statusEl.className = 'result-status success';
      statusEl.textContent = '200 OK';
    }
    timeEl.textContent = `${elapsed}ms`;
    bodyEl.textContent = JSON.stringify(data, null, 2);
    Prism.highlightElement(bodyEl);

  } catch (err) {
    const elapsed = Date.now() - start;
    statusEl.className = 'result-status error';
    statusEl.textContent = t('connError');
    timeEl.textContent = `${elapsed}ms`;
    bodyEl.textContent = `${err.message}\n\n${t('connHint')}`;
  }
}

// ═══════════════════════════════════════════
// SPECIAL PAGES RENDERERS
// ═══════════════════════════════════════════

function renderSpecialPage(ep) {
  const left = document.getElementById('panel-left');
  const right = document.getElementById('panel-right');

  switch (ep.special) {
    case 'overview': renderOverview(left, right); break;
    case 'ref-postman': renderRefPostman(left, right); break;
    case 'ref-static': renderRefStatic(left, right); break;
    case 'ref-computed': renderRefComputed(left, right); break;
    case 'ref-errors': renderRefErrors(left, right); break;
    case 'ref-environments': renderRefEnvironments(left, right); break;
    case 'ref-changelog': renderRefChangelog(left, right); break;
  }
}

function makeTable(headers, rows) {
  let h = `<table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;
  rows.forEach(r => { h += `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`; });
  return h + '</tbody></table>';
}

// ── Overview ──
function renderOverview(left, right) {
  const isEs = lang === 'es';
  left.innerHTML = `
    <h1>${t('ov_title')} <span style="color:var(--text-muted);font-size:14px;font-weight:400">v1.1</span></h1>
    <p class="desc" style="font-size:15px;margin-bottom:12px">${t('ov_subtitle')}</p>
    <p class="desc">${t('ov_desc')}</p>
    <div style="display:flex;gap:6px;margin-bottom:24px;flex-wrap:wrap">
      <span class="flow-step">${t('ov_protocol')}</span>
      <span class="flow-step">${t('ov_auth')}</span>
      <span class="flow-step">${t('ov_format')}</span>
    </div>
    <div class="section-title">${t('ov_flow_title')}</div>
    <div class="flow-diagram" style="margin-bottom:24px">
      <span class="flow-step">Login</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step">Partner</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step">PLD</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step">create</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step">calcular</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step">ap02</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step active">ap03</span>
    </div>
    <div class="section-title">API Reference</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px">
      <div class="callout callout-info" style="cursor:pointer" onclick="currentEndpoint='auth-login';render()">
        <strong>${t('ov_quickstart')}</strong><br><span style="font-size:11px">${t('ov_quickstart_desc')}</span>
      </div>
      <div class="callout callout-info" style="cursor:pointer" onclick="currentEndpoint='partner-upsert';render()">
        <strong>${t('ov_partner_title')}</strong><br><span style="font-size:11px">${t('ov_partner_desc')}</span>
      </div>
      <div class="callout callout-info" style="cursor:pointer" onclick="currentEndpoint='pld-scoring';render()">
        <strong>${t('ov_pld_title')}</strong><br><span style="font-size:11px">${t('ov_pld_desc')}</span>
      </div>
      <div class="callout callout-info" style="cursor:pointer" onclick="currentEndpoint='prestamo-crear';render()">
        <strong>${t('ov_loans_title')}</strong><br><span style="font-size:11px">${t('ov_loans_desc')}</span>
      </div>
      <div class="callout callout-info" style="cursor:pointer" onclick="currentEndpoint='catalogo-productos';render()">
        <strong>${t('ov_catalogs_title')}</strong><br><span style="font-size:11px">${t('ov_catalogs_desc')}</span>
      </div>
      <div class="callout callout-info" style="cursor:pointer" onclick="currentEndpoint='ref-postman';render()">
        <strong>${t('ov_postman_title')}</strong><br><span style="font-size:11px">${t('ov_postman_desc')}</span>
      </div>
    </div>`;

  right.innerHTML = `
    <div class="code-section">
      <div class="code-header"><div class="code-header-left">
        <div class="code-endpoint-badge"><span>JSON-RPC</span></div>
      </div></div>
      <div class="code-body">
        <pre><code class="language-json">${escapeHtml(JSON.stringify({
          jsonrpc: "2.0", method: "call",
          params: {
            service: "object", method: "execute_kw",
            args: ["DATABASE", 42, "API_KEY", "MODEL", "METHOD", ["ARGS"], {}]
          }, id: 1
        }, null, 2))}</code></pre>
      </div>
    </div>
    <div style="margin-top:16px">
      <a href="Acendes-API.postman_collection.json" download class="test-btn" style="text-decoration:none;display:inline-flex">
        ${t('ov_download')} \u2193
      </a>
    </div>
    <div class="response-code" style="margin-top:20px">
      <div class="code-header"><div class="code-header-left">
        <div class="code-endpoint-badge"><span>${t('ov_changelog')}</span></div>
      </div></div>
      <div class="code-body">
        <pre><code class="language-bash">${escapeHtml(`v1.1 — 2026-02-25
  + Interactive site with two-panel layout
  + Bilingual support (ES/EN)
  + Code examples: cURL, Python, JS, PHP
  + API Playground (Test it)
  + 13 endpoints documented
  + Postman collection (34 requests)

v1.0 — 2026-02-25
  + Initial release`)}</code></pre>
      </div>
    </div>`;
  Prism.highlightAllUnder(right);
}

// ── Postman ──
function renderRefPostman(left, right) {
  const isEs = lang === 'es';
  left.innerHTML = `
    <h1>${isEs ? 'Colección Postman' : 'Postman Collection'}</h1>
    <p class="desc">${isEs ? '34 requests organizados por flujo, listos para importar y probar.' : '34 requests organized by flow, ready to import and test.'}</p>
    <div class="section-title">${isEs ? 'Descargar' : 'Download'}</div>
    <a href="Acendes-API.postman_collection.json" download class="test-btn" style="text-decoration:none;display:inline-flex;margin-bottom:20px">
      ${isEs ? 'Descargar Colección' : 'Download Collection'} \u2193
    </a>
    <div class="section-title">${isEs ? 'Importar en Postman' : 'Import in Postman'}</div>
    <p class="desc">1. ${isEs ? 'Abrir Postman' : 'Open Postman'}<br>
    2. Click en <strong>Import</strong><br>
    3. ${isEs ? 'Seleccionar el archivo' : 'Select the file'} <code>.json</code><br>
    4. ${isEs ? 'Configurar las variables:' : 'Configure variables:'}</p>
    ${makeTable(
      ['Variable', isEs ? 'Valor' : 'Value', isEs ? 'Descripción' : 'Description'],
      [
        ['<code>base_url</code>', '<code>https://demo.example.com</code>', isEs ? 'URL del ambiente' : 'Environment URL'],
        ['<code>db</code>', '<code>my_database</code>', isEs ? 'Nombre de la BD' : 'Database name'],
        ['<code>username</code>', '<code>user@api.com</code>', isEs ? 'Usuario API' : 'API user'],
        ['<code>password</code>', '<code>API_KEY</code>', isEs ? 'Contraseña o API key' : 'Password or API key'],
      ]
    )}
    <div class="section-title">${isEs ? 'Estructura' : 'Structure'}</div>
    ${makeTable(
      ['#', isEs ? 'Carpeta' : 'Folder', 'Requests', isEs ? 'Descripción' : 'Description'],
      [
        ['0', isEs ? 'Autenticación' : 'Authentication', '1', 'Login XML-RPC'],
        ['1', isEs ? 'Catálogos Dinámicos' : 'Dynamic Catalogs', '12', isEs ? 'Estados, Bancos, Productos, etc.' : 'States, Banks, Products, etc.'],
        ['2', 'Partner - Dedup', '3', isEs ? 'Buscar por CURP, RFC, Nombre' : 'Search by CURP, RFC, Name'],
        ['3', 'Partner - CRUD + Upsert', '6', isEs ? 'Crear, Actualizar, Leer, Upsert' : 'Create, Update, Read, Upsert'],
        ['4', 'PLD/AML', '4', isEs ? 'Validar, Scoring, Leer resultado' : 'Validate, Scoring, Read result'],
        ['5', isEs ? 'Préstamos' : 'Loans', '7', 'Create, Calcular, AP02, AP03, Read'],
        ['6', isEs ? 'Movimientos' : 'Movements', '1', isEs ? 'Eventos del préstamo' : 'Loan events'],
      ]
    )}
    <div class="section-title">${isEs ? 'Orden de ejecución' : 'Execution order'}</div>
    <div class="flow-diagram" style="flex-wrap:wrap;gap:4px">
      <span class="flow-step">0.1 Login</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step">3.6 Upsert</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step">4.2 PLD</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step">5.1 Create</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step">5.2 Calcular</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step">5.3 AP02</span><span class="flow-arrow">\u2192</span>
      <span class="flow-step active">5.4 AP03</span>
    </div>`;
  right.innerHTML = '';
}

// ── Static Values ──
function renderRefStatic(left, right) {
  const isEs = lang === 'es';
  left.innerHTML = `
    <h1>${isEs ? 'Valores Estáticos' : 'Static Values'}</h1>
    <p class="desc">${isEs ? 'Valores hardcodeados en el modelo Python. Son constantes que se usan directamente sin consulta API.' : 'Hardcoded values in the Python model. Constants used directly without API query.'}</p>

    <div class="section-title">bp_tipo_persona</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>f</code>', isEs ? 'Persona Física' : 'Individual'],
      ['<code>m</code>', isEs ? 'Persona Moral' : 'Company'],
      ['<code>a</code>', isEs ? 'Actividad Empresarial' : 'Business Activity'],
    ])}

    <div class="section-title">bp_sexo</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>f</code>', isEs ? 'Femenino' : 'Female'],
      ['<code>m</code>', isEs ? 'Masculino' : 'Male'],
      ['<code>i</code>', isEs ? 'Indefinido' : 'Undefined'],
    ])}

    <div class="section-title">bp_tipo_identificacion</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>ine</code>', 'INE'], ['<code>pasaporte</code>', isEs ? 'Pasaporte' : 'Passport'],
      ['<code>licencia</code>', isEs ? 'Licencia' : 'License'], ['<code>fm2</code>', 'FM2'],
    ])}

    <div class="section-title">bp_tipo_empleo</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>hogar</code>', isEs ? 'Hogar' : 'Household'],
      ['<code>estudiante</code>', isEs ? 'Estudiante' : 'Student'],
      ['<code>emp_priv</code>', isEs ? 'Empleado Privado' : 'Private Employee'],
      ['<code>emp_pub</code>', isEs ? 'Empleado Público' : 'Public Employee'],
      ['<code>com</code>', isEs ? 'Comerciante' : 'Merchant'],
      ['<code>agr</code>', isEs ? 'Agricultor' : 'Farmer'],
      ['<code>otro</code>', isEs ? 'Otro' : 'Other'],
    ])}

    <div class="section-title">bp_tipo_sector</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>pub</code>', isEs ? 'Público' : 'Public'], ['<code>priv</code>', isEs ? 'Privado' : 'Private'],
      ['<code>micro</code>', 'Micro'], ['<code>rural</code>', 'Rural'],
    ])}

    <div class="section-title">bp_tipo_cliente</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>nuevo</code>', isEs ? 'Nuevo' : 'New'], ['<code>recurrente</code>', isEs ? 'Recurrente' : 'Recurring'],
      ['<code>ocasional</code>', isEs ? 'Ocasional' : 'Occasional'], ['<code>socio</code>', isEs ? 'Socio' : 'Member'],
    ])}

    <hr class="divider">
    <div class="section-title">PLD</div>

    <div class="subsection-title">vor_pld_monedas_reales2</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>mn</code>', isEs ? 'Moneda Nacional' : 'National Currency'], ['<code>div</code>', isEs ? 'Divisas' : 'Foreign Currency'],
    ])}

    <div class="subsection-title">vor_pld_instrumentos_reales2</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>r1</code>', isEs ? 'Efectivo' : 'Cash'], ['<code>r2</code>', isEs ? 'Bienes' : 'Goods'],
      ['<code>r3</code>', isEs ? 'Transferencia' : 'Transfer'],
    ])}

    <div class="subsection-title">vor_pld_metodos_reales</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>trans</code>', isEs ? 'Transferencia' : 'Transfer'], ['<code>otro</code>', isEs ? 'Otro' : 'Other'],
    ])}

    <hr class="divider">
    <div class="section-title">${isEs ? 'Préstamos' : 'Loans'}</div>

    <div class="subsection-title">periodicidad</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>0</code>', isEs ? 'Sin Periodicidad' : 'None'], ['<code>1</code>', isEs ? 'Diaria' : 'Daily'],
      ['<code>7</code>', isEs ? 'Semanal' : 'Weekly'], ['<code>14</code>', isEs ? 'Catorcenal' : 'Biweekly'],
      ['<code>15</code>', isEs ? 'Quincenal' : 'Semi-monthly'], ['<code>30</code>', isEs ? 'Mensual' : 'Monthly'],
      ['<code>60</code>', isEs ? 'Bimestral' : 'Bimonthly'], ['<code>90</code>', isEs ? 'Trimestral' : 'Quarterly'],
      ['<code>06</code>', isEs ? 'Semestral' : 'Semi-annual'], ['<code>12</code>', isEs ? 'Anual' : 'Annual'],
    ])}

    <div class="subsection-title">tipo_interes</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>0</code>', '30/360 Pagos Iguales'], ['<code>0b</code>', '30/360 Pagos Iguales (PrimerPeriodoIrregular)'],
      ['<code>0d</code>', 'nat/360 Pagos Iguales'], ['<code>0db</code>', 'nat/360 Pagos Iguales (PrimerPeriodoIrregular)'],
      ['<code>0-365</code>', '365 Pagos Iguales'], ['<code>0-30.42</code>', '30.42/360 Pagos Iguales'],
      ['<code>365d</code>', 'nat/365 Decrecientes'], ['<code>360d</code>', 'nat/360 Decrecientes'],
      ['<code>1</code>', '360 Decrecientes'], ['<code>5</code>', '360 Tasa Global'],
      ['<code>5b</code>', '360 Tasa Global (PrimerPeriodoIrregular)'], ['<code>360-ipcf</code>', '30/360 IPCF'],
      ['<code>360d-ipcf</code>', 'nat/360 IPCF'], ['<code>50</code>', '30/360 Escalonado'],
      ['<code>50d</code>', 'nat/360 Escalonado'], ['<code>emp</code>', '360 Empeño'],
    ])}
    <div class="callout callout-info">${isEs ? 'Los más comunes: <code>"0"</code> para crédito simple con pagos iguales, <code>"1"</code> para decrecientes.' : 'Most common: <code>"0"</code> for equal payments, <code>"1"</code> for decreasing.'}</div>

    <div class="subsection-title">tipo_calculo</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>0</code>', isEs ? 'Calcular Pago' : 'Calculate Payment'],
      ['<code>1</code>', isEs ? 'Calcular Fecha Fin' : 'Calculate End Date'],
    ])}

    <div class="subsection-title">state (${isEs ? 'Préstamo' : 'Loan'})</div>
    ${makeTable(['State', isEs ? 'Descripción' : 'Description'], [
      ['<code>0</code>', isEs ? 'Inicial (borrador)' : 'Draft'],
      ['<code>1</code>', isEs ? 'En proceso (ap02)' : 'Processing (ap02)'],
      ['<code>10</code>', isEs ? 'Activo (desembolsado)' : 'Active (disbursed)'],
      ['<code>20</code>', isEs ? 'Cancelado' : 'Cancelled'],
      ['<code>90</code>', isEs ? 'Por concluir' : 'Ending'],
      ['<code>99</code>', isEs ? 'Terminado' : 'Finished'],
    ])}

    <div class="subsection-title">tipo_terminacion</div>
    ${makeTable([isEs ? 'Código' : 'Code', isEs ? 'Descripción' : 'Description'], [
      ['<code>l</code>', isEs ? 'Liquidado' : 'Paid Off'],
      ['<code>v</code>', isEs ? 'Vendido' : 'Sold'],
      ['<code>q</code>', isEs ? 'Quebrantado' : 'Defaulted'],
    ])}

    <hr class="divider">
    <div class="section-title">${isEs ? 'Constantes' : 'Constants'}</div>
    ${makeTable([isEs ? 'Concepto' : 'Concept', isEs ? 'Valor' : 'Value', isEs ? 'Notas' : 'Notes'], [
      ['México (<code>country_id</code>)', '<code>156</code>', isEs ? 'ID fijo en Odoo' : 'Fixed Odoo ID'],
      [isEs ? 'IVA estándar' : 'Standard VAT', '<code>16.0</code>', 'Default <code>tasa_iva</code>'],
    ])}`;
  right.innerHTML = '';
}

// ── Computed Fields ──
function renderRefComputed(left, right) {
  const isEs = lang === 'es';
  left.innerHTML = `
    <h1>${isEs ? 'Campos Computados' : 'Computed Fields'}</h1>
    <p class="desc">${isEs ? 'Estos campos <strong>NO se deben enviar</strong> — se calculan automáticamente.' : 'These fields should <strong>NOT be sent</strong> — they are calculated automatically.'}</p>

    <div class="section-title">Partner</div>
    ${makeTable([isEs ? 'Campo' : 'Field', isEs ? 'Tipo' : 'Type', isEs ? 'Calculado de' : 'Calculated from'], [
      ['<code>bp_edad</code>', 'integer', '<code>bp_fecha_nacimiento</code>'],
      ['<code>bp_laboral_antiguedad_calc</code>', 'float', '<code>laboral_fecha_ingreso</code>'],
      ['<code>vor_pld_nivel_riesgo</code>', 'string', '<code>calcular_riesgo_score()</code>'],
      ['<code>vor_pld_riesgo_score_actual</code>', 'many2one', '<code>calcular_riesgo_score()</code>'],
    ])}

    <div class="section-title">${isEs ? 'Préstamo' : 'Loan'}</div>
    ${makeTable([isEs ? 'Campo' : 'Field', isEs ? 'Tipo' : 'Type', isEs ? 'Calculado de' : 'Calculated from'], [
      ['<code>name</code>', 'string', '<code>_calcula_name()</code>'],
      ['<code>categoria_producto</code>', 'selection', '<code>producto.categoria</code>'],
      ['<code>naturaleza</code>', 'selection', '<code>producto.naturaleza</code>'],
      ['<code>saldo_exigible</code>', 'monetary', isEs ? 'Suma de flujos vencidos' : 'Sum of due flows'],
      ['<code>saldo_liquidar</code>', 'monetary', isEs ? 'Cálculo de liquidación' : 'Payoff calculation'],
      ['<code>cat</code>', 'float', isEs ? 'Costo Anual Total (en ap03)' : 'Annual Total Cost (on ap03)'],
    ])}

    <div class="callout callout-warning">${isEs
      ? '<strong>Regla:</strong> Si un campo tiene <code>compute=</code> o <code>related=</code> en el modelo Python, no enviarlo en create/write.'
      : '<strong>Rule:</strong> If a field has <code>compute=</code> or <code>related=</code> in the Python model, do not send it in create/write.'}</div>`;
  right.innerHTML = '';
}

// ── Errors ──
function renderRefErrors(left, right) {
  const isEs = lang === 'es';
  left.innerHTML = `
    <h1>${isEs ? 'Errores' : 'Errors'}</h1>
    <p class="desc">${isEs ? 'Manejo de errores en las APIs de Acendes.' : 'Error handling in Acendes APIs.'}</p>

    <div class="section-title">${isEs ? 'Errores comunes' : 'Common errors'}</div>
    ${makeTable([isEs ? 'Error' : 'Error', isEs ? 'Causa' : 'Cause', isEs ? 'Solución' : 'Solution'], [
      ['<code>Access Denied</code>', isEs ? 'UID o password incorrectos' : 'Wrong UID or password', isEs ? 'Verificar credenciales' : 'Check credentials'],
      ['<code>Object does not exist</code>', isEs ? 'Modelo no existe' : 'Model not found', isEs ? 'Verificar módulo instalado' : 'Check module installed'],
      ['<code>MissingError</code>', isEs ? 'ID no encontrado' : 'ID not found', isEs ? 'Verificar que el registro existe' : 'Check record exists'],
      ['<code>ValidationError</code>', isEs ? 'Constraint de modelo' : 'Model constraint', isEs ? 'Revisar campos requeridos' : 'Check required fields'],
      ['<code>cannot marshal None</code>', isEs ? 'Método retorna None vía XML-RPC' : 'Method returns None via XML-RPC', isEs ? '<strong>Usar JSON-RPC</strong>' : '<strong>Use JSON-RPC</strong>'],
      ['<code>Invalid field</code>', isEs ? 'Campo no existe' : 'Field not found', isEs ? 'Verificar nombre del campo' : 'Check field name'],
    ])}

    <div class="section-title">${isEs ? 'Protocolos' : 'Protocols'}</div>
    ${makeTable([isEs ? 'Protocolo' : 'Protocol', isEs ? 'Soporta None' : 'Supports None', 'Endpoint', isEs ? 'Uso' : 'Usage'], [
      ['XML-RPC', 'No', '<code>/xmlrpc/2/object</code>', isEs ? 'Solo login' : 'Login only'],
      ['JSON-RPC', isEs ? 'Sí' : 'Yes', '<code>/jsonrpc</code>', isEs ? 'Todas las demás llamadas' : 'All other calls'],
    ])}
    <div class="callout callout-warning">${isEs
      ? '<strong>Recomendación:</strong> Usar siempre JSON-RPC (<code>/jsonrpc</code>) para todas las operaciones excepto el login inicial.'
      : '<strong>Recommendation:</strong> Always use JSON-RPC (<code>/jsonrpc</code>) for all operations except initial login.'}</div>`;

  right.innerHTML = `
    <div class="code-section">
      <div class="code-header"><div class="code-header-left">
        <div class="code-endpoint-badge"><span class="status-badge status-200">200</span><span>${isEs ? 'Respuesta exitosa' : 'Success'}</span></div>
      </div></div>
      <div class="code-body"><pre><code class="language-json">${escapeHtml(JSON.stringify({
        jsonrpc: "2.0", id: 1, result: "VALOR"
      }, null, 2))}</code></pre></div>
    </div>
    <div class="response-code" style="margin-top:16px">
      <div class="code-header"><div class="code-header-left">
        <div class="code-endpoint-badge"><span class="status-badge status-error">error</span><span>Server Error</span></div>
      </div></div>
      <div class="code-body"><pre><code class="language-json">${escapeHtml(JSON.stringify({
        jsonrpc: "2.0", id: 1,
        error: {
          code: 200, message: "Odoo Server Error",
          data: { name: "odoo.exceptions.ValidationError", message: "Description", debug: "Traceback..." }
        }
      }, null, 2))}</code></pre></div>
    </div>`;
  Prism.highlightAllUnder(right);
}

// ── Environments ──
function renderRefEnvironments(left, right) {
  const isEs = lang === 'es';
  left.innerHTML = `
    <h1>${isEs ? 'Ambientes' : 'Environments'}</h1>
    <p class="desc">${isEs ? 'Configuración por ambiente para las APIs de Acendes.' : 'Environment configuration for Acendes APIs.'}</p>

    <div class="section-title">${isEs ? 'Variables' : 'Variables'}</div>
    ${makeTable(['Variable', isEs ? 'Producción' : 'Production', isEs ? 'Pruebas' : 'Testing'], [
      ['<code>base_url</code>', '<code>https://client.example.com</code>', '<code>https://client.example.com</code>'],
      ['<code>db</code>', '<code>client</code>', '<code>clienttest</code>'],
      ['<code>username</code>', isEs ? 'Usuario API dedicado' : 'Dedicated API user', isEs ? 'Usuario de pruebas' : 'Test user'],
      ['<code>password</code>', 'API key', isEs ? 'Password de pruebas' : 'Test password'],
    ])}
    <div class="callout callout-info">${isEs
      ? 'Producción y pruebas pueden compartir la misma URL base. La diferencia es la base de datos.'
      : 'Production and testing may share the same base URL. The difference is the database.'}</div>

    <div class="section-title">${isEs ? 'IDs de Referencia' : 'Reference IDs'}</div>
    <div class="subsection-title">${isEs ? 'Constantes (iguales en todos los ambientes)' : 'Constants (same across environments)'}</div>
    ${makeTable([isEs ? 'Concepto' : 'Concept', 'ID'], [
      ['México (<code>res.country</code>)', '<code>156</code>'],
    ])}

    <div class="subsection-title">${isEs ? 'Variables (consultar por ambiente)' : 'Variable (query per environment)'}</div>
    ${makeTable([isEs ? 'Concepto' : 'Concept', isEs ? 'Modelo' : 'Model'], [
      [isEs ? 'Estados SEPOMEX' : 'States', '<code>vor.sepo_estados</code>'],
      [isEs ? 'Productos' : 'Products', '<code>vor.cre_productos</code>'],
      ['Subproductos', '<code>vor.cre_subproductos</code>'],
      [isEs ? 'Actividades económicas' : 'Economic activities', '<code>vor.actividad_economica</code>'],
      [isEs ? 'Bancos' : 'Banks', '<code>vor.cat_institucion</code>'],
    ])}`;
  right.innerHTML = '';
}

// ── Changelog ──
function renderRefChangelog(left, right) {
  left.innerHTML = `
    <h1>Changelog</h1>
    <div class="section-title">v1.1 — 2026-02-25</div>
    <p class="desc">Interactive documentation site with two-panel layout.</p>
    <div class="subsection-title">Added</div>
    <div class="field-list">
      <div class="field-item"><div class="field-desc"><strong>Interactive site</strong> with sidebar navigation, docs panel and code panel</div></div>
      <div class="field-item"><div class="field-desc"><strong>Bilingual support:</strong> Spanish / English toggle</div></div>
      <div class="field-item"><div class="field-desc"><strong>Code examples</strong> in 4 languages: cURL, Python, JavaScript, PHP</div></div>
      <div class="field-item"><div class="field-desc"><strong>API Playground:</strong> "Test it" button to send real requests</div></div>
      <div class="field-item"><div class="field-desc"><strong>Loan flow diagram:</strong> Visual create \u2192 calcular \u2192 ap02 \u2192 ap03</div></div>
      <div class="field-item"><div class="field-desc"><strong>New endpoints:</strong> Partner Search/Read, Loans (Calcular, AP02, AP03, Read), Catalogs (Products, Subproducts, States)</div></div>
    </div>
    <div class="subsection-title">Fixed</div>
    <div class="field-list">
      <div class="field-item"><div class="field-desc"><code>vor.cre_amortizacion</code> \u2192 <code>vor.cre_flujos</code></div></div>
      <div class="field-item"><div class="field-desc"><code>pago</code> \u2192 <code>pago_total</code>, <code>iva_interes</code> \u2192 <code>iva_int</code></div></div>
      <div class="field-item"><div class="field-desc"><code>saldo_actual</code> \u2192 <code>saldo_exigible</code> / <code>saldo_liquidar</code></div></div>
      <div class="field-item"><div class="field-desc"><code>tipo_interes</code>: 16 options (was 2). Added <code>tipo_calculo</code> as required.</div></div>
      <div class="field-item"><div class="field-desc">Loan states corrected: <code>0 \u2192 1 \u2192 10 \u2192 20 \u2192 90 \u2192 99</code></div></div>
    </div>

    <hr class="divider">
    <div class="section-title">v1.0 — 2026-02-25</div>
    <p class="desc">First version of the API documentation.</p>
    <div class="field-list">
      <div class="field-item"><div class="field-desc"><strong>Partner:</strong> Create, update, search. Upsert with CURP/RFC dedup</div></div>
      <div class="field-item"><div class="field-desc"><strong>PLD/AML:</strong> Risk scoring with 25 criteria</div></div>
      <div class="field-item"><div class="field-desc"><strong>Loans:</strong> Create, calculate, process, activate</div></div>
      <div class="field-item"><div class="field-desc"><strong>Catalogs:</strong> Dynamic catalog queries</div></div>
      <div class="field-item"><div class="field-desc"><strong>Postman Collection:</strong> 34 requests organized by flow</div></div>
    </div>`;
  right.innerHTML = '';
}

// ── Render all ──
function render() {
  const ep = ENDPOINTS.find(e => e.id === currentEndpoint);
  buildSidebar();
  if (ep.special) {
    renderSpecialPage(ep);
  } else {
    renderLeft(ep);
    renderRight(ep);
  }
}

// ── Utils ──
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Init lang switch ──
function initLangSwitch() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      lang = btn.dataset.lang;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
  });
}

// ── Boot ──
initLangSwitch();
render();
