import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { useState,useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import { serverURL } from '../config/hosts'

import {ProgressChart} from 'react-native-chart-kit';
import * as _ from 'lodash'; //Fazer Clone dos objetos
import { CurrentRenderContext } from '@react-navigation/native';

 function HomeScreen({navigation}) {
  const [token,setToken] = useState("");
  const { signOut } = React.useContext(AuthContext);
  useEffect(() => {
       AsyncStorage.getItem('userToken')
       .then(userToken => setToken(JSON.parse(userToken)))
       .catch(err => console.log(err))
  }, [])

  const getCategories = async () => {
    // fecth data from serverURL/users/userCategory/:id and print it
    console.log(`${serverURL}+'/categories/userCategory/'+${token.id}`)
    const resp = await fetch(`${serverURL}/categories/userCategory/${token.id}`)
    const data = await resp.json()
    console.log(data)
  }
  
// Donut Charts
// ----------------------------------------------------------------------------------------

const screenWidth = Dimensions.get("window").width;
const [categoryData, setCategoryData] = useState([])
const noCategoryChartDataExample = {
  labels: ["No Category"], // optional
  data: [0.4]
};

const essencial_selector = 1
const non_essencial_selector = 2
const investment_selector = 3
const charts_height = 100

const chartConfig = {
  backgroundGradientFrom: COLORS.white,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: COLORS.white,
  backgroundGradientToOpacity: 1,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(25, 95, 255, ${opacity})`,
  style: {
    borderRadius: 16,
}};
  
useEffect(() => {
  AsyncStorage.getItem('userToken')
    .then((userToken) => setToken(JSON.parse(userToken)))
    .catch((err) => console.log(err))
}, [])

const fetchData = async (token) => {
  const resp = await fetch(`${serverURL}/categories/userCategory/${token.id}`)
  const categoryData = await resp.json()
  setCategoryData(categoryData)
}

useEffect(() => {
  if (token.id) {
    fetchData(token)
  }
}, [token])

function transformToNoCategoryData(selector, categoryData) {
  const data = {}
  let spent = 0, total_plafond = 0
  categoryData.forEach(element => {
    if(parseInt(element.is_essential) == selector) {
      total_plafond += parseInt(element.plafond)
      spent += parseInt(element.total_spent)
    }
  });

  if(spent >= total_plafond) {
    data.data = [1]
  }
  else
    data.data = [spent / total_plafond]

  data.labels = [selector]
  return(data)
}

  return (
    <View style={styles.container}>
      <View style >
        <Text>Welcome {token.name}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.charts}>
          <ProgressChart
            data={transformToNoCategoryData(essencial_selector, categoryData)}
            width={screenWidth/3}
            height={charts_height}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={true}
          />
          <Text style={styles.charts_text}>Essenciais</Text>
        </View>
        <View style={styles.charts}>
          <ProgressChart
            data={transformToNoCategoryData(non_essencial_selector, categoryData)}
            width={screenWidth/3}
            height={charts_height}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={true}
          />
          <Text style={styles.charts_text}>Não Essenciais</Text>
        </View>
        <View style={styles.charts}>
          <ProgressChart
            data={transformToNoCategoryData(investment_selector, categoryData)}
            width={screenWidth/3}
            height={charts_height}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={true}
          />
          <Text style={styles.charts_text}>Investimentos</Text>
        </View>
      </View>
      <View>
        <Button title="Log out" onPress={() => signOut()} />
      </View>
      <View>
        <Button title="Perfil" onPress={() => navigation.navigate("Profile")} />
      </View>
      <View>
        <Button title="Definir Políticas de Consumo" onPress={() => navigation.navigate("PoliticsSuggestion")} />
      </View>
      <View>
        <Button title="Resumo de Atividade" onPress={() => navigation.navigate("ActivitySummary")} />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  charts: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: { 
    padding: 5,
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue
  },
  charts_text: { 
    padding: 5,
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
  },
    
});

export default HomeScreen;