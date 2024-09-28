import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from "react-native";
import Button from '../components/ConnectifyButton';
import CfyTextInput from '../components/ConnectifyTextInput';
import { Link } from 'expo-router';
import ConnectifyAlert from '../components/ConnectifyAlert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleForgotPassword = () => {
    if (!email) {
      setAlertMessage('Please enter your email address');
      setModalVisible(true);
    } else if (!validateEmail(email)) {
      setAlertMessage('Please enter a valid email address');
      setModalVisible(true);
    } else {
      // Simulate sending email
      setAlertMessage('A password reset link has been sent to your email');
      setModalVisible(true);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/connectify-logo.png')} 
          style={styles.logo} 
        />
      </View>
      <Text style={styles.text}>
        Enter your email address to reset your password
      </Text>
      <CfyTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.buttonArea}>
        <Button 
          backgroundColor='#A98CE6' 
          textColor='white' 
          onPress={handleForgotPassword} 
          width={220}
        >
          Send Reset Link
        </Button>
      </View>
      <View style={styles.buttonArea}>
        <Link href='/login' style={styles.link}>
          Back to Login
        </Link>
      </View>

      {/* Use ConnectifyAlert */}
      <ConnectifyAlert 
        visible={modalVisible} 
        message={alertMessage} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonArea: {
    paddingTop: 10,
    alignItems: 'center',
  },
  link: {
    color: '#A98CE6',
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
