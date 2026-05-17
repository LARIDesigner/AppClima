import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TelaPrincipal } from './src/telas/TelaPrincipal';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <TelaPrincipal />
    </>
  );
}