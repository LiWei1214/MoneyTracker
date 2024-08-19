import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

// Login Screen Component
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password123') {
      Alert.alert('Login Successful', 'Welcome to Money Tracker!');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

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
function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password === confirmPassword) {
      // Add logic for sign-up here, like API call or storing credentials
      Alert.alert('Sign Up Successful', 'Your account has been created.');
      navigation.navigate('Login');
    } else {
      Alert.alert('Sign Up Failed', 'Passwords do not match.');
    }
  };

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

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginScreen navigation={{ navigate: () => setIsLogin(false) }} />
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