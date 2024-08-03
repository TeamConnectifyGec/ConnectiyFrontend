import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from "react-native";
import Button from "@/components/ConnectifyButton"
import CfyTextInput from '@/components/ConnectifyTextInput';
import { Link } from "expo-router"

const SignUp = () => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [recheckpassword, setRecheckPassword] = useState();
  const [password, setPassword] = useState();
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/connectify-logo.png")} style={{ width: 120, height: 120 }} />
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
          value={recheckpassword}
          onChangeText={setRecheckPassword}
          secureTextEntry
        />
        <View style={styles.buttonArea}>
          <Text>(Capcha will come here)</Text>
        </View>
        <View style={styles.buttonArea}>
          <Button backgroundColor='#A98CE6' textColor='white' onPress={() => { }}>
            Sign Up
          </Button>
        </View>
        <View style={styles.buttonArea}>
          <Text style={styles.text}>Already have an account?</Text>
          <Link href='/login' style={{color: '#A98CE6',fontWeight: 'bold'}}>
            Login
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

export default SignUp;