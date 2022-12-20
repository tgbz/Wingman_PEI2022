import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View,Modal,Text,Button, processColor, TextInput , TouchableOpacity} from 'react-native';
import { Table, Rows , TableWrapper} from 'react-native-table-component';
import {FONTS,COLORS, SIZES , CATEGORIES} from '../constants'
import {Entypo,AntDesign, FontAwesome5, MaterialIcons, Feather} from '@expo/vector-icons'
import * as _ from 'lodash'; //Fazer Clone dos objetos 
import { serverURL } from '../config/hosts'

let p = [{"idcategory":11,"plafond":"2300.00"},{"idcategory":12,"plafond":"8767.00"},{"idcategory":13,"plafond":"0.00"},{"idcategory":14,"plafond":"23.00"},{"idcategory":15,"plafond":"100.00"},{"idcategory":16,"plafond":"0.00"},{"idcategory":18,"plafond":"0.00"},{"idcategory":19,"plafond":"0.00"},{"idcategory":20,"plafond":"0.00"},{"idcategory":21,"plafond":"0.00"},{"idcategory":22,"plafond":"0.00"},{"idcategory":23,"plafond":"0.00"},{"idcategory":24,"plafond":"0.00"},{"idcategory":25,"plafond":"0.00"},{"idcategory":26,"plafond":"0.00"},{"idcategory":27,"plafond":"0.00"}]
  
const CategoryTable = ({data, token, navigation}) => {
    const tableData = [];
    const [value, setValue] = useState('');
    const [edit, setEdit] = useState(false);
    const [categories, setCategories] = useState(data)
    let provCat = _.cloneDeep(categories)
    useEffect(() => {setCategories(data)}, [data])

    //Mudanças no valor do planfond
    function handleChanges (id, value) {
      let done = false
      provCat.forEach(elem => {
        if (elem.idcategory === id){
            elem.plafond = value;
            done = true }
      })
      if (!done) {
        const obj = {'idcategory': id, 'plafond': value}
        provCat.push(obj)
      }
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
      provCat.forEach(elem => {
          tableData.push([CATEGORIES[elem.idcategory].icon, CATEGORIES[elem.idcategory].name,showValue(elem.idcategory, elem.plafond), '€']);
        })
    }  

    //Button to edit all fields of the politics
    const editButton =  
      <TouchableOpacity onPress={() => {edit? (setEdit(false)): setEdit(true)} } style={styles.bttn}>
          <Text style={[styles.text, {color: 'white'}]}>{"Edit  "}
            <Feather name="edit" size={20} style={{color:'white'}} />
          </Text>
      </TouchableOpacity>
            
      const fetchData = async (token) => {
          const resp = await fetch(`${serverURL}/categories/userCategory/${token.id}`)
          const categoryData = await resp.json()
          setCategories(categoryData)
      }


    //Quando quero salvar, defino a var categories como obtendo o valor da cena provisória
    // E preciso de fazer o post 
    const onPressSave = () => {
      setCategories(categories => _.cloneDeep(provCat))
      
      setEdit(false)
      
      console.log('data cat: ' + JSON.stringify(categories))
      let env = {"categories": provCat}
      const response = fetch(`${serverURL}/categories/changeAllPlafonds/${token.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(env)
        
      })

      // if data is not empty, then account was added
      if (response) {
        // go back to AccountsScreen and refresh data
          navigation.navigate('Politics', { refresh: true })
      }
    }
    
    //Quando quero cancel, vou recuperar os valores que tinha antes 
    const onPressCancel = () => {
      setEdit(false)
      provCat = _.cloneDeep(categories)
    }
    //Buttons to save or discard all changes
    const saveCancelButtons = 
    <View style={[ {
      flexDirection: "row", height:34, width: 120,
    }]}>
        <TouchableOpacity onPress={() => {edit? (onPressSave()): setEdit(true)} } style={[styles.bttnSaveCancel, {backgroundColor:'green'}]}>
              {<AntDesign name="checkcircleo" size={26} style={{color:'white'}}/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {edit? (onPressCancel()): setEdit(true)} } style={[styles.bttnSaveCancel, {backgroundColor:'red'}]}>
              {<MaterialIcons name="cancel" size={26} style={{color:'white'}}/>}
        </TouchableOpacity>
    </View>
    return (
      getTable(),
        <View style={styles.containerTable}>
            {/* Button to confirm the changes , when cliked update pie chart data of parent*/}
            <View style={{alignItems:'flex-end', paddingBottom:10}}>
              {!edit? editButton: saveCancelButtons}
              
            </View>
          <Table borderStyle={{borderWidth: 0}}>
            <TableWrapper style={styles.wrapper}>
              <Rows data={tableData} flexArr={[0.7, 4.5, 1.5, 0.8]} style={styles.row} textStyle={styles.text}/>
            </TableWrapper>
          </Table>
        
       </View>
      );
};

const styles = StyleSheet.create({
        containerTable: { 
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