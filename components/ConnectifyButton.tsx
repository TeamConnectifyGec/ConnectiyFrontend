import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const Button = ({ backgroundColor, textColor, onPress, children }) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.button, 
        { 
          backgroundColor,
          elevation: pressed ? 1 : 3, // Simulate an inward click by reducing elevation
          transform: [{ scale: pressed ? 0.95 : 1 }] // Slightly scale down button when pressed
        }
      ]} 
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#A98CE6', // Default color
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});

export default Button;
