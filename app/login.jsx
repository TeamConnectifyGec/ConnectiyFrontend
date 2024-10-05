import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from "react-native";
import Button from "../components/ConnectifyButton"
import CfyTextInput from '../components/ConnectifyTextInput';
import { Link } from "expo-router"
import ConnectifyAlert from '../components/ConnectifyAlert';
import axios from 'axios';

const LogIn = () => {
  const [username, extractUsername] = useState();
  const [password, extractPassword] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleServerResponse = async () => {
    try {
      const response = await axios.post(
        "https://connectify-backend-seven.vercel.app/api/auth/login",{
          username,
          password
        });

      const token = response.data.token;
      setAlertMessage(`Log In successfull!`);
      setModalVisible(true);

      // go ahead to the home/feed page after saving the token to main storage or someting
    }
    catch(error) {
      setAlertMessage(error.response.data.message || 'Log In failed!');
      setModalVisible(true);
    }
  };

  const handleLogIn = () => {
    if (!username) {
      setAlertMessage('Please enter a username');
      setModalVisible(true);
    } else if (!password) {
      setAlertMessage('Please enter your password');
      setModalVisible(true);
    } 
    else {
      handleServerResponse();
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/images/connectify-logo.png")} style={{ width: 120, height: 120 }} />
      </View>
      <View>
        <CfyTextInput
          placeholder="Username"
          value={username}
          onChangeText={extractUsername}
        />
        <CfyTextInput
          placeholder="Password"
          value={password}
          onChangeText={extractPassword}
          secureTextEntry
        />
        <View style={styles.buttonArea}>
          <Button backgroundColor='#A98CE6' textColor='white' onPress={handleLogIn}>
            Log In
          </Button>
        </View>
        <View style={styles.buttonArea}>
          <Text style={styles.text}>Forgot your password?</Text>
          <Link href="/forgotpass" style={{color: '#A98CE6', fontWeight: 'bold'}}>
            Reset Password
          </Link>
        </View>
        <View style={styles.buttonArea}>
          <Text style={styles.text}>Do not have an account?</Text>
          <Link href='/signup' style={{color: '#A98CE6',fontWeight: 'bold'}}>
            Sign Up
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
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 21,
    //fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});

export default LogIn;