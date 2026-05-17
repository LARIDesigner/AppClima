import axios from 'axios';
import { DadosClima } from '../tipos/Clima';

const CHAVE_API = process.env.EXPO_PUBLIC_CHAVE_API!;
const URL_BASE = 'https://api.openweathermap.org/data/2.5';

// Busca o clima de uma cidade. Se passar o país, diferencia cidades de mesmo nome.
// Exemplo: buscar "Toledo,BR" dá resultado diferente de "Toledo,US"
export async function buscarClima(cidade: string, pais?: string): Promise<DadosClima> {
  const consulta = pais ? `${cidade},${pais}` : cidade;

  const { data } = await axios.get(`${URL_BASE}/weather`, {
    params: {
      q: consulta,
      appid: CHAVE_API,
      units: 'metric',  // temperatura em Celsius
      lang: 'pt_br',    // descrição em português
    },
  });

  // Monta o objeto com os dados que a gente precisa
  return {
    cidade: data.name,
    pais: data.sys.country,
    temperatura: Math.round(data.main.temp),
    sensacaoTermica: Math.round(data.main.feels_like), // atributo da API para sensação térmica
    descricao: data.weather[0].description,
    umidade: data.main.humidity,
    icone: data.weather[0].icon,
  };
}