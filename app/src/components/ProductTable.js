import React from 'react'
import { Table, Row, Data } from 'react-native-table-component'
import { Modal, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native'
import { COLORS,FONTS,SIZES } from '../constants'

import { MaterialIcons } from 'react-native-vector-icons'

const ProductTable = ({ products, handleDeleteProduct,getCategoryIcon }) => {
  const tableHead = ['Produto', 'Valor', 'Quant.', ' ']

  return (
    <Table>
      <Row
        data={tableHead}
        widthArr={[130, 85, 120]}
        style={styles.header}
        textStyle={styles.headerText}
      />
      {products.map((product, index) => (
        <Row
          key={index}
          data={[
            getCategoryIcon(product.idcategory),
            product.description,
            product.value,
            product.quantity,
            <MaterialIcons
              name="delete"
              size={24}
              color="black"
              onPress={() => handleDeleteProduct(index)}
            />,
          ]}
          widthArr={[40,100, 90, 50, 60]}
          style={styles.row}
          textStyle={styles.rowText}
        />
      ))}
    </Table>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 40,
          
          backgroundColor:  COLORS.wingDarkBlue,
          borderColor: COLORS.wingblue,
          borderWidth: 1,
          borderRadius: 30,
          marginBottom: 7,
          paddingLeft: 10
  },
  headerText: {
    padding: 5,
          fontFamily: FONTS.medium,
          fontSize: SIZES.medium,
          color: COLORS.white,
  },
  row: {

    height: 50 , 
            paddingLeft: 10,
            marginBottom: 7,
            borderRadius: 10,
            backgroundColor: COLORS.white,
  },
  rowText: {
    fontSize: 14,
  },
})

export default ProductTable
