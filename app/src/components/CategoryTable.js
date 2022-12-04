import { color } from '@rneui/themed/dist/config';
import React, { Component } from 'react';
import { StyleSheet, View , Text, TouchableHighlight} from 'react-native';
import { Table, Row, Rows , TableWrapper, Col} from 'react-native-table-component';
import {FONTS,COLORS, SHADOWS, SIZES , CATEGORIES} from '../constants'
import { Ionicons, MaterialCommunityIcons,Entypo, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons'
import { Icon } from '@rneui/themed';

const CategoryTable = () => {
    const tableData = [];
    const editIcon =  <Entypo name="edit"
                        size={20}
                        color={COLORS.wingDarkBlue} />


    Object.keys(CATEGORIES).forEach(key => {
        const rowData = [];
        rowData.push(CATEGORIES[key].icon, CATEGORIES[key].name, '5%', editIcon);
        tableData.push(rowData);
      });    

    return (
        <View style={styles.container}>
          <Table borderStyle={{borderWidth: 0}}>
            <TableWrapper style={styles.wrapper}>
              <Rows data={tableData} flexArr={[0.3, 2, 0.5, 0.5]} style={styles.row} textStyle={styles.text}/>
            </TableWrapper>
          </Table>
          <View style={styles.container}>
          
      </View>
       </View>
      );
};

const styles = StyleSheet.create({
        container: { 
            flex: 1, 
            padding: 16, 
            paddingTop: 10, 
            backgroundColor: COLORS.eggshell },
        wrapper: { 
            flexDirection: 'row' },
        row: {  
            height: 40  },
        text: { 
            padding: 5,
            fontFamily: FONTS.medium,
            fontSize: SIZES.medium,
            color: COLORS.wingDarkBlue },
        roundshape:  {
            backgroundColor: 'lightgreen',
            height: 44, //any of height
            width: 44, //any of width
            justifyContent:"center",
            borderRadius: 22   // it will be height/2
            },
        item: {
            alignSelf: "center",
            color:"white"
            },
   
});
  
export default CategoryTable;