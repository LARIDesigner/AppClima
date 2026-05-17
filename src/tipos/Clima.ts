// Define o formato dos dados de clima que vêm da API
export interface DadosClima {
  cidade: string;
  pais: string;
  temperatura: number;
  sensacaoTermica: number;
  descricao: string;
  umidade: number;
  icone: string;
}

// Define o formato de cada item do histórico de buscas
export interface HistoricoBusca {
  id: number;
  cidade: string;
  pais: string;
  buscadoEm: string;
}