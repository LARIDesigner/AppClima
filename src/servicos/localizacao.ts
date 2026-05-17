import * as Location from 'expo-location';

// Pede permissão e retorna as coordenadas GPS do celular
export async function obterLocalizacaoAtual() {
  // Pede permissão ao usuário
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Permissão de localização negada pelo usuário');
  }

  // Retorna latitude e longitude
  const local = await Location.getCurrentPositionAsync({});
  return {
    latitude: local.coords.latitude,
    longitude: local.coords.longitude,
  };
}