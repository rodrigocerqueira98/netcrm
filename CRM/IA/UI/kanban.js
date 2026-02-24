/* =====================================================
   KANBAN.JS — Pipeline de Vendas (PREPARADO PARA IA)
   CRM Pro · Mission Control Design System
   Deps: style.css, kanban.css, dashboard.js (Utils, CRM)
   ===================================================== */

'use strict';

/* =========================================
   1. ESTADO DO PIPELINE
   ========================================= */
const Pipeline = {

  /* --- colunas / estágios --- */
  columns: [
    { id: 'lead',       title: 'Lead',        stage: 'stage-lead',      dot: '#A78BFA', convRate: 58.5, limit: null },
    { id: 'contact',    title: 'Contato',     stage: 'stage-contact',   dot: '#4E9FFF', convRate: 60.8, limit: null },
    { id: 'proposal',   title: 'Proposta',    stage: 'stage-proposal',  dot: '#FFB400', convRate: 61.0, limit: 20   },
    { id: 'negocio',    title: 'Negociação',  stage: 'stage-negocio',   dot: '#FF8C00', convRate: 53.9, limit: 15   },
    { id: 'won',        title: 'Fechado ✓',   stage: 'stage-won',       dot: '#10FFAB', convRate: null, limit: null },
    { id: 'lost',       title: 'Perdido ✗',   stage: 'stage-lost',      dot: '#FF3B6B', convRate: null, limit: null },
  ],

  /* --- cards de oportunidade --- */
  cards: [
    {
      id: 'c001', column: 'lead',     title: 'Grupo Nexus — Enterprise Suite',
      company: 'Grupo Nexus S.A.',    value: 148_000,  prob: 20, priority: 'high',
      owner: { name: 'Ana Souza',     initials: 'AS',  color: 'linear-gradient(135deg,#7C3AED,#00E5FF)' },
      dueDate: '+5d',   dueSt: 'soon',   tag: 'tag-inbound',  tagLabel: 'Inbound',
      activities: { call: 2, email: 3, note: 1 },
      labels: [{ text: 'Enterprise', color: '#A78BFA' }, { text: 'Q3', color: '#4E9FFF' }],
      note: 'Decisor solicitou demo do módulo Analytics Plus.',
      nextAction: 'Enviar proposta técnica até sexta',
      createdAt: '2025-07-12', updatedAt: '2025-07-18',
    },
    {
      id: 'c002', column: 'lead',     title: 'Orbital Systems — Starter',
      company: 'Orbital Systems Ltda', value: 36_000,  prob: 25, priority: 'medium',
      owner: { name: 'Carlos Neto',   initials: 'CN',  color: 'linear-gradient(135deg,#10B981,#10FFAB)' },
      dueDate: '+12d',  dueSt: 'normal', tag: 'tag-referral', tagLabel: 'Referral',
      activities: { email: 2 },
      labels: [{ text: 'SMB', color: '#10FFAB' }],
      note: null,
      nextAction: 'Qualificar por telefone',
      createdAt: '2025-07-14', updatedAt: '2025-07-17',
    },
    {
      id: 'c003', column: 'contact',  title: 'TechBrasil Ltda — Pro Plan',
      company: 'TechBrasil Ltda',     value: 72_000,  prob: 45, priority: 'high',
      owner: { name: 'Carlos Neto',   initials: 'CN',  color: 'linear-gradient(135deg,#10B981,#10FFAB)' },
      dueDate: '+2d',   dueSt: 'soon',   tag: 'tag-outbound', tagLabel: 'Outbound',
      activities: { call: 3, email: 5, note: 2 },
      labels: [{ text: 'Urgente', color: '#FF3B6B' }],
      note: 'CTO envolvido. Precisa de customização do módulo de relatórios.',
      nextAction: 'Demo técnica agendada — amanhã 14h',
      createdAt: '2025-07-01', updatedAt: '2025-07-18',
    },
    {
      id: 'c004', column: 'contact',  title: 'Helix Tech — Business',
      company: 'Helix Tech',          value: 54_400,  prob: 40, priority: 'medium',
      owner: { name: 'Beatriz Lima',  initials: 'BL',  color: 'linear-gradient(135deg,#F59E0B,#EF4444)' },
      dueDate: '+8d',   dueSt: 'normal', tag: 'tag-campaign', tagLabel: 'Campaign',
      activities: { email: 4, note: 1 },
      labels: [{ text: 'Mid-Market', color: '#FFB400' }],
      note: null,
      nextAction: 'Enviar case de sucesso similar',
      createdAt: '2025-07-10', updatedAt: '2025-07-16',
    },
    {
      id: 'c005', column: 'proposal', title: 'Matrix Corp — Enterprise',
      company: 'Matrix Corp',         value: 210_000, prob: 60, priority: 'high',
      owner: { name: 'Ana Souza',     initials: 'AS',  color: 'linear-gradient(135deg,#7C3AED,#00E5FF)' },
      dueDate: '-1d',   dueSt: 'overdue', tag: 'tag-outbound', tagLabel: 'Outbound',
      activities: { call: 5, email: 8, note: 3, task: 2 },
      labels: [{ text: 'Enterprise', color: '#A78BFA' }, { text: 'Priority', color: '#FF3B6B' }],
      note: 'CFO pediu revisão de precificação. Aguardando aprovação do VP.',
      nextAction: 'Ligar para CFO hoje à tarde',
      createdAt: '2025-06-20', updatedAt: '2025-07-18',
    },
    {
      id: 'c006', column: 'proposal', title: 'Apex Engenharia — Pro',
      company: 'Apex Engenharia',     value: 84_000,  prob: 55, priority: 'medium',
      owner: { name: 'Diego Martins', initials: 'DM',  color: 'linear-gradient(135deg,#3B82F6,#7C3AED)' },
      dueDate: '+3d',   dueSt: 'soon',   tag: 'tag-inbound',  tagLabel: 'Inbound',
      activities: { call: 3, email: 4 },
      labels: [{ text: 'Tech', color: '#4E9FFF' }],
      note: null,
      nextAction: 'Confirmar escopo final com gerente de TI',
      createdAt: '2025-07-05', updatedAt: '2025-07-17',
    },
    {
      id: 'c007', column: 'negocio',  title: 'Prime Solutions — Annual',
      company: 'Prime Solutions',     value: 156_000, prob: 75, priority: 'high',
      owner: { name: 'Ana Souza',     initials: 'AS',  color: 'linear-gradient(135deg,#7C3AED,#00E5FF)' },
      dueDate: '+1d',   dueSt: 'today',  tag: 'tag-referral', tagLabel: 'Referral',
      activities: { call: 6, email: 9, note: 4, task: 3 },
      labels: [{ text: 'Hot', color: '#FF3B6B' }, { text: 'Annual', color: '#10FFAB' }],
      note: 'Contrato revisado pelo jurídico. Assinatura prevista para amanhã.',
      nextAction: 'Enviar contrato final para assinatura',
      createdAt: '2025-06-15', updatedAt: '2025-07-18',
    },
    {
      id: 'c008', column: 'negocio',  title: 'Solve Digital — Growth',
      company: 'Solve Digital',       value: 96_000,  prob: 70, priority: 'medium',
      owner: { name: 'Beatriz Lima',  initials: 'BL',  color: 'linear-gradient(135deg,#F59E0B,#EF4444)' },
      dueDate: '+4d',   dueSt: 'soon',   tag: 'tag-renovacao', tagLabel: 'Renovação',
      activities: { call: 4, email: 6, note: 2 },
      labels: [{ text: 'Renovação', color: '#00E5FF' }],
      note: 'Cliente atual — upgrade de plano. 40% chance de expansão.',
      nextAction: 'Reunião de alinhamento final',
      createdAt: '2025-07-08', updatedAt: '2025-07-16',
    },
    {
      id: 'c009', column: 'won',      title: 'Connect Telecom — Enterprise',
      company: 'Connect Telecom',     value: 240_000, prob: 100, priority: 'low',
      owner: { name: 'Diego Martins', initials: 'DM',  color: 'linear-gradient(135deg,#3B82F6,#7C3AED)' },
      dueDate: null,    dueSt: 'normal', tag: 'tag-outbound', tagLabel: 'Outbound',
      activities: { call: 8, email: 12, note: 5 },
      labels: [{ text: 'Enterprise', color: '#A78BFA' }, { text: 'Ganho', color: '#10FFAB' }],
      note: 'Contrato assinado em 15/07. Onboarding iniciado.',
      nextAction: null,
      createdAt: '2025-05-10', updatedAt: '2025-07-15',
    },
    {
      id: 'c010', column: 'won',      title: 'Inova S.A. — Business+',
      company: 'Inova S.A.',          value: 84_000,  prob: 100, priority: 'low',
      owner: { name: 'Carlos Neto',   initials: 'CN',  color: 'linear-gradient(135deg,#10B981,#10FFAB)' },
      dueDate: null,    dueSt: 'normal', tag: 'tag-inbound', tagLabel: 'Inbound',
      activities: { call: 4, email: 6 },
      labels: [{ text: 'Ganho', color: '#10FFAB' }],
      note: null,
      nextAction: null,
      createdAt: '2025-06-25', updatedAt: '2025-07-12',
    },
    {
      id: 'c011', column: 'lost',     title: 'Vertex Corp — Pro Plan',
      company: 'Vertex Corp',         value: 48_000,  prob: 0,  priority: 'low',
      owner: { name: 'Fernanda Costa', initials: 'FC', color: 'linear-gradient(135deg,#EC4899,#F59E0B)' },
      dueDate: null,    dueSt: 'normal', tag: 'tag-outbound', tagLabel: 'Outbound',
      activities: { call: 2, email: 4 },
      labels: [{ text: 'Perdido', color: '#FF3B6B' }],
      note: 'Escolheu concorrente por preço. Manter em nurturing.',
      nextAction: null,
      createdAt: '2025-06-01', updatedAt: '2025-07-10',
    },
  ],

  /* --- estado da UI --- */
  ui: {
    activeFilters:  {},
    sortBy:         'updatedAt',
    groupBy:        null,
    search:         '',
    expandedCards:  new Set(),
    collapsedCols:  new Set(),
    selectedCards:  new Set(),
    quickAddCol:    null,
    dragging:       null,      /* { cardId, sourceColId, ghostEl } */
    dropTarget:     null,      /* colId atual sob o cursor */
    history:        [],        /* stack de ações para undo */
    future:         [],        /* stack para redo */
  },

  /* --- helpers de acesso --- */
  getCol(id)       { return Pipeline.columns.find(c => c.id === id); },
  getCard(id)      { return Pipeline.cards.find(c => c.id === id); },
  getColCards(colId, filtered = true) {
    let cards = Pipeline.cards.filter(c => c.column === colId);
    if (!filtered) return cards;
    return Pipeline._applyFilters(cards);
  },
  colValue(colId)  {
    return Pipeline.getColCards(colId).reduce((s, c) => s + c.value, 0);
  },
  colWeighted(colId) {
    return Pipeline.getColCards(colId).reduce((s, c) => s + c.value * c.prob / 100, 0);
  },
  totalPipelineValue() {
    return Pipeline.cards.filter(c => !['won','lost'].includes(c.column))
                          .reduce((s, c) => s + c.value, 0);
  },

  _applyFilters(cards) {
    const { activeFilters, search } = Pipeline.ui;
    let result = [...cards];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.owner.name.toLowerCase().includes(q),
      );
    }

    if (activeFilters.owner) {
      result = result.filter(c => c.owner.name === activeFilters.owner);
    }
    if (activeFilters.priority) {
      result = result.filter(c => c.priority === activeFilters.priority);
    }
    if (activeFilters.tag) {
      result = result.filter(c => c.tag === activeFilters.tag);
    }
    if (activeFilters.due === 'overdue') {
      result = result.filter(c => c.dueSt === 'overdue');
    }
    if (activeFilters.due === 'today') {
      result = result.filter(c => c.dueSt === 'today' || c.dueSt === 'soon');
    }

    /* Ordenação */
    const { sortBy } = Pipeline.ui;
    result.sort((a, b) => {
      if (sortBy === 'value')     return b.value - a.value;
      if (sortBy === 'prob')      return b.prob  - a.prob;
      if (sortBy === 'priority') {
        const ord = { high: 0, medium: 1, low: 2 };
        return (ord[a.priority] ?? 3) - (ord[b.priority] ?? 3);
      }
      /* updatedAt padrão */
      return a.updatedAt < b.updatedAt ? 1 : -1;
    });

    return result;
  },
};

