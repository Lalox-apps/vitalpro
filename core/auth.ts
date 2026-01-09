// core/auth.ts
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'vitalpro_token';

export async function saveToken(token: string) {
  console.log('TOKEN:', token);
console.log('TYPEOF TOKEN:', typeof token);
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function removeToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
