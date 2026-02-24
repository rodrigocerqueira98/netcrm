'use strict';

/**
 * =====================================================
 * NETCRM PRO — Global App Shell (Engine)
 * Gerencia o estado global, navegação, cabeçalho 
 * e interações comuns a todas as páginas.
 * ===================================================== 
 */

class NetCRMEngine {
  constructor() {
    this.state = {
      paginaAtual: null,
      usuarioLogado: null,
      periodoSelecionado: 'month',
    };

    this.dadosAtivos = null;
    this.inicializado = false;
  }

  /**
   * Ponto de partida global da aplicação
   */
  async init() {
    try {
      console.log('[NETCRM Shell] Inicializando motor global...');

      // 1. Carregar base de dados simulada
      await this.carregarDadosBase();

      // 2. Definir o estado inicial
      this.configurarEstado();

      // 3. Ativar comportamentos da Interface Global (Header, Sidebar)
      this.ativarEventosGlobais();

      // 4. Preencher tabelas globais se estiver no Dashboard
      if (this.state.paginaAtual === 'index.html' || this.state.paginaAtual === '') {
        this.renderizarTabelaOperacional();
      }

      this.inicializado = true;
      console.log('[NETCRM Shell] ✓ Interface Global Pronta.');
    } catch (erro) {
      console.error('[NETCRM Shell] ✗ Falha na inicialização:', erro);
      this.exibirErroCritico(erro);
    }
  }

  /**
   * Valida se o mockData está presente na janela
   */
  async carregarDadosBase() {
    if (typeof window.mockData === 'undefined') {
      throw new Error('A base de dados (mockData.js) não foi encontrada.');
    }
    this.dadosAtivos = window.mockData;
  }

  /**
   * Configura sessão e identifica onde o usuário está
   */
  configurarEstado() {
    const caminho = window.location.pathname.split('/').pop() || 'index.html';
    this.state.paginaAtual = caminho;

    // Simulação de sessão do usuário logado
    this.state.usuarioLogado = {
      nome: 'Rodrigo',
      cargo: 'Lead Admin',
      iniciais: 'RO',
      nivelAcesso: 'ROOT'
    };

    // Resgata o último período visualizado pelo usuário no cache
    const periodoSalvo = localStorage.getItem('crm_periodo_padrao');
    if (periodoSalvo) {
      this.state.periodoSelecionado = periodoSalvo;
    }
  }

  /**
   * Escuta cliques e ações do layout base (fora dos módulos específicos)
   */
  ativarEventosGlobais() {
    // 1. Campo de Busca Global
    const inputBusca = document.querySelector('.global-search input');
    if (inputBusca) {
      inputBusca.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.notificar(`Buscando no sistema por: "${inputBusca.value}"`, 'info');
        }
      });
    }

    // 2. Botões de ação do Cabeçalho (Notificações, Engrenagem, etc)
    const botoesHeader = document.querySelectorAll('.header-action');
    botoesHeader.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const icone = e.currentTarget.querySelector('i');
        if (icone && icone.classList.contains('fa-bell')) {
          this.notificar('Central de notificações em desenvolvimento.', 'info');
        } else if (icone && icone.classList.contains('fa-gear')) {
          this.exportarRelatorioSessao(); // Usa a engrenagem para testar o export
        }
      });
    });

    // 3. Captura cliques nos filtros de período para salvar estado global
    const botoesPeriodo = document.querySelectorAll('[data-period]');
    botoesPeriodo.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const periodo = e.currentTarget.dataset.period;
        this.state.periodoSelecionado = periodo;
        localStorage.setItem('crm_periodo_padrao', periodo);
        // O Dashboard.js fará o refresh visual, aqui só guardamos o estado
      });
    });
  }

  /**
   * Preenche dinamicamente a tabela de Implantações em Andamento no index.html
   * Usando a nova estética Clean SaaS (sem os ícones antigos)
   */
  renderizarTabelaOperacional() {
    const tbody = document.querySelector('.data-table tbody');
    if (!tbody) return;

    // Pegamos 4 clientes aleatórios do mock para simular implantações
    const clientesAtivos = (this.dadosAtivos.clientes || []).slice(0, 4);

    if (clientesAtivos.length === 0) return;

    tbody.innerHTML = clientesAtivos.map((cliente, index) => {
      // Alternar status visualmente para simular realidade
      const isPendente = index % 2 !== 0;
      
      const statusClass = isPendente ? 'status pendente' : 'status ativo';
      const statusLabel = isPendente ? 'Aguardando Agenda' : 'Em Execução';
      
      const prioridadeClass = isPendente ? 'priority media' : 'priority alta';
      const prioridadeLabel = isPendente ? 'Normal' : 'Urgente';

      const avatarBg = isPendente ? 'var(--aviso-fundo)' : 'var(--primaria-suave)';
      const avatarColor = isPendente ? 'var(--aviso)' : 'var(--primaria)';

      return `
        <tr>
            <td style="text-align: center;"><input type="checkbox" aria-label="Selecionar ${cliente.nome}"></td>
            <td>
                <div class="cell-contact">
                    <div class="cell-avatar" style="background: ${avatarBg}; color: ${avatarColor};" aria-hidden="true">
                        ${cliente.nome.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <div class="cell-name">${cliente.nome}</div>
                        <div class="cell-sub">${cliente.cidade}, ${cliente.estado}</div>
                    </div>
                </div>
            </td>
            <td class="td-mono">${cliente.plano || 'Link Dedicado'}</td>
            <td><span class="${statusClass}">${statusLabel}</span></td>
            <td><span class="${prioridadeClass}">${prioridadeLabel}</span></td>
            <td style="text-align: right;">
                <button type="button" class="btn-ghost" title="Detalhes Técnicos">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Exporta um snapshot do estado atual em JSON (Útil para auditoria)
   */
  exportarRelatorioSessao() {
    this.notificar('Gerando relatório da sessão...', 'info');

    const relatorio = {
      geradoEm: new Date().toISOString(),
      usuario: this.state.usuarioLogado,
      pagina: this.state.paginaAtual,
      metricasAtuais: this.dadosAtivos.kpisTotais || {}
    };

    const blob = new Blob([JSON.stringify(relatorio, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `auditoria_crm_${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Sistema Global de Toasts (caso a função do Utils não esteja pronta a tempo)
   */
  notificar(mensagem, tipo = 'info') {
    // Se o Utils do dashboard estiver carregado, use-o
    if (window.Utils && typeof window.Utils.toast === 'function') {
      window.Utils.toast(mensagem, tipo);
      return;
    }
    // Fallback nativo
    console.log(`[Notificação | ${tipo.toUpperCase()}] ${mensagem}`);
  }

  /**
   * Tratamento visual de erros críticos no motor base
   */
  exibirErroCritico(erro) {
    const caixaErro = document.createElement('div');
    caixaErro.style.cssText = `
      position: fixed; top: 24px; left: 50%; transform: translateX(-50%);
      background: #FEE2E2; color: #DC2626; padding: 16px 24px;
      border: 1px solid #DC2626; border-radius: 8px; font-size: 14px;
      font-family: 'Inter', sans-serif; font-weight: 500; z-index: 9999;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    `;
    caixaErro.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="margin-right: 8px;"></i> Erro no Sistema: ${erro.message}`;
    document.body.appendChild(caixaErro);

    setTimeout(() => caixaErro.remove(), 6000);
  }
}

// =====================================================
// Boot (Inicialização)
// Garante que a Engine inicie assim que a DOM estiver pronta
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  window.GlobalApp = new NetCRMEngine();
  window.GlobalApp.init();
});