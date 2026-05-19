import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface Props {
  valor: string;
  aoMudar: (texto: string) => void;
  aoSubmeter: (texto: string) => void;
}

export function BarraDeBusca({ valor, aoMudar, aoSubmeter }: Props) {
  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.entrada}
        placeholder="Buscar cidade... ex: Salvador,BR"
        placeholderTextColor="#555555"
        value={valor}
        onChangeText={aoMudar}
        onSubmitEditing={() => aoSubmeter(valor)}
        returnKeyType="search"
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  entrada: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    padding: 14,
    borderRadius: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
});