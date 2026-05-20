import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { HistoricoBusca } from '../tipos/Clima';

const ehWeb = Platform.OS === 'web';

let bancoDados: any = null;

if (!ehWeb) {
  const SQLite = require('expo-sqlite');
  bancoDados = SQLite.openDatabaseSync('historico.db');
}

// Chave para salvar no localStorage da web
const CHAVE_HISTORICO = '@appClima:historico';

export function useHistorico() {
  const [historico, setHistorico] = useState<HistoricoBusca[]>([]);

  useEffect(() => {
    if (ehWeb) {
      carregarHistoricoWeb();
    } else {
      bancoDados.execSync(
        `CREATE TABLE IF NOT EXISTS historico (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cidade TEXT NOT NULL,
          pais TEXT NOT NULL,
          buscadoEm TEXT NOT NULL
        );`
      );
      carregarHistoricoMobile();
    }
  }, []);

  // Lê o histórico do localStorage (web)
  function carregarHistoricoWeb() {
    try {
      const salvo = localStorage.getItem(CHAVE_HISTORICO);
      if (salvo) {
        setHistorico(JSON.parse(salvo));
      }
    } catch {
      setHistorico([]);
    }
  }

  // Lê o histórico do SQLite (celular)
  function carregarHistoricoMobile() {
    const registros = bancoDados.getAllSync(
      'SELECT * FROM historico ORDER BY id DESC LIMIT 10;'
    ) as HistoricoBusca[];
    setHistorico(registros);
  }

  function adicionarAoHistorico(cidade: string, pais: string) {
    const agora = new Date().toLocaleString('pt-BR');
    const novoItem: HistoricoBusca = {
      id: Date.now(),
      cidade,
      pais,
      buscadoEm: agora,
    };

    if (ehWeb) {
      // Salva no localStorage
      try {
        const salvo = localStorage.getItem(CHAVE_HISTORICO);
        const lista: HistoricoBusca[] = salvo ? JSON.parse(salvo) : [];
        const novaLista = [novoItem, ...lista].slice(0, 10); // máximo 10
        localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(novaLista));
        setHistorico(novaLista);
      } catch {
        setHistorico([novoItem]);
      }
    } else {
      // Salva no SQLite
      bancoDados.runSync(
        'INSERT INTO historico (cidade, pais, buscadoEm) VALUES (?, ?, ?);',
        [cidade, pais, agora]
      );
      carregarHistoricoMobile();
    }
  }

  return { historico, adicionarAoHistorico };
}