import { useState } from 'react';
import { obterLocalizacaoAtual } from '../servicos/localizacao';
import { buscarClima } from '../servicos/apiClima';
import { DadosClima } from '../tipos/Clima';

export function useLocalizacao() {
  const [carregandoLocal, setCarregandoLocal] = useState(false);
  const [erroLocal, setErroLocal] = useState<string | null>(null);

  // Busca o clima usando as coordenadas GPS do celular
  async function buscarPorLocalizacao(
    aoEncontrar: (dados: DadosClima) => void
  ) {
    try {
      setCarregandoLocal(true);
      setErroLocal(null);

      const { latitude, longitude } = await obterLocalizacaoAtual();

      // A API do OpenWeather aceita lat/lon diretamente
      const { data } = await (await import('axios')).default.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat: latitude,
            lon: longitude,
            appid: process.env.EXPO_PUBLIC_CHAVE_API!,
            units: 'metric',
            lang: 'pt_br',
          },
        }
      );

      aoEncontrar({
        cidade: data.name,
        pais: data.sys.country,
        temperatura: Math.round(data.main.temp),
        sensacaoTermica: Math.round(data.main.feels_like),
        descricao: data.weather[0].description,
        umidade: data.main.humidity,
        icone: data.weather[0].icon,
      });
    } catch {
      setErroLocal('Não foi possível obter sua localização.');
    } finally {
      setCarregandoLocal(false);
    }
  }

  return { carregandoLocal, erroLocal, buscarPorLocalizacao };
}