import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
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
      console.log(response);
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
      <Text style={styles.title}>Login</Text>
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
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
      <View style={styles.container2}>
        <Text style={styles.text}>Don't have an account?</Text>
        <Button
            title={'Sign Up'}
            onPress={handleSwitch}
            disabled={loading}
            titleStyle={{ fontSize: 20, color: 'blue' }}
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
    alignItems: 'center',
    padding: 20,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default LoginScreen;
