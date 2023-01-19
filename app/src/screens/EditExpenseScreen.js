import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import AuthContext from '../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CATEGORIES, COLORS, SHADOWS, SIZES, FONTS } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'
import { serverURL } from '../config/hosts'
import { CustomBackButton, CustomButton, CustomInput, CustomTextButton } from '../components'
import { SelectList } from 'react-native-dropdown-select-list'
import { useRoute } from "@react-navigation/native"

export default function EditExpenseScreen({ navigation }) {
  const { height } = useWindowDimensions()
  const [token, setToken] = useState('')
  const route = useRoute()
  const idExpense = route.params?.idExpense;
  let modoEdicao = false;

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (token.id) {
      fetchData(token)
    }
  }, [token])

  const [purchaseData,setpurchaseData] = useState([])

  const fetchData = async (token) => {
    const resp = await fetch(`${serverURL}/purchases/getPurchase/${idExpense}`)
    const purchase = await resp.json()
    setpurchaseData(purchase[0])
  }

  function treatDate (date) {
    //Obtain the first 10 caracteres: data
    if (typeof date === 'string') {
      return date.slice(0, 10).replaceAll('-', '/').split('/').reverse().join('/')
  }
  }
  return ( console.log(purchaseData),
      <SafeAreaView style={styles.root}>
        <View style={styles.infoContainer}>
          <Text style={styles.textTitulos}>Título</Text>
          <Text style={styles.textComum}>{purchaseData.seller}</Text>
        </View>
        <View style={[{flexDirection:'row', alignContent: 'space-between', alignItems: 'stretch'}]}>
            <View style={[styles.infoContainer, {flex:1}]}>
              <Text style={styles.textTitulos}>Valor</Text>
              <Text style={styles.textComum}>{purchaseData.value}€</Text>
            </View>
            <View style={[styles.infoContainer,  {flex:1}]}>
              <Text style={styles.textTitulos}>Data</Text>
              <Text style={styles.textComum}>{treatDate(purchaseData.date)}</Text>
            </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textTitulos}>Categoria</Text>
          <Text style={styles.textComum}>{purchaseData.name}</Text>
        </View>
      </SafeAreaView>
    )

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.eggshell,
    marginTop: 20,
    marginHorizontal: 25
  },
  infoContainer: {
    padding: 10,
    flexWrap: 'wrap'
  },
  textTitulos: {
    color: COLORS.wingDarkBlue,
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    alignSelf: 'flex-start',
    paddingVertical:5
    
  },
  textComum: {
    color: COLORS.wingDarkBlue,
    padding:10,
    fontFamily: FONTS.medium,
    backgroundColor: COLORS.white,
    fontSize: SIZES.medium,
    alignSelf: 'flex-start',
    width:'100%',
    height: 45,
    flexShrink: 1 ,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.wingDarkBlue
  },
})
