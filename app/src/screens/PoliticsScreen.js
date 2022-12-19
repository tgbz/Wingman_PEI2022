import { View, Text, Image, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native'
import React from 'react'
import { CATEGORIES, CATEGORIESCOLORS, COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'
import {PieChart} from 'react-native-chart-kit';
import CategoryTable from '../components/CategoryTable'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { serverURL } from '../config/hosts'

export default function PoliticsScreen(){
  const width =Dimensions.get('window').width;
  const [token, setToken] = useState('')

  const finalCategoryData = []
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

  const [categoryData, setCategoryData] = useState([])
  const fetchData = async (token) => {
    const resp = await fetch(`${serverURL}/categories/userCategory/${token.id}`)
    const categoryData = await resp.json()
    setCategoryData(categoryData)
  }

  function adjustData( categoryData) {
    categoryData.forEach(element => {
        let obj = {category: element.idcategory, plafond: element.plafond}
        finalCategoryData.push(obj)
  
    });
  }

 
  const data =[
    {category: "Casa", 
    color: "#e72a31", 
    legendFontColor: "black", 
    plafond: 10}, 
    {
      category: 'Mobilidade',
      plafond: 7,
      color: '#f26c3d',
      legendFontColor: 'black',

    },
    {
      category: 'Família',
      plafond: 7,
      color: '#f7a541',
      legendFontColor: 'black',

    },
    {
      category: 'Impostos e Taxas',
      plafond: 7,
      color: '#f9f037',
      legendFontColor: 'black',

    },
    {
      category: 'Desporto',
      plafond: 7,
      color: '#96c950',
      legendFontColor: 'black',

    },
    {
      category: 'Cultura e Hobbies',
      plafond: 7,
      color: '#139751',
      legendFontColor: 'black',

    },
    {
      category: 'Restaurantes e Cafés',
      plafond: 7,
      color: '#177449',
      legendFontColor: 'black',

    },
    {
      category: 'Saúde',
      plafond: 7,
      color: '#11a9a4',
      legendFontColor: 'black',

    },
    {
      category: 'Viagens',
      plafond: 7,
      color: '#5fc0eb',
      legendFontColor: 'black',

    },
    {
      category: 'Educação',
      plafond: 7,
      color:'#0b77bf'  ,
      legendFontColor: 'black',

    },
    {
      category: 'Sem Categoria',
      plafond: 2,
      color: '#C0bdbd',
      legendFontColor: 'black',

    },
    {
      category: 'Crédito e Comissões',
      plafond: 7,
      color: "#5253a5",
      legendFontColor: 'black',

    },
    {
      category: 'Supermercado e Lojas',
      plafond: 7,
      color: "#743c9b",
      legendFontColor: 'black',

    },
    {
      category: 'Seguros',
      plafond: 7,
      color: '#9c3496',
      legendFontColor: 'black',

    },
    {
      category: 'Entretenimento',
      plafond: 7,
      color: '#a71c70',
      legendFontColor: 'black',

    },
    {
      category: 'Investimentos',
      plafond: 7,
      color: '#db427a',
      legendFontColor: 'black',

    },
    
  ];
 
  const chartConfig = {
    backgroundColor: COLORS.white,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(25, 95, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    }};
   
  
  return ( adjustData(categoryData), 
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.eggshell}}>
      <ScrollView>
        <View style={styles.container}>
          <PieChart
            data={data}
            width={width - 16}
            paddingLeft={width / 4}
            height={220}
            hasLegend={false}
            chartConfig={chartConfig}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            accessor="plafond"
            backgroundColor= {COLORS.eggshell}
          />
        </View>
        <View><CategoryTable data={finalCategoryData}></CategoryTable></View>
        
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

});
