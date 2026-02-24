/* =====================================================
   DASHBOARD.JS — CRM Pro · Mission Control (PREPARADO PARA IA)
   Módulo principal do painel de controle
   Deps: style.css, kanban.css — sem frameworks externos
   ===================================================== */

'use strict';

/* =========================================
   1. ESTADO GLOBAL DA APLICAÇÃO
   ========================================= */
const CRM = {
    version: '2.5.0-AI', // Atualizado para a versão com Inteligência

    /* --- dados simulados em memória --- */
    state: {
        period: 'month', // week | month | quarter | year
        activeSection: 'dashboard',
        notifications: [],
        filters: {},
        theme: 'dark',
        sidebarOpen: true,
        charts: {}, // instâncias de controle
        tickerRunning: false,
        tickerInterval: null,
        refreshInterval: null,
    },

    /* --- métricas atuais (Mantidas para os gráficos base) --- */
    metrics: {
        month: {
            revenue: 847250,
            revenueTarget: 1000000,
            revenueGrowth: +18.4,
            newDeals: 134,
            dealsGrowth: +7.2,
            wonDeals: 48,
            lostDeals: 19,
            winRate: 71.6,
            winRateDelta: +3.1,
            avgTicket: 17651,
            ticketDelta: +2100,
            cycleTime: 24, // dias
            cycleDelta: -3,
            nps: 74,
            npsDelta: +5,
            activities: 623,
            activitiesDelta: +89,
            calls: 211,
            emails: 318,
            meetings: 94,
        },
        week: {
            revenue: 198740,
            revenueTarget: 250000,
            revenueGrowth: +11.2,
            newDeals: 31,
            dealsGrowth: +4.5,
            wonDeals: 11,
            lostDeals: 4,
            winRate: 73.3,
            winRateDelta: +1.2,
            avgTicket: 18067,
            ticketDelta: +500,
            cycleTime: 22,
            cycleDelta: -1,
            nps: 76,
            npsDelta: +2,
            activities: 148,
            activitiesDelta: +21,
            calls: 51,
            emails: 74,
            meetings: 23,
        },
        quarter: {
            revenue: 2312800,
            revenueTarget: 3000000,
            revenueGrowth: +22.1,
            newDeals: 387,
            dealsGrowth: +15.0,
            wonDeals: 142,
            lostDeals: 53,
            winRate: 72.8,
            winRateDelta: +4.0,
            avgTicket: 16286,
            ticketDelta: +1800,
            cycleTime: 26,
            cycleDelta: -5,
            nps: 71,
            npsDelta: +8,
            activities: 1847,
            activitiesDelta: +312,
            calls: 628,
            emails: 942,
            meetings: 277,
        },
        year: {
            revenue: 8941600,
            revenueTarget: 12000000,
            revenueGrowth: +31.7,
            newDeals: 1429,
            dealsGrowth: +28.3,
            wonDeals: 529,
            lostDeals: 198,
            winRate: 72.8,
            winRateDelta: +6.5,
            avgTicket: 16902,
            ticketDelta: +3200,
            cycleTime: 23,
            cycleDelta: -8,
            nps: 73,
            npsDelta: +11,
            activities: 7234,
            activitiesDelta: +1421,
            calls: 2461,
            emails: 3687,
            meetings: 1086,
        },
    },

    /* --- série temporal do gráfico de receita --- */
    revenueSeries: {
        month: {
            labels: ['01', '04', '07', '10', '13', '16', '19', '22', '25', '28', '31'],
            actual: [24200, 38900, 47800, 52100, 61400, 69800, 74300, 82100, 89600, 96200, 110850],
            target: [32258, 64516, 96774, 129032, 161290, 193548, 225806, 258064, 290322, 322580, 354838],
            prev: [19400, 31200, 41500, 45200, 53100, 60700, 64800, 71600, 76900, 81400, 93640],
        },
        week: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            actual: [28400, 41200, 36800, 52100, 40200, 0, 0],
            target: [35714, 71428, 107142, 142856, 178570, 214284, 249998],
            prev: [24800, 36100, 32600, 44900, 35200, 0, 0],
        },
        quarter: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
            actual: [218400, 287600, 312800, 389100, 421700, 411300, 271900, 0, 0],
            target: [333333, 666666, 999999, 1333332, 1666665, 1999998, 2333331, 2666664, 2999997],
            prev: [181200, 234100, 258400, 319800, 345200, 338200, 0, 0, 0],
        },
        year: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            actual: [580200, 748100, 882400, 1204300, 1387100, 1492900, 1294700, 0, 0, 0, 0, 0],
            target: [1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000, 10000000, 11000000, 12000000],
            prev: [441800, 570300, 672100, 918200, 1056200, 1138100, 985600, 0, 0, 0, 0, 0],
        },
    },

    /* --- funil de vendas --- */
    funnelData: {
        month: [
            { stage: 'Leads', count: 412, value: 7234500, conv: 100 },
            { stage: 'Qualificados', count: 241, value: 4138200, conv: 58.5 },
            { stage: 'Proposta', count: 147, value: 2489100, conv: 35.7 },
            { stage: 'Negociação', count: 89, value: 1521800, conv: 21.6 },
            { stage: 'Fechamento', count: 48, value: 847250, conv: 11.7 },
        ],
        week: [
            { stage: 'Leads', count: 97, value: 1702000, conv: 100 },
            { stage: 'Qualificados', count: 59, value: 1038000, conv: 60.8 },
            { stage: 'Proposta', count: 37, value: 648400, conv: 38.1 },
            { stage: 'Negociação', count: 21, value: 369200, conv: 21.6 },
            { stage: 'Fechamento', count: 11, value: 198740, conv: 11.3 },
        ],
    },

    /* --- top vendedores --- */
    salesReps: [
        { name: 'Ana Souza', initials: 'AS', color: 'linear-gradient(135deg,#7C3AED,#00E5FF)', deals: 18, revenue: 312400, quota: 94 },
        { name: 'Carlos Neto', initials: 'CN', color: 'linear-gradient(135deg,#10B981,#10FFAB)', deals: 15, revenue: 248600, quota: 87 },
        { name: 'Beatriz Lima', initials: 'BL', color: 'linear-gradient(135deg,#F59E0B,#EF4444)', deals: 12, revenue: 194100, quota: 76 },
        { name: 'Diego Martins', initials: 'DM', color: 'linear-gradient(135deg,#3B82F6,#7C3AED)', deals: 9, revenue: 156800, quota: 68 },
        { name: 'Fernanda Costa', initials: 'FC', color: 'linear-gradient(135deg,#EC4899,#F59E0B)', deals: 7, revenue: 98350, quota: 52 },
    ],

    /* --- atividades recentes --- */
    activityFeed: [
        { type: 'deal_won', user: 'Ana Souza', text: 'fechou negócio com <strong>Grupo Nexus</strong>', value: 84000, time: '2min' },
        { type: 'call', user: 'Carlos Neto', text: 'ligação com <strong>TechBrasil Ltda</strong> — 18min', value: null, time: '11min' },
        { type: 'email', user: 'Beatriz Lima', text: 'proposta enviada para <strong>Solve Digital</strong>', value: 36400, time: '24min' },
        { type: 'meeting', user: 'Diego Martins', text: 'reunião agendada com <strong>Inova S.A.</strong>', value: null, time: '38min' },
        { type: 'deal_lost', user: 'Fernanda Costa', text: '<strong>Vertex Corp</strong> escolheu concorrente', value: 21200, time: '52min' },
    ],

    /* --- notificações --- */
    notificationList: [
        { id: 1, type: 'alert', text: '3 negócios com prazo hoje', read: false, time: '5min' },
        { id: 2, type: 'success', text: 'Meta semanal atingida — 79% concluído', read: false, time: '38min' },
        { id: 3, type: 'info', text: 'Novo lead: Orbital Systems — R$ 120.000', read: false, time: '1h' },
    ],
};

