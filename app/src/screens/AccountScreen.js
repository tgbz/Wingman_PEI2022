import {
  View,
  Text,
  Image,
  useWindowDimensions,
  SafeAreaView,
  Button,
  StyleSheet,
  Platform,
  StatusBar
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

export default function AccountScreen({ navigation }) {
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

  // set account that is sent from AccountsScreen
  const route = useRoute()
  const [conta, setConta] = useState({})
  useEffect(() => {
    if (route.params) {
      console.log('Entered useEffect route.params: ' + JSON.stringify(route.params) + '\n')
      setConta(route.params.conta)
    }
  }, [route.params])

  // delete account -> deletes from db and refreshes data
  const handleDeleteConta = async (id) => {
    console.log('Entered handleDeleteConta: ' + id + '\n')
    const resp = await fetch(`${serverURL}/bank/deleteBankAccount/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((resp) => {
      if (resp.status === 200) {
        alert('Conta eliminada com sucesso!')
        navigation.navigate('Accounts',{refresh: true})
      } else {
        alert('Erro ao eliminar conta!')
      }
    })
  }

  

  return (
    <SafeAreaView style={styles.root}>
      {/* CONTAINER COM OUTLINE */}
      <View style={styles.infoContainer}>
          <View style={styles.infoLine}>
              <Text style={styles.textTag}>Titular</Text>
              <Text style={styles.textInfo}>{conta.titular}</Text>
          </View>

          <View style={styles.infoLine}>
            <Text style={styles.textTag}>Contribuinte</Text>
            <Text style={styles.textInfo}>{conta.NIF}</Text>
          </View>
          
          <View style={styles.infoLine}>
            <Text style={styles.textTag}>IBAN</Text>
            <Text style={styles.textInfo}>{conta.IBAN}</Text>
          </View>
      </View>
      <View style={styles.containerBTN}>
        <CustomButton
          onPress={() => handleDeleteConta(conta.idBankAccounts)}
          text="Eliminar Conta"
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
   
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
