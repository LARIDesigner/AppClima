import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { HistoricoBusca } from '../tipos/Clima';

interface Props {
  itens: HistoricoBusca[];
  aoClicar: (cidade: string) => void;
}

export function ListaHistorico({ itens, aoClicar }: Props) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>🕓 Histórico de buscas</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.item}
            onPress={() => aoClicar(item.cidade)}
          >
            <Text style={estilos.nomeCidade}>{item.cidade}, {item.pais}</Text>
            <Text style={estilos.data}>{item.buscadoEm}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { marginTop: 24 },
  titulo: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  item: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4A90D9',
  },
  nomeCidade: { color: '#fff', fontSize: 15 },
  data: { color: '#aaa', fontSize: 12, marginTop: 2 },
});