/* =========================================
   2. GERADOR DE IDS ÚNICOS
   ========================================= */
const uid = () => `c${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`;

/* =========================================
   3. HISTÓRICO — UNDO / REDO
   ========================================= */
const History = {

  MAX: 40,

  push(action) {
    Pipeline.ui.history.push(action);
    Pipeline.ui.future = [];
    if (Pipeline.ui.history.length > History.MAX) Pipeline.ui.history.shift();
    History._updateButtons();
  },

  undo() {
    const action = Pipeline.ui.history.pop();
    if (!action) return;
    History._reverse(action);
    Pipeline.ui.future.push(action);
    History._updateButtons();
    KanbanBoard.renderAll();
    Utils.toast('Ação desfeita', 'info', 2000);
  },

  redo() {
    const action = Pipeline.ui.future.pop();
    if (!action) return;
    History._apply(action);
    Pipeline.ui.history.push(action);
    History._updateButtons();
    KanbanBoard.renderAll();
    Utils.toast('Ação refeita', 'info', 2000);
  },

  _reverse(action) {
    if (action.type === 'move') {
      const card = Pipeline.getCard(action.cardId);
      if (card) { card.column = action.from; card.updatedAt = action.prevUpdatedAt; }
    }
    if (action.type === 'create') {
      Pipeline.cards = Pipeline.cards.filter(c => c.id !== action.cardId);
    }
    if (action.type === 'delete') {
      Pipeline.cards.push(action.card);
    }
    if (action.type === 'update') {
      const card = Pipeline.getCard(action.cardId);
      if (card) Object.assign(card, action.prevValues);
    }
  },

  _apply(action) {
    if (action.type === 'move') {
      const card = Pipeline.getCard(action.cardId);
      if (card) { card.column = action.to; card.updatedAt = new Date().toISOString().slice(0,10); }
    }
    if (action.type === 'create') {
      Pipeline.cards.push(action.card);
    }
    if (action.type === 'delete') {
      Pipeline.cards = Pipeline.cards.filter(c => c.id !== action.card.id);
    }
    if (action.type === 'update') {
      const card = Pipeline.getCard(action.cardId);
      if (card) Object.assign(card, action.nextValues);
    }
  },

  _updateButtons() {
    const btnUndo = Utils.$('#btn-undo');
    const btnRedo = Utils.$('#btn-redo');
    if (btnUndo) btnUndo.disabled = Pipeline.ui.history.length === 0;
    if (btnRedo) btnRedo.disabled = Pipeline.ui.future.length  === 0;
  },
};

/* =========================================
   4. DRAG & DROP
   ========================================= */
const DragDrop = {

  _ghost: null,
  _placeholder: null,
  _offsetX: 0,
  _offsetY: 0,
  _lastOver: null,

  /* Inicia drag num card */
  start(e, cardId) {
    if (e.button !== 0) return;
    e.preventDefault();

    const cardEl   = Utils.$(`[data-card-id="${cardId}"]`);
    const card     = Pipeline.getCard(cardId);
    if (!cardEl || !card) return;

    const rect     = cardEl.getBoundingClientRect();
    DragDrop._offsetX = e.clientX - rect.left;
    DragDrop._offsetY = e.clientY - rect.top;

    /* Ghost — clone visual seguindo o cursor */
    const ghost    = cardEl.cloneNode(true);
    ghost.style.cssText = `
      position:fixed; z-index:9000; pointer-events:none;
      width:${rect.width}px; opacity:0.92;
      transform:rotate(1.8deg) scale(1.02);
      box-shadow:0 20px 60px rgba(0,0,0,.55),0 0 0 2px rgba(0,229,255,.4);
      border:1px solid rgba(0,229,255,.5);
      transition:transform .1s ease,box-shadow .1s ease;
      left:${rect.left}px; top:${rect.top}px;
    `;
    document.body.appendChild(ghost);
    DragDrop._ghost = ghost;

    /* Placeholder na posição original */
    const ph = document.createElement('div');
    ph.className = 'kanban-card-placeholder';
    ph.dataset.placeholder = cardId;
    cardEl.replaceWith(ph);
    DragDrop._placeholder = ph;

    /* Marca card como sendo arrastado */
    cardEl.classList.add('dragging');
    Pipeline.ui.dragging = { cardId, sourceColId: card.column };

    document.addEventListener('mousemove', DragDrop._move);
    document.addEventListener('mouseup',   DragDrop._end);
  },

  _move(e) {
    if (!DragDrop._ghost) return;
    DragDrop._ghost.style.left = `${e.clientX - DragDrop._offsetX}px`;
    DragDrop._ghost.style.top  = `${e.clientY - DragDrop._offsetY}px`;

    /* Detecta qual coluna está sob o cursor */
    DragDrop._ghost.style.display = 'none';
    const el   = document.elementFromPoint(e.clientX, e.clientY);
    DragDrop._ghost.style.display = '';

    const colEl = el?.closest('[data-col-id]');
    const colId  = colEl?.dataset.colId;

    if (colId !== DragDrop._lastOver) {
      /* Remove highlight anterior */
      Utils.$$('.kanban-column.drag-over').forEach(c => c.classList.remove('drag-over'));
      if (colId) {
        const targetCol = Utils.$(`.kanban-column[data-col-id="${colId}"]`);
        targetCol?.classList.add('drag-over');
        DragDrop._movePlaceholder(e, colId);
      }
      DragDrop._lastOver = colId;
      Pipeline.ui.dropTarget = colId;
    } else if (colId) {
      DragDrop._movePlaceholder(e, colId);
    }
  },

  /* Move o placeholder para a posição certa dentro da coluna */
  _movePlaceholder(e, colId) {
    const cardsEl = Utils.$(`.kanban-column[data-col-id="${colId}"] .kanban-cards`);
    if (!cardsEl) return;

    const siblings = Utils.$$('.kanban-card:not(.dragging)', cardsEl)
      .filter(el => !el.dataset.placeholder);

    let inserted = false;
    for (const sib of siblings) {
      const rect   = sib.getBoundingClientRect();
      const midY   = rect.top + rect.height / 2;
      if (e.clientY < midY) {
        cardsEl.insertBefore(DragDrop._placeholder, sib);
        inserted = true;
        break;
      }
    }
    if (!inserted) cardsEl.appendChild(DragDrop._placeholder);
  },

  _end(e) {
    document.removeEventListener('mousemove', DragDrop._move);
    document.removeEventListener('mouseup',   DragDrop._end);

    const { cardId, sourceColId } = Pipeline.ui.dragging || {};
    const targetColId = Pipeline.ui.dropTarget;

    Utils.$$('.kanban-column.drag-over').forEach(c => c.classList.remove('drag-over'));

    if (cardId && targetColId) {
      DragDrop._drop(cardId, sourceColId, targetColId);
    }

    DragDrop._ghost?.remove();
    DragDrop._ghost = null;
    DragDrop._placeholder?.remove();
    DragDrop._placeholder = null;
    DragDrop._lastOver = null;
    Pipeline.ui.dragging   = null;
    Pipeline.ui.dropTarget = null;

    KanbanBoard.renderAll();
  },

  _drop(cardId, fromColId, toColId) {
    const card = Pipeline.getCard(cardId);
    if (!card) return;

    /* Validação de limite de coluna */
    const toCol    = Pipeline.getCol(toColId);
    const colCards = Pipeline.getColCards(toColId, false);
    if (toCol.limit && colCards.length >= toCol.limit) {
      Utils.toast(`Limite de ${toCol.limit} cards atingido em "${toCol.title}"`, 'warning');
      return;
    }

    const prevCol    = fromColId;
    const prevUpd    = card.updatedAt;
    card.column      = toColId;
    card.updatedAt   = new Date().toISOString().slice(0,10);

    /* Efeitos especiais por coluna destino */
    if (toColId === 'won') {
      setTimeout(() => KanbanBoard._confetti(cardId), 100);
      Utils.toast(`🏆 Negócio ganho: ${card.title.split('—')[0].trim()} — ${Utils.currency(card.value, true)}`, 'success');
      NotificationModule?.push?.({
        type: 'success',
        text: `${card.owner.name} fechou ${card.title.split('—')[0].trim()} — ${Utils.currency(card.value, true)}`,
        time: 'agora',
      });
    } else if (toColId === 'lost') {
      Utils.toast(`Negócio marcado como perdido: ${card.title.split('—')[0].trim()}`, 'warning');
    } else if (fromColId !== toColId) {
      Utils.toast(`"${card.title.split('—')[0].trim()}" → ${toCol.title}`, 'info', 2000);
    }

    History.push({ type: 'move', cardId, from: prevCol, to: toColId, prevUpdatedAt: prevUpd });
    KanbanBoard.updateSummaryBar();
  },
};

