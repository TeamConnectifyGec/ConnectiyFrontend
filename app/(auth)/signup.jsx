import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from "react-native";
import Button from "../../components/ConnectifyButton";
import CfyTextInput from '../../components/ConnectifyTextInput';
import ConnectifyAlert from '../../components/ConnectifyAlert';
import { Link } from "expo-router";
import axios from "axios"
import { storeToken } from '../../utils/tokenStorage'; 
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [recheckPassword, setRecheckPassword] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigation = useNavigation(); // Initialize the navigation

  const handleServerResponse = async () => {
    try {
      const response = await axios.post(
        "https://connectify-backend-seven.vercel.app/api/auth/signup",{
          username,
          email,
          password
        });

        if(response.status === 200){
          setAlertMessage(response.data.message);
          setModalVisible(true); 
        } else if(response.status === 201){
          const token = response.data.token;
          setAlertMessage(`Sign Up successfull!`);
          setModalVisible(true); 


          await storeToken(token);

          navigation.navigate('(home)'); // Navigate to the home screen

        }
    }
    catch(error) {
      setAlertMessage(error.response.data.message || 'Sign up failed!');
      setModalVisible(true); 
    }
  };

  const handleSignUp = () => {
    if (!email) {
      setAlertMessage('Please enter your email address');
      setModalVisible(true);
    } else if (!validateEmail(email)) {
      setAlertMessage('Please enter a valid email address');
      setModalVisible(true);
    } else if (!username) {
      setAlertMessage('Please enter a username');
      setModalVisible(true);
    } else if (!password || !recheckPassword) {
      setAlertMessage('Please enter your password');
      setModalVisible(true);
    } else if (password !== recheckPassword) {
      setAlertMessage('Passwords do not match');
      setModalVisible(true);
    } else {
      handleServerResponse();
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/images/connectify-logo.png")} style={{ width: 120, height: 120 }} />
      </View>
      <View>
        <CfyTextInput
          placeholder="Set email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <CfyTextInput
          placeholder="Set username"
          value={username}
          onChangeText={setUsername}
        />
        <CfyTextInput
          placeholder="Set password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CfyTextInput
          placeholder="Re-enter password"
          value={recheckPassword}
          onChangeText={setRecheckPassword}
          secureTextEntry
        />
        <View style={styles.buttonArea}>
          <Button backgroundColor='#A98CE6' textColor='white' onPress={handleSignUp}>
            Sign Up
          </Button>
        </View>
        <View style={styles.buttonArea}>
          <Text style={styles.text}>Already have an account?</Text>
          <Link href='/login' style={{ color: '#A98CE6', fontWeight: 'bold' }}>
            Login
          </Link>
        </View>
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
  buttonArea: {
    paddingTop: 10,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'black',
  },
});

export default SignUp;
