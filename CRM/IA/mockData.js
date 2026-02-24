/* =====================================================
   MOCKDATA.JS — CRM Pro · Dados Simulados
   Banco de dados em memória para desenvolvimento
   Contém clientes, planos, negócios, atividades e KPIs
   ===================================================== */

'use strict';

/* =========================================
   1. BANCO DE DADOS SIMULADO — Clientes
   ========================================= */
const mockCRMData = {
  
  /* --- Carteira de Clientes (clientes.html) --- */
  clientes: [
    {
      id: 1,
      nome: "TechCorp Soluções",
      documento: "12.345.678/0001-90",
      tipo: "B2B",
      endereco: "Av. Paulista, 1000 - Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
      plano: "Link Dedicado 1GB",
      valorMensal: 999.90,
      status: "ativo",
      dataCadastro: "2025-11-10",
      ultimaInteracao: "2026-02-23",
      contatos: 3,
      tickets: 2,
      satisfacao: 95
    },
    {
      id: 2,
      nome: "Roberto Almeida",
      documento: "111.222.333-44",
      tipo: "B2C",
      endereco: "Rua Tuiuti, 550 - Tatuapé",
      cidade: "São Paulo",
      estado: "SP",
      plano: "Fibra 500MB",
      valorMensal: 99.90,
      status: "ativo",
      dataCadastro: "2025-12-05",
      ultimaInteracao: "2026-02-20",
      contatos: 1,
      tickets: 0,
      satisfacao: 87
    },
    {
      id: 3,
      nome: "Fernanda Costa",
      documento: "555.666.777-88",
      tipo: "B2C",
      endereco: "Rua Juventus, 120 - Mooca",
      cidade: "São Paulo",
      estado: "SP",
      plano: "Fibra 300MB",
      valorMensal: 79.90,
      status: "bloqueado",
      dataCadastro: "2026-01-15",
      ultimaInteracao: "2026-02-10",
      contatos: 2,
      tickets: 3,
      satisfacao: 42
    },
    {
      id: 4,
      nome: "Mercadinho São João",
      documento: "98.765.432/0001-10",
      tipo: "B2B",
      endereco: "Av. Itaquera, 3000 - Itaquera",
      cidade: "São Paulo",
      estado: "SP",
      plano: "Fibra 700MB",
      valorMensal: 129.90,
      status: "cancelado",
      dataCadastro: "2025-10-20",
      ultimaInteracao: "2026-01-28",
      contatos: 5,
      tickets: 8,
      satisfacao: 28
    },
    {
      id: 5,
      nome: "Clínica Vida Saudável",
      documento: "44.555.666/0001-77",
      tipo: "B2B",
      endereco: "Rua Domingos de Morais, 800 - Vila Mariana",
      cidade: "São Paulo",
      estado: "SP",
      plano: "Link Dedicado 500MB",
      valorMensal: 599.90,
      status: "ativo",
      dataCadastro: "2026-02-01",
      ultimaInteracao: "2026-02-22",
      contatos: 2,
      tickets: 1,
      satisfacao: 92
    },
    {
      id: 6,
      nome: "Grupo Nexus",
      documento: "77.888.999/0001-44",
      tipo: "B2B",
      endereco: "Av. Brigadeiro Faria Lima, 4000 - Pinheiros",
      cidade: "São Paulo",
      estado: "SP",
      plano: "Link Dedicado 1GB",
      valorMensal: 999.90,
      status: "ativo",
      dataCadastro: "2025-09-18",
      ultimaInteracao: "2026-02-23",
      contatos: 4,
      tickets: 1,
      satisfacao: 98
    }
  ],

  /* =========================================
     2. CATÁLOGO DE PLANOS
     ========================================= */
  planosDisponiveis: [
    {
      id: 101,
      nome: "Fibra 300MB",
      tipo: "Banda Larga",
      valor: 79.90,
      setup: 99.00,
      velocidadeDown: 300,
      velocidadeUp: 150,
      suporte: "Email",
      sla: "48h"
    },
    {
      id: 102,
      nome: "Fibra 500MB",
      tipo: "Banda Larga",
      valor: 99.90,
      setup: 149.00,
      velocidadeDown: 500,
      velocidadeUp: 250,
      suporte: "Email + Chat",
      sla: "24h"
    },
    {
      id: 103,
      nome: "Fibra 700MB",
      tipo: "Banda Larga",
      valor: 129.90,
      setup: 199.00,
      velocidadeDown: 700,
      velocidadeUp: 350,
      suporte: "Email + Chat + Phone",
      sla: "12h"
    },
    {
      id: 104,
      nome: "Link Dedicado 500MB",
      tipo: "Corporativo",
      valor: 599.90,
      setup: 999.00,
      velocidadeDown: 500,
      velocidadeUp: 500,
      suporte: "24/7 Premium",
      sla: "4h"
    },
    {
      id: 105,
      nome: "Link Dedicado 1GB",
      tipo: "Corporativo",
      valor: 999.90,
      setup: 1_999,
      velocidadeDown: 1000,
      velocidadeUp: 1000,
      suporte: "24/7 Premium + Gerenciado",
      sla: "2h"
    }
  ],

  /* =========================================
     3. FUNIL DE VENDAS — Oportunidades
     ========================================= */
  oportunidades: [
    {
      id: 1001,
      cliente: "Orbital Systems",
      valor: 120_000,
      estagio: "Leads",
      probabilidade: 10,
      dataCriacao: "2026-02-18",
      proximoContato: "2026-02-25",
      vendedor: "Ana Souza"
    },
    {
      id: 1002,
      cliente: "Apex Engenharia",
      valor: 87_500,
      estagio: "Qualificados",
      probabilidade: 35,
      dataCriacao: "2026-02-10",
      proximoContato: "2026-02-24",
      vendedor: "Carlos Neto"
    },
    {
      id: 1003,
      cliente: "Solve Digital",
      valor: 145_000,
      estagio: "Proposta",
      probabilidade: 65,
      dataCriacao: "2026-01-20",
      proximoContato: "2026-02-26",
      vendedor: "Beatriz Lima"
    },
    {
      id: 1004,
      cliente: "Inova S.A.",
      valor: 256_000,
      estagio: "Negociação",
      probabilidade: 85,
      dataCriacao: "2025-12-15",
      proximoContato: "2026-02-24",
      vendedor: "Diego Martins"
    },
    {
      id: 1005,
      cliente: "Connect Telecom",
      valor: 178_500,
      estagio: "Fechamento",
      probabilidade: 95,
      dataCriacao: "2025-11-01",
      proximoContato: "2026-02-25",
      vendedor: "Fernanda Costa"
    }
  ],

  /* =========================================
     4. ATIVIDADES RECENTES — Feed para Dashboard
     ========================================= */
  atividades: [
    {
      id: 5001,
      tipo: "deal_won",
      usuario: "Ana Souza",
      cliente: "Grupo Nexus",
      descricao: "fechou negócio com <strong>Grupo Nexus</strong> — R$ 84.000",
      valor: 84_000,
      timestamp: "2026-02-23T14:30:00Z",
      tempo: "2min"
    },
    {
      id: 5002,
      tipo: "call",
      usuario: "Carlos Neto",
      cliente: "TechBrasil Ltda",
      descricao: "ligação com <strong>TechBrasil Ltda</strong> — 18 minutos",
      valor: null,
      timestamp: "2026-02-23T14:15:00Z",
      tempo: "17min"
    },
    {
      id: 5003,
      tipo: "email",
      usuario: "Beatriz Lima",
      cliente: "Solve Digital",
      descricao: "proposta enviada para <strong>Solve Digital</strong> — R$ 36.400",
      valor: 36_400,
      timestamp: "2026-02-23T14:00:00Z",
      tempo: "32min"
    },
    {
      id: 5004,
      tipo: "meeting",
      usuario: "Diego Martins",
      cliente: "Inova S.A.",
      descricao: "reunião agendada com <strong>Inova S.A.</strong>",
      valor: null,
      timestamp: "2026-02-23T13:45:00Z",
      tempo: "47min"
    },
    {
      id: 5005,
      tipo: "deal_lost",
      usuario: "Fernanda Costa",
      cliente: "Vertex Corp",
      descricao: "<strong>Vertex Corp</strong> escolheu concorrente — R$ 21.200",
      valor: 21_200,
      timestamp: "2026-02-23T13:30:00Z",
      tempo: "1h"
    }
  ],

  /* =========================================
     5. NOTIFICAÇÕES DO SISTEMA
     ========================================= */
  notificacoes: [
    {
      id: 8001,
      tipo: "alert",
      titulo: "Negócios com prazo hoje",
      descricao: "3 negócios com prazo hoje — ação imediata necessária",
      lido: false,
      timestamp: "2026-02-23T14:45:00Z",
      tempo: "5min"
    },
    {
      id: 8002,
      tipo: "success",
      titulo: "Meta semanal atingida",
      descricao: "Meta semanal atingida — 79% concluído",
      lido: false,
      timestamp: "2026-02-23T12:10:00Z",
      tempo: "2h 40min"
    },
    {
      id: 8003,
      tipo: "info",
      titulo: "Novo lead recebido",
      descricao: "Novo lead: Orbital Systems — R$ 120.000",
      lido: false,
      timestamp: "2026-02-23T11:50:00Z",
      tempo: "3h"
    },
    {
      id: 8004,
      tipo: "warning",
      titulo: "SLA em risco",
      descricao: "SLA em risco: 7 tickets sem resposta",
      lido: true,
      timestamp: "2026-02-23T10:25:00Z",
      tempo: "4h 30min"
    },
    {
      id: 8005,
      tipo: "info",
      titulo: "Meta de cota atingida",
      descricao: "Ana Souza atingiu 94% da cota mensal",
      lido: true,
      timestamp: "2026-02-23T09:15:00Z",
      tempo: "5h 30min"
    }
  ],

  /* =========================================
     6. EQUIPE DE VENDAS
     ========================================= */
  vendedores: [
    {
      id: 201,
      nome: "Ana Souza",
      initiais: "AS",
      email: "ana.souza@netcrm.com",
      telefone: "(11) 98765-4321",
      regiao: "SP Capital",
      negociosMes: 18,
      receita: 312_400,
      quota: 350_000,
      percentualQuota: 94,
      ntm: 0.87,
      status: "ativo"
    },
    {
      id: 202,
      nome: "Carlos Neto",
      initiais: "CN",
      email: "carlos.neto@netcrm.com",
      telefone: "(11) 98765-4322",
      regiao: "SP Interior",
      negociosMes: 15,
      receita: 248_600,
      quota: 300_000,
      percentualQuota: 87,
      ntm: 0.82,
      status: "ativo"
    },
    {
      id: 203,
      nome: "Beatriz Lima",
      initiais: "BL",
      email: "beatriz.lima@netcrm.com",
      telefone: "(11) 98765-4323",
      regiao: "RJ/ES",
      negociosMes: 12,
      receita: 194_100,
      quota: 280_000,
      percentualQuota: 76,
      ntm: 0.74,
      status: "ativo"
    },
    {
      id: 204,
      nome: "Diego Martins",
      initiais: "DM",
      email: "diego.martins@netcrm.com",
      telefone: "(11) 98765-4324",
      regiao: "MG/DF",
      negociosMes: 9,
      receita: 156_800,
      quota: 250_000,
      percentualQuota: 68,
      ntm: 0.68,
      status: "ativo"
    },
    {
      id: 205,
      nome: "Fernanda Costa",
      initiais: "FC",
      email: "fernanda.costa@netcrm.com",
      telefone: "(11) 98765-4325",
      regiao: "SC/RS",
      negociosMes: 7,
      receita: 98_350,
      quota: 200_000,
      percentualQuota: 52,
      ntm: 0.61,
      status: "ativo"
    }
  ],

  /* =========================================
     7. RESUMO PARA DASHBOARD — KPIs Principais
     ========================================= */
  kpisTotais: {
    vendasMes: 142,
    receita: 847_250,
    leadsAtivos: 87,
    receitaPrevista: 1_000_000,
    percentualMeta: 84.7,
    taxaConversao: 32.4,
    ticketMedio: 17_651,
    tempoMedioCiclo: 24,
    nps: 74,
    clientesAtivos: 156
  }
};

