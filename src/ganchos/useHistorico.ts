import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { HistoricoBusca } from '../tipos/Clima';

// Verifica se está na web
const isWeb = Platform.OS === 'web';

// Banco apenas no mobile
const bancoDados = !isWeb
  ? SQLite.openDatabaseSync('historico.db')
  : null;

export function useHistorico() {
  const [historico, setHistorico] = useState<HistoricoBusca[]>([]);

  useEffect(() => {
    if (!isWeb && bancoDados) {
      bancoDados.execSync(
        `CREATE TABLE IF NOT EXISTS historico (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cidade TEXT NOT NULL,
          pais TEXT NOT NULL,
          buscadoEm TEXT NOT NULL
        );`
      );

      carregarHistorico();
    } else {
      carregarHistoricoWeb();
    }
  }, []);

  // MOBILE SQLITE
  function carregarHistorico() {
    if (!bancoDados) return;

    const registros = bancoDados.getAllSync(
      'SELECT * FROM historico ORDER BY id DESC LIMIT 10;'
    ) as HistoricoBusca[];

    setHistorico(registros);
  }

  // WEB LOCALSTORAGE
  function carregarHistoricoWeb() {
    const dados = localStorage.getItem('historico');

    if (dados) {
      setHistorico(JSON.parse(dados));
    }
  }

  function adicionarAoHistorico(cidade: string, pais: string) {
    const agora = new Date().toLocaleString('pt-BR');

    if (!isWeb && bancoDados) {
      bancoDados.runSync(
        'INSERT INTO historico (cidade, pais, buscadoEm) VALUES (?, ?, ?);',
        [cidade, pais, agora]
      );

      carregarHistorico();
    } else {
      const novoHistorico = [
        {
          id: Date.now(),
          cidade,
          pais,
          buscadoEm: agora,
        },
        ...historico,
      ].slice(0, 10);

      localStorage.setItem(
        'historico',
        JSON.stringify(novoHistorico)
      );

      setHistorico(novoHistorico);
    }
  }

  return { historico, adicionarAoHistorico };
}