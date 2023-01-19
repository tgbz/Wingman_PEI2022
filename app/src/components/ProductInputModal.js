import React, { useState, useEffect } from 'react'
import {useWindowDimensions, Modal, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native'
import ChooseCategoryModal from './ChooseCategoryModal'
const ProductInputModal = ({ isModalVisible, toggleModalCT,getCategoryIcon, onSave, onCancel }) => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [quantity, setQuantity] = useState('')
  const [prodCategory, setProdCategory] = useState('Sem Categoria')
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);


    const { width } = useWindowDimensions()
  // clear the input fields when the modal is opened
  useEffect(() => {
    if (isModalVisible) {
      handleClean()
    }
  }, [isModalVisible])

  const handleCategorySelection = (selectedCategory) => {
    setProdCategory(selectedCategory);
    setIsCategoryModalVisible(false);
  }

  const handleClean = () => {
    setName('')
    setValue('')
    setQuantity('')
    setProdCategory('Sem Categoria')
    
  }

  // ismodalvisibleCT function



  return (
    <Modal animationType="slide" transparent={false} visible={isModalVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Adicionar Produto</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Produto:</Text>
          <TextInput
            placeholder="Produto"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Valor:</Text>
          <TextInput
            placeholder="Valor"
            value={value}
            onChangeText={(text) => setValue(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quantidade:</Text>
          <TextInput
            placeholder="Quantidade"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Categoria:</Text>
          <TouchableOpacity
            style={[styles.categoryButton, { width: width * 0.8 }]}
            onPress={() => setIsCategoryModalVisible(true)}
          >
            {console.log("Product Category: ",prodCategory)}
            {getCategoryIcon(prodCategory)}
            <Text style={styles.textCategory}>{prodCategory}</Text>
          </TouchableOpacity>
          <ChooseCategoryModal
                  isModalVisibleCT={isCategoryModalVisible}
                  setisModalVisibleCT={setIsCategoryModalVisible}
                  setSelectedCategory={handleCategorySelection}
                />
          {/*           
    <TextInput
    placeholder="Categoria"
    value={prodCategory}
    onPress={() => setisModalVisibleCT(true)}
    //onChangeText={(text) => setProdCategory(text)}
    style={styles.input}
    />
    */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
                onSave({ name, value, quantity, prodCategory });
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
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default ProductInputModal
