import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { HistoricoBusca } from '../tipos/Clima';

// Abre (ou cria) o banco de dados local
const bancoDados = SQLite.openDatabaseSync('historico.db');

export function useHistorico() {
  const [historico, setHistorico] = useState<HistoricoBusca[]>([]);

  // Cria a tabela de histórico se ainda não existir
  useEffect(() => {
    bancoDados.execSync(
      `CREATE TABLE IF NOT EXISTS historico (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cidade TEXT NOT NULL,
        pais TEXT NOT NULL,
        buscadoEm TEXT NOT NULL
      );`
    );
    carregarHistorico();
  }, []);

  // Lê os últimos 10 registros do banco
  function carregarHistorico() {
    const registros = bancoDados.getAllSync(
      'SELECT * FROM historico ORDER BY id DESC LIMIT 10;'
    ) as HistoricoBusca[];
    setHistorico(registros);
  }

  // Adiciona uma nova busca ao histórico em tempo real
  function adicionarAoHistorico(cidade: string, pais: string) {
    const agora = new Date().toLocaleString('pt-BR');
    bancoDados.runSync(
      'INSERT INTO historico (cidade, pais, buscadoEm) VALUES (?, ?, ?);',
      [cidade, pais, agora]
    );
    carregarHistorico(); // Atualiza a tela imediatamente
  }

  return { historico, adicionarAoHistorico };
}