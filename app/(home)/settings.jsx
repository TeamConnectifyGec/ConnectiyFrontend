import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { removeToken } from '../../utils/tokenStorage';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await removeToken(); // Delete the token
      navigation.navigate('index'); // Navigate to the login screen or any screen after logout
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View> */}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Logout Option */}
      <View style={styles.optionContainer}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionTitle}>Logout from Connectify</Text>
          <Text style={styles.optionDescription}>You will be logged out of your account.</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#A98CE6',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SettingsScreen;
