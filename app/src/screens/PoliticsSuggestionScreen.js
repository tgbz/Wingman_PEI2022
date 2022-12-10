import {
    View,
    Text,
    Image,
    useWindowDimensions,
    SafeAreaView,
    Button,
    StyleSheet,
    LogBox,
  } from 'react-native'
  import {Card, Title, Paragraph } from 'react-native-paper'
  import React from 'react'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import { COLORS, SHADOWS, SIZES } from '../constants'
  import { useState, useEffect } from 'react'
  import { serverURL } from '../config/hosts'
  import { AntDesign } from '@expo/vector-icons'
  import { CustomBackButton, CustomButton } from '../components'
  import { useRoute } from '@react-navigation/native'
  //LogBox.ignoreLogs(['Asyncstorage: ...']);
  export default function PoliticsSuggestionScreen({ navigation }) {
    const { height } = useWindowDimensions()
    const [token, setToken] = useState('')
    const [contas, setContas] = useState([])
  
    useEffect(() => {
      AsyncStorage.getItem('userToken')
        .then((userToken) => setToken(JSON.parse(userToken)))
        .catch((err) => console.log(err))
    }, [])
  
    return (
      <SafeAreaView style={styles.root}>
        
        <View style={styles.Maincontainer}>
          {/* for every account in contas make a container 
          #ef767a #456990 #49beaa
          #f6511d #ffb400 #00a6ed
          #db2b39 #29335c #f3a712
          #ffaf87 #ff8e72 #ed6a5e
          */}
          <View style={[styles.container,{backgroundColor: "#db2b39"}]} >
            <Text  style={[styles.textTag,{textAlign: "center",lineHeight: 40}]}><Text style={{fontSize:30, fontFamily:'SoraRegular'}}>50% </Text> do orçamento deve ter como objetivo os gastos essenciais e fixos todos os meses.</Text>
          </View>

          <View style={[styles.container,{backgroundColor: "#29335c"}]} >
            <Text  style={[styles.textTag,{textAlign: "center",lineHeight: 40}]}> <Text style={{fontSize:30, fontFamily:'SoraRegular'}}>30% </Text> pode ser alocado a gastos não essenciais, como viagens, compra de roupas ou refeições fora.</Text>
          </View>

          <View style={[styles.container,{backgroundColor: "#f3a712"}]} >
            <Text  style={[styles.textTag,{textAlign: "center",lineHeight: 40}]}> <Text style={{fontSize:30, fontFamily:'SoraRegular'}}>20% </Text> deve ser guardado para colocar em poupanças ou fazer investimentos financeiros.</Text>
          </View>

       </View>
        <View style={styles.containerBTN}>
          <CustomButton
            onPress={() => navigation.navigate('Politics')}
            text="Criar Política"
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
      fontFamily: 'SoraLight',
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
          top: 22
      }
  
  })
  