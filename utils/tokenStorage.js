import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error storing the token:', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      return token; // Return token if it exists
    } else {
      return null; // Explicitly return null if no token is found
    }
  } catch (error) {
    console.error('Error retrieving the token:', error);
    return null; // Return null in case of error
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Error removing the token:', error);
  }
};
