import { View, Text, Pressable, Platform, StatusBar, Button, Image, TouchableOpacity, useWindowDimensions, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import { CATEGORIES, CATEGORIESCOLORS, COLORS, FONTS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'
import ActivityTable from '../components/ActivityTable'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { serverURL } from '../config/hosts'
import { useRoute } from '@react-navigation/native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { CheckBox, Icon } from '@rneui/themed';
import Modal from 'react-native-modal';

import TypeTransaction from '../components/TypeTransaction'
var accents = require('remove-accents');

const catgsArray = {
  11: true,
  12: true,
  13: true,
  14: true,
  15: true,
  16: true,
  18: true,
  19: true,
  20: true,
  21: true,
  22: true,
  23: true,
  24: true,
  25: true,
  26: true,
  27: true,
}

export default function PoliticsScreen({ navigation }) {
  const width = Dimensions.get('window').width;
  const [token, setToken] = useState('')
  const [filters, setFilters] = useState(false)
  const [origin, setOrigin] = useState([])
  const [allCats, setAllCats] = useState(true)

  /////////////////FILTROS///////////////////
  const [valorSelect, setValorSelect] = useState(0) // 0 = Todos, 1 - Debito , 2 - Credito
  const [checks, setChecks] = useState(catgsArray); // Setting default value

  const handleAddChecks = (value) => {
    checks[value] = !checks[value];
    setChecks({ ...checks });
    //console.log("Checks no fim", checks)

  };

  const categoria = (key) => {
    return <View style={{flexDirection:'row'}}><Text>   </Text>{CATEGORIES[key].icon}<Text style={styles.buttonText}>     {CATEGORIES[key].name}</Text></View>
  }

  function showAllCategories() {
    const checksv2 = Object.keys(checks);
    return checksv2.map(key => {
      return <CheckBox
        title={categoria(key)}
        checked={checks[key]}
        key={key}
        onPress={() => { handleAddChecks(key) }}
        containerStyle={{ backgroundColor: COLORS.eggshell, padding: 3 }}
        checkedColor={CATEGORIESCOLORS[key]}
        uncheckedColor={COLORS.wingDarkBlue}
      />
    })
  }

  const handleValorSelect = (key) => { setValorSelect(key)}

  const deleteByValue = (word) => {
    if (word!== null){
      temp = origin.filter(element =>accents.remove(element.type)!==word )
      new_temp = temp.filter(element => checks[element.category]===true)
      //temp = temp.filter(elem => checks[element.category] )
      if (new_temp.length === 0) alert("Não possui nenhuma transação com estas caraterísticas!")
      else setTransactionsList(new_temp)}
    else {
      new_temp = origin.filter(element => checks[element.category]===true)
      if (new_temp.length === 0) alert("Não possui nenhuma transação com estas caraterísticas!")
      else setTransactionsList(new_temp)
      }

  }




  const applyFilters = () => {
    var c = 0
    Object.keys(checks).forEach(elem => {checks[elem]? c=c+1: c})
    //console.log(c)
    if (c>0){
      handleCloseModalPress()
      setFilters(false)
      if (valorSelect === 2){    
        deleteByValue("Debito")}
      else if (valorSelect === 1){
        deleteByValue("Credito")}
      else if (valorSelect === 0) {
        deleteByValue(null)}
    }
    else alert("Tem de selecionar pelo menos 1 categoria!")
  }


  const allCheck = (value) => {
    
    setChecks(checks => { 
      var aux ={}
      Object.keys(checks).forEach(elem => {
          aux[elem] = value
  
      }); return aux})
  }

  const handleAll = () => {
    allCheck(!allCats)
    setAllCats(!allCats)
  }

  const buttonAllNone = (iconName, text) => {
    return <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'flex-start', paddingVertical:'1.5%'}}>
      <TouchableOpacity onPress={handleAll}>
      <MaterialCommunityIcons name={iconName} size={24} color={COLORS.wingDarkBlue}/>
      </TouchableOpacity>
      <Text style={{paddingVertical: 5, paddingHorizontal: 5, fontFamily:FONTS.light }}>{text}</Text>
      </View>
  }

  /////////////////FIM - FILTROS///////////////////


  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => {
        setToken(JSON.parse(userToken))
      })
      .catch((err) => console.log(err))
  }, [])

  const [transactionsData, setTransactionsData] = useState([])

  const fetchData = async (token) => {
    const resp = await fetch(`${serverURL}/purchases/getAllPurchase/${token.id}`)
    const transData = await resp.json()
    setTransactionsData(transData)
    
  }
  // Put transaction data on dd/mm/aa format
  function treatDate(date) {
    //Obtain the first 10 caracteres: data
    date = date.split("T")[0];
    date = date.split("-").reverse().join("/");
    date = date.split("/").slice(0, 2).join("/")

    return date
  }

  const [transactionsList, setTransactionsList] = useState([])
  // Extract only the wanted info from the request to api 
  function adjustData(transData) {
   // console.log("Adjust Data ", transData)
    transData.forEach(element => {
      let obj = { idPurchase: element.idPurchase, date: treatDate(element.date), transaction: element.title, value: element.value.concat("€"), category: element.idcategory, type: element.type }
      transactionsList.push(obj)
      origin.push(obj)
    });
   
  }
  useEffect(() => {
    if (token.id) {
      fetchData(token)
    }
  }, [token])



  // every time route.params is true when user edit despesa, refresh data
  const route = useRoute()

  useEffect(() => {
    //console.log('route.params: ' + JSON.stringify(route.params))
    // dont do shit if route.params is undefined
    if (route.params) {
      // se nao for undefined
      if (route.params.refresh) {
        // se for true
        console.log('Refresh Activity Screen')
        fetchData(token)
        route.params.refresh = false
      }
    }
  }, [route.params])

  const handleCloseModalPress = () => setFilters(false);

  


  if (transactionsList.length===0){
      adjustData(transactionsData)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.eggshell, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <ScrollView>
      {filters &&
      <>
          <Modal  isVisible={filters} hasBackdrop={false} transparent={true} backdropColor="rgba(0,0,0,0.5)">
            <SafeAreaView style={styles.modalView}>
           <View >
              <ScrollView >
                <TypeTransaction valorSelected={valorSelect} setValorSelect={handleValorSelect}></TypeTransaction>

                <View style={styles.valor}>
                  <View style={{flexDirection:'row', justifyContent: 'space-between' , alignItems:'center'}}>
                    <Text style={styles.text}>Categorias </Text>
                    {allCats? buttonAllNone('checkbox-blank-outline', 'Nenhuma'):buttonAllNone('checkbox-multiple-marked-outline', 'Todas')}
                  </View>
                      {showAllCategories()}
                </View>
              </ScrollView>

              <View style={{flexDirection:'row', justifyContent: 'space-around', marginBottom: 40}}>
                  <TouchableOpacity onPress={handleCloseModalPress} style={[styles.button, {backgroundColor: COLORS.white, width:(width*0.75)/2}]}>
                    <Text style={[styles.buttonText, {color: COLORS.wingDarkBlue}]}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={applyFilters} style={[styles.button, {backgroundColor: COLORS.wingDarkBlue, width:(width*0.75)/2}]}>
                    <Text  style={[styles.buttonText, {color: COLORS.white}]} >Aplicar Filtros</Text>
                  </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
          </Modal>

    </>
        }
        {
          <View>
            <ImageBackground>
              <ActivityTable data={transactionsList} headerType={true} navigation={navigation}></ActivityTable>
            </ImageBackground>
            <View style={styles.containerFiltros}>
              <Ionicons name="options-outline" size={24} color={COLORS.white} onPress={() => setFilters(true)} />
            </View>
          </View>
        }
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
  containerFiltros: {
    marginHorizontal: 20,
    marginTop: '3%',
    position: 'absolute',
    top: 6,
    right: 20
  },
  item: {
    color: COLORS.wingDarkBlue,
    alignSelf: 'flex-end',
    paddingRight: 15
  }, 
  valor: {
    marginVertical: '3%'
  },
  text: {
    fontFamily: 'SoraBold',
    fontSize: SIZES.large,
  },
  button: {
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.wingDarkBlue,
    marginBottom: 10
  },
  buttonText:{
    fontFamily: FONTS.small,
    alignSelf:'center',
    paddingVertical: 10
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

  modalView: {
    backgroundColor: COLORS.eggshell,
    borderRadius: 20,
    margin: -40,
    alignItems: 'center',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
 
  modalContentContainer: {
    backgroundColor: COLORS.eggshell,
    
  }
  ,
});
