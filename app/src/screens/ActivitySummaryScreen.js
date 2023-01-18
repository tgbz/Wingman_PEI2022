import { View, Text, Image, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native'
import React from 'react'
import { CATEGORIES, CATEGORIESCOLORS, COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'
import ActivityTable from '../components/ActivityTable'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { serverURL } from '../config/hosts'



export default function PoliticsScreen({navigation}){
  const width = Dimensions.get('window').width;
  const [token, setToken] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => {
        setToken(JSON.parse(userToken))})
      .catch((err) => console.log(err))
  }, [])

  const [transactionsData,setTransactionsData] = useState([])
  const fetchData = async (token) => {
    const resp = await fetch(`${serverURL}/purchases/getAllPurchase/${token.id}`)
    const transData = await resp.json()
    setTransactionsData(transData)
  }
  // Put transaction data on dd/mm/aa format
  function treatDate (date) {
    //Obtain the first 10 caracteres: data
    if (typeof date === 'string') {
      return date.slice(2, 10).replaceAll('-', '/').split('/').reverse().join('/')
  }
  }

  const transactionsList = []
  // Extract only the wanted info from the request to api 
  function adjustData( transData) {
    transData.forEach(element => {
      let obj = {date: treatDate(element.date), transaction: element.seller, value: element.value, category: element.idcategory, type: element.type}
      transactionsList.push(obj)
    });
  }
  useEffect(() => {
    if (token.id) {
      fetchData(token)
    }
  }, [token])

 
  const chartConfig = {
    backgroundColor: COLORS.white,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(25, 95, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    }};


  return ( adjustData(transactionsData), 
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.eggshell}}>
      <ScrollView>
        <View><ActivityTable data={transactionsList} headerType={true}></ActivityTable></View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  item: {
    color: COLORS.wingDarkBlue,
    alignSelf: 'flex-end',
    paddingRight: 15
  }

});
