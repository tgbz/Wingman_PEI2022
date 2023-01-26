import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CATEGORIES, CATEGORIESCOLORS } from '../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CategoryRow = ({ item, percentage }) => {
  return (
    <View style={styles.categoryRowContainer}>
      <View style={styles.categoryIconContainer}>{CATEGORIES[item.idcategory].icon}</View>
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryName}>{CATEGORIES[item.idcategory].name}</Text>
        <Text style={styles.categoryPercentage}>{percentage.toFixed(2)}%</Text>
      </View>
      <View style={styles.categorySpentBarContainer}>
        <View
          style={[
            styles.categorySpentBar,
            {
              background: `linear-gradient(to right, #8BC34A ${percentage}%, #F44336 ${percentage}% )`,
              width: `${(item.total_spent / item.plafond) * 100}%`,
            },
          ]}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  categoryRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    height: 48,
  },
  categoryIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryPercentage: {
    fontSize: 14,
    color: 'gray',
  },
  /*
    categorySpentBarContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    categorySpentBar: {
      height: '100%',
      borderRadius: 8,
      backgroundColor: 'green',
    },*/
  categorySpentBarContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categorySpentBar: {
    height: 8,
    borderRadius: 8,

    transition: 'width 0.2s linear',
  },
})

export default CategoryRow;
