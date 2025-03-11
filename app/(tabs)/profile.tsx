import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";  
import { useRouter } from 'expo-router'; 

import { getMyProfile } from "../../services/userService";

const ProfileScreen = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          router.replace('/login');
          setUser(null); 
        } else {
          const profile = await getMyProfile(token);
          console.log(profile);
          setUser(profile); 
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load profile data.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); 
      setUser(null); 
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert("Error", "Failed to log out.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username}</Text>
      <Text>Email: {user?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ProfileScreen;
