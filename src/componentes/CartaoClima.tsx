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
      <Text style={estilos.cidade}>{dados.cidade}, {dados.pais}</Text>
      <Image source={{ uri: urlIcone }} style={estilos.icone} />
      <Text style={estilos.temperatura}>{dados.temperatura}°C</Text>
      <Text style={estilos.sensacao}>Sensação térmica: {dados.sensacaoTermica}°C</Text>
      <Text style={estilos.descricao}>{dados.descricao}</Text>
      <Text style={estilos.umidade}>💧 Umidade: {dados.umidade}%</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#4A90D9',
  },
  cidade: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  icone: { width: 80, height: 80 },
  temperatura: { fontSize: 52, fontWeight: 'bold', color: '#4A90D9' },
  sensacao: { fontSize: 15, color: '#aaa', marginTop: 4 },
  descricao: { fontSize: 16, color: '#fff', textTransform: 'capitalize', marginTop: 4 },
  umidade: { fontSize: 15, color: '#aaa', marginTop: 4 },
});