import {
  View,
  Text,
  Image,
  useWindowDimensions,
  SafeAreaView,
  Button,
  StyleSheet,
  Platform,
} from 'react-native'
import {Card, Title, Paragraph } from 'react-native-paper'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { serverURL } from '../config/hosts'
import { AntDesign } from '@expo/vector-icons'
import { CustomBackButton, CustomButton } from '../components'
import * as ImagePicker from 'expo-image-picker'
import { useRoute } from '@react-navigation/native'

export default function AccountsScreen({ navigation }) {
  const { height } = useWindowDimensions()
  const [token, setToken] = useState('')
  const [contas, setContas] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err))
  }, [])

  const [data, setData] = useState([])
  const fetchData = async (token) => {
    //fetch getBankaccounts(id)
    console.log(serverURL + '/bank/getBankAccount/' + token.id)
    const resp = await fetch(`${serverURL}/bank/getBankAccounts/${token.id}`)
    const data = await resp.json()
    console.log(data)
    setContas(data)
  }
  // request data from server
  useEffect(() => {
    console.log('Entered useEffect: ' + JSON.stringify(token) + '\n')
    if (token.id) {
      fetchData(token)
    }
  }, [token])

  // every time route.params.refresh is true when user delete an account, refresh data
  const route = useRoute()
  useEffect(() => {
    // dont do shit if route.params is undefined
    if (route.params) {
      // se nao for undefined
      if (route.params.refresh) {
        // se for true
        console.log('Entered useEffect route.params')
        fetchData(token)
        console.log(typeof route.params.refresh)
        // set route.params.refresh to false
        route.params.refresh = false
      }
    }
  }, [route.params]) 

  return (
    <SafeAreaView style={styles.root}>
      {/* CONTAINER COM OUTLINE */}
      <View style={styles.Maincontainer}>
        {/* for every account in contas make a container */}
        {contas.map((conta) => 
        <View style={styles.container} key={conta.idBankAccounts}>
          <Text style={styles.textTag}>Conta {conta.idBankAccounts}</Text>
          <Text style={styles.textInfo}>{conta.accountName}</Text>
            {/*<Text style={styles.textInfo}>Caixa Geral de Depósitos</Text> */}
            <AntDesign name="rightcircleo" size={24} color="white" style={styles.iconStyle} onPress={() => navigation.navigate("Account", {name:`Conta ${conta.idBankAccounts}`,conta:conta})}/>
        </View>
        )}
     </View>
      <View style={styles.containerBTN}>
        <CustomButton
          onPress={() => navigation.navigate('AddAccount')}
          text="Adicionar Conta"
          type="TERTIARY"
          widthScale={0.8}
        ></CustomButton>
      </View>
    </SafeAreaView>
  )
  //)
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
   
  },
  textTag: {
    fontFamily: 'SoraBold',
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginBottom: 10,
  },
  textInfo: {
    //marginLeft: 30,
    fontFamily: 'SoraLight',
    fontSize: SIZES.font,
  },
  containerBTN: {
    // Put the buttons if there is space 2mm after infoContainer
    // center the buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    // outline in wing blue, rounded corners
    backgroundColor: COLORS.wingblue,
    borderRadius: 10,
    margin: 10,
    padding: 20
    },
    Maincontainer: {
        marginHorizontal: 30,
        marginTop: "7%",
        marginBottom: "7%"
    },
    iconStyle: {
        position: 'absolute',
        //  center horizontally
        right: 30,
        top: 30
    }

})