/* =========================================
   5. FORMULÁRIO DE CARD — CREATE / EDIT
   ========================================= */
const CardForm = {

  open(cardId = null, defaultColId = null) {
    const isEdit = !!cardId;
    const card   = isEdit ? Pipeline.getCard(cardId) : null;
    const title  = isEdit ? 'Editar Negócio' : 'Novo Negócio';

    const ownerOptions = [
      { name: 'Ana Souza',      initials: 'AS', color: 'linear-gradient(135deg,#7C3AED,#00E5FF)' },
      { name: 'Carlos Neto',    initials: 'CN', color: 'linear-gradient(135deg,#10B981,#10FFAB)' },
      { name: 'Beatriz Lima',   initials: 'BL', color: 'linear-gradient(135deg,#F59E0B,#EF4444)' },
      { name: 'Diego Martins',  initials: 'DM', color: 'linear-gradient(135deg,#3B82F6,#7C3AED)' },
      { name: 'Fernanda Costa', initials: 'FC', color: 'linear-gradient(135deg,#EC4899,#F59E0B)' },
    ];

    const body = `
      <div style="display:flex;flex-direction:column;gap:0;">

        <div class="form-group">
          <label class="form-label">Título do Negócio *</label>
          <input id="cf-title" class="form-control" type="text"
            placeholder="ex: Empresa XYZ — Plano Enterprise"
            value="${card?.title ?? ''}">
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div class="form-group">
            <label class="form-label">Empresa</label>
            <input id="cf-company" class="form-control" type="text"
              placeholder="Razão social" value="${card?.company ?? ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Valor (R$) *</label>
            <div class="input-group">
              <i class="fa-solid fa-coins input-icon"></i>
              <input id="cf-value" class="form-control" type="number" min="0" step="1000"
                placeholder="0" value="${card?.value ?? ''}">
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div class="form-group">
            <label class="form-label">Estágio</label>
            <select id="cf-column" class="form-control">
              ${Pipeline.columns.map(c => `
                <option value="${c.id}"
                  ${(card?.column ?? defaultColId) === c.id ? 'selected' : ''}>
                  ${c.title}
                </option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Probabilidade (%)</label>
            <div class="input-group">
              <i class="fa-solid fa-percent input-icon"></i>
              <input id="cf-prob" class="form-control" type="number"
                min="0" max="100" value="${card?.prob ?? 50}">
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div class="form-group">
            <label class="form-label">Responsável</label>
            <select id="cf-owner" class="form-control">
              ${ownerOptions.map(o => `
                <option value="${o.name}"
                  data-initials="${o.initials}" data-color="${o.color}"
                  ${card?.owner.name === o.name ? 'selected' : ''}>
                  ${o.name}
                </option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Prioridade</label>
            <select id="cf-priority" class="form-control">
              <option value="high"   ${card?.priority === 'high'   ? 'selected' : ''}>Alta</option>
              <option value="medium" ${card?.priority === 'medium' ? 'selected' : ''}>Média</option>
              <option value="low"    ${card?.priority === 'low'    ? 'selected' : ''}>Baixa</option>
            </select>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div class="form-group">
            <label class="form-label">Origem</label>
            <select id="cf-tag" class="form-control">
              <option value="tag-inbound"   ${card?.tag === 'tag-inbound'   ? 'selected' : ''}>Inbound</option>
              <option value="tag-outbound"  ${card?.tag === 'tag-outbound'  ? 'selected' : ''}>Outbound</option>
              <option value="tag-referral"  ${card?.tag === 'tag-referral'  ? 'selected' : ''}>Referral</option>
              <option value="tag-campaign"  ${card?.tag === 'tag-campaign'  ? 'selected' : ''}>Campaign</option>
              <option value="tag-renovacao" ${card?.tag === 'tag-renovacao' ? 'selected' : ''}>Renovação</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Prazo</label>
            <input id="cf-due" class="form-control" type="date"
              value="${card?.dueDate && !card.dueDate.startsWith('+') ? card.dueDate : ''}">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Próxima Ação</label>
          <input id="cf-next" class="form-control" type="text"
            placeholder="ex: Ligar para CFO amanhã"
            value="${card?.nextAction ?? ''}">
        </div>

        <div class="form-group">
          <label class="form-label">Observações</label>
          <textarea id="cf-note" class="form-control" rows="3"
            placeholder="Contexto, decisores, blockers...">${card?.note ?? ''}</textarea>
        </div>

      </div>
    `;

    const footer = `
      ${isEdit ? `<button class="btn-danger" style="margin-right:auto;" id="cf-btn-delete">
        <i class="fa-solid fa-trash"></i> Excluir
      </button>` : ''}
      <button class="btn-secondary" onclick="ModalModule.close()">Cancelar</button>
      <button class="btn-primary" id="cf-btn-save">
        <i class="fa-solid fa-${isEdit ? 'floppy-disk' : 'plus'}"></i>
        ${isEdit ? 'Salvar Alterações' : 'Criar Negócio'}
      </button>
    `;

    ModalModule.open({ title, body, footer, width: '580px' });

    /* Bind botão salvar */
    setTimeout(() => {
      Utils.$('#cf-btn-save')?.addEventListener('click', () => {
        if (isEdit) CardForm._save(cardId);
        else        CardForm._create();
      });
      Utils.$('#cf-btn-delete')?.addEventListener('click', () => {
        ModalModule.close();
        CardActions.delete(cardId);
      });
      /* Enter para salvar */
      Utils.$('#cf-title')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') Utils.$('#cf-btn-save')?.click();
      });
      Utils.$('#cf-title')?.focus();
    }, 80);
  },

  _readForm() {
    const ownerSel = Utils.$('#cf-owner');
    const selOpt   = ownerSel?.options[ownerSel.selectedIndex];
    return {
      title:      Utils.$('#cf-title')?.value.trim(),
      company:    Utils.$('#cf-company')?.value.trim() || '',
      value:      parseInt(Utils.$('#cf-value')?.value) || 0,
      column:     Utils.$('#cf-column')?.value,
      prob:       Utils.clamp(parseInt(Utils.$('#cf-prob')?.value) || 50, 0, 100),
      priority:   Utils.$('#cf-priority')?.value || 'medium',
      tag:        Utils.$('#cf-tag')?.value || 'tag-inbound',
      tagLabel:   Utils.$('#cf-tag')?.options[Utils.$('#cf-tag').selectedIndex]?.text || '',
      nextAction: Utils.$('#cf-next')?.value.trim() || null,
      note:       Utils.$('#cf-note')?.value.trim() || null,
      owner: {
        name:     selOpt?.value || '',
        initials: selOpt?.dataset.initials || '??',
        color:    selOpt?.dataset.color || 'var(--bg-overlay)',
      },
    };
  },

  _create() {
    const data = CardForm._readForm();
    if (!data.title) { Utils.toast('Título é obrigatório', 'error'); return; }
    if (data.value <= 0) { Utils.toast('Informe um valor válido', 'error'); return; }

    const today = new Date().toISOString().slice(0,10);
    const card  = {
      id: uid(), dueDate: null, dueSt: 'normal', activities: {},
      labels: [], createdAt: today, updatedAt: today,
      ...data,
    };

    Pipeline.cards.push(card);
    History.push({ type: 'create', cardId: card.id, card: { ...card } });
    ModalModule.close();
    KanbanBoard.renderAll();
    KanbanBoard.flashCard(card.id, 'just-created');
    Utils.toast(`Negócio criado: ${card.title.split('—')[0].trim()}`, 'success');
  },

  _save(cardId) {
    const card = Pipeline.getCard(cardId);
    if (!card) return;

    const data = CardForm._readForm();
    if (!data.title) { Utils.toast('Título é obrigatório', 'error'); return; }

    const prevValues = { ...card };
    Object.assign(card, data, { updatedAt: new Date().toISOString().slice(0,10) });
    History.push({ type: 'update', cardId, prevValues, nextValues: { ...data } });

    ModalModule.close();
    KanbanBoard.renderAll();
    KanbanBoard.flashCard(cardId, 'just-created');
    Utils.toast('Negócio atualizado', 'success');
  },
};

/* =========================================
   6. AÇÕES DE CARD (menu de contexto)
   ========================================= */
const CardActions = {

  delete(cardId) {
    const card = Pipeline.getCard(cardId);
    if (!card) return;

    ModalModule.open({
      title: 'Confirmar Exclusão',
      body: `
        <div style="text-align:center;padding:8px 0 16px;">
          <div style="font-size:32px;margin-bottom:12px;">🗑️</div>
          <p style="color:var(--text-secondary);font-size:14px;line-height:1.6;">
            Tem certeza que deseja excluir<br>
            <strong style="color:var(--text-primary);">${card.title}</strong>?
          </p>
          <p style="font-size:12px;color:var(--text-muted);margin-top:8px;">
            Valor: ${Utils.currency(card.value, true)} · Esta ação pode ser desfeita (Ctrl+Z)
          </p>
        </div>
      `,
      footer: `
        <button class="btn-secondary" onclick="ModalModule.close()">Cancelar</button>
        <button class="btn-danger" id="confirm-delete">
          <i class="fa-solid fa-trash"></i> Excluir Negócio
        </button>
      `,
    });
    setTimeout(() => {
      Utils.$('#confirm-delete')?.addEventListener('click', () => {
        History.push({ type: 'delete', card: { ...card } });
        Pipeline.cards = Pipeline.cards.filter(c => c.id !== cardId);
        ModalModule.close();
        KanbanBoard.renderAll();
        Utils.toast(`Negócio excluído. Ctrl+Z para desfazer`, 'warning');
      });
    }, 80);
  },

  duplicate(cardId) {
    const card = Pipeline.getCard(cardId);
    if (!card) return;
    const today   = new Date().toISOString().slice(0,10);
    const newCard = { ...card, id: uid(), title: `${card.title} (cópia)`,
                      createdAt: today, updatedAt: today };
    Pipeline.cards.push(newCard);
    History.push({ type: 'create', cardId: newCard.id, card: { ...newCard } });
    KanbanBoard.renderAll();
    KanbanBoard.flashCard(newCard.id, 'just-created');
    Utils.toast('Negócio duplicado', 'success');
  },

  moveTo(cardId, toColId) {
    const card = Pipeline.getCard(cardId);
    if (!card || card.column === toColId) return;
    const prev = card.column;
    card.column = toColId;
    card.updatedAt = new Date().toISOString().slice(0,10);
    History.push({ type: 'move', cardId, from: prev, to: toColId });
    KanbanBoard.renderAll();
    Utils.toast(`Movido para "${Pipeline.getCol(toColId)?.title}"`, 'info', 2000);
  },

  openDrawer(cardId) {
    DrawerModule.open(cardId);
  },

  /* Context menu ao clicar direito num card */
  showContextMenu(e, cardId) {
    e.preventDefault();
    ContextMenu.close();

    const card     = Pipeline.getCard(cardId);
    const stageOpts = Pipeline.columns
      .filter(c => c.id !== card.column)
      .map(c => `
        <div class="ctx-item" data-action="moveTo" data-col="${c.id}">
          <span style="width:8px;height:8px;border-radius:50%;background:${c.dot};
            display:inline-block;box-shadow:0 0 4px ${c.dot};"></span>
          Mover para ${c.title}
        </div>
      `).join('');

    ContextMenu.open(e, `
      <div class="ctx-item" data-action="edit">
        <i class="fa-solid fa-pen"></i> Editar Negócio
      </div>
      <div class="ctx-item" data-action="drawer">
        <i class="fa-solid fa-sidebar"></i> Abrir Detalhes
      </div>
      <div class="ctx-sep"></div>
      ${stageOpts}
      <div class="ctx-sep"></div>
      <div class="ctx-item" data-action="duplicate">
        <i class="fa-solid fa-copy"></i> Duplicar
      </div>
      <div class="ctx-item ctx-danger" data-action="delete">
        <i class="fa-solid fa-trash"></i> Excluir
      </div>
    `, (action, extra) => {
      if (action === 'edit')      CardForm.open(cardId);
      if (action === 'drawer')    DrawerModule.open(cardId);
      if (action === 'duplicate') CardActions.duplicate(cardId);
      if (action === 'delete')    CardActions.delete(cardId);
      if (action === 'moveTo')    CardActions.moveTo(cardId, extra);
    });
  },
};

