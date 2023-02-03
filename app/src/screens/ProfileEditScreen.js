import { View, Text, Image, TouchableOpacity, useWindowDimensions,TextInput } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native'
import { serverURL } from '../config/hosts'
import { MaterialIcons } from '@expo/vector-icons'
import {  CustomButton } from '../components'
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function ProfileEditScreen({ navigation }) {
  const { height, width } = useWindowDimensions()
  const [token, setToken] = useState('')

  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState(new Date())
  const data_gender = [
    { key: '0', value: 'Masculino' },
    { key: '1', value: 'Feminino' },
    { key: '2', value: 'Outro' },
  ]
  const [gender, setGender] = useState('2')
  const [selected, setSelected] = React.useState('2')
  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err))
  }, [])

  const [data, setData] = useState([])
  const fetchData = async (token) => {
    //console.log(serverURL + '/users/userProfile/' + token.id)
    const resp = await fetch(`${serverURL}/users/userProfile/${token.id}`)
    const data = await resp.json()
    setData(data)
    setGender(data.gender)
    setBirthdate(new Date(data.birthdate))
    setName(data.name)
    console.log('---------------\nUser fetch data: ' + JSON.stringify(data))
  }
  // request data from server
  useEffect(() => {
    console.log('Request data ' + token.id)
    if (token.id) {
      fetchData(token)
    }
  }, [token])

  // handleFormSubmission that sends the information to the server to update the user
  // get user data and send it to the server updating the variables that were changed
  // if error occurs, it will show an alert
  // if success, it will show an alert and redirect to the profile screen
  const handleFormSubmission = async () => {
    const newData = {
      name: name,
      gender: selected,
      birthdate: birthdate.toISOString().slice(0, 10),
    }
    // merge the two objects
    //const updatedData = { ...userData, ...newData }
    //console.log(updatedData)
    const resp = await fetch(`${serverURL}/users/userProfile/${token.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    }).then((resp) => {
      if (resp.status === 200) {
        alert('Dados atualizados com sucesso!')
        navigation.navigate('Profile', { refresh: true })
      } else {
        alert('Erro ao atualizar dados!')
      }
    })
  }

  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setBirthdate(currentDate)
  }

  return (
    //console.log('--------------\nToken data: ' + JSON.stringify(token) + '\n--------------'),
    (
      <SafeAreaView style={styles.root}>

        <View style={styles.infoContainer}>
          {/* Name input */}
          <Text style={styles.textTag}>Nome</Text>
          <View style={[styles.buttonStyle, { width: width * 0.8 }]}>
          <TextInput

            placeholder={`${data.name}`}
            onChangeText={setName}
            style={styles.textButton}
          >
            {name}
          </TextInput>
        </View>


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
            defaultOption={{key:gender, value:data_gender[gender].value}}
            fontFamily="SoraLight"
            boxStyles={styles.selectList}
            inputStyles={styles.textButton}
            dropdownStyles={styles.dropdownStyles}
          />

          {/* Birthdate input */}
          <Text style={styles.textTag}>Data de Nascimento</Text>
          <View
          style={[
            styles.buttonStyle,
            { width: width * 0.8, flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <Text style={styles.textButton}>
            {birthdate.getDate() +
              '/' +
              (birthdate.getMonth() + 1 < 10
                ? '0' + (birthdate.getMonth() + 1)
                : birthdate.getMonth() + 1) +
              '/' +
              birthdate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => setShow(!show)}>
            <MaterialIcons name="date-range" size={18} color={COLORS.wingDarkBlue} />
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthdate}
            mode={mode}
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onChange}
            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
          />
        )}
        </View>
        

        <View style={styles.containerBTN}>
          <CustomButton
            onPress={() => handleFormSubmission()}
            text="Guardar Alterações"
            type="TERTIARY"
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
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonStyle: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: COLORS.wingblue,
    alignItems: 'center',
  },
  textButton: {
    flex: 1,
    fontFamily: 'SoraRegular',
    fontSize: SIZES.font,
    color: COLORS.wingDarkBlue,
    marginStart: 10,
  }
})
