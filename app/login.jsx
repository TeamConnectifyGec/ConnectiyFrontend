import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from "react-native";
import Button from "@/components/ConnectifyButton"
import CfyTextInput from '@/components/ConnectifyTextInput';
import { Link } from "expo-router"

const LogIn = () => {
  const [username, extractUsername] = useState();
  const [password, extractPassword] = useState();
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/connectify-logo.png")} style={{ width: 120, height: 120 }} />
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
          <Button backgroundColor='#A98CE6' textColor='white' onPress={() => { }}>
            Log In
          </Button>
        </View>
        <View style={styles.buttonArea}>
          <Text style={styles.text}>Do not have an account?</Text>
          <Link href='/signup' style={{color: '#A98CE6',fontWeight: 'bold'}}>
            Sign Up
          </Link>
        </View>
      </View>
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