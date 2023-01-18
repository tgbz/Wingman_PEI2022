import React from 'react';
import { StyleSheet, View,Modal,Text,Button,TouchableOpacity, processColor } from 'react-native';
import { Table, Rows , TableWrapper, Row} from 'react-native-table-component';
import {FONTS,COLORS, SIZES , CATEGORIES, SIGNS} from '../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons';
var accents = require('remove-accents');

const ActivityTable = ({data,headerHome, navigation}) => {
    const tableData = [];
    // create the table
    const getTable = () => {
      data.forEach(element => {
        //console.log(element.data)
        let value = element.value
        if (headerHome) value = value + '€'
        let id  =  2
        let transaction = <TouchableOpacity><Text style={[styles.text, {textDecorationLine: 'underline'}, {fontFamily: FONTS.bold }]}>{element.transaction}</Text></TouchableOpacity>
        tableData.push([CATEGORIES[element.category].icon, transaction, element.date, SIGNS[accents.remove(element.type)].icon, value]);
     });
    }  
    const headTable = ['','Transação', 'Data', 'Valor (€)']
    const HomeTable = ['','Resumo de Atividade', '', <TouchableOpacity onPress={() => navigation.navigate('ActivitySummary')}><MaterialCommunityIcons name="eye-plus-outline" size={24} color="#ee821a"/></TouchableOpacity>]
  
    return (
        getTable(),
        <View style={styles.container}>
          <Table borderStyle={{borderWidth: 0}}>
          { headerHome ?
                <Row data={HomeTable} style={headerHome? styles.HeadStyleHome: styles.HeadStyle} flexArr={[0.1,1.7, 0.7, 0.3]} textStyle={styles.textHeaders}/>: 
                <Row data={headTable} style={headerHome? styles.HeadStyleHome: styles.HeadStyle} flexArr={[0.1,1.7, 0.7, 0.7]} textStyle={styles.textHeaders}/>}
            <TableWrapper style={styles.wrapper}>
              <Rows data={tableData} flexArr={[0.3,1.3, 0.6,0.1, 0.6]} style={styles.row} textStyle={styles.text}/>
            </TableWrapper>
          </Table>
         
       </View>
      );
};

const styles = StyleSheet.create({
        container: { 
          marginHorizontal: 20,
          marginTop: '3%',
             },
        button:{
          alignSelf:'flex-end'
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
        verMais: {
          color: '#ee821a',
          fontFamily: 'SoraBold'
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

        HeadStyleHome: { 
            height: 40,
            alignContent: "center",
            backgroundColor: COLORS.wingDarkBlue,
            borderColor: COLORS.wingDarkBlue,
            opacity:0.96,
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 7,
            height: 50 , 
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