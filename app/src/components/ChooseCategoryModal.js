import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { CATEGORIES, COLORS, SIZES } from '../constants'
import React from 'react'
import CustomButton from '../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
export default function ChooseCategoryModal({
  isModalVisibleCT,
  setisModalVisibleCT,
  setSelectedCategory,
}) {
  return (
    <Modal animationType="slide" transparent={false} visible={isModalVisibleCT}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Selecione a Categoria</Text>
          <TouchableOpacity
            onPress={() => {
              setisModalVisibleCT(false)
            }}
          >
            <Ionicons name="ios-close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {Object.entries(CATEGORIES).map(([key, { icon, name }]) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  setisModalVisibleCT(false)
                
                  setSelectedCategory(name)
                }}
                style={styles.categoryContainer}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {icon}
                  <Text
                    style={{
                      marginStart: 10,
                      fontFamily: 'SoraRegular',
                      fontSize: SIZES.font,
                      color: COLORS.wingDarkBlue,
                    }}
                  >
                    {name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
   marginTop: 30,
    //alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 30,
  },
  modalTitle: {
    fontFamily: 'SoraBold',
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
    //marginBottom: 10,
    marginStart: 10,
  },
  categoriesContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'felx-start',
    justifyContent: 'center',
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    }
})
