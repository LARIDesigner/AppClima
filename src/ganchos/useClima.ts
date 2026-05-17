import { useState, useEffect } from 'react';
import { buscarClima } from '../servicos/apiClima';
import { salvarUltimaCidade, lerUltimaCidade } from '../servicos/armazenamento';
import { DadosClima } from '../tipos/Clima';

export function useClima() {
  const [dadosClima, setDadosClima] = useState<DadosClima | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Ao abrir o app, carrega a última cidade que foi pesquisada
  useEffect(() => {
    async function carregarUltimaCidade() {
      const ultimaCidade = await lerUltimaCidade();
      if (ultimaCidade) {
        await pesquisarCidade(ultimaCidade);
      }
    }
    carregarUltimaCidade();
  }, []);

  // Faz a busca do clima e salva a cidade localmente
  async function pesquisarCidade(cidade: string, pais?: string) {
    try {
      setCarregando(true);
      setErro(null);

      const dados = await buscarClima(cidade, pais);
      setDadosClima(dados);

      // Salva a cidade para abrir automaticamente na próxima vez
      await salvarUltimaCidade(cidade);
    } catch (e: any) {
      // Feedback de erro visual para o usuário
      if (e.response?.status === 404) {
        setErro('Cidade não encontrada. Verifique o nome e tente novamente.');
      } else {
        setErro('Erro ao buscar o clima. Verifique sua conexão.');
      }
    } finally {
      setCarregando(false);
    }
  }

  return { dadosClima, carregando, erro, pesquisarCidade };
}