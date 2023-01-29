import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  Platform,
  StatusBar,
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
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { ProgressChart } from 'react-native-chart-kit'
import { CATEGORIES, CATEGORIESCOLORS } from '../constants'
import { BarChart } from 'react-native-chart-kit'
import _ from 'lodash' //Fazer Clone dos objetos
import { set } from 'react-native-reanimated'

function StatisticsScreen({ navigation }) {
  const { width } = useWindowDimensions()
  const [token, setToken] = useState('')
  const months = []
  const [selectedMonth, setSelectedMonth] = useState(11)
    // Set the height of each item in the list
    const ITEM_HEIGHT = 100;


  const getItemLayout = (data, index) => (

    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
  );

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err))
  }, [])

  //  function to get 12 months before the current month
  const getMonths = () => {
    const monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];
    let date = new Date()
    date.setMonth(date.getMonth() - 12)
    for (let i = 0; i < 12; i++) {
      date.setMonth(date.getMonth() + 1)
      months.push({
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
      })
    }
  }

  const navigateToPrevious = () => {
    if (selectedMonth > 0) {
      setSelectedMonth(selectedMonth - 1)
      //flatListRef.current.scrollToIndex({ animated: true, index: selectedMonth - 1 })
    }
  }

  const navigateToNext = () => {
    if (selectedMonth < months.length - 1) {
      setSelectedMonth(selectedMonth + 1)
      //flatListRef.current.scrollToIndex({ animated: true, index: selectedMonth + 1 })
    }
  }

  const flatListRef = React.createRef()

  // fecth data from the server
  // router.get("/userCategory/:id/:date"
  const [dataCategories, setDataCategories] = useState([])
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const fecthData = async (token, date) => {
    //console.log('Date to fetch: ', date)
    const response = await fetch(`${serverURL}/categories/userCategory/` + token.id + `/` + date, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    //console.log('Data: ', data[0])
    setDataCategories(data)

    // fetch data for the balance info 
    // router.get('/getBalance/:id/:date'
    console.log('Date to fetch: ', `${serverURL}/purchases/getBalance/` + token.id + `/` + date)
    const responseBalance = await fetch(`${serverURL}/purchases/getBalance/` + token.id + `/` + date, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const dataBalance = await responseBalance.json()
    console.log('Data Balance: ', dataBalance[0])
    console.log('Income: ', dataBalance[0].income)
    console.log('Expense: ', dataBalance[0].despesa)
    setIncome(Math.round(dataBalance[0].income))
    setExpense(Math.round(dataBalance[0].despesa))
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
  }
  // fetch the data for the correct month when the month is changed
  useEffect(() => {
    // got the month and year from the months array
    const month = months[selectedMonth].month
    const year = months[selectedMonth].year
    // MONTH NAME TO NUMBER
    const monthNumber = monthsLong[month]

    // format  2023-01-01
    const date = year + '-' + monthNumber + '-' + '01'
    flatListRef.current.scrollToIndex({ animated: true, index: selectedMonth });
    fecthData(token, date)
  }, [selectedMonth])

  useEffect(() => {
    if (token.id) {
      const today = new Date()
      // format  2023-01-01
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      flatListRef.current.scrollToIndex({ animated: true, index: selectedMonth });
      fecthData(token, date)
    }
  }, [token])

  // screen that on top has a scrool horizontal to select th month
  // and on the bottom has a bar chart with the incomes vs expenses data of the month selected
  // and a donut chart for  each categorie with the plafond vs spent data of the month selected
  return (
    getMonths(),
    //console.log(months),
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
                getItemLayout={getItemLayout}
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
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceText}>{income-expense} €</Text>
              <Text style={styles.percentageBalance}>Gastaste {Math.round((expense*100)/income)}% do que ganhaste</Text>
            </View>
            {/* Two containers in line */}
            <View style={styles.incomeExpenseContainer}>
              <View style={[styles.IEContainer]}>
                <MaterialCommunityIcons name="arrow-up" style={styles.incomeIcon} />
                <View style={styles.IETextContainer}>
                  <Text style={styles.IEText}>Receitas</Text>
                  <Text style={styles.IENumber}>{income} €</Text>
                </View>
              </View>
              <View style={[styles.IEContainer]}>
                <MaterialCommunityIcons name="arrow-down" style={styles.expenseIcon} />
                <View style={styles.IETextContainer}>
                  <Text style={styles.IEText}>Despesas</Text>
                  <Text style={styles.IENumber}>{expense} €</Text>
                </View>
              </View>
            </View>

            {/*Title FlatList 
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Despesas por Categoria</Text>
            </View>
            */}

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
                          maxWidth: width - 20,
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
                  <View style={{ alignItems: 'flex-end', paddingRight: 20 }}>
                    {/*If the spent is bigger than the plafond show the plafond in red */}
                    {item.total_spent > item.plafond && (
                      <>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'SoraBold',
                            color: COLORS.wingDarkBlue,
                          }}
                        >
                          {Number(item.total_spent).toFixed(0)} €
                        </Text>
                        <Text style={{ fontSize: 13, color: COLORS.wingDarkBlue, opacity: 0.8 }}>
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
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
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
    padding: 10,
//paddingTop: 10,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 16,
    marginBottom: 8,
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
    opacity: 0.8,
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
  balanceContainer: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 10,
    //marginBottom: 5,
  },
  balanceText: {
    color: COLORS.wingDarkBlue,
    fontFamily: 'SoraMedium',
    fontSize: 30,
  },
  percentageBalance: {
    color: COLORS.secondary,
    fontFamily: 'SoraMedium',
    fontSize: 13,
  },

  incomeExpenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  IEContainer: {
    alignItems: 'center',
    width: '48%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.eggshell,
    //shadowOffset: { width: 5, height: 5 },
    //shadowOpacity: 0.3, 
    //shadowRadius: 5,
    marginRight: 5,
    flexDirection: 'row',
  },
  IETextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
  },
  incomeIcon: {
    color: 'green',
    fontSize: 30,
    //marginBottom: 10,
  },
  expenseIcon: {
    color: 'red',
    fontSize: 30,
    //marginBottom: 10,
  },
  IEText: {
    color: COLORS.secondary,
    fontFamily: 'SoraMedium',
    fontSize: 15,
  },
  IENumber: {
    color: COLORS.wingDarkBlue,
    fontFamily: 'SoraMedium',
    fontSize: 24,
  },
})

export default StatisticsScreen
