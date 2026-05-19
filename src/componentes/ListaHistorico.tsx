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
      <Text style={estilos.titulo}>Buscas recentes</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.item}
            onPress={() => aoClicar(item.cidade)}
          >
            <Text style={estilos.nomeCidade}>
              {item.cidade}, {item.pais}
            </Text>
            <Text style={estilos.data}>{item.buscadoEm}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    marginTop: 28,
  },
  titulo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#AAAAAA',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#1A1A1A',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  nomeCidade: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  data: {
    color: '#555555',
    fontSize: 11,
    marginTop: 2,
  },
});