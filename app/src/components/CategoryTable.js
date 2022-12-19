import React, { useState } from 'react';
import { StyleSheet, View,Modal,Text,Button, processColor, TextInput , TouchableOpacity} from 'react-native';
import { Table, Rows , TableWrapper} from 'react-native-table-component';
import {FONTS,COLORS, SIZES , CATEGORIES} from '../constants'
import {Entypo,AntDesign, FontAwesome5, MaterialIcons, Feather} from '@expo/vector-icons'


  

const CategoryTable = ({data}) => {
    const tableData = [];
    const [value, setValue] = useState('');
    const [edit, setEdit] = useState(false);
    const [categories, setCategories] = useState({"categories": [{"idcategory": 15, "plafond": 100}]})
    const [provCat, setProvCat] = useState({"categories": [{"idcategory": 15, "plafond": 100}]})
  
    const category = {idcategory: 15, plafond: 105}
   
    function handleChanges (id, value) {
      let algo = provCat;
      let done = false
      algo.categories.forEach(elem => {
        if (elem.idcategory === id){
            elem.plafond = value;
            done = true }
      })
      if (!done) {
        const obj = {'idcategory': id, 'plafond': value}
        algo.categories.push(obj)
      }
   
      //console.log(value, id)
      //console.log(some_array)
      setProvCat(algo)
      //console.log(provCat)
    }
  

const inputField = (id, plafond) => {  
  return <TextInput
          key = {id}
          onChangeText={(text) => handleChanges(id, text)}
          placeholder={plafond}
          style={[styles.text, { color: COLORS.wingDarkBlue, backgroundColor: COLORS.eggshell, fontSize: 14}]}
/>}
    // create the table

    const showValue = (idcategory, plafond) => {
      return edit? inputField(idcategory, plafond) : plafond
    }
    const getTable = () => {
      data.forEach(elem => {
          tableData.push([CATEGORIES[elem.category].icon, CATEGORIES[elem.category].name,showValue(elem.category, elem.plafond), '€']);
        })
    }  

    //Button to edit all fields of the politics
    const editButton =  
      <TouchableOpacity onPress={() => {edit? setEdit(false): setEdit(true)} } style={styles.bttn}>
          <Text style={[styles.text, {color: 'white'}]}>{"Edit  "}
            <Feather name="edit" size={20} style={{color:'white'}} />
          </Text>
      </TouchableOpacity>
            

    //Buttons to save or discard all changes
    const saveCancelButtons = 
    <View style={[ {
      flexDirection: "row", height:34, width: 120,
    }]}>
        <TouchableOpacity onPress={() => {edit? (setEdit(false)): setEdit(true)} } style={[styles.bttnSaveCancel, {backgroundColor:'green'}]}>
              {<AntDesign name="checkcircleo" size={26} style={{color:'white'}}/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {edit? setEdit(false): setEdit(true)} } style={[styles.bttnSaveCancel, {backgroundColor:'red'}]}>
              {<MaterialIcons name="cancel" size={26} style={{color:'white'}}/>}
        </TouchableOpacity>
    </View>
    return (
        getTable(),
        <View style={styles.container}>
            {/* Button to confirm the changes , when cliked update pie chart data of parent*/}
            <View style={{alignItems:'flex-end', paddingBottom:10}}>
              {!edit? editButton: saveCancelButtons}
              
            </View>
          <Table borderStyle={{borderWidth: 0}}>
            <TableWrapper style={styles.wrapper}>
              <Rows data={tableData} flexArr={[0.7, 4.5, 1.5, 0.8]} style={styles.row} textStyle={styles.text}/>
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
             },
        wrapper: { 
            flexDirection: 'row' },
        bttn:{
            position: 'relative',
            height:34,
            width: 120,
            backgroundColor: COLORS.wingDarkBlue,
            alignItems: "center",
            borderRadius:7,
        },
        bttnSaveCancel:{
          alignItems: "center",
          borderRadius:7,
          flexDirection: 'column',
          flex:0.5,
          paddingVertical: 3,
          borderWidth:1,
          borderColor: COLORS.eggshell
        },
        row: {  
            height: 45 , 
            paddingLeft: 20,
            marginBottom: 15,
            borderRadius: 10,
            backgroundColor: COLORS.white },
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
  
export default CategoryTable;