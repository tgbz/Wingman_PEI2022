import React, { useState, useEffect } from 'react'
import { SIZES,COLORS } from '../constants'
import {useWindowDimensions, Modal, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native'
import ChooseCategoryModal from './ChooseCategoryModal'
import CustomInput from './CustomInput'
const ProductInputModal = ({ isModalVisible, toggleModalCT,getCategoryIcon,getCategoryName, onSave, onCancel }) => {
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [quantity, setQuantity] = useState('')
  const [idcategory, setIdcategory] = useState(22)
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);


    const { width } = useWindowDimensions()
  // clear the input fields when the modal is opened
  useEffect(() => {
    if (isModalVisible) {
      handleClean()
    }
  }, [isModalVisible])

  const handleCategorySelection = (selectedCategory) => {
    setIdcategory(selectedCategory);
    setIsCategoryModalVisible(false);
  }

  const handleClean = () => {
    setDescription('')
    setValue('')
    setQuantity('')
    setIdcategory(22)
    
  }

  // ismodalvisibleCT function



  return (
    <Modal animationType="slide" transparent={false} visible={isModalVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Adicionar Produto</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.textTag}>Produto:</Text>
          <CustomInput 
              placeholder={'Queijo'}
              value={description}
              setValue={setDescription}
              widthScale={0.8}
            />


          <Text style={styles.textTag}>Valor:</Text>
          <CustomInput
              placeholder={'10.50'}
              value={value}
              setValue={setValue}
              keyboardType="numeric"
              icondescriptionEntry="euro"
              widthScale={0.8}
            />


          <Text style={styles.textTag}>Quantidade:</Text>
          <CustomInput
              placeholder={'2'}
              value={quantity}
              setValue={setQuantity}
              keyboardType="numeric"
              widthScale={0.8}
            />


          <Text style={styles.textTag}>Categoria:</Text>
          <TouchableOpacity
            style={[styles.categoryButton, { width: width * 0.8 }]}
            onPress={() => setIsCategoryModalVisible(true)}
          >
            {console.log("Product Category: ",idcategory)}
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
                onSave({ description, value, quantity, idcategory });
                handleClean();
                setIsCategoryModalVisible(false);
                }}
          >
        
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
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
})

export default ProductInputModal
