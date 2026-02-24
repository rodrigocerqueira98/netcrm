# NETCRM PRO — Guia de Apresentação da Solução

Este documento resume os recursos da solução CRM para apoio na apresentação à empresa.

---

## 1. Visão geral

- **Dashboard** (`index.html`) — Visão geral: KPIs, gráfico de vendas, funil e tarefas ativas.
- **Funil de Vendas** (`funil.html`) — Pipeline Kanban com drag-and-drop, filtros, novo negócio e undo/redo.
- **Clientes** (`clientes.html`) — Listagem com busca e filtro por status; botão **Cadastrar Cliente**.
- **Cadastro de Cliente** (`clientes-cadastro.html`) — Formulário completo com **integração Receita Federal (CNPJ)**.
- **Visão de Negócio** (`analytics.html`) — Painel analítico: receita, ticket médio, conversão, funil, top oportunidades e negócios em risco.
- **Monitoramento** (`monitoramento.html`) — Status da rede e operações.
- **Financeiro** (`financeiro.html`) — Métricas financeiras, receita x despesa e transações.

---

## 2. Integração Receita Federal (destaque para o cliente)

- **Onde:** Tela **Cadastro de Cliente**.
- **O que faz:** Botão **Consultar CNPJ** consulta dados públicos (BrasilAPI) e preenche automaticamente:
  - Razão social e nome fantasia  
  - Endereço (logradouro, número, complemento, bairro, município, UF, CEP)
- **Como demonstrar:**
  1. Abrir `clientes-cadastro.html`.
  2. Selecionar **Pessoa Jurídica (CNPJ)**.
  3. Informar um CNPJ válido (apenas números, ex.: `00000000000191`).
  4. Clicar em **Consultar CNPJ**.
  5. Os campos são preenchidos com os dados da empresa.
- **CPF:** Validação de formato; mensagem informando que “Consulta CPF disponível em produção”.

---

## 3. Ferramenta analítica (Visão de Negócio)

- **Onde:** `analytics.html` (menu **Visão de Negócio**).
- **Conteúdo:**
  - **KPIs:** Receita total, ticket médio, taxa de conversão, clientes ativos (com variação).
  - **Gráfico:** Receita por período (mensal).
  - **Resumo do funil:** Leads → Qualificados → Proposta → Fechados.
  - **Top Oportunidades:** Tabela com cliente, estágio, valor e previsão.
  - **Negócios em Risco:** Tabela com motivo, valor e dias parados.
- **Uso na apresentação:** Mostrar tomada de decisão com base em dados (receita, funil e riscos).

---

## 4. Navegação unificada

Todas as telas usam o mesmo menu lateral:

- **Mission Core:** Dashboard, Funil de Vendas, Clientes, Cadastrar Cliente, Visão de Negócio  
- **Maintenance:** Monitoramento, Financeiro  

Assim a solução se apresenta como um produto único e coerente.

---

## 5. Como testar localmente

1. Servir os arquivos por um servidor HTTP (ex.: extensão “Live Server” no VS Code ou `npx serve .`).
2. Abrir `index.html` (ou a URL do servidor) e navegar pelo menu.
3. **Consulta CNPJ:** Em **Cadastrar Cliente**, usar um CNPJ válido e clicar em **Consultar CNPJ** (é necessário acesso à internet para a API).
4. **Visão de Negócio:** Abrir **Visão de Negócio** e revisar KPIs, gráfico e tabelas.

---

## 6. Pontos para falar na apresentação

- Cadastro de clientes com **dados da Receita Federal** (CNPJ), reduzindo digitação e erros.
- **Visão de Negócio** para análise de receita, funil e riscos.
- **Funil de vendas** operacional (Kanban) para o dia a dia da equipe.
- Interface única em todas as telas, pronta para evoluir (mais integrações, relatórios e usuários).
