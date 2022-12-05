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
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { serverURL } from '../config/hosts'
import { CustomInput, CustomButton } from '../components'
import { useRoute } from '@react-navigation/native'

export default function AddAccountScreen({ navigation }) {
  const { height } = useWindowDimensions()
  const [token, setToken] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err))
  }, [])

  const [data, setData] = useState([])
  const fetchData = async (token) => {
    //console.log(serverURL + '/users/userProfile/' + token.id)
  }
  // request data from server
  useEffect(() => {
    console.log('Entered useEffect: ' + JSON.stringify(token) + '\n')
    if (token.id) {
      fetchData(token)
    }
  }, [token])

  // every time route.params is true when user add account, refresh data
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

  const [name, setName] = useState('')
  const [titular,setTitular]= useState('')
  const [contribuinte,setContribuinte]= useState('')
  const [iban,setIban]= useState('')
  
  // handleAddAccount() -> send data to server
  const handleAddAccount = async () => {
    console.log('Entered handleAddAccount')
    console.log('name: ' + name)
    console.log('titular: ' + titular)
    console.log('contribuinte: ' + contribuinte)
    console.log('iban: ' + iban)
    console.log('token: ' + token.id)
    // send data to server
    const response = await fetch(serverURL + '/accounts/addAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        titular: titular,
        contribuinte: contribuinte,
        IBAN: iban,
        IdUser: token.id,
      }),
    })
    const data = await response.json()
    console.log('data: ' + JSON.stringify(data))
    // if data is not empty, then account was added
    if (data) {
      // set route.params.refresh to true
      route.params.refresh = true
      // go back to AccountsScreen
      navigation.goBack()
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* CONTAINER COM OUTLINE */}
      <View style={styles.infoContainer}>
      <View style={styles.infoLine}>
              <Text style={styles.textTag}>Nome Conta</Text>
              <CustomInput placeholder={"Conta Pessoal"} value={name} setValue={setName} widthScale={0.8}/>
          </View>
          <View style={styles.infoLine}>
              <Text style={styles.textTag}>Titular</Text>
              <CustomInput placeholder={""} value={titular} setValue={setTitular} widthScale={0.8}/>
          </View>

          <View style={styles.infoLine}>
            <Text style={styles.textTag}>Contribuinte</Text>
            <CustomInput placeholder={""} value={contribuinte} setValue={setContribuinte} widthScale={0.8}/>
          </View>
          
          <View style={styles.infoLine}>
            <Text style={styles.textTag}>IBAN</Text>
            <CustomInput placeholder={"PT50 0000 0000 0000 0000 0000 0"} value={iban} setValue={setIban} widthScale={0.8}/>
          </View>
      </View>
      <View style={styles.containerBTN}>
        <CustomButton
          onPress={() => handleAddAccount()}
          text="Adicionar"
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
        top: 32
    },
    infoContainer: {
      marginHorizontal: 40,
      marginTop: "7%",
      marginBottom: "7%",
    },
    infoLine: {
      // space between two lines of info
      marginBottom: 15,
    },
    col1: {
      width: '40%',
      marginBottom: 10,
    },
    col2: {
      width: '60%',
      marginBottom: 10,
    },
    textTag: {
      fontFamily: 'SoraBold',
      fontSize: SIZES.medium,
      color: COLORS.wingDarkBlue,
      marginBottom: 5,
    },
    textInfo: {
      //marginLeft: 30,
      fontFamily: 'SoraLight',
      fontSize: SIZES.medium,
    },
    
})
