import React, { useState, useEffect } from 'react'
import { SIZES,COLORS } from '../constants'
import {useWindowDimensions, Modal, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native'
import ChooseCategoryModal from './ChooseCategoryModal'
import CustomInput from './CustomInput'
const ProductInputModal = ({ isModalVisible,generalCategory,getCategoryIcon,getCategoryName, onSave, onCancel,productToEdit,onEdit,isEdit}) => {
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [idcategory, setIdcategory] = useState(generalCategory)
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [validDescription, setValidDescription] = useState(true)
  const [validValue, setValidValue] = useState(true)
  const [validQuantity, setValidQuantity] = useState(true)
  

  // // TODO: Validate form data


  // if setProductToEdit is not { } then set the fields to the productToEdit values
  useEffect(() => {
    if (isEdit) {
      //console.log('productToEdit type',typeof(productToEdit.value))
      setDescription(productToEdit.description)
      setValue(productToEdit.value.toString())
      setQuantity(productToEdit.quantity)
      setIdcategory(productToEdit.idcategory)
    }else{
      //console.log('Not editing')
      setDescription('')
      setValue('')
      setQuantity(1)
      setIdcategory(generalCategory)
    }
  }, [isEdit])



    const { width } = useWindowDimensions()
  // USE EFFECT TO SET THE CATEGORY TO GENERAL CATEGORY
  useEffect(() => {
    setIdcategory(generalCategory)
  }, [generalCategory])

  const handleCategorySelection = (selectedCategory) => {
    setIdcategory(selectedCategory);
    setIsCategoryModalVisible(false);
  }

  const handleClean = () => {
    setDescription('')
    setValue('')
    setQuantity(1)
    setIdcategory(generalCategory)
    
  }


  function showErrorField(text){

    let textToWrite = ''
    if (text === 'Produto') {
      if (!description) {
        textToWrite = '* Campo obrigatório'
      }
    }
    if (text === 'Valor') {
      if (!value) {
        textToWrite = '* Campo obrigatório'
      }
      if (isNaN(value)) {
        textToWrite = '* Valor inválido'
      }
    }
    if (text === 'Quantidade') {
      if (!quantity) {
        textToWrite = '* Campo obrigatório'
      }
      if (isNaN(quantity)) {
        textToWrite = '* Valor inválido'
      }
    }

  


    return(<Text style= {{alignSelf: 'flex-start'}}>
    <Text style={styles.textTag}>{text}</Text>
    <Text style={styles.error}> {textToWrite}</Text>
  </Text>)
  }


  function validateForm() {
    let isValid = true
    if (description === '') {
      setValidDescription(false)
      isValid = false
    }
    if (value === '') {
      setValidValue(false)
      isValid = false
    }
    if (quantity === '') {
      setValidQuantity(false)
      isValid = false
    }

    //if value is not a number
    if (isNaN(value)) {
      setValidValue(false)
      isValid = false
    }
    //if quantity is not a number
    if (isNaN(quantity)) {
      setValidQuantity(false)
      isValid = false
    }
    return isValid
  }

  // ismodalvisibleCT function



  return (
    <Modal animationType="slide" transparent={false} visible={isModalVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Adicionar Produto</Text>
        <View style={styles.inputContainer}>
          {validDescription ? (<Text style={styles.textTag}>Produto</Text>): showErrorField('Produto')}
          <CustomInput 
              placeholder={'Queijo'}
              value={description}
              setValue={setDescription}
              widthScale={0.8}
            />


          {validValue ? (<Text style={styles.textTag}>Valor</Text>): showErrorField('Valor')}
          <CustomInput
              placeholder={'10.50'}
              value={value}
              setValue={setValue}
              keyboardType="numeric"
              icondescriptionEntry="euro"
              widthScale={0.8}
            />


          {validQuantity ? (<Text style={styles.textTag}>Quantidade</Text>) : showErrorField('Quantidade')}
          
            <View
                  style={[styles.buttonStyle, { width: width * 0.8}]}
                >
                  <TextInput
                    placeholder="2"
                    onChangeText={setQuantity}
                    style={styles.textButton}
                  >
                    {quantity}
                  </TextInput>
                </View>


          <Text style={styles.textTag}>Categoria:</Text>
          <TouchableOpacity
            style={[styles.categoryButton, { width: width * 0.8 }]}
            onPress={() => setIsCategoryModalVisible(true)}
          >
            {getCategoryIcon(idcategory)}
            <Text style={styles.textCategory}>{getCategoryName(idcategory)}</Text>
          </TouchableOpacity>
          <ChooseCategoryModal
                  isModalVisibleCT={isCategoryModalVisible}
                  setisModalVisibleCT={setIsCategoryModalVisible}
                  setSelectedCategory={handleCategorySelection}
                />

        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              if (isEdit) {
                if (validateForm())
                {
                onEdit({ description, value, quantity, idcategory });
                handleClean();
                setIsCategoryModalVisible(false);
                }
              } else {

                if (validateForm()) {

                onSave({ description, value, quantity, idcategory });
                handleClean();
                setIsCategoryModalVisible(false);
                }
              }
                }}
          >
        
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => {
            handleClean();
            onCancel();}}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    marginTop: 50,
    backgroundColor: 'white',
    padding: 30,
  },
  modalTitle: {
    marginBottom: 10,

    fontFamily: 'SoraBold',
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
  },
  inputContainer: {
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 40,
  },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: COLORS.wingDarkBlue,
    padding: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 5,

    },
    saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    },
  textTag: {
    fontFamily: 'SoraBold',
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
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
  buttonStyle: {
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
  error : {
    color: "red",
    fontFamily: "SoraMedium",
    fontSize: SIZES.small,
    alignSelf: "flex-start",
  },
  textButton: {
    flex: 0.95,
    fontFamily: 'SoraRegular',
    fontSize: SIZES.font,
    color: COLORS.wingDarkBlue,
    marginStart: 10,
  }
})

export default ProductInputModal
