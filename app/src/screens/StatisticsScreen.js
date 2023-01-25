import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  useWindowDimensions,
  FlatList,
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { ScrollView } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import AuthContext from '../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FONTS, COLORS, SHADOWS, SIZES } from '../constants'
import { serverURL } from '../config/hosts'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ProgressChart } from 'react-native-chart-kit'
import { CATEGORIES, CATEGORIESCOLORS } from '../constants'

import _ from 'lodash' //Fazer Clone dos objetos


function StatisticsScreen({ navigation }) {
  const { width } = useWindowDimensions()
  const [token, setToken] = useState('')
  const months = []
  const [selectedMonth, setSelectedMonth] = useState(11)

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err))
  }, [])

  //  function to get 12 months before the current month
  const getMonths = () => {
    let date = new Date()
    date.setMonth(date.getMonth() - 12)
    for (let i = 0; i < 12; i++) {
      date.setMonth(date.getMonth() + 1)
      months.push({
        month: date.toLocaleString('pt-br', { month: 'long' }),
        year: date.getFullYear(),
      })
    }
  }

  const navigateToPrevious = () => {
    if (selectedMonth > 0) {
      setSelectedMonth(selectedMonth - 1)
      flatListRef.current.scrollToIndex({ animated: true, index: selectedMonth - 1 })
    }
  }

  const navigateToNext = () => {
    if (selectedMonth < months.length - 1) {
      setSelectedMonth(selectedMonth + 1)
      flatListRef.current.scrollToIndex({ animated: true, index: selectedMonth + 1 })
    }
  }

  const flatListRef = React.createRef()

  // fecth data from the server
  // router.get("/userCategory/:id/:date"
  const [dataCategories, setDataCategories] = useState([])
  const fecthData = async (token,date) => {
    console.log("Date to fetch: ",date)
    const response = await fetch(`${serverURL}/categories/userCategory/` + token.id + `/` + date, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log("Data: ",data[0])
    setDataCategories(data)
  }
  const monthsLong = {
    janeiro: '01',
    febreiro: '02',
    março: '03',
    abril: '04',
    maio: '05',
    junho: '06',
    julho: '07',
    agosto: '08',
    setembro: '09',
    outubro: '10',
    novembro: '11',
    dezembro: '12',
  };
  // fetch the data for the correct month when the month is changed
  useEffect(() => {
    // got the month and year from the months array
    const month = months[selectedMonth].month
    const year = months[selectedMonth].year
    // MONTH NAME TO NUMBER
    const monthNumber = monthsLong[month]

    // format  2023-01-01
    const date = year + '-' + monthNumber + '-' + '01'
    fecthData(token,date)

  }, [selectedMonth])


  useEffect(() => {
    if (token.id) {
      const today = new Date()
      // format  2023-01-01
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      fecthData(token,date)
    }
  }, [token])

  // screen that on top has a scrool horizontal to select th month
  // and on the bottom has a bar chart with the incomes vs expenses data of the month selected
  // and a donut chart for  each categorie with the plafond vs spent data of the month selected
  return (
    getMonths(),
    console.log(months),
    (
      <SafeAreaView style={styles.root} forceInset={{ horizontal: 'never' }}>
        <ScrollView>
          {/*Container with border and rounded corners */}
          <View style={styles.container}>
            <View style={styles.listContainer}>
              <TouchableOpacity onPress={() => navigateToPrevious()}>
                <MaterialCommunityIcons name="chevron-left" style={styles.arrow} />
              </TouchableOpacity>
              <FlatList
                ref={flatListRef}
                data={months}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedMonth(index)}
                    style={[styles.listItem, index === selectedMonth ? styles.selected : null]}
                  >
                    <Text
                      style={[
                        styles.monthText,
                        index === selectedMonth ? { color: COLORS.white } : null,
                      ]}
                    >
                      {item.month}
                    </Text>
                    <Text
                      style={[
                        styles.yearText,
                        index === selectedMonth ? { color: COLORS.white } : null,
                      ]}
                    >
                      {item.year}
                    </Text>
                  </TouchableOpacity>
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
              <TouchableOpacity onPress={() => navigateToNext()}>
                <MaterialCommunityIcons name="chevron-right" style={styles.arrow} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerC}>
            {/*Title FlatList */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Despesas por Categoria</Text>
            </View>

            <FlatList
              //data={dataCategories}
              // order the data by the total spent
              data={dataCategories.sort((a, b) => b.total_spent - a.total_spent)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.categoryContainer}>
                  <View style={styles.categorySpentContainer}>
                    <View
                      style={[
                        styles.categorySpentBar,
                        {
                          backgroundColor: CATEGORIESCOLORS[item.idcategory],
                          width: `${(item.total_spent / item.plafond) * 100}%`,
                          maxWidth: width - 10,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.categoryIconContainer}>
                    {CATEGORIES[item.idcategory].icon}
                  </View>
                  <View style={styles.categoryTextContainer}>
                    <Text style={styles.categoryName}>{CATEGORIES[item.idcategory].name}</Text>
                    <Text style={styles.categoryPercentage}>
                      {((item.total_spent / item.plafond) * 100).toFixed(0)}%
                    </Text>
                  </View>
                  {/*At the end of the row show spent and planfond */}
                    <View style={{alignItems: 'flex-end',paddingRight:20}}>
                        {/*If the spent is bigger than the plafond show the plafond in red */}
                        {item.total_spent > item.plafond && (
                            <>
                        <Text style={{fontSize: 14,fontFamily:"SoraBold", color: COLORS.wingDarkBlue}}>
                        {Number(item.total_spent).toFixed(0)} €
                        </Text>
                        <Text style={{fontSize: 13, color: COLORS.wingDarkBlue,opacity: 0.8}}>
                        {Number(item.plafond).toFixed(0)} €
                        </Text>
                        </>
                        )}
                    </View>
                </View>
              )}
            />
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    width: 100,
    alignItems: 'center',
    padding: 10,
    //margin: 5,
    borderRadius: 15,
  },
  monthText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  yearText: {
    fontSize: 13,
  },
  selected: {
    backgroundColor: COLORS.wingDarkBlue,
    // text color white
    color: COLORS.white,
    borderRadius: 15,
  },
  notSelected: {
    backgroundColor: 'transparent',
    color: COLORS.wingDarkBlue,
  },
  arrow: {
    fontSize: 30,
    color: COLORS.wingDarkBlue,
  },

  containerC: {
    flex: 1,
    //alignItems: 'center',
    // tirar este padding e ajustar a width right to full screen
    //padding: 10,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 16,
    marginBottom: 4,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  categoryIconContainer: {
    width: 32,
    height: 32,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTextContainer: {
    flex: 1,
    //alignItems: 'flex-start',
  },
  categoryName: {
    fontSize: SIZES.font,
    fontFamily: 'SoraBold',
    color: COLORS.wingDarkBlue,
  },
  categoryPercentage: {
    fontSize: 14,
    color: COLORS.wingDarkBlue,
    opacity: 0.8,
    marginTop: 4,
  },
  categorySpentContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  categorySpentBar: {
    height: '100%',
    //borderRadius: 8,
    borderBottomEndRadius: 8,
    borderTopEndRadius: 8,
    opacity: 1,
  },
  titleContainer: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    color: COLORS.wingDarkBlue,
    fontFamily: 'SoraMedium',
    fontSize: 20,
  },
})

export default StatisticsScreen
