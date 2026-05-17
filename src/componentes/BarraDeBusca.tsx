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
        placeholder="Digite uma cidade... ex: Salvador,BR"
        placeholderTextColor="#aaa"
        value={valor}
        onChangeText={aoMudar}
        onSubmitEditing={() => aoSubmeter(valor)}
        returnKeyType="search"
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { marginBottom: 12 },
  entrada: {
    backgroundColor: '#16213e',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#4A90D9',
  },
});