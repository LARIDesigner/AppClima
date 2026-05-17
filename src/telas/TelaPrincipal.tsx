import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useClima } from '../ganchos/useClima';
import { useBusca } from '../ganchos/useBusca';
import { useHistorico } from '../ganchos/useHistorico';
import { useLocalizacao } from '../ganchos/useLocalizacao';
import { BarraDeBusca } from '../componentes/BarraDeBusca';
import { CartaoClima } from '../componentes/CartaoClima';
import { ListaHistorico } from '../componentes/ListaHistorico';
import { DadosClima } from '../tipos/Clima';

export function TelaPrincipal() {
  const { dadosClima, carregando, erro, pesquisarCidade } = useClima();
  const { historico, adicionarAoHistorico } = useHistorico();
  const { carregandoLocal, buscarPorLocalizacao } = useLocalizacao();

  // Conecta o debounce ao hook de clima
  const { textoBusca, setTextoBusca } = useBusca((cidade) => {
    pesquisarCidade(cidade);
  });

  function aoEncontrarClimaPorGPS(dados: DadosClima) {
    adicionarAoHistorico(dados.cidade, dados.pais);
  }

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <Text style={estilos.titulo}>🌤 App Clima</Text>

      <BarraDeBusca
        valor={textoBusca}
        aoMudar={setTextoBusca}
        aoSubmeter={(cidade) => pesquisarCidade(cidade)}
      />

      {/* Botão de localização GPS */}
      <TouchableOpacity
        style={estilos.botaoGPS}
        onPress={() => buscarPorLocalizacao(aoEncontrarClimaPorGPS)}
      >
        <Text style={estilos.textoBotao}>
          {carregandoLocal ? 'Buscando localização...' : '📍 Usar minha localização'}
        </Text>
      </TouchableOpacity>

      {/* Indicador de carregamento */}
      {carregando && <ActivityIndicator size="large" color="#4A90D9" />}

      {/* Mensagem de erro visual */}
      {erro && (
        <View style={estilos.caixaErro}>
          <Text style={estilos.textoErro}>⚠️ {erro}</Text>
        </View>
      )}

      {/* Cartão com os dados do clima */}
      {dadosClima && !carregando && (
        <CartaoClima dados={dadosClima} />
      )}

      {/* Histórico de buscas em tempo real */}
      {historico.length > 0 && (
        <ListaHistorico
          itens={historico}
          aoClicar={(cidade) => pesquisarCidade(cidade)}
        />
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#1a1a2e' },
  conteudo: { padding: 20, paddingTop: 60 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  botaoGPS: { backgroundColor: '#4A90D9', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  textoBotao: { color: '#fff', fontWeight: '600' },
  caixaErro: { backgroundColor: '#ff4444', padding: 12, borderRadius: 10, marginTop: 12 },
  textoErro: { color: '#fff', textAlign: 'center' },
});