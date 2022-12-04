import React from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { useState,useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'

 function HomeScreen({navigation}) {
  const [token,setToken] = useState("");
  const { signOut } = React.useContext(AuthContext);
  useEffect(() => {
       AsyncStorage.getItem('userToken')
       .then(userToken => setToken(JSON.parse(userToken)))
       .catch(err => console.log(err))
  }, [])
  
    return (
    <View style={styles.container}>
      <View style >
        <Text>Welcome {token.name}</Text>
      </View>
      <View>
        <Button title="Log out" onPress={() => signOut()} />
      </View>
      <View>
        <Button title="Perfil" onPress={() => navigation.navigate("Profile")} />
      </View>
      <View>
        <Button title="Políticas de Consumo" onPress={() => navigation.navigate("Politics")} />
      </View>
      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.wingblue,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;