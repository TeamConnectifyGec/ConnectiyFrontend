import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Communities"
        onPress={() => navigation.navigate('Communities')}
      />
    </View>
  );
}

export default ProfileScreen;
