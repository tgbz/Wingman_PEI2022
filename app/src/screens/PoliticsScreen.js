import { View, Text, TextInput, Image, TouchableOpacity, useWindowDimensions, Dimensions, Button } from 'react-native'
import React from 'react'
import { CATEGORIES, CATEGORIESCOLORS, COLORS, SHADOWS, SIZES , FONTS} from '../constants'
import { useState, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'
import {PieChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { serverURL } from '../config/hosts'
import * as _ from 'lodash'; //Fazer Clone dos objetos 
import {Entypo,AntDesign, FontAwesome5, MaterialIcons, Feather} from '@expo/vector-icons'
import { Table, Rows , TableWrapper} from 'react-native-table-component';


export default function PoliticsScreen({navigation}){
  const width =Dimensions.get('window').width;
  const [token, setToken] = useState('')
  const [categoryData, setCategoryData] = useState([])
  let finalCategoryData = []
  const tableData = [];
  const [edit, setEdit] = useState(false);
  const [categories, setCategories] = useState([])
  let provCat = _.cloneDeep(finalCategoryData);
  const [changes, setChanges] = useState(true)
  

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

  function adjustData( categoryData) {
    categoryData.forEach(element => {
        let obj = {idcategory: element.idcategory, plafond:element.plafond}
        finalCategoryData.push(obj)
  
    });
  }
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
      keyboardType = 'numeric'
      onChangeText={(text) => handleChanges(id, text)}
      placeholder={plafond} placeholderTextColor={COLORS.wingDarkBlue}
      style={[styles.text, { color: COLORS.wingDarkBlue, backgroundColor: COLORS.eggshell, fontSize: 14}]}
/>}
// create the table

const showValue = (idcategory, plafond) => {
  return edit? inputField(idcategory, plafond) : plafond
}
function getTable (){
  finalCategoryData.forEach(elem => {
      tableData.push([CATEGORIES[elem.idcategory].icon, CATEGORIES[elem.idcategory].name,showValue(elem.idcategory, (elem.plafond)), '€']);
    })
  

  return tableData;
}  

//Button to edit all fields of the politics
const editButton =  
  <TouchableOpacity onPress={() => {edit? (setEdit(false)): setEdit(true)} } style={styles.bttn}>
      <Text style={[styles.text, {color: 'white'}]}>{"Edit  "}
        <Feather name="edit" size={20} style={{color:'white'}} />
      </Text>
  </TouchableOpacity>
        


//Quando quero salvar, defino a var categories como obtendo o valor da cena provisória
// E preciso de fazer o post 
async function onPressSave() {
  //finalCategoryData = concatProvAndFinal()
  setEdit(false)
  let env = {"categories": provCat}
  const response = await fetch(`${serverURL}/categories/changeAllPlafonds/${token.id}`, {
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
  fetchData(token)
  //adjustData(categoryData)
  //console.log("Depois do tratamento", finalCategoryData)
  //setChanges(true, [console.log("Mudei changes para true")])

}

const concatProvAndFinal = () => {
    provCat.forEach(elem => {
      console.log(finalCategoryData[elem.idcategory]) 
      let index = finalCategoryData.findIndex(x => x.idcategory === elem.idcategory);
      console.log(index)
      finalCategoryData[index] = {"idcategory": elem.idcategory, "plafond": elem.plafond}
      })
    return finalCategoryData
}


//Quando quero cancel, vou recuperar os valores que tinha antes 
const onPressCancel = () => {
  setEdit(false)
  //provCat = _.cloneDeep(categories)
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

 
  const data =[
    {"category": 27, 
    color: "#e72a31", 
    legendFontColor: "black", 
    "plafond": 10}, 
    {
      "category": 23,
      "plafond": 7,
      color: '#f26c3d',
      legendFontColor: 'black',

    },
    {"category": 11, 
    "plafond": "87.00",
    color: '#f26c8d',
    legendFontColor: 'black',}
    
  ];
 
  const chartConfig = {
    backgroundColor: COLORS.white,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(25, 95, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    }};
   
  function pieChartData () {
    const data = []
    finalCategoryData.forEach( elem => {
      let obj = {"category": elem.idcategory, 
      "plafond": parseInt(elem.plafond),
      color: CATEGORIESCOLORS[elem.idcategory],
      legendFontColor: 'black'}
      data.push(obj)
    }
    )
    return data
  }
  return ( adjustData(categoryData),  getTable(), 

    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.eggshell}}>
      <ScrollView>
        <View style={styles.container}>
          <PieChart
            data={pieChartData()}
            width={width - 16}
            paddingLeft={width / 4}
            height={220}
            hasLegend={false}
            chartConfig={chartConfig}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            accessor="plafond"
            backgroundColor= {COLORS.eggshell}
          />
        </View>
        <View style={styles.containerTable}>
            {/* Button to confirm the changes , when cliked update pie chart data of parent*/}
            <View style={{alignItems:'flex-end', paddingBottom:10}}>
              {!edit? editButton: saveCancelButtons}
              
            </View>
          <Table borderStyle={{borderWidth: 0}}>
            <TableWrapper style={styles.wrapper}>
              {/*<Rows data={changes? ( setChanges(false, [console.log("Mudei changes para falso")]), getTable()):tableData} flexArr={[0.7, 4.5, 1.5, 0.8]} style={styles.row} textStyle={styles.text}/>*/}
              <Rows data={tableData} flexArr={[0.7, 4.5, 1.5, 0.8]} style={styles.row} textStyle={styles.text}/>
            </TableWrapper>
          </Table>
    
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
  },containerTable: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 10, 
    paddingBottom: 60
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
    fontSize: SIZES.font,
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
