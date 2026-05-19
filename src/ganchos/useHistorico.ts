import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { HistoricoBusca } from '../tipos/Clima';

// SQLite só funciona no celular, não na web
const ehWeb = Platform.OS === 'web';

let bancoDados: any = null;

// Só importa o SQLite se não for web
if (!ehWeb) {
  const SQLite = require('expo-sqlite');
  bancoDados = SQLite.openDatabaseSync('historico.db');
}

export function useHistorico() {
  const [historico, setHistorico] = useState<HistoricoBusca[]>([]);

  useEffect(() => {
    // Na web, não usa banco de dados
    if (ehWeb) return;

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

  function carregarHistorico() {
    if (ehWeb) return;

    const registros = bancoDados.getAllSync(
      'SELECT * FROM historico ORDER BY id DESC LIMIT 10;'
    ) as HistoricoBusca[];
    setHistorico(registros);
  }

  function adicionarAoHistorico(cidade: string, pais: string) {
    if (ehWeb) return; // ignora na web

    const agora = new Date().toLocaleString('pt-BR');
    bancoDados.runSync(
      'INSERT INTO historico (cidade, pais, buscadoEm) VALUES (?, ?, ?);',
      [cidade, pais, agora]
    );
    carregarHistorico();
  }

  return { historico, adicionarAoHistorico };
}