/* =========================================
   2. UTILITÁRIOS
   ========================================= */
const Utils = {
    currency(value, compact = false) {
        if (compact) {
            if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}k`;
        }
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(value);
    },
    number(value) { return new Intl.NumberFormat('pt-BR').format(value); },
    pct(value, decimals = 1) { return `${value.toFixed(decimals)}%`; },
    delta(value, isPercent = false) { return (value >= 0 ? '+' : '') + (isPercent ? `${value.toFixed(1)}%` : value); },
    html(str) {
        const t = document.createElement('template');
        t.innerHTML = str.trim();
        return t.content.firstElementChild;
    },
    $(sel, ctx = document) { return ctx.querySelector(sel); },
    $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; },
    debounce(fn, ms = 200) {
        let t;
        return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
    },
    clamp(val, min, max) { return Math.min(Math.max(val, min), max); },
    animateCounter(el, from, to, duration = 800, format = null) {
        const start = performance.now();
        const range = to - from;
        const step = (now) => {
            const elapsed = now - start;
            const progress = Utils.clamp(elapsed / duration, 0, 1);
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = from + range * eased;
            el.textContent = format ? format(current) : Math.round(current).toLocaleString('pt-BR');
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    },
    toast(msg, type = 'info', duration = 3500) {
        const icons = { info: 'fa-circle-info', success: 'fa-circle-check', warning: 'fa-triangle-exclamation', error: 'fa-circle-xmark' };
        let container = Utils.$('#toast-container');
        if (!container) {
            container = Utils.html('<div id="toast-container" style="position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;gap:8px;z-index:9999;"></div>');
            document.body.appendChild(container);
        }
        const colorClass = type === 'success' ? 'success' : type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'primary';
        const toast = Utils.html(`
            <div class="crm-toast animate-up" style="display:flex;align-items:center;gap:10px;background:var(--bg-overlay);border:1px solid var(--border-strong);border-left:3px solid var(--${colorClass});border-radius:var(--radius-md);padding:11px 16px;color:var(--text-primary);font-size:13px;box-shadow:var(--shadow-lg);min-width:260px;cursor:pointer;">
                <i class="fa-solid ${icons[type]}" style="color:var(--${colorClass});font-size:14px;"></i>
                <span>${msg}</span>
            </div>
        `);
        toast.onclick = () => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); };
        container.appendChild(toast);
        setTimeout(() => { if (toast.parentNode) { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); } }, duration);
    }
};

/* =========================================
   3. MÓDULO DE GRÁFICOS (Canvas API)
   ========================================= */
const Charts = {
    colors: { primary: '#00E5FF', accent: '#7C3AED', success: '#10FFAB', danger: '#FF3B6B', warning: '#FFB400', grid: 'rgba(255,255,255,0.04)', text: '#8892b0' },

    drawRevenueChart(canvasId, period) {
        const canvas = Utils.$(canvasId);
        if (!canvas) return;
        const series = CRM.revenueSeries[period] || CRM.revenueSeries.month;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        const W = rect.width; const H = rect.height;
        const PAD = { top: 20, right: 20, bottom: 36, left: 56 };
        const chartW = W - PAD.left - PAD.right; const chartH = H - PAD.top - PAD.bottom;
        ctx.clearRect(0, 0, W, H);
        const allVals = [...series.actual, ...series.target, ...series.prev].filter(v => v > 0);
        const maxVal = Math.max(...allVals) * 1.1;
        const toX = (i) => PAD.left + (i / (series.labels.length - 1)) * chartW;
        const toY = (v) => PAD.top + chartH - (v / maxVal) * chartH;

        // Grid
        ctx.strokeStyle = Charts.colors.grid; ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = PAD.top + (chartH / 4) * i;
            ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(PAD.left + chartW, y); ctx.stroke();
            ctx.fillStyle = Charts.colors.text; ctx.font = "10px JetBrains Mono"; ctx.textAlign = "right";
            ctx.fillText(Utils.currency(maxVal - (maxVal / 4) * i, true), PAD.left - 8, y + 4);
        }

        const drawLine = (data, color, fillAlpha, dashed = false) => {
            const pts = data.map((v, i) => ({ x: toX(i), y: toY(v) }));
            if (dashed) ctx.setLineDash([5, 5]); else ctx.setLineDash([]);
            ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
            pts.forEach(p => ctx.lineTo(p.x, p.y));
            ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
            if (fillAlpha > 0) {
                ctx.lineTo(pts[pts.length - 1].x, PAD.top + chartH); ctx.lineTo(pts[0].x, PAD.top + chartH);
                ctx.fillStyle = color.replace(')', `, ${fillAlpha})`).replace('rgb', 'rgba'); ctx.fill();
            }
        };
        drawLine(series.prev, '#64748b', 0, true);
        drawLine(series.target, '#FFB400', 0, true);
        drawLine(series.actual, Charts.colors.primary, 0.1);
    },

    drawDonut(canvasId, value, color) {
        const canvas = Utils.$(canvasId); if (!canvas) return;
        const ctx = canvas.getContext('2d'); const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; ctx.scale(dpr, dpr);
        const cx = rect.width / 2; const cy = rect.height / 2; const r = (rect.width / 2) - 5;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 6; ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * (value / 100))); ctx.strokeStyle = color; ctx.lineWidth = 6; ctx.stroke();
    },

    drawLeaderboard(canvasId, data) {
        const canvas = Utils.$(canvasId); if (!canvas) return;
        const ctx = canvas.getContext('2d'); const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; ctx.scale(dpr, dpr);
        const maxRev = Math.max(...data.map(d => d.revenue));
        data.forEach((rep, i) => {
            const y = 15 + (i * 40); const barW = (rect.width - 100) * (rep.revenue / maxRev);
            ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.fillRect(80, y, rect.width - 100, 10);
            ctx.fillStyle = Charts.colors.primary; ctx.fillRect(80, y, barW, 10);
            ctx.fillStyle = Charts.colors.text; ctx.font = "11px Space Grotesk"; ctx.textAlign = "right"; ctx.fillText(rep.name.split(' ')[0], 70, y + 9);
        });
    },

    drawSparkline(canvasId, data, color) {
        const canvas = Utils.$(canvasId); if (!canvas) return;
        const ctx = canvas.getContext('2d'); const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; ctx.scale(dpr, dpr);
        const max = Math.max(...data); const min = Math.min(...data); const range = max - min || 1;
        ctx.beginPath(); ctx.moveTo(0, rect.height - ((data[0] - min) / range) * rect.height);
        data.forEach((v, i) => ctx.lineTo((i / (data.length - 1)) * rect.width, rect.height - ((v - min) / range) * rect.height));
        ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
    },

    resizeAll() {
        const p = CRM.state.period;
        this.drawRevenueChart('#chart-revenue', p);
        this.drawDonut('#chart-winrate', CRM.metrics[p].winRate, Charts.colors.primary);
        this.drawLeaderboard('#chart-leaderboard', CRM.salesReps);
        this.drawSparkline('#spark-revenue', CRM.revenueSeries[p].actual.filter(v => v > 0), Charts.colors.primary);
        this.drawSparkline('#spark-deals', [10, 15, 8, 12, 20, 18, 22], Charts.colors.success);
    }
};

/* =========================================
   4. MÓDULOS DE INTERFACE (KPI, FUNNEL, ETC)
   ========================================= */
const KPIModule = {
    render(period) {
        const m = CRM.metrics[period];
        const grid = Utils.$('#kpi-grid'); if (!grid) return;
        const data = [
            { label: 'Revenue', val: Utils.currency(m.revenue, true), delta: m.revenueGrowth, icon: 'fa-sack-dollar', color: 'cyan' },
            { label: 'New Deals', val: m.newDeals, delta: m.dealsGrowth, icon: 'fa-handshake', color: 'green' },
            { label: 'Win Rate', val: Utils.pct(m.winRate), delta: m.winRateDelta, icon: 'fa-bullseye', color: 'purple' },
            { label: 'Avg Ticket', val: Utils.currency(m.avgTicket, true), delta: 5.2, icon: 'fa-tags', color: 'amber' }
        ];
        grid.innerHTML = data.map((k, i) => `
            <div class="kpi-card animate-up stagger-${i + 1}">
                <div class="kpi-header"><span class="kpi-label">${k.label}</span><div class="kpi-icon ${k.color}"><i class="fa-solid ${k.icon}"></i></div></div>
                <div class="kpi-value">${k.val}</div>
                <div class="kpi-delta ${k.delta >= 0 ? 'up' : 'down'}"><i class="fa-solid fa-caret-${k.delta >= 0 ? 'up' : 'down'}"></i> ${Math.abs(k.delta)}%</div>
            </div>
        `).join('');
    }
};

const FunnelModule = {
    render(period) {
        const container = Utils.$('#funnel-container'); if (!container) return;
        const data = CRM.funnelData[period] || CRM.funnelData.month;
        container.innerHTML = `<div class="funnel-bar">` + data.map(f => `
            <div class="funnel-row">
                <span class="funnel-label">${f.stage}</span>
                <div class="funnel-track"><div class="funnel-fill" style="width:${f.conv}%; background:var(--primary);"></div></div>
                <span class="funnel-count">${f.count}</span>
            </div>
        `).join('') + `</div>`;
    }
};

const StatStripModule = {
    render(period) {
        const m = CRM.metrics[period];
        const el = Utils.$('#stat-strip'); if (!el) return;
        el.innerHTML = `
            <div class="stat-strip-item"><span class="stat-strip-label">Projected</span><span class="stat-strip-value text-success">${Utils.currency(m.revenueTarget, true)}</span></div>
            <div class="stat-strip-item"><span class="stat-strip-label">Win Rate</span><span class="stat-strip-value">${Utils.pct(m.winRate)}</span></div>
            <div class="stat-strip-item"><span class="stat-strip-label">NPS</span><span class="stat-strip-value text-accent">${m.nps}</span></div>
        `;
    }
};

const FeedModule = {
    render(containerId) {
        const el = Utils.$(containerId); if (!el) return;
        el.innerHTML = `<div class="timeline">` + CRM.activityFeed.map(f => `
            <div class="timeline-item">
                <div class="timeline-icon ${f.type === 'deal_won' ? 'deal' : 'call'}"><i class="fa-solid ${f.type === 'deal_won' ? 'fa-trophy' : 'fa-phone'}"></i></div>
                <div class="timeline-body"><div class="timeline-header"><span class="timeline-title">${f.user}</span><span class="timeline-time">${f.time}</span></div><div class="timeline-desc">${f.text}</div></div>
            </div>
        `).join('') + `</div>`;
    },
    prepend(containerId, item) {
        const timeline = Utils.$('.timeline', Utils.$(containerId)); if (!timeline) return;
        const node = Utils.html(`<div class="timeline-item animate-up"><div class="timeline-icon deal"><i class="fa-solid fa-bolt"></i></div><div class="timeline-body"><div class="timeline-header"><span>${item.user}</span><span>agora</span></div><div>${item.text}</div></div></div>`);
        timeline.insertBefore(node, timeline.firstChild);
    }
};

const LeaderboardModule = {
    render(containerId) {
        const el = Utils.$(containerId); if (!el) return;
        el.innerHTML = `<canvas id="chart-leaderboard" style="width:100%;height:200px;"></canvas>`;
    }
};

/* =========================================
   🧠 5. MÓDULO DE INTELIGÊNCIA PREDITIVA (BLOCO 5)
   ========================================= */
const IntelligenceModule = {
    render() {
        // Se a base de dados em memória e os motores IA estiverem carregados, processamos os dados reais
        if (typeof window.mockData !== 'undefined' && typeof AIDataModel !== 'undefined' && typeof PredictiveEngine !== 'undefined') {
            
            const oportunidades = window.mockData.oportunidades || [];
            if (oportunidades.length === 0) return;

            // 1. Processa todos os negócios pelo Motor Preditivo
            const analyzedDeals = oportunidades.map(deal => {
                const aiDeal = AIDataModel.prepareDealForAI({
                    ...deal,
                    estagio: deal.estagio,
                    dataCriacao: deal.dataCriacao,
                    ultimaAtualizacao: new Date().toISOString() // Simula "hoje" para o aging nos mocks
                });
                return PredictiveEngine.analyzeDeal(aiDeal);
            });

            // 2. Calcula as métricas preditivas
            let totalForecast = 0;
            let totalScore = 0;
            let highRiskCount = 0;
            let hotDealsCount = 0;
            let dealsWithScore = analyzedDeals.length;

            analyzedDeals.forEach(deal => {
                // Previsão baseada no Score (Ex: R$100.000 * Score 80 = R$80.000 esperados)
                totalForecast += (deal.valor * (deal.aiData.scoreCalculado / 100));
                totalScore += deal.aiData.scoreCalculado;
                
                if (deal.aiData.nivelRisco === 'alto') highRiskCount++;
                if (deal.aiData.scoreCalculado >= 80) hotDealsCount++;
            });

            const avgScore = Math.round(totalScore / (dealsWithScore || 1));
            
            // 3. Respostas Naturais da IA
            const healthStatus = highRiskCount > 2 
                ? `<span style="color: var(--danger);">⚠️ Alerta: Existem ${highRiskCount} negócios estagnados ou com alto risco de perda. Ação imediata requerida.</span>`
                : `<span style="color: var(--success);">✅ Pipeline Saudável. Risco bem diluído.</span>`;
            
            const targetAnswer = avgScore > 65
                ? `Sim, a qualidade média (${avgScore}pts) indica alta probabilidade de bater a meta.`
                : `Risco de não atingimento. Focar em converter leads frios.`;

            // 4. Injeta o Dashboard na Interface
            this._injectDOM(totalForecast, avgScore, highRiskCount, hotDealsCount, healthStatus, targetAnswer);

        } else {
            console.warn("Módulos de IA ou mockData não encontrados. Exibindo Inteligência Simulada no Dashboard.");
            // Fallback caso o script seja rodado sem os arquivos IA anexados (Simulação pura)
            this._injectDOM(840500, 72, 3, 5, `<span style="color: var(--warning);">⚠️ Atenção: 3 negócios grandes estagnados no estágio Proposta.</span>`, `Pipeline estável. O forecast aponta batimento de meta.`);
        }
    },

    _injectDOM(forecast, avgScore, riskCount, hotCount, healthMsg, targetMsg) {
        // Remove painel antigo se existir
        const oldPanel = Utils.$('#ai-intelligence-panel');
        if (oldPanel) oldPanel.remove();

        const mount = Utils.$('.dashboard-mount');
        if (!mount) return;

        const aiPanel = document.createElement('div');
        aiPanel.id = 'ai-intelligence-panel';
        aiPanel.style.cssText = `
            margin-bottom: 24px;
            background: linear-gradient(180deg, rgba(6,9,18,0.95) 0%, rgba(6,9,18,0.8) 100%);
            border: 1px solid rgba(0, 229, 255, 0.2);
            border-radius: var(--radius-lg);
            padding: 24px;
            box-shadow: 0 4px 24px -6px rgba(0, 229, 255, 0.1);
            position: relative;
            overflow: hidden;
        `;

        // Efeito visual futurista
        const glow = `<div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: rgba(0, 229, 255, 0.15); filter: blur(50px); border-radius: 50%; pointer-events: none;"></div>`;

        aiPanel.innerHTML = `
            ${glow}
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                <i class="fa-solid fa-brain" style="color: var(--primary); font-size: 20px;"></i>
                <h2 style="margin: 0; font-size: 18px; color: var(--text-primary); letter-spacing: -0.5px;">Inteligência Comercial & Previsibilidade</h2>
                <span style="background: rgba(16, 255, 171, 0.1); color: var(--success); padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; font-family: var(--font-mono); border: 1px solid rgba(16,255,171,0.2);">LIVE ML SIMULATION</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
                
                <div style="background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px;">
                    <div style="color: var(--text-secondary); font-size: 12px; margin-bottom: 8px;">Receita Prevista (Ajustada pelo Score)</div>
                    <div style="font-size: 24px; font-weight: 700; color: var(--primary); font-family: var(--font-mono);">${Utils.currency(forecast, true)}</div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;"><i class="fa-solid fa-arrow-trend-up"></i> Forecast mais assertivo</div>
                </div>

                <div style="background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px;">
                    <div style="color: var(--text-secondary); font-size: 12px; margin-bottom: 8px;">Score Médio do Pipeline</div>
                    <div style="font-size: 24px; font-weight: 700; color: ${avgScore >= 70 ? 'var(--success)' : 'var(--warning)'}; font-family: var(--font-mono);">${avgScore}/100</div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Qualidade geral das oportunidades</div>
                </div>

                <div style="background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px;">
                    <div style="color: var(--text-secondary); font-size: 12px; margin-bottom: 8px;">Negócios em Alto Risco</div>
                    <div style="font-size: 24px; font-weight: 700; color: ${riskCount > 0 ? 'var(--danger)' : 'var(--success)'}; font-family: var(--font-mono);">${riskCount} <i class="fa-solid fa-triangle-exclamation" style="font-size: 16px;"></i></div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Exigem intervenção imediata</div>
                </div>

                <div style="background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px;">
                    <div style="color: var(--text-secondary); font-size: 12px; margin-bottom: 8px;">Oportunidades "Quentes"</div>
                    <div style="font-size: 24px; font-weight: 700; color: var(--warning); font-family: var(--font-mono);">${hotCount} 🔥</div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Probabilidade de fechamento > 80%</div>
                </div>

            </div>

            <div style="background: rgba(255, 255, 255, 0.02); border-radius: var(--radius-md); padding: 16px; border-left: 3px solid var(--primary);">
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Respostas da IA</div>
                <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13px; line-height: 1.5; color: var(--text-primary);">
                    <div><strong>O pipeline é saudável?</strong> ${healthMsg}</div>
                    <div><strong>A meta será atingida?</strong> <span style="color: var(--text-secondary);">${targetMsg}</span></div>
                    <div><strong>Recomendação Global:</strong> <span style="color: var(--text-secondary);">Priorize os ${hotCount} negócios quentes. Delegue a re-nutrição dos ${riskCount} negócios em risco para a equipe de pré-vendas.</span></div>
                </div>
            </div>
        `;

        // Insere o painel de Inteligência logo no topo, antes dos outros containers do dashboard
        mount.insertBefore(aiPanel, mount.firstChild);
    }
};

