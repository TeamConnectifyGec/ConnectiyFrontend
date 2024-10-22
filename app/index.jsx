import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { getToken } from '../utils/tokenStorage'; // Adjust the path according to your file structure

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        // Navigate to home if the token exists
        router.replace('(home)/feed'); 
      } else {
        // Navigate to auth if there is no token
        router.replace('(auth)');
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
    // Show a loading indicator while checking the token
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If you reach this point, it means the navigation has already happened
  return null; // Prevent rendering anything after navigation
}
