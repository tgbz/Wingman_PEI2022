import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import AuthContext from '../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CATEGORIES, COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'
import { serverURL } from '../config/hosts'
import { CustomBackButton, CustomButton, CustomInput, CustomTextButton } from '../components'
import { SelectList } from 'react-native-dropdown-select-list'

export default function AddExpenseScreen({ navigation }) {
  const { height } = useWindowDimensions()
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [selected, setSelected] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])
  const [value, setValue] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err))
  }, [])

  const CategoriesSelectList = () => {
    return (
      <SelectList
        data={Object.values(CATEGORIES)}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View>
            {item.icon}
            <Text>{item.name}</Text>
          </View>
        )}
      />
    );
  };

  return (

      <SafeAreaView style={styles.root}>
        
        <View style={styles.infoContainer}>
          {/* Title input */}
          <Text style={styles.textTag}>Título</Text>
          <CustomInput placeholder={'Café do Luís'} value={title} setValue={setTitle} widthScale={0.8}/>

          {/* Category input 
          {console.log('Gender selection: ' + CATEGORIES.name)}
          <Text style={styles.textTag}>Categoria</Text>
           
           <SelectList
            items={Object.values(CATEGORIES)}
            selected={selectedCategory}
            onChange={item => setSelectedCategory(item)}
            keyExtractor={item => item.name}
            labelExtractor={item => item.name}
          />
          */}

          {/* Value input */}
          <Text style={styles.textTag}>Valor</Text>
          <CustomInput
            placeholder={'10.50'}
            value={value}
            setValue={setValue}
            iconNameEntry="euro"
            widthScale={0.8}
          />
        </View>

        <View style={styles.containerBTN}>
          {/* 
            <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")} style={[styles.button,{height: height*0.05}]}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          */}
          <CustomButton
            onPress={() => handleFormSubmission()}
            text="Guardar Alterações"
            type = "TERTIARY"
            widthScale={0.8}
          ></CustomButton>
        </View>
      </SafeAreaView>
    )

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  navigationBar: {
    // in case i wanto to add a button in the right side
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  pageTitle: {
    fontFamily: 'SoraMedium',
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
    // center the text
    alignSelf: 'center',
    // center the text horizontally
    flex: 1,
    textAlign: 'center',
    right: 20,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  addAvatar: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 5,
    right: 1,
    height: 50,
    width: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  infoContainer: {
    marginHorizontal: 40,
    marginTop: 40,
    marginBottom: 40,
  },
  textTag: {
    fontFamily: 'SoraBold',
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
  },
  textInfo: {
    //marginLeft: 30,
    fontFamily: 'SoraLight',
    fontSize: SIZES.medium,
  },
  button: {
    backgroundColor: COLORS.wingDarkBlue,
    borderRadius: SIZES.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.base,
    width: '40%',
    height: '80%',
  },
  containerBTN: {
    // Put the buttons at the bottom of the screen
    //position: 'absolute',
    //alignItems: "center",
    //justifyContent: "center",
    //bottom: "10%",
    //width: "100%",
    //  on the vertical center
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: SIZES.small,
    fontFamily: 'SoraBold',
  },
  selectList: {
    backgroundColor: 'white',
    borderColor: COLORS.wingblue,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 12,
    borderWidth: 1,
  },
  dropdownStyles: {
    maxHeight: 120,
    backgroundColor: 'white',
    borderColor: COLORS.wingblue,
  },
  text: {
    color: COLORS.wingDarkBlue,
    fontFamily: 'SoraLight',
    fontSize: 15,
    alignSelf: 'flex-start',
  },
})
