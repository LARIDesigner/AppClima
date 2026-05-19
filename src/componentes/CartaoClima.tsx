import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DadosClima } from '../tipos/Clima';

interface Props {
  dados: DadosClima;
}

export function CartaoClima({ dados }: Props) {
  const urlIcone = `https://openweathermap.org/img/wn/${dados.icone}@2x.png`;

  return (
    <View style={estilos.cartao}>

      {/* Cidade e país */}
      <Text style={estilos.cidade}>
        {dados.cidade}, {dados.pais}
      </Text>

      {/* Ícone do clima */}
      <Image source={{ uri: urlIcone }} style={estilos.icone} />

      {/* Temperatura grande */}
      <Text style={estilos.temperatura}>{dados.temperatura}°C</Text>

      {/* Descrição */}
      <Text style={estilos.descricao}>{dados.descricao}</Text>

      {/* Linha divisória */}
      <View style={estilos.divisor} />

      {/* Sensação e umidade */}
      <View style={estilos.linhaInfo}>
        <View style={estilos.infoItem}>
          <Text style={estilos.infoLabel}>Sensação</Text>
          <Text style={estilos.infoValor}>{dados.sensacaoTermica}°C</Text>
        </View>
        <View style={estilos.infoItem}>
          <Text style={estilos.infoLabel}>Umidade</Text>
          <Text style={estilos.infoValor}>{dados.umidade}%</Text>
        </View>
      </View>

    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  cidade: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  icone: {
    width: 80,
    height: 80,
  },
  temperatura: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#A8C8E8',
    marginTop: 4,
  },
  descricao: {
    fontSize: 15,
    color: '#AAAAAA',
    textTransform: 'capitalize',
    marginTop: 4,
    marginBottom: 16,
  },
  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#2A2A2A',
    marginBottom: 16,
  },
  linhaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 2,
  },
  infoValor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A8C8E8',
  },
});