import React from 'react';
import { StyleSheet, View,Modal,Text,Button, processColor } from 'react-native';
import { Table, Rows , TableWrapper, Row} from 'react-native-table-component';
import {FONTS,COLORS, SIZES , CATEGORIES, SIGNS} from '../constants'
import {Entypo,AntDesign } from '@expo/vector-icons'
var accents = require('remove-accents');

const ActivityTable = ({data}) => {
    const tableData = [];
    // create the table
    const getTable = () => {
      data.forEach(element => {
        //console.log(element.data)
        tableData.push([CATEGORIES[element.category].icon, element.transaction, element.date, SIGNS[accents.remove(element.type)].icon, element.value]);
     });
    }  
    const headTable = ['','Transação', 'Valor (€)']

    return (
        getTable(),
        <View style={styles.container}>
          <Table borderStyle={{borderWidth: 0}}>
          <Row data={headTable} style={styles.HeadStyle} flexArr={[0.1,1.7, 0.7, 0.7]} textStyle={styles.textHeaders}/>
            <TableWrapper style={styles.wrapper}>
              <Rows data={tableData} flexArr={[0.3,1.3, 0.6,0.1, 0.6]} style={styles.row} textStyle={styles.text}/>
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
            paddingTop: 20, 
             },
        wrapper: { 
            flexDirection: 'row' },
        row: {  
            height: 50 , 
            paddingLeft: 10,
            marginBottom: 7,
            borderRadius: 10,
            backgroundColor: COLORS.white,
          },
        text: { 
            padding: 5,
            fontFamily: 'SoraSemiBold',
            fontSize: SIZES.small,
            color: COLORS.wingDarkBlue 
          },

        textHeaders: { 
          padding: 5,
          fontFamily: FONTS.medium,
          fontSize: SIZES.medium,
          color: COLORS.white,
        },
        roundshape:  {
            backgroundColor: 'lightgreen',
            height: 44, //any of height
            width: 44, //any of width
            justifyContent:"center",
            borderRadius: 22   // it will be height/2
            },

        HeadStyle: { 
            height: 40,
            alignContent: "center",
            backgroundColor:  COLORS.wingblue,
            borderColor: COLORS.wingblue,
            borderWidth: 1,
            borderRadius: 30,
            marginBottom: 7
            },
        item: {
            alignSelf: "center",
            color:"white"
            },
            centeredView: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              },
              modalView: {
                border: 1,
                borderColor: COLORS.wingDarkBlue,
                marginTop: 400,
                margin: 20,
                backgroundColor:COLORS.white,
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2
                },
            }
   
});
  
export default ActivityTable;