/* =========================================
   15. CONTROLES MENORES E EVENTOS
   ========================================= */
const NotificationModule = {
    init() {
        const btn = Utils.$('.header-action');
        if (btn) btn.onclick = () => Utils.toast("Central de Notificações em desenvolvimento", "info");
    }
};

const SearchModule = {
    init() {
        const input = Utils.$('.global-search input');
        if (input) input.onkeydown = (e) => { if (e.key === 'Enter') Utils.toast(`Buscando por: ${input.value}`, "primary"); };
    }
};

const PeriodModule = {
    init() {
        Utils.$$('[data-period]').forEach(btn => {
            btn.onclick = () => {
                CRM.state.period = btn.dataset.period;
                Utils.$$('[data-period]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                Dashboard.refresh();
            };
        });
    }
};

const Ticker = {
    start(ms) {
        setInterval(() => {
            const event = { user: "System", text: "Nova conexão detectada em SP_ZONE_02" };
            FeedModule.prepend('#activity-feed', event);
        }, ms);
    }
};

/* =========================================
   16. ORQUESTRADOR PRINCIPAL — DASHBOARD
   ========================================= */
const Dashboard = {
    init() {
        try {
            if (document.getElementById('kanban-board')) {
                return; // Evita conflito se estiver na tela do Kanban
            }
            console.log(`%c CRM Pro v${CRM.version} `, 'background:#00E5FF;color:#000;font-weight:700;padding:4px 8px;border-radius:4px;');
            
            this.buildLayout();
            this.refresh();
            this.bindEvents();
            
            NotificationModule.init();
            SearchModule.init();
            PeriodModule.init();
            Ticker.start(15000);
            
            window.addEventListener('resize', Utils.debounce(() => Charts.resizeAll(), 150));
            Utils.toast('System Online — AI Engine Ativada', 'success', 2500);
        } catch (err) {
            console.error('[ERR]', err);
        }
    },

    refresh() {
        const p = CRM.state.period;
        
        // 🧠 Injeta e atualiza o Painel de Inteligência primeiro
        IntelligenceModule.render();

        // Atualiza os módulos originais do CRM
        KPIModule.render(p);
        FunnelModule.render(p);
        StatStripModule.render(p);
        FeedModule.render('#activity-feed');
        LeaderboardModule.render('#leaderboard-list');
        requestAnimationFrame(() => Charts.resizeAll());
    },

    bindEvents() {
        Utils.$('.btn-novo')?.addEventListener('click', () => Utils.toast("Módulo de Provisionamento iniciado", "success"));
    },

    buildLayout() {
        const mount = Utils.$('.dashboard-mount');
        // Mantemos a função original. O painel de IA é injetado via IntelligenceModule.render()
    }
};

/* =========================================
   17. EXPOSIÇÃO GLOBAL E BOOT
   ========================================= */
window.CRM = CRM;
window.Dashboard = Dashboard;
window.Utils = Utils;
window.Charts = Charts;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Dashboard.init());
} else {
    Dashboard.init();
}