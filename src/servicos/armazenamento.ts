import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_ULTIMA_CIDADE = '@appClima:ultimaCidade';

// Salva a última cidade pesquisada no armazenamento local do celular
export async function salvarUltimaCidade(cidade: string): Promise<void> {
  await AsyncStorage.setItem(CHAVE_ULTIMA_CIDADE, cidade);
}

// Lê a última cidade salva (retorna null se nunca buscou)
export async function lerUltimaCidade(): Promise<string | null> {
  return AsyncStorage.getItem(CHAVE_ULTIMA_CIDADE);
}