import { View, Text, Image,TouchableOpacity, useWindowDimensions } from 'react-native'
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
import {CustomBackButton, CustomButton} from '../components'

export default function ProfileScreen({ navigation }) {
  const { height } = useWindowDimensions();
  const [token, setToken] = useState('')

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

  /*
  Campos a editar:
  pass,
  foto,
  profissão
   */
  
  function getMonthName(month){
    const d = new Date();
    d.setMonth(month-1);
    const monthName = d.toLocaleString("pt-PT", {month: "long"});
    return monthName;
  }
  // handleData that converts 1990-10-12T00:00:00.000Z to 12 de Outubro de 1990
  function handleData(data){
    const date = new Date(data);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const newDate = day + " de " + getMonthName(month) + " de " + year;
    return newDate;
  }

  return (
    console.log(token),
    (
      <SafeAreaView style={styles.root}>
       
          <View style={styles.navigationBar}>
            <CustomBackButton  onPress={() => navigation.goBack()} />
            <Text style={styles.pageTitle}>Meu Perfil</Text>
          </View>

          <View style={{ alignSelf: 'center' }}>
            <View style={styles.profileImage}>
              {data.gender == 0 ? ( // man
                <Image
                  source={require('../../assets/images/male-avatar.png')}
                  style={styles.image}
                  resizeMode="center"
                ></Image>
              ) : (
                <Image
                  source={require('../../assets/images/female-avatar.png')}
                  style={styles.image}
                  resizeMode="center"
                ></Image>
              )}
            </View>
            {/* TO DO EDIT PICTURE*/}
            <View style={styles.addAvatar}>
              <MaterialCommunityIcons name="pencil-circle" size={48} color={COLORS.wingDarkBlue} />
            </View>
          </View>

          <View style={styles.nameContainer}>
            <Text style={{ fontFamily: 'SoraLight', fontSize: SIZES.extraLarge }}>
              {data ? data.name : 'Loading...'}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoLine}>
              <View style={styles.col1}><Text style={styles.textTag}>Email</Text></View>
              <View style={styles.col2}><Text style={styles.textInfo}>{data ? data.email : 'Loading...'}</Text></View>

              <View style={styles.col1}><Text style={styles.textTag}>Password</Text></View>
              <View style={styles.col2}><Text style={styles.textInfo}>{data ? "........." : 'Loading...'}</Text></View>

              <View style={styles.col1}><Text style={styles.textTag}>Aniversário</Text></View>
              <View style={styles.col2}><Text style={styles.textInfo}>{data ? handleData(data.birthdate) : 'Loading...'}</Text></View>
              
              <View style={styles.col1}><Text style={styles.textTag}>Género</Text></View>
              <View style={styles.col2}><Text style={styles.textInfo}>{data ? data.gender == 0 ? "Masculino" : "Feminino" : 'Loading...'}</Text></View>
            </View>
          </View>
          
          <View style={styles.containerBTN}>
            {/*
            <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")} style={[styles.button,{height: height*0.05}]}>
                <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity> 
            */}
            <CustomButton onPress={() => navigation.navigate("ProfileEdit")} text="Editar Perfil" type = "TERTIARY" widthScale={0.8}></CustomButton>
            <CustomButton onPress={() => navigation.navigate("PassEdit")} text="Alterar Password" type = "TERTIARY" widthScale={0.8}></CustomButton>
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
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom:10
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
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
    marginBottom:40
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
  infoLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  col1: {
    width: '40%',
    marginBottom:20
  },
  col2: {
    width: '60%',
    marginBottom:20
  },
  button: {
    backgroundColor: COLORS.wingDarkBlue,
    borderRadius: SIZES.small,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.base,
    width:"40%", 
    height:"80%"
  },
  containerBTN:{
    // Put the buttons at the bottom of the screen
   //position: 'absolute',
   //alignItems: "center",
   //justifyContent: "center",
   //bottom: "10%",
   //width: "100%",
   //  on the vertical center
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,

  },
  buttonText: {
    color: "white",
    fontSize: SIZES.small,
    fontFamily: "SoraBold"
  }
})
