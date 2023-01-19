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
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
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
  const [selectedCategory, setSelectedCategory] = useState(22)
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [isModalVisibleCT, setisModalVisibleCT] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [products, setProducts] = useState([])
  const [isDebit, setIsDebit] = useState(false)
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);
  const [date, setDate] = useState(formattedDate)


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
    // get icon by key 
    for (const [key, value] of Object.entries(CATEGORIES)) {
      if (key == selectedCategory) {
        return value.icon
      }
    }
    // if no match is found, return null
    return null
  }

  //  get category name by key
  function getCategoryName(selectedCategory) {
    console.log('get name: ' + selectedCategory)
    // loop through the CATEGORIES object
    // get icon by key
    for (const [key, value] of Object.entries(CATEGORIES)) {
      if (key == selectedCategory) {
        return value.name
      }
    }
    // if no match is found, return null
    return null
  }

  const categoryIcon = getCategoryIcon(selectedCategory)
  const { width } = useWindowDimensions()

  // router.post('/createPurchase/',function(req,res){
  /* Purchases.addPurchase(req.body.is_recurring,
   req.body.date, 
   req.body.value,
   req.body.title, 
   req.body.description, 
   req.body.idUser, 
   req.body.seller,
   req.body.type,
   req.body.products)
   */
  const handleFormSubmission = async () => {
    const newData = {
      // falta a CATEGORIA
      is_recurring: false,
      date: date,
      value: value,
      title: title,
      description: description,
      idUser: token.id,
      seller: '',
      type: isDebit ? 'Debito' : 'Credito',
      products: products, // quantity , value , idcategory , description
    }
    const resp = await fetch(`${serverURL}/purchases/createPurchase/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    }).then((resp) => {
      if (resp.status === 200) {
        alert('Despesa adicionada com sucesso!')
        navigation.navigate('Casa', { refresh: true })
      } else {
        alert('Erro ao adicionar despesa!')
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

                        
            {/* Debit or Credit input */}
            {console.log('Debit: ' + isDebit)}
            <Text style={styles.textTag}>Tipo</Text>
            <View style={styles.debitCreditContainer}>
              <TouchableOpacity
                style={[
                  styles.debitCreditButton,
                  {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: isDebit ? COLORS.wingDarkBlue : COLORS.white,
                  },
                ]}
                onPress={() => setIsDebit(true)}
              >
                <Text
                  style={[
                    styles.textDebitCredit,
                    {
                      color: isDebit ? COLORS.white : COLORS.wingDarkBlue,
                    },
                  ]}
                >
                  Débito
                </Text>
              </TouchableOpacity>
              <TouchableOpacity   

                style={[
                  styles.debitCreditButton,
                  {
                    borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    backgroundColor: isDebit ? COLORS.white : COLORS.wingDarkBlue,
                  },
                ]}
                onPress={() => setIsDebit(false)}
              >
                <Text
                  style={[
                    styles.textDebitCredit,
                    {
                      color: isDebit ? COLORS.wingDarkBlue : COLORS.white,
                    },
                  ]}
                >
                  Crédito
                </Text>
              </TouchableOpacity>
            </View>

            {/* Category input */}
            {console.log('Expense Category: ' + getCategoryName(selectedCategory))}
            <Text style={styles.textTag}>Categoria</Text>

            <TouchableOpacity
              style={[styles.categoryButton, { width: width * 0.8 }]}
              onPress={() => toggleModalCT()}
            >
              {getCategoryIcon(selectedCategory)}
              <Text style={styles.textCategory}>{getCategoryName(selectedCategory)}</Text>
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

            

            {/* Date input */}
            {console.log('Date: ' + date)}
            <Text style={styles.textTag}>Data</Text>
            {/* Change to TouchableOpacity to open a calendar */}
            <View
              style={[styles.categoryButton, { width: width * 0.33, alignSelf:'flex-start'}]}
            >
              <MaterialIcons name="date-range" size={18} color={COLORS.wingDarkBlue} />
              <TextInput  placeholder='AAAA-MM-DD' onChangeText={setDate} style={styles.textCategory}>{date}</TextInput>
              
            </View>

                  


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

            <Text style={[styles.textTag,{marginBottom:12 }]}>Produtos</Text>
            {console.log('Input containers: ' + JSON.stringify(products))}

            {/* Product table component */}
            {products.length > 0 ? 
            <ProductTable products={products} handleDeleteProduct={handleDeleteProduct} getCategoryIcon={getCategoryIcon} />
            :
            <Text style={{fontFamily:'SoraRegular', fontSize: SIZES.font, color: COLORS.wingDarkBlue, marginBottom: 12}}>Nenhum produto adicionado</Text>
            
            }
            <TouchableOpacity
              style={[styles.categoryButton, { width: width * 0.3,borderRadius: 30,paddingVertical:3, alignSelf:'flex-end', marginVertical: 0, borderColor: COLORS.wingDarkBlue, borderWidth: 1}]}
              onPress={() => setIsModalVisible(true)}
            >
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={COLORS.wingDarkBlue}
              />
              <Text style={[styles.textCategory,{marginStart:2}]}>Adicionar</Text>

            </TouchableOpacity>
            
            <ProductInputModal
              isModalVisible={isModalVisible}
              toggleModalCT={toggleModalCT}
              getCategoryIcon={getCategoryIcon}
              getCategoryName={getCategoryName}
              onSave={handleAddProduct}
              onCancel={handleCancel}
            />
          </View>

          <View style={styles.containerBTN}>
          <CustomButton
            onPress={() => handleFormSubmission()}
            text="Guardar Alterações"
            type="TERTIARY"
            widthScale={0.8}
          ></CustomButton>
        </View>
        </ScrollView>

        
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
    marginBottom: 100
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
  debitCreditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  debitCreditButton: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    //marginVertical: 12,
    borderWidth: 1,
    flexDirection: 'row',
   //alignSelf: 'center',
    borderColor: COLORS.wingDarkBlue,
    //alignItems: 'center',
    //marginHorizontal: 10,
  },
  textDebitCredit: {
    fontFamily: 'SoraRegular',
    fontSize: SIZES.font,
    color: COLORS.white,
    //marginStart: 10,
  }
})
