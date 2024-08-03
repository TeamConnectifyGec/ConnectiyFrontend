import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './index';
import SignUp from './signup';
import LogIn from './login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LogIn" component={LogIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
