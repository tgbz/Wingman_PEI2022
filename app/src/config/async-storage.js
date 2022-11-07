// async-storage.js file
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getItem() {
  const value = await AsyncStorage.getItem('userToken');
  return value ? JSON.parse(value) : null;
}
export async function setItem(value) {
  return AsyncStorage.setItem('userToken', JSON.stringify(value));
}
export async function removeItem() {
  return AsyncStorage.removeItem('userToken');
}