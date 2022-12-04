import { View, Text, Image, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native'
import React from 'react'
import { COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { CustomBackButton, CustomButton, CustomInput, CustomTextButton } from '../components'
import {PieChart} from 'react-native-chart-kit';
import CategoryTable from '../components/CategoryTable'
export default function PoliticsScreen(){
  const width =Dimensions.get('window').width;
  const data =[
    {
      category: 'Casa',
      percentage: 1,
      color: '#e72a31',
      legendFontColor: 'black',

    },
    {
      category: 'Mobilidade',
      percentage: 1,
      color: '#f26c3d',
      legendFontColor: 'black',

    },
    {
      category: 'Impostos e Taxas',
      percentage: 1,
      color: '#f9f037',
      legendFontColor: 'black',

    },
    {
      category: 'Desporto',
      percentage: 1,
      color: '#96c950',
      legendFontColor: 'black',

    },
    {
      category: 'Cultura e Hobbies',
      percentage: 1,
      color: '#139751',
      legendFontColor: 'black',

    },
    {
      category: 'Restaurantes e Cafés',
      percentage: 1,
      color: '#177449',
      legendFontColor: 'black',

    },
    {
      category: 'Saúde',
      percentage: 1,
      color: '#11a9a4',
      legendFontColor: 'black',

    },
    {
      category: 'Viagens',
      percentage: 1,
      color: '#5fc0eb',
      legendFontColor: 'black',

    },
    {
      category: 'Educação',
      percentage: 1,
      color:'#0b77bf'  ,
      legendFontColor: 'black',

    },
    {
      category: 'Sem Categoria',
      percentage: 1,
      color: '#C0bdbd',
      legendFontColor: 'black',

    },
    {
      category: 'Crédito e Comissões',
      percentage: 1,
      color: "#5253a5",
      legendFontColor: 'black',

    },
    {
      category: 'Supermercado e Lojas',
      percentage: 1,
      color: "#743c9b",
      legendFontColor: 'black',

    },
    {
      category: 'Seguros',
      percentage: 1,
      color: '#9c3496',
      legendFontColor: 'black',

    },
    {
      category: 'Entretenimento',
      percentage: 1,
      color: '#a71c70',
      legendFontColor: 'black',

    },
    {
      category: 'Investimentos',
      percentage: 1,
      color: '#db427a',
      legendFontColor: 'black',

    },
  ];
  const chartConfig = {
    backgroundColor: COLORS.eggshell,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(25, 95, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    }};
  return (
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
            accessor="percentage"
            backgroundColor= {COLORS.eggshell}
          />
        </View>
        <View><CategoryTable></CategoryTable></View>
        
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