/* =========================================
   7. MENU DE CONTEXTO
   ========================================= */
const ContextMenu = {

  _el: null,

  open(e, html, callback) {
    ContextMenu.close();

    const menu = Utils.html(`
      <div id="ctx-menu" style="
        position:fixed; z-index:8000;
        background:var(--bg-raised); border:1px solid var(--border-strong);
        border-radius:var(--radius-md); box-shadow:var(--shadow-lg);
        padding:6px; min-width:200px;
        animation:card-in .15s ease both;
        font-family:var(--font-ui); font-size:13px;
      ">${html}</div>
    `);

    /* Estilo dos items via injeção */
    if (!Utils.$('#ctx-styles')) {
      const s = document.createElement('style');
      s.id = 'ctx-styles';
      s.textContent = `
        .ctx-item {
          display:flex; align-items:center; gap:9px; padding:8px 12px;
          color:var(--text-secondary); border-radius:var(--radius-sm);
          cursor:pointer; transition:var(--transition-fast); white-space:nowrap;
        }
        .ctx-item:hover { background:var(--primary-dim); color:var(--primary); }
        .ctx-item.ctx-danger:hover { background:var(--danger-bg); color:var(--danger); }
        .ctx-item i { width:14px; text-align:center; font-size:12px; flex-shrink:0; }
        .ctx-sep { height:1px; background:var(--border); margin:4px 0; }
      `;
      document.head.appendChild(s);
    }

    /* Posição */
    document.body.appendChild(menu);
    const mw = menu.offsetWidth;
    const mh = menu.offsetHeight;
    let   x  = e.clientX;
    let   y  = e.clientY;
    if (x + mw > window.innerWidth  - 8) x = window.innerWidth  - mw - 8;
    if (y + mh > window.innerHeight - 8) y = window.innerHeight - mh - 8;
    menu.style.left = `${x}px`;
    menu.style.top  = `${y}px`;

    /* Clicks */
    menu.addEventListener('click', (ev) => {
      const item   = ev.target.closest('[data-action]');
      if (!item) return;
      callback(item.dataset.action, item.dataset.col);
      ContextMenu.close();
    });

    ContextMenu._el = menu;
    setTimeout(() => document.addEventListener('click', ContextMenu.close, { once: true }), 50);
  },

  close() {
    ContextMenu._el?.remove();
    ContextMenu._el = null;
  },
};

/* =========================================
   7b. MODAL GENÉRICO
   ========================================= */
