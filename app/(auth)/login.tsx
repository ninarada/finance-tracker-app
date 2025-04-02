import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; 
import { loginUser } from '@/services/userService'; 

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(username, password);
      await AsyncStorage.setItem('token', response.token);
      router.replace('/');
    } catch (error) {
      Alert.alert('Login Failed', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    router.replace('/register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.header2}>Please log in to continue.</Text>
      <Image
          source={require('@/assets/images/login.png')}
          style={styles.loginSVG}
        />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={loading ? 'Logging in...' : 'Log In'}
        onPress={handleLogin}
        disabled={loading}
        titleStyle={{ 
          fontSize: 22, 
          color: 'white' ,
          fontWeight: '600',
        }}
        buttonStyle={{ 
          width: '100%',
          backgroundColor: '#5993ED',
          paddingVertical: 12,
          borderRadius: 50,
          marginTop: 10,
        }} 
      />
      <View style={styles.container2}>
        <Text style={styles.text}>Don't have an account?</Text>
        <Button
            title={'Sign Up'}
            onPress={handleSwitch}
            disabled={loading}
            titleStyle={{ fontSize: 20, color: '#174982', fontWeight: '600' }}
            buttonStyle={{ backgroundColor: 'none' }} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#174982'
  },
  header2: {
    fontSize: 20,
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  loginSVG: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;
