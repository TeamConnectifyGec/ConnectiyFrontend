import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function AnotherPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is another page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