const ModalModule = {
  _overlay: null,
  _modal: null,

  open(opts) {
    this.close();
    const { title = '', body = '', footer = '', width = '480px' } = opts || {};
    const overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'modal-title');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:7000;display:flex;align-items:center;justify-content:center;
      background:rgba(6,9,18,.75);backdrop-filter:blur(4px);
      animation:fadeIn .2s ease both;
    `;
    const modal = document.createElement('div');
    modal.className = 'modal-box';
    modal.style.cssText = `
      background:var(--bg-raised);border:1px solid var(--border-strong);border-radius:var(--radius-lg);
      box-shadow:var(--shadow-lg);width:min(95vw,${width});max-height:90vh;display:flex;flex-direction:column;
      animation:slideUp .25s ease both;
    `;
    modal.innerHTML = `
      <div class="modal-header" style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--border);">
        <h2 id="modal-title" style="margin:0;font-size:16px;font-weight:700;color:var(--text-primary);">${title}</h2>
        <button type="button" class="modal-close" aria-label="Fechar" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;padding:4px;">
          <i class="fa-solid fa-xmark" style="font-size:18px;"></i>
        </button>
      </div>
      <div class="modal-body" style="padding:20px;overflow-y:auto;flex:1;">${body}</div>
      <div class="modal-footer" style="display:flex;align-items:center;justify-content:flex-end;gap:10px;padding:16px 20px;border-top:1px solid var(--border);">${footer}</div>
    `;
    overlay.appendChild(modal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) ModalModule.close(); });
    modal.querySelector('.modal-close').addEventListener('click', () => ModalModule.close());
    document.body.appendChild(overlay);
    this._overlay = overlay;
    this._modal = modal;
    if (!document.getElementById('modal-styles')) {
      const s = document.createElement('style');
      s.id = 'modal-styles';
      s.textContent = `@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`;
      document.head.appendChild(s);
    }
  },

  close() {
    if (this._overlay && this._overlay.parentNode) {
      this._overlay.remove();
      this._overlay = null;
      this._modal = null;
    }
  },
};

/* =========================================
   8. DRAWER DE DETALHES
   ========================================= */
const DrawerModule = {

  _cardId: null,
  _activeTab: 'details',

  open(cardId) {
    DrawerModule._cardId  = cardId;
    DrawerModule._activeTab = 'details';

    let drawer = Utils.$('#deal-drawer');
    if (!drawer) {
      drawer = DrawerModule._buildDrawer();
      document.body.appendChild(drawer);
    }

    DrawerModule._render(cardId);
    requestAnimationFrame(() => drawer.classList.add('open'));
  },

  close() {
    const drawer = Utils.$('#deal-drawer');
    drawer?.classList.remove('open');
    DrawerModule._cardId = null;
  },

  _buildDrawer() {
    const drawer = Utils.html(`
      <div id="deal-drawer" class="deal-drawer">
        <div id="drawer-header" class="drawer-header"></div>
        <div id="drawer-value-strip" class="drawer-value-strip"></div>
        <div class="drawer-tabs" id="drawer-tabs">
          <button class="drawer-tab active" data-tab="details">
            <i class="fa-solid fa-circle-info"></i> Detalhes
          </button>
          <button class="drawer-tab" data-tab="activity">
            <i class="fa-solid fa-bolt"></i> Atividade
          </button>
          <button class="drawer-tab" data-tab="notes">
            <i class="fa-solid fa-note-sticky"></i> Notas
          </button>
          <button class="drawer-tab" data-tab="files">
            <i class="fa-solid fa-paperclip"></i> Arquivos
          </button>
        </div>
        <div id="drawer-body" class="drawer-body"></div>
        <div class="drawer-footer">
          <button class="btn-secondary" onclick="DrawerModule.close()">
            <i class="fa-solid fa-xmark"></i> Fechar
          </button>
          <button class="btn-primary" id="drawer-btn-edit">
            <i class="fa-solid fa-pen"></i> Editar
          </button>
        </div>
      </div>
    `);

    /* Overlay de fundo */
    const overlay = Utils.html(`<div id="drawer-overlay" style="
      position:fixed;inset:0;z-index:499;background:rgba(6,9,18,.5);
      backdrop-filter:blur(2px);display:none;
    "></div>`);
    overlay.addEventListener('click', DrawerModule.close);
    document.body.appendChild(overlay);

    /* Tabs */
    drawer.addEventListener('click', (e) => {
      const tab = e.target.closest('[data-tab]');
      if (!tab) return;
      DrawerModule._activeTab = tab.dataset.tab;
      Utils.$$('.drawer-tab', drawer).forEach(t => t.classList.toggle('active', t === tab));
      DrawerModule._renderBody(DrawerModule._cardId);
    });

    /* Botão editar */
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('#drawer-btn-edit')) {
        DrawerModule.close();
        setTimeout(() => CardForm.open(DrawerModule._cardId), 200);
      }
    });

    return drawer;
  },

  _render(cardId) {
    const card   = Pipeline.getCard(cardId);
    const col    = Pipeline.getCol(card.column);
    if (!card) return;

    const overlay = Utils.$('#drawer-overlay');
    if (overlay) overlay.style.display = 'block';

    /* Header */
    Utils.$('#drawer-header').innerHTML = `
      <div class="drawer-stage-dot" style="background:${col.dot};color:${col.dot};"></div>
      <div class="drawer-title-group">
        <div class="drawer-title">${card.title}</div>
        <div class="drawer-company">
          <i class="fa-solid fa-building" style="margin-right:5px;font-size:11px;"></i>${card.company}
        </div>
      </div>
      <button class="drawer-close" onclick="DrawerModule.close()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    /* Value strip */
    const probClass = card.prob >= 70 ? 'green' : card.prob >= 40 ? 'amber' : 'cyan';
    Utils.$('#drawer-value-strip').innerHTML = `
      <div class="drawer-val-item">
        <span class="drawer-val-label">Valor</span>
        <span class="drawer-val-value green">${Utils.currency(card.value, true)}</span>
      </div>
      <div class="drawer-val-item">
        <span class="drawer-val-label">Probabilidade</span>
        <span class="drawer-val-value ${probClass}">${card.prob}%</span>
      </div>
      <div class="drawer-val-item">
        <span class="drawer-val-label">Ponderado</span>
        <span class="drawer-val-value cyan">${Utils.currency(card.value * card.prob / 100, true)}</span>
      </div>
    `;

    DrawerModule._renderBody(cardId);
  },

  _renderBody(cardId) {
    const card = Pipeline.getCard(cardId);
    const body = Utils.$('#drawer-body');
    if (!card || !body) return;

    const col = Pipeline.getCol(card.column);

    const tabs = {
      details: () => `
        ${card.aiData ? `
        <div style="background: linear-gradient(145deg, rgba(16, 255, 171, 0.05), rgba(0, 229, 255, 0.05)); border: 1px solid rgba(0, 229, 255, 0.3); border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px;">
          <div style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-robot" style="color: #00E5FF;"></i> Análise Preditiva
          </div>
          <div style="display: flex; gap: 12px; margin-bottom: 10px;">
            <div style="flex: 1; background: var(--bg-surface); padding: 8px; border-radius: 4px; border: 1px solid var(--border); text-align: center;">
              <div style="font-size: 10px; color: var(--text-secondary);">Score</div>
              <div style="font-size: 16px; font-weight: 700; font-family: var(--font-mono); color: ${card.aiData.nivelRisco === 'alto' ? 'var(--danger)' : 'var(--success)'}">${card.aiData.scoreCalculado}/100</div>
            </div>
            <div style="flex: 1; background: var(--bg-surface); padding: 8px; border-radius: 4px; border: 1px solid var(--border); text-align: center;">
              <div style="font-size: 10px; color: var(--text-secondary);">Risco</div>
              <div style="font-size: 12px; font-weight: 700; margin-top: 4px;">${card.aiData.riscoLabel}</div>
            </div>
          </div>
          <div style="font-size: 12px; color: var(--text-primary); display: flex; align-items: flex-start; gap: 8px;">
            <i class="fa-solid fa-lightbulb" style="color: var(--warning); margin-top: 2px;"></i>
            <span><strong>Ação Sugerida:</strong> ${card.aiData.sugestaoAcao}</span>
          </div>
        </div>
        ` : ''}

        <div class="deal-fields-grid">
          ${[
            { label: 'Estágio',      value: `<span style="color:${col.dot};font-weight:700;">${col.title}</span>` },
            { label: 'Prioridade',   value: DrawerModule._priorityBadge(card.priority) },
            { label: 'Responsável',  value: `<div style="display:flex;align-items:center;gap:7px;">
                <div style="width:22px;height:22px;border-radius:50%;background:${card.owner.color};
                  display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;flex-shrink:0;">
                  ${card.owner.initials}</div>${card.owner.name}</div>` },
            { label: 'Origem',       value: card.tagLabel || '—' },
            { label: 'Criado em',    value: card.createdAt },
            { label: 'Atualizado',   value: card.updatedAt },
            { label: 'Prazo',        value: card.dueDate || '—' },
            { label: 'Ticket',       value: `<span style="font-family:var(--font-mono);color:var(--success);font-weight:700;">${Utils.currency(card.value)}</span>` },
          ].map(f => `
            <div class="deal-field">
              <span class="deal-field-label">${f.label}</span>
              <span class="deal-field-value">${f.value}</span>
            </div>
          `).join('')}
        </div>

        ${card.nextAction ? `
          <div class="kcard-next-action" style="margin-top:12px;">
            <i class="fa-solid fa-circle-arrow-right"></i>
            <span>${card.nextAction}</span>
          </div>
        ` : ''}

        ${card.note ? `
          <div class="kcard-note" style="margin-top:12px;">${card.note}</div>
        ` : ''}

        <div style="margin-top:16px;">
          <div style="font-size:10px;font-family:var(--font-mono);color:var(--text-muted);
            text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;">Atividades</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${Object.entries(card.activities).map(([type, count]) => `
              <div style="display:flex;align-items:center;gap:5px;
                padding:4px 10px;background:var(--bg-overlay);border:1px solid var(--border);
                border-radius:20px;font-size:11px;font-family:var(--font-mono);">
                <i class="fa-solid ${DrawerModule._actIcon(type)}" style="font-size:10px;color:var(--primary);"></i>
                ${count} ${type}
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border);">
          <div style="font-size:10px;font-family:var(--font-mono);color:var(--text-muted);
            text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;">Mover Estágio</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${Pipeline.columns.filter(c => c.id !== card.column).map(c => `
              <button onclick="CardActions.moveTo('${cardId}','${c.id}');DrawerModule.close();" style="
                display:flex;align-items:center;gap:6px;padding:5px 12px;
                background:var(--bg-overlay);border:1px solid var(--border);
                border-radius:20px;font-family:var(--font-ui);font-size:11px;font-weight:600;
                color:var(--text-secondary);cursor:pointer;transition:var(--transition);
              " onmouseenter="this.style.background='var(--bg-hover)';this.style.color='${c.dot}';this.style.borderColor='${c.dot}40'"
                 onmouseleave="this.style.background='var(--bg-overlay)';this.style.color='var(--text-secondary)';this.style.borderColor='var(--border)'">
                <span style="width:7px;height:7px;border-radius:50%;background:${c.dot};"></span>${c.title}
              </button>
            `).join('')}
          </div>
        </div>
      `,

      activity: () => `
        <div class="timeline">
          ${[
            { icon: 'fa-phone',         color: 'var(--success)', text: 'Ligação realizada — 12min', time: '2h atrás' },
            { icon: 'fa-envelope',       color: 'var(--primary)', text: 'Proposta revisada enviada',  time: '1d atrás' },
            { icon: 'fa-calendar-days',  color: '#A78BFA',        text: 'Demo agendada para sexta',   time: '2d atrás' },
            { icon: 'fa-note-sticky',    color: 'var(--warning)', text: card.note || 'Nota interna adicionada', time: '3d atrás' },
          ].map(a => `
            <div class="timeline-item">
              <div class="timeline-icon" style="background:${a.color}22;color:${a.color};border:2px solid var(--bg-raised);">
                <i class="fa-solid ${a.icon}"></i>
              </div>
              <div class="timeline-body">
                <div class="timeline-header">
                  <span class="timeline-title" style="font-size:12.5px;">${a.text}</span>
                  <span class="timeline-time">${a.time}</span>
                </div>
                <div class="timeline-desc" style="font-size:11.5px;">${card.owner.name}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <button style="
          width:100%;margin-top:14px;padding:8px;background:var(--primary-dim);
          border:1px dashed var(--border-accent);border-radius:var(--radius-md);
          color:var(--primary);font-family:var(--font-ui);font-size:12px;font-weight:600;
          cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;
          transition:var(--transition);
        " onclick="Utils.toast('Nova atividade registrada','success');">
          <i class="fa-solid fa-plus"></i> Registrar Atividade
        </button>
      `,

      notes: () => `
        <div style="margin-bottom:12px;">
          <textarea style="
            width:100%;background:var(--bg-surface);border:1px solid var(--border);
            border-radius:var(--radius-md);color:var(--text-primary);padding:12px;
            font-family:var(--font-ui);font-size:13px;resize:none;outline:none;
            min-height:100px;transition:var(--transition);
          " placeholder="Adicionar nota..." onfocus="this.style.borderColor='var(--border-accent)'"
             onblur="this.style.borderColor='var(--border)'"
          >${card.note ?? ''}</textarea>
          <button style="
            margin-top:6px;padding:7px 16px;background:var(--primary);
            border:none;border-radius:var(--radius-md);color:#000;font-weight:700;
            font-family:var(--font-ui);font-size:12px;cursor:pointer;float:right;
            transition:var(--transition);
          " onclick="Utils.toast('Nota salva','success');">
            <i class="fa-solid fa-floppy-disk"></i> Salvar Nota
          </button>
        </div>
        <div style="clear:both;margin-top:8px;padding-top:12px;border-top:1px solid var(--border);">
          <div style="font-size:10px;font-family:var(--font-mono);color:var(--text-muted);
            letter-spacing:.8px;text-transform:uppercase;margin-bottom:8px;">Histórico de Notas</div>
          <div style="font-size:12px;color:var(--text-muted);font-style:italic;text-align:center;padding:20px 0;">
            Nenhuma nota anterior registrada
          </div>
        </div>
      `,

      files: () => `
        <div style="
          border:2px dashed var(--border);border-radius:var(--radius-lg);
          padding:32px;text-align:center;cursor:pointer;transition:var(--transition);
          margin-bottom:16px;
        " onclick="Utils.toast('Upload em desenvolvimento','info');"
           onmouseenter="this.style.borderColor='var(--border-accent)';this.style.background='var(--primary-dim)'"
           onmouseleave="this.style.borderColor='var(--border)';this.style.background='transparent'">
          <i class="fa-solid fa-cloud-arrow-up" style="font-size:28px;color:var(--text-muted);margin-bottom:10px;display:block;"></i>
          <div style="font-size:13px;color:var(--text-secondary);font-weight:600;">Arraste arquivos ou clique para anexar</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">PDF, DOCX, XLSX, PNG — até 25MB</div>
        </div>
        <div style="font-size:12px;color:var(--text-muted);text-align:center;">Nenhum arquivo anexado</div>
      `,
    };

    body.innerHTML = (tabs[DrawerModule._activeTab] || tabs.details)();
  },

  _priorityBadge(p) {
    const map = { high: ['Alta','var(--danger)','var(--danger-bg)'], medium: ['Média','var(--warning)','var(--warning-bg)'], low: ['Baixa','var(--success)','var(--success-bg)'] };
    const [label, color, bg] = map[p] || map.medium;
    return `<span style="padding:2px 8px;background:${bg};color:${color};border-radius:3px;font-size:11px;font-weight:700;font-family:var(--font-mono);">${label}</span>`;
  },

  _actIcon(type) {
    return { call:'fa-phone', email:'fa-envelope', note:'fa-note-sticky', task:'fa-list-check', meeting:'fa-calendar-days' }[type] || 'fa-bolt';
  },
};

/* =========================================
   9. FILTRO AVANÇADO
   ========================================= */
const FilterModule = {

  _open: false,

  init() {
    const btn    = Utils.$('#btn-filter');
    const panel  = Utils.$('#filter-panel');
    if (!btn || !panel) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      FilterModule._open = !FilterModule._open;
      panel.style.display = FilterModule._open ? 'block' : 'none';
      if (FilterModule._open) FilterModule.renderPanel(panel);
    });

    document.addEventListener('click', () => {
      FilterModule._open = false;
      if (panel) panel.style.display = 'none';
    });

    panel.addEventListener('click', e => e.stopPropagation());
  },

  renderPanel(panel) {
    const { activeFilters } = Pipeline.ui;
    const owners   = [...new Set(Pipeline.cards.map(c => c.owner.name))];
    const tags     = ['tag-inbound','tag-outbound','tag-referral','tag-campaign','tag-renovacao'];
    const tagLabels = { 'tag-inbound':'Inbound','tag-outbound':'Outbound','tag-referral':'Referral','tag-campaign':'Campaign','tag-renovacao':'Renovação' };

    panel.innerHTML = `
      <div class="filter-dropdown">
        <div class="filter-dropdown-header">
          <span>Filtros</span>
          <span class="filter-clear" onclick="FilterModule.clearAll()">Limpar tudo</span>
        </div>

        <div class="filter-section">
          <div class="filter-section-title">Responsável</div>
          <div class="filter-options">
            ${owners.map(o => `
              <div class="filter-option ${activeFilters.owner === o ? 'selected' : ''}"
                   onclick="FilterModule.toggle('owner','${o}')">
                ${o.split(' ')[0]}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="filter-section">
          <div class="filter-section-title">Prioridade</div>
          <div class="filter-options">
            ${[['high','Alta'],['medium','Média'],['low','Baixa']].map(([v,l]) => `
              <div class="filter-option ${activeFilters.priority === v ? 'selected' : ''}"
                   onclick="FilterModule.toggle('priority','${v}')">
                ${l}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="filter-section">
          <div class="filter-section-title">Origem</div>
          <div class="filter-options">
            ${tags.map(t => `
              <div class="filter-option ${activeFilters.tag === t ? 'selected' : ''}"
                   onclick="FilterModule.toggle('tag','${t}')">
                ${tagLabels[t]}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="filter-section" style="border-bottom:none;">
          <div class="filter-section-title">Prazo</div>
          <div class="filter-options">
            <div class="filter-option ${activeFilters.due === 'overdue' ? 'selected' : ''}"
                 onclick="FilterModule.toggle('due','overdue')">Atrasado</div>
            <div class="filter-option ${activeFilters.due === 'today' ? 'selected' : ''}"
                 onclick="FilterModule.toggle('due','today')">Esta semana</div>
          </div>
        </div>

        <div class="filter-dropdown-footer">
          <button class="btn-secondary" onclick="FilterModule.clearAll()">Limpar</button>
          <button class="btn-primary" onclick="FilterModule.apply()">
            <i class="fa-solid fa-check"></i> Aplicar
          </button>
        </div>
      </div>
    `;
  },

  toggle(key, value) {
    if (Pipeline.ui.activeFilters[key] === value) delete Pipeline.ui.activeFilters[key];
    else Pipeline.ui.activeFilters[key] = value;

    const panel = Utils.$('#filter-panel');
    if (panel) FilterModule.renderPanel(panel);
  },

  apply() {
    FilterModule._open = false;
    Utils.$('#filter-panel').style.display = 'none';
    KanbanBoard.renderAll();

    const count = Object.keys(Pipeline.ui.activeFilters).length;
    const badge = Utils.$('#filter-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
    if (count) Utils.toast(`${count} filtro(s) aplicado(s)`, 'info', 2000);
  },

  clearAll() {
    Pipeline.ui.activeFilters = {};
    FilterModule.apply();
  },

  setSearch(q) {
    Pipeline.ui.search = q;
    KanbanBoard.renderAll();
  },

  setSort(field) {
    Pipeline.ui.sortBy = field;
    KanbanBoard.renderAll();
    Utils.toast(`Ordenando por ${field}`, 'info', 1500);
  },
};

/* =========================================
   10. QUICK ADD (inline)
   ========================================= */
const QuickAdd = {

  open(colId) {
    QuickAdd.close();
    Pipeline.ui.quickAddCol = colId;

    const cardsEl = Utils.$(`.kanban-column[data-col-id="${colId}"] .kanban-cards`);
    if (!cardsEl) return;

    const form = Utils.html(`
      <div class="kanban-quick-add" id="quick-add-form">
        <textarea class="quick-add-input" id="qa-title"
          placeholder="Título do negócio..." rows="2"></textarea>
        <div class="quick-add-footer">
          <button class="btn-primary" id="qa-submit">
            <i class="fa-solid fa-plus"></i> Adicionar
          </button>
          <button class="btn-ghost" id="qa-cancel">Cancelar</button>
        </div>
      </div>
    `);

    cardsEl.insertBefore(form, cardsEl.firstChild);

    const titleEl = Utils.$('#qa-title', form);
    titleEl?.focus();

    Utils.$('#qa-submit', form)?.addEventListener('click', () => QuickAdd.submit(colId));
    Utils.$('#qa-cancel', form)?.addEventListener('click', QuickAdd.close);

    titleEl?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); QuickAdd.submit(colId); }
      if (e.key === 'Escape') QuickAdd.close();
    });
  },

  submit(colId) {
    const title = Utils.$('#qa-title')?.value.trim();
    if (!title) { Utils.toast('Digite o título', 'warning'); return; }

    const today = new Date().toISOString().slice(0,10);
    const card  = {
      id: uid(), column: colId, title, company: '—',
      value: 0, prob: 30, priority: 'medium',
      owner: { name: 'Ana Souza', initials: 'AS', color: 'linear-gradient(135deg,#7C3AED,#00E5FF)' },
      dueDate: null, dueSt: 'normal', tag: 'tag-inbound', tagLabel: 'Inbound',
      activities: {}, labels: [], note: null, nextAction: null,
      createdAt: today, updatedAt: today,
    };

    Pipeline.cards.push(card);
    History.push({ type: 'create', cardId: card.id, card: { ...card } });
    QuickAdd.close();
    KanbanBoard.renderAll();
    KanbanBoard.flashCard(card.id, 'just-created');
    Utils.toast('Card criado. Clique para editar detalhes.', 'success');
  },

  close() {
    Utils.$('#quick-add-form')?.remove();
    Pipeline.ui.quickAddCol = null;
  },
};

