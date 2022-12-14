import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import AuthContext from '../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'
import { serverURL } from '../config/hosts'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { CustomBackButton, CustomButton, CustomInput } from '../components'

export default function PassEditScreen({ navigation }) {
  const { height } = useWindowDimensions()
  const [token, setToken] = useState('')
  const [newPass, setNewPass] = useState('')
  const [oldPass, setOldPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err))
  }, [])

  const [data, setData] = useState([])
  const fetchData = async (token) => {
    console.log(serverURL + '/users/userProfile/' + token.id)
    const resp = await fetch(`${serverURL}/users/userProfile/${token.id}`)
    const data = await resp.json()
    console.log(data)
    setData(data)
  }
  // request data from server
  useEffect(() => {
    console.log('Entered useEffect' + token.id)
    if (token.id) {
      fetchData(token)
    }
  }, [token])

  // handlePasswordChange that send old and new password to server (/updatePassword/:id)
  // in case of success, it returns a message and in case of error, it returns an error message
  const handlePasswordChange = async () => {
    const resp = await fetch(`${serverURL}/users/updatePassword/${token.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: oldPass,
        newpassword: newPass,
      }),
    }).then((resp) => {
      if (resp.status === 200) {
        alert('Password Alterada com sucesso!')
        navigation.navigate('Profile')
      } else {
        alert('Password atual errada!')
      }
    })
  }

  // validateForm that checks 
  // if every input is filled
  //if the new password and the confirm password are the same 
  // And set costumize alert messages
  const validateForm = () => {
    if (newPass === '' || oldPass === '' || confirmPass === '') {
      alert('Preencha todos os campos!')
    } else if (newPass !== confirmPass) {
      alert('As passwords n??o s??o iguais!')
    } else {
      handlePasswordChange()
    }
  }

  return (
    console.log(token),
    (
      <SafeAreaView style={styles.root}>
        {/* Header
        <View style={styles.navigationBar}>
          <CustomBackButton onPress={() => navigation.goBack()} />
          <Text style={styles.pageTitle}>Alterar Password</Text>
        </View>
        */}
        <View style={styles.infoContainer}>
            <Text style={styles.textTag}>Password atual</Text>
            <CustomInput placeholder={""} value={oldPass} setValue={setOldPass} secureTextEntry iconNameEntry='form-textbox-password' widthScale={0.8}/>

            <Text style={styles.textTag}>Password Nova</Text>
            <CustomInput placeholder={""} value={newPass} setValue={setNewPass} secureTextEntry iconNameEntry='form-textbox-password' widthScale={0.8}/>

            {/* Campo repetir nova password e testar se s??o iguais*/}
            <Text style={styles.textTag}> Confirmar Password</Text>
            <CustomInput placeholder={""} value={confirmPass} setValue={setConfirmPass} secureTextEntry iconNameEntry='form-textbox-password' widthScale={0.8}/>

        </View>

        <View style={styles.containerBTN}>
          <CustomButton
            onPress={() => validateForm()}
            text="Confirmar Altera????o"
            type = "TERTIARY"
            widthScale={0.8}
          ></CustomButton>
        </View>
      </SafeAreaView>
    )
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  navigationBar: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  pageTitle: {
    fontFamily: 'SoraMedium',
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
    // center the text
    alignSelf: 'center',
    // center the text horizontally
    flex: 1,
    textAlign: 'center',
    right: 20,
  },
  infoContainer: {
    marginHorizontal: 40,
    marginTop: 40,
    marginBottom: 40,
  },
  textTag: {
    fontFamily: 'SoraBold',
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
  },
  containerBTN: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: 40,
  }
})
