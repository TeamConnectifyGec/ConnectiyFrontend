import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default NotificationScreen;
