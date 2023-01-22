import React from 'react'
import { Table, Row, Data } from 'react-native-table-component'
import { Modal, Text, TextInput, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native'
import { COLORS,FONTS,SIZES, CATEGORIES } from '../constants'
import ProductTable from './ProductTable'
import { MaterialIcons } from 'react-native-vector-icons'

const OCRExpense = ({ products, handleDeleteProduct,getCategoryIcon }) => {
    function getCategoryIcon(selectedCategory) {
        //console.log('get icon: ' + selectedCategory)
        // loop through the CATEGORIES object
        // get icon by key
        for (const [key, value] of Object.entries(CATEGORIES)) {
          if (key == selectedCategory) {
            return value.icon
          }
        }
        // if no match is found, return null
        return null
      }


  return (
    <ScrollView>
    <TouchableOpacity style={styles.button}><Text> Guardar</Text></TouchableOpacity>
    <ProductTable
        products={products}
        handleDeleteProduct={handleDeleteProduct}
        getCategoryIcon={getCategoryIcon}
    />
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor:COLORS.wingblue,
    justifyContent:'center',
    height: 45,
    borderRadius:15,
    marginBottom: 10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
})

export default OCRExpense
