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
import { CustomButton } from '../components'
import ChooseCategoryModal from '../components/ChooseCategoryModal'
import ProductInputModal from '../components/ProductInputModal'
import ProductTable from '../components/ProductTable'

export default function AddExpenseScreen({ navigation }) {
  const { height } = useWindowDimensions()
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(22)
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [isModalVisibleCT, setisModalVisibleCT] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [products, setProducts] = useState([])
  const [isDebit, setIsDebit] = useState(true)
  const today = new Date()
  const formattedDate = today.toISOString().slice(0, 10)
  const [date, setDate] = useState(formattedDate)

  // TODO: Validate form data

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err))
  }, [])

  
  const toggleModalCT = () => {
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

  // handle clean form
  function handleCleanForm() {
    setTitle('')
    setSelectedCategory(22)
    setValue('')
    setDescription('')
    setProducts([])
    setIsDebit(true)
    setDate(formattedDate)
  }

  function handleDeleteProduct(index) {
    // Delete product at the specified index
    const newProducts = [...products]
    newProducts.splice(index, 1)
    setProducts(newProducts)
  }

  function getCategoryIcon(selectedCategory) {
    //console.log('get icon: ' + selectedCategory)
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
    //console.log('get name: ' + selectedCategory)
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

  function typeContainer () {
   return (
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
          backgroundColor: isDebit ? COLORS.white : COLORS.wingDarkBlue ,
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
    )
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
    if(products.length == 0){
      products.push({
        quantity: 1,
        value: value,
        idcategory: selectedCategory,
        description: 'Não especificado',
      })
    }
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
    console.log('--------------\nToken data AddExpense: ' + JSON.stringify(token) + '\n--------------'),
    (
      <SafeAreaView style={styles.root}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.infoContainer}>
            {typeContainer()}
            {/* Title input */}
            <Text style={styles.textTag}>Título</Text>
            <View style={[styles.buttonStyle, { width: width * 0.8 }]}>
              <TextInput
                placeholder="Ex: Conta de luz"
                onChangeText={setTitle}
                style={styles.textButton}
              >
                {title}
              </TextInput>
            </View>

            {/* Value and Date input */}
            <View
              style={[
                { flexDirection: 'row', alignContent: 'space-between', alignItems: 'stretch' },
              ]}
            >
              <View style={{ flex: 1, padding:0, flexWrap: 'wrap'}}>
                <Text style={styles.textTag}>Valor</Text>
                <View
                  style={[styles.buttonStyle, { width: width * 0.36}]}
                >
                  <MaterialIcons name="euro" size={18} color={COLORS.wingDarkBlue}  />
                  <TextInput
                    placeholder="10.25"
                    onChangeText={setValue}
                    style={styles.textButton}
                  >
                    {value}
                  </TextInput>
                </View>
              </View>
              <View style={{ flex: 1, padding: 0, flexWrap: 'wrap' }}>
                <Text style={styles.textTag}>Data</Text>
                <View
                  style={[styles.buttonStyle, { width: width * 0.4}]}
                >
                  <MaterialIcons name="date-range" size={18} color={COLORS.wingDarkBlue} />
                  <TextInput
                    placeholder="AAAA-MM-DD"
                    onChangeText={setDate}
                    style={styles.textButton}
                  >
                    {date}
                  </TextInput>
                </View>
              </View>
            </View>

            {/* Category input */}
            {products.length == 0 ? (
              <>
                <Text style={styles.textTag}>Categoria</Text>
                <TouchableOpacity
                  style={[styles.buttonStyle, { width: width * 0.8 }]}
                  onPress={() => toggleModalCT()}
                >
                  {getCategoryIcon(selectedCategory)}
                  <Text style={styles.textButton}>{getCategoryName(selectedCategory)}</Text>
                </TouchableOpacity>
                <ChooseCategoryModal
                  isModalVisibleCT={isModalVisibleCT}
                  setisModalVisibleCT={setisModalVisibleCT}
                  setSelectedCategory={handleCategorySelection}
                />
              </>
            ) : null}

            {/* Description input */}
            <Text style={styles.textTag}>Descrição</Text>

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
                  borderColor: COLORS.wingDarkBlue,
                  fontFamily: 'SoraRegular',
                  fontSize: SIZES.font,
                  color: COLORS.wingDarkBlue,
                  width: width * 0.8,
                  minHeight: 100,
                },
              ]}
            />

            {/* Products input */}

            <Text style={[styles.textTag, { marginBottom: 12 }]}>Produtos</Text>

            {/* Product table component */}
            {products.length > 0 ? (
              <ProductTable
                products={products}
                handleDeleteProduct={handleDeleteProduct}
                getCategoryIcon={getCategoryIcon}
              />
            ) : (
              <Text
                style={{
                  fontFamily: 'SoraRegular',
                  fontSize: SIZES.font,
                  color: COLORS.wingDarkBlue,
                  marginBottom: 12,
                }}
              >
                Nenhum produto adicionado
              </Text>
            )}
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {
                  width: width * 0.3,
                  borderRadius: 30,
                  paddingVertical: 3,
                  alignSelf: 'flex-end',
                  marginVertical: 0,
                  borderColor: COLORS.wingDarkBlue,
                  borderWidth: 1,
                },
              ]}
              onPress={() => setIsModalVisible(true)}
            >
              <MaterialCommunityIcons name="plus" size={24} color={COLORS.wingDarkBlue} />
              <Text style={[styles.textButton, { marginStart: 2 }]}>Adicionar</Text>
            </TouchableOpacity>

            <ProductInputModal
              isModalVisible={isModalVisible}
              generalCategory={selectedCategory}
              getCategoryIcon={getCategoryIcon}
              getCategoryName={getCategoryName}
              onSave={handleAddProduct}
              onCancel={handleCancel}
            />
          </View>

          <View style={styles.containerBTN}>
            <CustomButton
              onPress={() => {
                handleCleanForm(),
                handleFormSubmission()
              }}
              text="Adicionar Movimento"
              type="TERTIARY"
              widthScale={0.8}
            ></CustomButton>

<CustomButton
              onPress={() => handleCleanForm()}
              text="Limpar Dados"
              type="SECONDARY"
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
  infoContainer: {
    marginHorizontal: 40,
    marginBottom: 40,
  },
  textTag: {
    fontFamily: 'SoraBold',
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
  },
  textInfo: {
    fontFamily: 'SoraLight',
    fontSize: SIZES.medium,
  },
  containerBTN: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: 40,
    marginBottom: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: SIZES.small,
    fontFamily: 'SoraBold',
  },
  buttonStyle: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: COLORS.wingDarkBlue,
    alignItems: 'center',
  },
  textButton: {
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
    marginVertical: 20,
  },
  debitCreditButton: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1.5,
    alignSelf:'stretch',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginHorizontal: 5,
    
    borderColor: COLORS.wingDarkBlue,
  // borderColor:'#ed711e'
  },
  textDebitCredit: {
    fontFamily: 'SoraMedium',
    fontSize: SIZES.font,
    color: COLORS.white,
    //marginStart: 10,
  },
})
