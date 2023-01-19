import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native'
import React from 'react'
import AuthContext from '../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CATEGORIES, COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import { SafeAreaView } from 'react-native'
import { serverURL } from '../config/hosts'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { CustomBackButton, CustomButton, CustomInput, CustomTextButton } from '../components'
import { SelectList } from 'react-native-dropdown-select-list'
//import { ListItem } from 'react-native-elements'
import ChooseCategoryModal from '../components/ChooseCategoryModal'
import ProductInputContainer from '../components/ProductTable'
import ProductInputModal from '../components/ProductInputModal'
import ProductTable from '../components/ProductTable'

export default function AddExpenseScreen({ navigation }) {
  const { height } = useWindowDimensions()
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [selected, setSelected] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Sem Categoria')
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [isModalVisibleCT, setisModalVisibleCT] = useState(false)
  
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err))
  }, [])

  // type = 'expense' or 'product'
  const toggleModalCT = () => {
    console.log('toggleModalCT')
    setisModalVisibleCT(!isModalVisibleCT)
  }

  const handleCategorySelection = (category) => {
      setSelectedCategory(category)
    
    toggleModalCT()
  }

  const handleAddProduct = (productInfo) => {
    setProducts([...products, productInfo])
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  
  function handleDeleteProduct(index) {
    // Delete product at the specified index
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  }

  function getCategoryIcon(selectedCategory) {
    console.log('get icon: ' + selectedCategory)
    // loop through the CATEGORIES object
    for (const [key, value] of Object.entries(CATEGORIES)) {
      // check if the name of the current category matches the selectedCategory
      if (value.name === selectedCategory) {
        // return the icon for the matching category
        return value.icon
      }
    }
    // if no match is found, return null
    return null
  }

  const categoryIcon = getCategoryIcon(selectedCategory)
  const { width } = useWindowDimensions()

  const handleFormSubmission = async () => {
    const newData = {}
    const resp = await fetch(`${serverURL}/users/updateProfile/${token.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    }).then((resp) => {
      if (resp.status === 200) {
        alert('Dados atualizados com sucesso!')
        navigation.navigate('ActivitySummary', { refresh: true })
      } else {
        alert('Erro ao atualizar dados!')
      }
    })
  }

  return (
    console.log('--------------\nToken data: ' + JSON.stringify(token) + '\n--------------'),
    (
      <SafeAreaView style={styles.root}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.infoContainer}>
            {/* Title input */}
            <Text style={styles.textTag}>Título</Text>
            <CustomInput
              placeholder={'Café do Luís'}
              value={title}
              setValue={setTitle}
              widthScale={0.8}
            />

            {/* Category input */}
            {console.log('Expense Category: ' + selectedCategory)}
            <Text style={styles.textTag}>Categoria</Text>

            <TouchableOpacity
              style={[styles.categoryButton, { width: width * 0.8 }]}
              onPress={() => toggleModalCT()}
            >
              {getCategoryIcon(selectedCategory)}
              <Text style={styles.textCategory}>{selectedCategory}</Text>
            </TouchableOpacity>
            <ChooseCategoryModal
              isModalVisibleCT={isModalVisibleCT}
              setisModalVisibleCT={setisModalVisibleCT}
              setSelectedCategory={handleCategorySelection}
            />

            {/* call the SelectList component
           {Object.values(CATEGORIES).map(({icon, name}, index) => (
              <View key={index}>
                {icon}
                <Text>{name}</Text>
              </View>
            ))}
           */}

            {/* Value input */}
            <Text style={styles.textTag}>Valor</Text>
            <CustomInput
              placeholder={'10.50'}
              value={value}
              setValue={setValue}
              keyboardType="numeric"
              iconNameEntry="euro"
              widthScale={0.8}
            />

            {/* Description input */}
            <Text style={styles.textTag}>Descrição</Text>

            {console.log('Description: ' + description)}
            <TextInput
              multiline={true}
              numberOfLines={2}
              value={description}
              onChangeText={setDescription}
              placeholder={'Café com leite e bolo'}
              style={[
                {
                  marginVertical: 12,
                  borderRadius: 5,
                  paddingTop: 15,
                  padding: 15,
                  borderWidth: 1,
                  borderColor: COLORS.wingblue,
                  fontFamily: 'SoraRegular',
                  fontSize: SIZES.font,
                  color: COLORS.wingDarkBlue,
                  width: width * 0.8,
                  minHeight: 100,
                },
              ]}
            />

            {/* Products input */}

            <Text style={styles.textTag}>Produtos</Text>
            {console.log('Input containers: ' + JSON.stringify(products))}

            {/* Product table component */}
            <ProductTable products={products} handleDeleteProduct={handleDeleteProduct} getCategoryIcon={getCategoryIcon} />
            <TouchableOpacity
              style={[styles.categoryButton, { width: width * 0.8 }]}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.textCategory}>Adicionar Produto</Text>
            </TouchableOpacity>

            <ProductInputModal
              isModalVisible={isModalVisible}
              toggleModalCT={toggleModalCT}
              getCategoryIcon={getCategoryIcon}
              onSave={handleAddProduct}
              onCancel={handleCancel}
            />
          </View>
        </ScrollView>

        <View style={styles.containerBTN}>
          <CustomButton
            onPress={() => handleFormSubmission()}
            text="Guardar Alterações"
            type="TERTIARY"
            widthScale={0.8}
          ></CustomButton>
        </View>
      </SafeAreaView>
    )
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
  categoryButton: {
    //backgroundColor: "#eceffa",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: COLORS.wingblue,
    alignItems: 'center',
  },
  textCategory: {
    fontFamily: 'SoraRegular',
    fontSize: SIZES.font,
    color: COLORS.wingDarkBlue,
    marginStart: 10,
  },
  productsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 12,
  },
})
