import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { CATEGORIES, COLORS, SIZES } from '../constants'
import React from 'react'
import { useState, useEffect } from 'react'

import CustomButton from '../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
export default function TypeTransaction({valorSelected, setValorSelect}) {
    const width = Dimensions.get('window').width;
    const [valorSelectHere, setValorSelectHere] = useState(valorSelected) // 0 = Todos, 1 - Debito , 2 - Credito

    const getColor = (actVal) => {
        if (valorSelectHere == actVal) return [COLORS.wingDarkBlue, COLORS.white]
        return [COLORS.white, COLORS.wingDarkBlue]
      }
  return (
    <View>
              <Text style={styles.text}>Valor (€)</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
                <TouchableOpacity onPress={() => (setValorSelectHere(0), setValorSelect(0))} style={[styles.button, {width: width/3- 25, backgroundColor: getColor(0)[0]}]}>
                  <Text style={[styles.textValor, {color:getColor(0)[1]}]}>Todos </Text >
                </TouchableOpacity>
                <TouchableOpacity onPress={() => (setValorSelectHere(1), setValorSelect(1))} style={[styles.button,  {width: width/3-25, backgroundColor: getColor(1)[0]}]}>
                  <Text style={[styles.textValor, {color:getColor(1)[1]}]}>Débito </Text >
                </TouchableOpacity>
                <TouchableOpacity onPress={() => (setValorSelectHere(2), setValorSelect(2))} style={[styles.button,  {width: width/3-25, backgroundColor: getColor(2)[0]}]}>
                  <Text style={[styles.textValor, {color:getColor(2)[1]}]}>Crédito </Text >
                </TouchableOpacity>
              </View>
              </View>
              )
}

const styles = StyleSheet.create({
  

      text: {
        marginTop:30, 
        fontFamily: 'SoraBold',
        fontSize: SIZES.extraLarge,
      },
      button: {
        backgroundColor: COLORS.wingDarkBlue,
        borderRadius: 35,
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.wingDarkBlue
      },
      textValor: {
        color: 'white',
        fontFamily: 'SoraMedium',
        fontSize: SIZES.medium,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 8
      },
    
})
