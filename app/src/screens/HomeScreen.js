import React from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { useState,useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import { serverURL } from '../config/hosts'

 function HomeScreen({navigation}) {
  const [token,setToken] = useState("");
  const { signOut } = React.useContext(AuthContext);
  useEffect(() => {
       AsyncStorage.getItem('userToken')
       .then(userToken => setToken(JSON.parse(userToken)))
       .catch(err => console.log(err))
  }, [])

  const getCategories = async () => {
    // fecth data from serverURL/users/userCategory/:id and print it
    console.log(`${serverURL}+'/categories/userCategory/'+${token.id}`)
    const resp = await fetch(`${serverURL}/categories/userCategory/${token.id}`)
    const data = await resp.json()
    console.log(data)
  }
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
        <Button title="Definir Políticas de Consumo" onPress={() => navigation.navigate("PoliticsSuggestion")} />
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