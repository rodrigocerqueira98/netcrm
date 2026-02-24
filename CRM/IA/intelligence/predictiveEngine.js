/**
 * IA/intelligence/predictiveEngine.js
 * BLOCOS 2, 3 e 4 - Scoring, Risco e Sugestão de Ações
 * Motor responsável por analisar negócios e gerar insights preditivos.
 */

class PredictiveEngine {
    
    // Taxas de conversão baseadas no histórico do CRM (Simulação)
    static stageConversionRates = {
        "Leads": 15,
        "Qualificados": 35,
        "Proposta": 65,
        "Negociação": 85,
        "Fechamento": 95
    };

    /**
     * Recebe um negócio já formatado pelo AIDataModel e injeta os insights
     */
    static analyzeDeal(aiDeal) {
        const score = this.calculateScore(aiDeal);
        const risco = this.calculateRisk(score, aiDeal.diasNoEstagioAtual, aiDeal.estagioAtual);
        const sugestao = this.generateSuggestion(aiDeal.estagioAtual, risco, aiDeal.diasNoEstagioAtual);

        aiDeal.aiData = {
            scoreCalculado: score,
            nivelRisco: risco.nivel,       // alto, medio, baixo
            riscoLabel: risco.label,       // 🔥, ⚠️, ❌
            sugestaoAcao: sugestao
        };

        return aiDeal;
    }

    /**
     * BLOCO 2: Cálculo de Scoring Preditivo
     * Fórmula: (Peso do Estágio) - (Penalidade por Aging) + (Bônus de Valor)
     */
    static calculateScore(aiDeal) {
        // 1. Base do Score (Taxa do Estágio)
        let baseScore = this.stageConversionRates[aiDeal.estagioAtual] || 10;

        // 2. Penalidade por Aging (Dias parados)
        // Ex: Se passou de 5 dias parado, perde 2 pontos por dia extra
        let agingPenalty = 0;
        if (aiDeal.diasNoEstagioAtual > 5) {
            agingPenalty = (aiDeal.diasNoEstagioAtual - 5) * 2;
        }

        // 3. Bônus por Valor (Negócios maiores ganham leve prioridade)
        // Normalizado para dar no máximo +10 pontos
        let valueBonus = Math.min((aiDeal.valor / 100000) * 5, 10);

        // Cálculo Final
        let finalScore = baseScore - agingPenalty + valueBonus;

        // Trava de segurança para manter entre 0 e 100
        return Math.max(0, Math.min(Math.round(finalScore), 100));
    }

    /**
     * BLOCO 3: Motor de Risco
     */
    static calculateRisk(score, aging, estagio) {
        if (score >= 80) {
            return { nivel: "baixo", label: "🔥 Alta Probabilidade" };
        } else if (score >= 50 && score <= 79) {
            // Se está parado há muito tempo mesmo com score médio, alerta de risco!
            if (aging > 10 && estagio !== "Leads") {
                return { nivel: "alto", label: "❌ Risco por Inatividade" };
            }
            return { nivel: "medio", label: "⚠️ Atenção Necessária" };
        } else {
            return { nivel: "alto", label: "❌ Alto Risco" };
        }
    }

    /**
     * BLOCO 4: Sugestão de Ação Inteligente
     */
    static generateSuggestion(estagio, risco, aging) {
        if (risco.nivel === "alto") {
            if (aging > 10) return "⚠️ Negócio estagnado. Agendar call de reengajamento urgente.";
            return "❌ Probabilidade baixa. Tentar reduzir escopo ou oferecer desconto estratégico.";
        }

        if (risco.nivel === "medio") {
            if (estagio === "Proposta") return "📄 Enviar material complementar de casos de sucesso.";
            if (estagio === "Negociação") return "🗣️ O negócio precisa de decisão. Agendar follow-up com decisor.";
            return "📞 Fazer contato de nutrição do lead.";
        }

        if (risco.nivel === "baixo") { // Quente!
            if (estagio === "Fechamento") return "🖋️ Preparar contrato. Oportunidade pronta para ganho.";
            return "🔥 Negócio quente. Acelerar envio de proposta técnica.";
        }

        return "Analisar histórico do cliente.";
    }
}