/* =========================================
   11. RENDERIZADOR DO BOARD
   ========================================= */
const KanbanBoard = {

  /** Renderiza o board completo no container #kanban-board */
  render() {
    const container = Utils.$('#kanban-board');
    if (!container) return;

    container.innerHTML = '';

    Pipeline.columns.forEach(col => {
      const colEl = KanbanBoard._renderColumn(col);
      container.appendChild(colEl);
    });

    /* Botão de nova coluna */
    const addCol = Utils.html(`
      <div class="kanban-column-add" id="btn-add-column"
           title="Adicionar estágio"
           onclick="KanbanBoard.promptAddColumn()">
        <i class="fa-solid fa-plus"></i>
        <span class="add-label">Novo Estágio</span>
      </div>
    `);
    container.appendChild(addCol);

    KanbanBoard.updateSummaryBar();
  },

  /** Renderiza coluna individual */
  _renderColumn(col) {
    const cards   = Pipeline.getColCards(col.id);
    const rawCards = Pipeline.getColCards(col.id, false);
    const value   = Pipeline.colValue(col.id);
    const weighted = Pipeline.colWeighted(col.id);
    const isCollapsed = Pipeline.ui.collapsedCols.has(col.id);
    const isWon  = col.id === 'won';
    const isLost = col.id === 'lost';

    const colEl = Utils.html(`
      <div class="kanban-column ${col.stage} ${isCollapsed ? 'collapsed' : ''}"
           data-col-id="${col.id}">

        <div class="kanban-col-header">
          <div class="kanban-col-top">
            <span class="col-dot"></span>
            <span class="col-title">${col.title}</span>
            <span class="col-count">${cards.length}${rawCards.length !== cards.length ? `/${rawCards.length}` : ''}</span>
            <button class="col-menu" data-col-menu="${col.id}" title="Opções">
              <i class="fa-solid fa-ellipsis"></i>
            </button>
          </div>
          <span class="col-collapsed-label">${col.title}</span>

          ${!isWon && !isLost ? `
            <div class="kanban-col-stats">
              <div class="col-stat">
                <span class="col-stat-label">Total</span>
                <span class="col-stat-value value-green">${Utils.currency(value, true)}</span>
              </div>
              <div class="col-stat">
                <span class="col-stat-label">Ponderado</span>
                <span class="col-stat-value value-cyan">${Utils.currency(weighted, true)}</span>
              </div>
            </div>
            ${col.convRate != null ? `
              <div class="col-conversion">
                <div class="col-conversion-label">
                  <span class="col-conversion-text">Conv. do estágio</span>
                  <span class="col-conversion-pct">${col.convRate}%</span>
                </div>
                <div class="col-conversion-track">
                  <div class="col-conversion-fill" style="width:${col.convRate}%;"></div>
                </div>
              </div>
            ` : ''}
          ` : `
            <div class="kanban-col-stats">
              <div class="col-stat">
                <span class="col-stat-label">${isWon ? 'Receita Gerada' : 'Valor Perdido'}</span>
                <span class="col-stat-value ${isWon ? 'value-green' : ''}" style="${isLost ? 'color:var(--danger)' : ''}">
                  ${Utils.currency(value, true)}
                </span>
              </div>
              <div class="col-stat">
                <span class="col-stat-label">Negócios</span>
                <span class="col-stat-value">${rawCards.length}</span>
              </div>
            </div>
          `}
        </div>

        <div class="kanban-cards" data-col-cards="${col.id}">
          ${cards.length === 0 ? `
            <div class="drop-hint">Arraste um card aqui</div>
          ` : cards.map(card => KanbanBoard._renderCard(card)).join('')}
        </div>

        <div class="kanban-col-footer">
          <button class="btn-add-card" data-add-card="${col.id}">
            <i class="fa-solid fa-plus"></i> Adicionar negócio
          </button>
        </div>

      </div>
    `);

    /* Bind drag-over na área de cards */
    const cardsEl = Utils.$(`.kanban-cards`, colEl);
    cardsEl.addEventListener('dragover', e => e.preventDefault());

    /* Bind botão adicionar */
    Utils.$(`[data-add-card]`, colEl)?.addEventListener('click', () => {
      QuickAdd.open(col.id);
    });

    /* Bind menu da coluna */
    Utils.$(`[data-col-menu]`, colEl)?.addEventListener('click', (e) => {
      e.stopPropagation();
      KanbanBoard._columnMenu(e, col.id);
    });

    /* Collapse ao clicar no header quando collapsed */
    if (isCollapsed) {
      Utils.$('.kanban-col-header', colEl)?.addEventListener('click', () => {
        Pipeline.ui.collapsedCols.delete(col.id);
        KanbanBoard.renderAll();
      });
    }

    return colEl;
  },

  /** Renderiza card individual */
  _renderCard(card) {
    const probClass = card.prob >= 70 ? 'high' : card.prob >= 40 ? 'med' : 'low';
    const isExpanded = Pipeline.ui.expandedCards.has(card.id);
    const isSelected = Pipeline.ui.selectedCards.has(card.id);

    const actIcons = Object.entries(card.activities).map(([type, count]) => {
      const icons = { call:'fa-phone', email:'fa-envelope', note:'fa-note-sticky', task:'fa-list-check', meeting:'fa-calendar-days' };
      const classes = { call:'has-call', email:'has-email', note:'has-note', task:'has-task', meeting:'has-call' };
      return `
        <div class="kcard-act-icon ${classes[type] || 'has-note'}" title="${count} ${type}">
          <i class="fa-solid ${icons[type] || 'fa-bolt'}"></i>
          ${count > 1 ? `<span class="act-count">${count}</span>` : ''}
        </div>
      `;
    }).join('');

    const labels = (card.labels || []).map(l => `
      <span class="kcard-label" style="background:${l.color}18;color:${l.color};">${l.text}</span>
    `).join('');

    return `
      <div class="kanban-card priority-${card.priority} ${isExpanded ? 'expanded' : ''} ${isSelected ? 'ring-selected' : ''}"
           data-card-id="${card.id}"
           style="${isSelected ? 'box-shadow:0 0 0 2px var(--primary),0 0 12px rgba(0,229,255,.2);' : ''}">

        <div class="kcard-topbar">
          <span class="kcard-tag ${card.tag}">${card.tagLabel}</span>
          <div class="kcard-actions">
            <button class="kcard-btn" data-open-drawer="${card.id}" title="Ver detalhes">
              <i class="fa-solid fa-sidebar-flip"></i>
            </button>
            <button class="kcard-btn" data-edit-card="${card.id}" title="Editar">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="kcard-btn" data-expand-card="${card.id}" title="${isExpanded ? 'Recolher' : 'Expandir'}">
              <i class="fa-solid fa-chevron-${isExpanded ? 'up' : 'down'}"></i>
            </button>
          </div>
        </div>

        <div class="kcard-title">${card.title}</div>
        <div class="kcard-company">
          <i class="fa-solid fa-building"></i>${card.company}
        </div>

        <div class="kcard-metrics" style="display:flex; justify-content:space-between; align-items:flex-end;">
          <div>
            <span class="kcard-value">${Utils.currency(card.value, true)}</span>
            <span class="kcard-prob ${probClass}">${card.prob}%</span>
          </div>
          
          ${card.aiData ? `
            <div title="${card.aiData.riscoLabel}" style="
              background: var(--bg-overlay);
              border: 1px solid ${card.aiData.nivelRisco === 'alto' ? 'var(--danger)' : card.aiData.nivelRisco === 'medio' ? 'var(--warning)' : 'var(--success)'};
              padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700; font-family: var(--font-mono);
              color: var(--text-primary); cursor: help;
            ">
              Score: ${card.aiData.scoreCalculado} ${card.aiData.nivelRisco === 'alto' ? '❌' : card.aiData.nivelRisco === 'medio' ? '⚠️' : '🔥'}
            </div>
          ` : ''}
        </div>

        <div class="kcard-prob-bar" style="margin-top: 8px;">
          <div class="kcard-prob-fill ${probClass}" style="width:${card.prob}%;"></div>
        </div>

        <div class="kcard-footer">
          <div class="kcard-owner">
            <div class="kcard-avatar" style="background:${card.owner.color};">${card.owner.initials}</div>
            <span class="kcard-owner-name">${card.owner.name.split(' ')[0]}</span>
          </div>
          <div class="kcard-right-meta">
            ${actIcons}
            ${card.dueDate ? `
              <span class="kcard-due ${card.dueSt}">
                <i class="fa-solid fa-clock"></i>${card.dueDate}
              </span>
            ` : ''}
          </div>
        </div>

        ${labels ? `<div class="kcard-labels">${labels}</div>` : ''}

        ${isExpanded ? `
          <div class="kcard-detail-body" style="display:flex;">
            ${card.nextAction ? `
              <div class="kcard-next-action">
                <i class="fa-solid fa-circle-arrow-right"></i>
                <span>${card.nextAction}</span>
              </div>
            ` : ''}
            ${card.note ? `<div class="kcard-note">${card.note}</div>` : ''}
            <div class="kcard-detail-row">
              <span class="kcard-detail-key">Ponderado</span>
              <span class="kcard-detail-val" style="color:var(--success);font-family:var(--font-mono);font-weight:700;">
                ${Utils.currency(card.value * card.prob / 100, true)}
              </span>
            </div>
            <div class="kcard-detail-row">
              <span class="kcard-detail-key">Criado</span>
              <span class="kcard-detail-val">${card.createdAt}</span>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  /** Re-renderiza tudo (diff parcial por coluna) */
  renderAll() {
    Pipeline.columns.forEach(col => {
      const colEl   = Utils.$(`.kanban-column[data-col-id="${col.id}"]`);
      if (!colEl) { KanbanBoard.render(); return; }

      const cardsEl = Utils.$('.kanban-cards', colEl);
      const cards   = Pipeline.getColCards(col.id);
      const raw     = Pipeline.getColCards(col.id, false);

      if (!cardsEl) return;

      /* Re-renderiza cards */
      cardsEl.innerHTML = cards.length === 0
        ? `<div class="drop-hint">Arraste um card aqui</div>`
        : cards.map(c => KanbanBoard._renderCard(c)).join('');

      /* Atualiza cabeçalho (contagens e valores) */
      const countEl = Utils.$('.col-count', colEl);
      if (countEl) countEl.textContent = `${cards.length}${raw.length !== cards.length ? `/${raw.length}` : ''}`;

      const stats = Utils.$$('.col-stat-value', colEl);
      if (stats[0]) stats[0].textContent = Utils.currency(Pipeline.colValue(col.id), true);
      if (stats[1]) stats[1].textContent = Utils.currency(Pipeline.colWeighted(col.id), true);

      /* Re-bind eventos */
      KanbanBoard._bindColumnEvents(colEl, col);
    });

    KanbanBoard.updateSummaryBar();
    KanbanBoard._bindAllCardEvents();
  },

  /** Bind de eventos nos cards do board */
  _bindAllCardEvents() {
    Utils.$$('[data-card-id]').forEach(cardEl => {
      const cardId = cardEl.dataset.cardId;

      /* Drag start */
      cardEl.addEventListener('mousedown', (e) => {
        if (e.target.closest('button')) return;
        DragDrop.start(e, cardId);
      });

      /* Double click → drawer */
      cardEl.addEventListener('dblclick', () => DrawerModule.open(cardId));

      /* Right click → context menu */
      cardEl.addEventListener('contextmenu', (e) => CardActions.showContextMenu(e, cardId));
    });

    /* Botões dentro dos cards */
    Utils.$$('[data-open-drawer]').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); DrawerModule.open(btn.dataset.openDrawer); });
    });
    Utils.$$('[data-edit-card]').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); CardForm.open(btn.dataset.editCard); });
    });
    Utils.$$('[data-expand-card]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.expandCard;
        if (Pipeline.ui.expandedCards.has(id)) Pipeline.ui.expandedCards.delete(id);
        else Pipeline.ui.expandedCards.add(id);
        KanbanBoard.renderAll();
      });
    });
  },

  /** Bind de eventos na coluna */
  _bindColumnEvents(colEl, col) {
    Utils.$(`[data-add-card]`, colEl)?.addEventListener('click', () => QuickAdd.open(col.id));
    Utils.$(`[data-col-menu]`, colEl)?.addEventListener('click', (e) => {
      e.stopPropagation();
      KanbanBoard._columnMenu(e, col.id);
    });
  },

  /** Menu de coluna */
  _columnMenu(e, colId) {
    const col       = Pipeline.getCol(colId);
    const collapsed = Pipeline.ui.collapsedCols.has(colId);
    ContextMenu.open(e, `
      <div class="ctx-item" data-action="addCard">
        <i class="fa-solid fa-plus"></i> Adicionar Card
      </div>
      <div class="ctx-item" data-action="collapse">
        <i class="fa-solid fa-compress"></i> ${collapsed ? 'Expandir' : 'Recolher'} Coluna
      </div>
      <div class="ctx-sep"></div>
      <div class="ctx-item" data-action="sortVal">
        <i class="fa-solid fa-sort-amount-down"></i> Ordenar por Valor
      </div>
      <div class="ctx-item" data-action="sortProb">
        <i class="fa-solid fa-percent"></i> Ordenar por Probabilidade
      </div>
      <div class="ctx-sep"></div>
      <div class="ctx-item ctx-danger" data-action="clearCol">
        <i class="fa-solid fa-broom"></i> Limpar Coluna
      </div>
    `, (action) => {
      if (action === 'addCard')  { QuickAdd.open(colId); }
      if (action === 'collapse') {
        if (collapsed) Pipeline.ui.collapsedCols.delete(colId);
        else           Pipeline.ui.collapsedCols.add(colId);
        KanbanBoard.render();
        KanbanBoard._bindAllCardEvents();
      }
      if (action === 'sortVal')  { FilterModule.setSort('value'); }
      if (action === 'sortProb') { FilterModule.setSort('prob'); }
      if (action === 'clearCol') {
        const cards = Pipeline.getColCards(colId, false);
        if (!cards.length) return;
        cards.forEach(c => { c.column = 'lost'; });
        KanbanBoard.renderAll();
        Utils.toast(`${cards.length} card(s) movidos para Perdido`, 'warning');
      }
    });
  },

  /** Atualiza a barra de resumo do pipeline */
  updateSummaryBar() {
    const total   = Pipeline.totalPipelineValue();
    const activeC = Pipeline.cards.filter(c => !['won','lost'].includes(c.column)).length;
    const wonVal  = Pipeline.colValue('won');
    const wonCnt  = Pipeline.getColCards('won', false).length;

    const el = Utils.$('#pipeline-summary');
    if (el) {
      el.innerHTML = `
        <i class="fa-solid fa-chart-waterfall" style="color:var(--primary);font-size:12px;"></i>
        <strong>${Utils.currency(total, true)}</strong> em pipeline
        <span class="pipe-sep"></span>
        <span class="pipe-count">${activeC} negócios ativos</span>
        <span class="pipe-sep"></span>
        <span style="color:var(--success);">✓ ${Utils.currency(wonVal, true)} ganhos (${wonCnt})</span>
      `;
    }
  },

  /** Adiciona classe temporária de flash num card */
  flashCard(cardId, cls, duration = 1200) {
    setTimeout(() => {
      const el = Utils.$(`[data-card-id="${cardId}"]`);
      if (!el) return;
      el.classList.add(cls);
      setTimeout(() => el.classList.remove(cls), duration);
    }, 80);
  },

  /** Efeito de confetti ao ganhar negócio */
  _confetti(cardId) {
    const cardEl = Utils.$(`[data-card-id="${cardId}"]`);
    const rect   = cardEl?.getBoundingClientRect() || { left: window.innerWidth/2, top: window.innerHeight/2, width:0, height:0 };
    const cx     = rect.left + rect.width / 2;
    const cy     = rect.top  + rect.height / 2;
    const colors = ['#00E5FF','#10FFAB','#FFB400','#A78BFA','#FF3B6B','#ffffff'];

    for (let i = 0; i < 48; i++) {
      const dot = document.createElement('div');
      Object.assign(dot.style, {
        position: 'fixed',
        left:     `${cx}px`,
        top:      `${cy}px`,
        width:    `${4 + Math.random() * 5}px`,
        height:   `${4 + Math.random() * 5}px`,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        background:   colors[Math.floor(Math.random() * colors.length)],
        pointerEvents: 'none',
        zIndex:   '9999',
        transition: `all ${0.7 + Math.random() * 0.6}s cubic-bezier(0,${0.5 + Math.random()},1,1)`,
        opacity:  '1',
      });
      document.body.appendChild(dot);

      const angle = (Math.PI * 2 * i) / 48;
      const dist  = 80 + Math.random() * 120;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dot.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist + 40}px) rotate(${Math.random()*360}deg)`;
          dot.style.opacity   = '0';
        });
      });

      setTimeout(() => dot.remove(), 1400);
    }
  },

  /** Solicita nome para nova coluna */
  promptAddColumn() {
    ModalModule.open({
      title: 'Novo Estágio',
      body: `
        <div class="form-group">
          <label class="form-label">Nome do Estágio</label>
          <input id="new-col-name" class="form-control" type="text"
            placeholder="ex: Due Diligence, Onboarding...">
        </div>
        <div class="form-group">
          <label class="form-label">Cor</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;" id="col-color-picker">
            ${['#A78BFA','#4E9FFF','#FFB400','#10FFAB','#FF3B6B','#FF8C00','#EC4899','#00E5FF']
              .map(c => `<div data-color="${c}" style="
                width:28px;height:28px;border-radius:50%;background:${c};cursor:pointer;
                box-shadow:0 0 0 2px transparent;transition:all .15s;
              " onclick="this.parentElement.querySelectorAll('[data-color]').forEach(x=>x.style.boxShadow='0 0 0 2px transparent');
                         this.style.boxShadow='0 0 0 3px var(--bg-raised),0 0 0 5px ${c}';
                         document.getElementById('new-col-name').dataset.color='${c}';">
              </div>`).join('')}
          </div>
        </div>
      `,
      footer: `
        <button class="btn-secondary" onclick="ModalModule.close()">Cancelar</button>
        <button class="btn-primary" id="btn-create-col">
          <i class="fa-solid fa-plus"></i> Criar Estágio
        </button>
      `,
    });

    setTimeout(() => {
      Utils.$('#new-col-name')?.focus();
      Utils.$('#btn-create-col')?.addEventListener('click', () => {
        const name  = Utils.$('#new-col-name')?.value.trim();
        const color = Utils.$('#new-col-name')?.dataset.color || '#4E9FFF';
        if (!name) { Utils.toast('Digite um nome', 'warning'); return; }

        const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        if (Pipeline.columns.find(c => c.id === id)) {
          Utils.toast('Já existe um estágio com esse nome', 'error'); return;
        }

        Pipeline.columns.push({ id, title: name, stage: `stage-${id}`, dot: color, convRate: null, limit: null });
        ModalModule.close();
        KanbanBoard.render();
        KanbanBoard._bindAllCardEvents();
        Utils.toast(`Estágio "${name}" criado`, 'success');
      });
    }, 80);
  },
};

/* =========================================
   12. SELEÇÃO MÚLTIPLA
   ========================================= */
const MultiSelect = {

  toggle(cardId) {
    if (Pipeline.ui.selectedCards.has(cardId)) Pipeline.ui.selectedCards.delete(cardId);
    else Pipeline.ui.selectedCards.add(cardId);
    MultiSelect._updateBar();
    KanbanBoard.renderAll();
  },

  clear() {
    Pipeline.ui.selectedCards.clear();
    MultiSelect._updateBar();
    KanbanBoard.renderAll();
  },

  moveAll(toColId) {
    Pipeline.ui.selectedCards.forEach(id => {
      const card = Pipeline.getCard(id);
      if (card) { card.column = toColId; card.updatedAt = new Date().toISOString().slice(0,10); }
    });
    const count = Pipeline.ui.selectedCards.size;
    const col   = Pipeline.getCol(toColId);
    MultiSelect.clear();
    Utils.toast(`${count} negócios movidos para "${col?.title}"`, 'success');
  },

  deleteAll() {
    const ids = [...Pipeline.ui.selectedCards];
    ids.forEach(id => { Pipeline.cards = Pipeline.cards.filter(c => c.id !== id); });
    MultiSelect.clear();
    Utils.toast(`${ids.length} negócios excluídos`, 'warning');
  },

  _updateBar() {
    const bar   = Utils.$('#multiselect-bar');
    const count = Pipeline.ui.selectedCards.size;
    if (!bar) return;
    bar.style.display = count > 0 ? 'flex' : 'none';
    const label = Utils.$('#ms-count', bar);
    if (label) label.textContent = `${count} selecionado(s)`;
  },
};

/* =========================================
   13. ATALHOS DE TECLADO DO KANBAN
   ========================================= */
const KanbanKeys = {

  init() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      /* Ctrl+Z / Ctrl+Y */
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault(); History.undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault(); History.redo();
      }

      /* N — novo card */
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey) {
        CardForm.open(null, Pipeline.columns[0].id);
      }

      /* Escape */
      if (e.key === 'Escape') {
        QuickAdd.close();
        MultiSelect.clear();
        DrawerModule.close();
      }

      /* Delete / Backspace — excluir selecionados */
      if ((e.key === 'Delete' || e.key === 'Backspace') && Pipeline.ui.selectedCards.size > 0) {
        e.preventDefault();
        MultiSelect.deleteAll();
      }
    });
  },
};

/* =========================================
   14. BUSCA NO BOARD
   ========================================= */
const BoardSearch = {

  init() {
    const input = Utils.$('#board-search');
    if (!input) return;
    input.addEventListener('input', Utils.debounce((e) => {
      FilterModule.setSearch(e.target.value);
    }, 200));
  },
};

/* =========================================
   15. ORQUESTRADOR PRINCIPAL — KANBAN
   ========================================= */
const Kanban = {

  init() {
    console.log('%c KANBAN.JS ', 'background:#10FFAB;color:#000;font-weight:700;padding:4px 8px;border-radius:4px;');

    /* 🧠 INTEGRAÇÃO COM IA: Processa todos os cards no Motor Preditivo antes de renderizar */
    if (typeof AIDataModel !== 'undefined' && typeof PredictiveEngine !== 'undefined') {
      Pipeline.cards.forEach(card => {
        // 1. Adapta o formato do Kanban para o formato que a IA entende
        const rawDealForAI = {
            id: card.id,
            cliente: card.company,
            valor: card.value,
            estagio: Pipeline.getCol(card.column)?.title || card.column, 
            dataCriacao: card.createdAt,
            ultimaAtualizacao: card.updatedAt,
            vendedor: card.owner.name,
            interacoes: Object.values(card.activities || {}).reduce((a,b)=>a+b, 0)
        };
        // 2. Calcula Score, Risco e Sugestões
        const aiReadyDeal = AIDataModel.prepareDealForAI(rawDealForAI);
        const analyzedDeal = PredictiveEngine.analyzeDeal(aiReadyDeal);
        
        // 3. Salva os insights de volta no card do Kanban
        card.aiData = analyzedDeal.aiData;
      });
      console.log('🧠 Motor Preditivo ativado com sucesso!');
    }

    /* Renderiza board */
    KanbanBoard.render();
    KanbanBoard._bindAllCardEvents();

    /* Inicializa módulos */
    FilterModule.init();
    BoardSearch.init();
    KanbanKeys.init();

    /* Botões da toolbar */
    Utils.$('#btn-new-deal-kanban')?.addEventListener('click', () => CardForm.open(null, 'lead'));
    Utils.$('#btn-undo')?.addEventListener('click', () => History.undo());
    Utils.$('#btn-redo')?.addEventListener('click', () => History.redo());

    /* Sort dropdown */
    Utils.$('#btn-sort')?.addEventListener('click', (e) => {
      e.stopPropagation();
      ContextMenu.open(e, `
        <div class="ctx-item" data-action="updatedAt"><i class="fa-solid fa-clock"></i> Mais recentes</div>
        <div class="ctx-item" data-action="value">     <i class="fa-solid fa-sack-dollar"></i> Maior valor</div>
        <div class="ctx-item" data-action="prob">      <i class="fa-solid fa-percent"></i> Maior probabilidade</div>
        <div class="ctx-item" data-action="priority">  <i class="fa-solid fa-flag"></i> Prioridade</div>
      `, (action) => FilterModule.setSort(action));
    });

    /* Multi-select bar */
    Utils.$('#ms-move')?.addEventListener('click', (e) => {
      e.stopPropagation();
      ContextMenu.open(e, Pipeline.columns.map(c => `
        <div class="ctx-item" data-action="moveTo" data-col="${c.id}">
          <span style="width:7px;height:7px;border-radius:50%;background:${c.dot};display:inline-block;"></span>
          ${c.title}
        </div>
      `).join(''), (action, col) => {
        if (action === 'moveTo') MultiSelect.moveAll(col);
      });
    });

    Utils.$('#ms-delete')?.addEventListener('click', () => MultiSelect.deleteAll());
    Utils.$('#ms-clear')?.addEventListener('click',  () => MultiSelect.clear());

    /* Ctrl+click para multi-select */
    document.addEventListener('click', (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      const cardEl = e.target.closest('[data-card-id]');
      if (cardEl) { e.preventDefault(); MultiSelect.toggle(cardEl.dataset.cardId); }
    });

    /* Resize */
    window.addEventListener('resize', Utils.debounce(() => KanbanBoard.render(), 300));

    History._updateButtons();
    Utils.toast('Pipeline carregado', 'success', 2000);
  },
};

/* =========================================
   16. EXPOSIÇÃO GLOBAL E BOOT
   ========================================= */
window.Pipeline      = Pipeline;
window.KanbanBoard   = KanbanBoard;
window.CardForm      = CardForm;
window.CardActions   = CardActions;
window.DrawerModule  = DrawerModule;
window.FilterModule  = FilterModule;
window.QuickAdd      = QuickAdd;
window.MultiSelect   = MultiSelect;
window.History       = History;
window.DragDrop      = DragDrop;
window.Kanban        = Kanban;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Kanban.init());
} else {
  Kanban.init();
}