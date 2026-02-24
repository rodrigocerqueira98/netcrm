/**
 * =====================================================
 * RECEITA-API.JS — Integração de Dados Cadastrais
 * Motor de consulta via BrasilAPI (Dados Oficiais)
 * =====================================================
 */

(function (global) {
  'use strict';

  const URL_BASE_CNPJ = 'https://brasilapi.com.br/api/cnpj/v1/';

  /**
   * Limpa formatação de documentos (remove pontos, traços e barras)
   */
  const limparDocumento = (doc) => String(doc).replace(/\D/g, '');

  /**
   * Valida o formato básico do CNPJ (14 dígitos)
   */
  const validarFormatoCNPJ = (cnpj) => {
    const num = limparDocumento(cnpj);
    return num.length === 14;
  };

  /**
   * Valida o formato básico do CPF (11 dígitos)
   */
  const validarFormatoCPF = (cpf) => {
    const num = limparDocumento(cpf);
    return num.length === 11;
  };

  /**
   * Consulta dados cadastrais via BrasilAPI
   * @param {string} cnpj 
   * @returns {Promise} Objeto formatado para o formulário do CRM
   */
  async function consultarDadosEmpresa(cnpj) {
    const numeroLimpo = limparDocumento(cnpj);

    if (!validarFormatoCNPJ(numeroLimpo)) {
      return { sucesso: false, erro: 'O CNPJ informado deve conter exatamente 14 dígitos.' };
    }

    try {
      const resposta = await fetch(`${URL_BASE_CNPJ}${numeroLimpo}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!resposta.ok) {
        if (resposta.status === 404) {
          return { sucesso: false, erro: 'Este CNPJ não foi localizado na base da Receita Federal.' };
        }
        if (resposta.status === 429) {
          return { sucesso: false, erro: 'Limite de consultas atingido. Aguarde um momento.' };
        }
        throw new Error('Falha na comunicação com o serviço de dados.');
      }

      const dadosRaw = await resposta.json();

      // Mapeamento inteligente para o formulário do CRM
      return {
        sucesso: true,
        dados: {
          razao_social: dadosRaw.razao_social || '',
          nome_fantasia: dadosRaw.nome_fantasia || dadosRaw.estabelecimento?.nome_fantasia || dadosRaw.razao_social,
          logradouro: dadosRaw.logradouro || dadosRaw.estabelecimento?.logradouro || '',
          numero: dadosRaw.numero || dadosRaw.estabelecimento?.numero || '',
          complemento: dadosRaw.complemento || dadosRaw.estabelecimento?.complemento || '',
          bairro: dadosRaw.bairro || dadosRaw.estabelecimento?.bairro || '',
          municipio: dadosRaw.municipio || dadosRaw.estabelecimento?.municipio?.nome || '',
          uf: (dadosRaw.uf || dadosRaw.estabelecimento?.estado?.sigla || '').toUpperCase(),
          cep: dadosRaw.cep || dadosRaw.estabelecimento?.cep || '',
        }
      };

    } catch (err) {
      return {
        sucesso: false,
        erro: 'Não foi possível completar a consulta. Verifique sua conexão com a internet.'
      };
    }
  }

  // Exposição Global Protegida
  global.ReceitaAPI = {
    limparDocumento,
    validarFormatoCNPJ,
    validarFormatoCPF,
    consultarCNPJ: consultarDadosEmpresa // Mantido nome para compatibilidade com seu HTML
  };

})(typeof window !== 'undefined' ? window : this);