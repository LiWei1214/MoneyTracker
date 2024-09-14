import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, ToastAndroid } from 'react-native';
import { parse } from 'react-native-svg';
import io, { connect, Socket } from "socket.io-client";

var loginSocket = io('http://10.0.2.2:5000/login', {
  transports: ['websocket'],
});

var registerSocket = io('http://10.0.2.2:5000/register', {
  transports:['websocket']
});

// Login Screen Component
function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(Boolean);

  const handleLogin = () => {
    loginSocket.emit('client_login', email, password);
    console.log(loginStatus);
    if (loginStatus){
      Alert.alert("Login Successful")
      navigation.navigate('BottomTabNav');
    } else {
      Alert.alert("Login Failed")
    }
  };

  useEffect(()=>{
    loginSocket.on('connect', () => {
      console.log(loginSocket.id);
      loginSocket.emit('client_connected', {connected: true});
      ToastAndroid.show('Connected to server', ToastAndroid.LONG);
    });

    loginSocket.on('error', error => {
      ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
    });

    loginSocket.on('server_send', data => {
      let result = JSON.parse(data);
      setLoginStatus(result.stateCheck);
    });
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.linkText} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}

// Sign-Up Screen Component
function SignUpScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerPassed, setRegisterPassed] = useState('');

  const handleSignUp = () => {
    registerSocket.emit('client_send', email, username, password)
    console.log(registerPassed);
    if(registerPassed == "Account created"){
      Alert.alert("Sign up successful.")
      setEmail('')
      setUsername('')
      setPassword('')
      navigation.navigate('Login');
    } else if (registerPassed == "Email format incorrect"){
      Alert.alert('Email format incorrect.');
    } else if (registerPassed == "User already exists"){
      Alert.alert('User already exists');
    } else if (registerPassed == "Email already exists"){
      Alert.alert('Email already exists');
    }
  };

  useEffect(()=>{
    registerSocket.on('connect', () => {
      console.log(registerSocket.id);
      registerSocket.emit('client_connected', {connected: true});
      ToastAndroid.show('Connected to server', ToastAndroid.LONG);
    });

    registerSocket.on('error', error => {
      ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
    });

    registerSocket.on('server_send', data => {
      let result = JSON.parse(data);
      setRegisterPassed(result.accountCreate);
    });
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
}

export default function LoginSignUp({navigation}: any) {
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? (
    <LoginScreen navigation={navigation} />
  ) : (
    <SignUpScreen navigation={{ navigate: () => setIsLogin(true) }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  linkText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});