/**
 * IA/core/models.js
 * BLOCO 1 e 6 - Estrutura de Dados Preparada para IA
 * Formata os dados crus adicionando histórico e a estrutura para a Inteligência Comercial.
 */

class AIDataModel {
    
    // Converte um negócio (deal) do formato antigo para o formato preparado
    static prepareDealForAI(rawDeal) {
        return {
            id: rawDeal.id || this.generateId(),
            cliente: rawDeal.cliente || "Cliente Desconhecido",
            valor: parseFloat(rawDeal.valor) || 0.00,
            estagioAtual: rawDeal.estagio || "sem_estagio",
            
            // Datas cruciais para calcular o "Aging" (tempo parado)
            dataCriacao: rawDeal.dataCriacao || new Date().toISOString(),
            ultimaAtualizacao: rawDeal.ultimaAtualizacao || new Date().toISOString(),
            
            vendedor: rawDeal.vendedor || "Não atribuído",
            
            // 📈 Dados Históricos (Essenciais para ML no futuro)
            diasNoEstagioAtual: this.calculateAging(rawDeal.ultimaAtualizacao || new Date().toISOString()),
            interacoesRegistradas: rawDeal.interacoes || 0,
            historicoMovimentacoes: rawDeal.historico || [],

            // 🧠 Espaço reservado para o output da IA (Scoring, Risco, Sugestões)
            aiData: {
                scoreCalculado: null,
                nivelRisco: null,
                sugestaoAcao: null
            }
        };
    }

    // Calcula os dias parados (Aging)
    static calculateAging(ultimaAtualizacaoStr) {
        if (!ultimaAtualizacaoStr) return 0;
        const ultimaAtualizacao = new Date(ultimaAtualizacaoStr);
        const hoje = new Date();
        const diferencaTempo = Math.abs(hoje - ultimaAtualizacao);
        return Math.floor(diferencaTempo / (1000 * 60 * 60 * 24)); 
    }

    // Gera um ID simples caso o dado bruto não tenha
    static generateId() {
        return 'OPP-' + Math.floor(Math.random() * 10000);
    }
}