import { View, Text } from 'react-native'
import React from 'react'
import AuthContext from '../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'
import { serverURL } from "../config/hosts";


export default function ProfileScreen({navigation}) {
  const [token, setToken] = useState('')
  
  useEffect(() => {
    AsyncStorage.getItem('userToken')
    .then((userToken) => setToken(JSON.parse(userToken)))
    .catch((err) => console.log(err))
  }, [])
  
  const [data, setData] = useState([])
  const fetchData = async (token) => {
    console.log(serverURL+"/users/userProfile/"+token.id)
    const resp = await fetch(`${serverURL}/users/userProfile/${token.id}`);
    const data = await resp.json();
    console.log(data);
    setData(data);
  };
  // request data from server
    useEffect(() => {
      console.log("Entered useEffect" + token.id)
      if (token.id) {
        fetchData(token);
      }
    }, [token])

  return (
    console.log(token),
    <SafeAreaView style={styles.root}>
        <ScrollView showsVerticalScrollIndicator= {false}>
          
            <Text>ProfileScreen do {token.name}</Text>


            <Text>Nome: {data.name}</Text>
            
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.white
    }
})