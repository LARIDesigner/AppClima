import React from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator,
  ScrollView, TouchableOpacity, SafeAreaView
} from 'react-native';
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

  const { textoBusca, setTextoBusca } = useBusca((cidade) => {
    pesquisarCidade(cidade);
  });

  function aoEncontrarClimaPorGPS(dados: DadosClima) {
    adicionarAoHistorico(dados.cidade, dados.pais);
  }

  return (
    <SafeAreaView style={estilos.seguro}>
      <ScrollView
        style={estilos.tela}
        contentContainerStyle={estilos.conteudo}
        keyboardShouldPersistTaps="handled"
      >

        {/* Cabeçalho */}
        <Text style={estilos.titulo}>Clima</Text>
        <Text style={estilos.subtitulo}>Previsão do tempo em tempo real</Text>

        {/* Barra de busca */}
        <BarraDeBusca
          valor={textoBusca}
          aoMudar={setTextoBusca}
          aoSubmeter={(cidade) => pesquisarCidade(cidade)}
        />

        {/* Botão de localização */}
        <TouchableOpacity
          style={estilos.botaoGPS}
          onPress={() => buscarPorLocalizacao(aoEncontrarClimaPorGPS)}
          disabled={carregandoLocal}
        >
          <Text style={estilos.textoBotao}>
            {carregandoLocal ? 'Buscando...' : '📍  Usar minha localização'}
          </Text>
        </TouchableOpacity>

        {/* Carregando */}
        {carregando && (
          <ActivityIndicator
            size="large"
            color="#A8C8E8"
            style={{ marginTop: 32 }}
          />
        )}

        {/* Erro */}
        {erro && !carregando && (
          <View style={estilos.caixaErro}>
            <Text style={estilos.textoErro}>{erro}</Text>
          </View>
        )}

        {/* Cartão de clima */}
        {dadosClima && !carregando && (
          <CartaoClima dados={dadosClima} />
        )}

        {/* Histórico */}
        {historico.length > 0 && (
          <ListaHistorico
            itens={historico}
            aoClicar={(cidade) => pesquisarCidade(cidade)}
          />
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  seguro: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  tela: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  conteudo: {
    padding: 20,
    paddingTop: 52,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 24,
  },
  botaoGPS: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotao: {
    color: '#A8C8E8',
    fontSize: 14,
    fontWeight: '500',
  },
  caixaErro: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#FF5555',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  textoErro: {
    color: '#FF5555',
    fontSize: 14,
    textAlign: 'center',
  },
});