/* =========================================
   8. UTILITÁRIOS DE ACESSO
   ========================================= */

/**
 * Obtém um cliente pelo ID
 * @param {number} id - ID do cliente
 * @returns {Object|null} Dados do cliente ou null
 */
const getClienteById = (id) => {
  return mockCRMData.clientes.find(c => c.id === id) || null;
};

/**
 * Obtém todas as oportunidades de um vendedor
 * @param {string} vendedor - Nome do vendedor
 * @returns {Array} Lista de oportunidades
 */
const getOportunidadesByVendedor = (vendedor) => {
  return mockCRMData.oportunidades.filter(o => o.vendedor === vendedor);
};

/**
 * Calcula receita total de um período
 * @param {Array} atividades - Lista de atividades
 * @returns {number} Valor total
 */
const calcularReceitaTotal = (atividades) => {
  return atividades.reduce((total, a) => total + (a.valor || 0), 0);
};

/**
 * Gerenciar estado de leitura de notificações
 * @param {number} id - ID da notificação
 */
const marcarNotificacaoLida = (id) => {
  const notif = mockCRMData.notificacoes.find(n => n.id === id);
  if (notif) notif.lido = true;
};

// Exportar dados globalmente
if (typeof window !== 'undefined') {
  window.mockData = mockCRMData;
  window.mockCRMData = mockCRMData; // alias para compatibilidade
  window.getClienteById = getClienteById;
  window.getOportunidadesByVendedor = getOportunidadesByVendedor;
  window.calcularReceitaTotal = calcularReceitaTotal;
  window.marcarNotificacaoLida = marcarNotificacaoLida;
}

console.log('✓ Mock Data carregado com sucesso'); 
console.log('  Clientes:', mockCRMData.clientes.length);
console.log('  Oportunidades:', mockCRMData.oportunidades.length);
console.log('  Atividades:', mockCRMData.atividades.length);
console.log('  Vendedores:', mockCRMData.vendedores.length);