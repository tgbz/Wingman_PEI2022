import { View, Text, Image, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native'
import React from 'react'
import { CATEGORIES, CATEGORIESCOLORS, COLORS, FONTS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView, State } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { serverURL } from '../config/hosts'
import {Entypo,Ionicons,Octicons } from '@expo/vector-icons'
import { CheckBox, Icon } from '@rneui/themed';

const catgsArray = {
    11: true,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    18: false,
    19: true,
    20: false,
    21: false,
    22: false,
    23: false,
    24: false,
    25: false,
    26: false,
    27: false,
}
export default function FilterScreen({navigation}){
    const {width} = useWindowDimensions();
    const [valorSelect, setValorSelect] = useState(0) // 0 = Todos, 1 - Debito , 2 - Credito
    const [checks, setChecks] = useState(catgsArray); // Setting default value

    const catgs = [11,12,13,14,15,16,18,19,20,21,22,23,24,25,26,27]

    const handleAddChecks = (value) => {
      checks[value] = !checks[value];
      setChecks({...checks});
      console.log("Checks no fim", checks)
        
    };
    

    function showAllCategories(){
      const checksv2 = Object.keys(checks);
      return checksv2.map(key => {
          return <CheckBox
            title={CATEGORIES[key].name}
            checked={checks[key]}
            key={key}
            onPress={() => {handleAddChecks(key)}}
            containerStyle={{backgroundColor: COLORS.eggshell, padding: 3}}
            checkedColor ={CATEGORIESCOLORS[key]}
            uncheckedColor = {COLORS.wingDarkBlue}
          />
      })
    }

    const getColor = (actVal) => {
        if (valorSelect == actVal) return [COLORS.wingDarkBlue, COLORS.white]
        return [COLORS.white, COLORS.wingDarkBlue]
    }
    return ( 
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.eggshell}}>
      <ScrollView>
        <View style={styles.valor}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
                <TouchableOpacity onPress={() => setValorSelect(0)} style={[styles.button, {width: width/3- 25, backgroundColor: getColor(0)[0]}]}>
                <Text style={[styles.textValor, {color:getColor(0)[1]}]}>Todos </Text >
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setValorSelect(1)} style={[styles.button,  {width: width/3-25, backgroundColor: getColor(1)[0]}]}>
                <Text style={[styles.textValor, {color:getColor(1)[1]}]}>Débito </Text >
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setValorSelect(2)} style={[styles.button,  {width: width/3-25, backgroundColor: getColor(2)[0]}]}>
                <Text style={[styles.textValor, {color:getColor(2)[1]}]}>Crédito </Text >
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.valor}>
            <Text style={styles.text}>Categorias </Text>
            {showAllCategories()}
            
        </View>

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
  valor: {
    margin: 15,
    padding: 10,
  },
  text : {
    fontFamily: 'SoraMedium',
    fontSize: SIZES.medium,
  },
  button: {
    backgroundColor: COLORS.wingDarkBlue,
    borderRadius: 20,
    height: 40,
    borderWidth: 1, 
    borderColor: COLORS.wingDarkBlue
  },
  textValor : {
    color: 'white', 
    fontFamily: 'SoraMedium', 
    fontSize: SIZES.font, 
    alignContent: 'center', 
    alignItems: 'center', 
    alignSelf:'center',
    paddingVertical: 8
},

});


