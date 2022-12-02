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
import { CustomBackButton, CustomButton, CustomInput, CustomTextButton } from '../components'
import { SelectList } from 'react-native-dropdown-select-list'

export default function ProfileEditScreen({ navigation }) {
  const { height } = useWindowDimensions()
  const [token, setToken] = useState('')

  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const data_gender = [
    { key: '0', value: 'Masculino' },
    { key: '1', value: 'Feminino' },
    { key: '2', value: 'Outro' },
  ]
  const [selected, setSelected] = React.useState('2')

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
    setData(data)
    setSelected(data.gender)
    setBirthdate(data.birthdate.substring(0, 10))
    setName(data.name)
  }
  // request data from server
  useEffect(() => {
    console.log('Entered useEffect' + token.id)
    if (token.id) {
      fetchData(token)
    }
  }, [token])

  /*
  Campos a editar:
  pass,
  foto,
  profissão
   */
  // handleFormSubmission that sends the information to the server to update the user
  // get user data and send it to the server updating the variables that were changed
  // if error occurs, it will show an alert
  // if success, it will show an alert and redirect to the profile screen
  const handleFormSubmission = async () => {
    // get user data object that is already in the state
    const userData = data
    // do an object with the new data
    //
    const newData = {
      name: name,
      gender: selected,
      birthdate: birthdate,
    }
    // merge the two objects
    const updatedData = { ...userData, ...newData }
    console.log(updatedData)
    const resp = await fetch(`${serverURL}/users/updateProfile/${token.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    }).then((resp) => {
      if (resp.status === 200) {
        alert('Dados atualizados com sucesso!')
        navigation.navigate('Profile')
      } else {
        alert('Erro ao atualizar dados!')
      }
    })
  }

  return (
    console.log(token),
    (
      <SafeAreaView style={styles.root}>
        <View style={styles.navigationBar}>
          <CustomBackButton onPress={() => navigation.goBack()} />
          <Text style={styles.pageTitle}>Editar Perfil</Text>
        </View>
        
        <View style={styles.infoContainer}>
          {/* Name input */}
          <Text style={styles.textTag}>Nome</Text>
          <CustomInput placeholder={`${data.name}`} value={name} setValue={setName} widthScale={0.8}/>

          {/* Gender input */}
          {console.log('Gender selection: ' + selected)}
          <Text style={styles.textTag}>Género</Text>
          <SelectList
            setSelected={(val) => {
              val === 'Feminino'
                ? setSelected('1')
                : val === 'Masculino'
                ? setSelected('0')
                : setSelected('2')
            }}
            data={data_gender}
            save="value"
            search={false}
            //defaultOption={{key: data.gender, value: data_gender.find(x => x.key == data.gender).value}}
            fontFamily="SoraLight"
            boxStyles={styles.selectList}
            inputStyles={[styles.text, { color: 'black' }]}
            dropdownStyles={styles.dropdownStyles}
          />

          {/* Birthdate input */}
          <Text style={styles.textTag}>Data de Nascimento</Text>
          <CustomInput
            placeholder={'aaaa-mm-dd'}
            value={birthdate}
            setValue={setBirthdate}
            iconNameEntry="date-range"
            widthScale={0.8}
          />
        </View>

        <View style={styles.containerBTN}>
          {/* 
            <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")} style={[styles.button,{height: height*0.05}]}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          */}
          <CustomButton
            onPress={() => handleFormSubmission()}
            text="Guardar Alterações"
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
    // in case i wanto to add a button in the right side
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
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  addAvatar: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 5,
    right: 1,
    height: 50,
    width: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
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
  textInfo: {
    //marginLeft: 30,
    fontFamily: 'SoraLight',
    fontSize: SIZES.medium,
  },
  button: {
    backgroundColor: COLORS.wingDarkBlue,
    borderRadius: SIZES.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.base,
    width: '40%',
    height: '80%',
  },
  containerBTN: {
    // Put the buttons at the bottom of the screen
    //position: 'absolute',
    //alignItems: "center",
    //justifyContent: "center",
    //bottom: "10%",
    //width: "100%",
    //  on the vertical center
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: SIZES.small,
    fontFamily: 'SoraBold',
  },
  selectList: {
    backgroundColor: 'white',
    borderColor: COLORS.wingblue,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 12,
    borderWidth: 1,
  },
  dropdownStyles: {
    maxHeight: 120,
    backgroundColor: 'white',
    borderColor: COLORS.wingblue,
  },
  text: {
    color: COLORS.wingDarkBlue,
    fontFamily: 'SoraLight',
    fontSize: 15,
    alignSelf: 'flex-start',
  },
})
