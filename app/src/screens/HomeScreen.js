import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useState, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FONTS, COLORS, SHADOWS, SIZES } from "../constants";
import { serverURL } from "../config/hosts";
import { AntDesign } from "@expo/vector-icons";
import { ProgressChart } from "react-native-chart-kit";
import _ from "lodash"; //Fazer Clone dos objetos
import ActivityTable from "../components/ActivityTable";

function HomeScreen({ navigation }) {
  const [token, setToken] = useState("");
  const [transactionsData, setTransactionsData] = useState([]);

  const { signOut } = React.useContext(AuthContext);
  useEffect(() => {
    AsyncStorage.getItem("userToken")
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err));
  }, []);

  const getCategories = async () => {
    // fecth data from serverURL/users/userCategory/:id and print it
    console.log(`${serverURL}+'/categories/userCategory/'+${token.id}`);
    const resp = await fetch(
      `${serverURL}/categories/userCategory/${token.id}`
    );
    const data = await resp.json();
    console.log(data);
  };

  //----------------------Resumo de Atividade--------------
  const getActvs = async () => {
    // fecth data from serverURL/users/userCategory/:id and print it
    const resp = await fetch(
      `${serverURL}/purchases/getAllPurchase/${token.id}`
    );
    const transData = await resp.json();
    setTransactionsData(transData.slice(0,5))
  };
  // Put transaction data on dd/mm/aa format
  function treatDate(date) {
    //Obtain the first 10 caracteres: data
    /*if (date){
      if (typeof date === "string") {
        return date
          .slice(5, 10)
          .replaceAll("-", "/")
          .split("/")
          .reverse()
          .join("/");
      }
    }*/
    return date
  }

  const transactionsList = []
  // Extract only the wanted info from the request to api 
  function adjustData( transData) {
    transData.forEach(element => {
      let obj = {idPurchase: element.idPurchase,date: treatDate(element.date), transaction: element.seller, value: element.value, category: element.idcategory, type: element.type}
      transactionsList.push(obj)
    });
  }
  //---------------------- FimResumo de Atividade--------------

  // Donut Charts
  // ----------------------------------------------------------------------------------------

  const screenWidth = Dimensions.get("window").width - 40;
  const [categoryData, setCategoryData] = useState([]);
  const noCategoryChartDataExample = {
    labels: ["No Category"], // optional
    data: [0.4],
  };

  const essencial_selector = 1;
  const non_essencial_selector = 2;
  const investment_selector = 3;
  const charts_height = 100;

  // funtion to get the color of the chart
  const getColor = (selector) => {
    switch (selector) {
      case 1:
        return (opacity = 1) => `rgba(255, 0, 0, ${opacity})`;
      case 2:
        return (opacity = 1) => `rgba(255, 190, 11, ${opacity})`;
      case 3:
        return (opacity = 1) => `rgba(58, 134, 255, ${opacity})`;
      default:
        return (opacity = 1) => `rgba(255, 25, 255, ${opacity})`;
    }
  };
  // function chartConfig receives a selector and returns a chartConfig
  const chartConfig = (selector) => {
    return {
      backgroundGradientFrom: COLORS.white,
      //backgroundGradientFromOpacity: 0,
      backgroundGradientTo: COLORS.white,
      //backgroundGradientToOpacity: 0,
      //backgroundGradientToOpacity: 1,
      decimalPlaces: 2, // optional, defaults to 2dp
      color: getColor(selector),
      //color: (opacity = 1) => `rgba(${a}, ${b}, ${c}, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    };
  };

  useEffect(() => {
    AsyncStorage.getItem("userToken")
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err));
  }, []);

  // USER DATA
  const [userData, setUserData] = useState([]);
  const [photo, setPhoto] = useState("");

  const fetchData = async (token) => {
    const resp1 = await fetch(`${serverURL}/users/userProfile/${token.id}`);
    const userData = await resp1.json();
    //console.log('User fetch data: ' + JSON.stringify(userData))
    setUserData(userData);

    const resp = await fetch(
      `${serverURL}/categories/userCategory/${token.id}`
    );
    const categoryData = await resp.json();
    //console.log('User fetch categoru data: ' + JSON.stringify(categoryData))
    setCategoryData(categoryData);

    const img = await fetch(`${serverURL}/files/avatar/${token.id}`);
    //console.log('Time: ' + new Date().toLocaleTimeString())
    //console.log("User fetch img: " + JSON.stringify(img.url));
    setPhoto(img.url);
  };

  useEffect(() => {
    if (token.id) {
      fetchData(token);
      getActvs(token);
    }
  }, [token]);

  function transformToNoCategoryData(selector, categoryData) {
    const data = {};
    let spent = 0,
      total_plafond = 0;
    //le.log('-----------------')
    //console.log('selector: ' + selector)
    categoryData.forEach((element) => {
      if (parseInt(element.is_essential) == selector) {
        total_plafond += parseInt(element.plafond);
        spent += parseInt(element.total_spent);
      }
    });

    //console.log('total_plafond: ' + total_plafond)
    //console.log('spent: ' + spent)
    if (spent >= total_plafond) {
      // TODO: change this to 1
      data.data = [0.5];
    } else data.data = [spent / total_plafond];

    data.labels = [selector];
    return data;
  }

  return (
    adjustData(transactionsData),
    (
      <SafeAreaView style={styles.root}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.profileImage}>
                {photo ? (
                  (console.log("I have photo!! " + JSON.stringify(photo)),
                  (
                    <Image
                      source={{ uri: photo }}
                      style={styles.profileImage}
                    />
                  ))
                ) : userData.gender == 0 ? ( // man
                  <Image
                    source={require("../../assets/images/male-avatar.png")}
                    style={styles.image}
                    resizeMode="center"
                  ></Image>
                ) : userData.gender == 1 ? (
                  <Image
                    source={require("../../assets/images/female-avatar.png")}
                    style={styles.image}
                    resizeMode="center"
                  ></Image>
                ) : (
                  <Image
                    source={require("../../assets/images/other-avatar.png")}
                    style={styles.image}
                    resizeMode="center"
                  ></Image>
                )}
              </View>
              <View style={{ left: 90, top: 10 }}>
                <Text style={styles.title}>Welcome Back,</Text>
                <Text style={styles.name}>{userData.name}</Text>
              </View>
            </View>
            <View style={styles.body}>
              {/* if hascategory==0  make a card to redirect to politicsSuggestionScreen 
        ELSE NOTHING*/}
              {userData.hascategory == 1 ? (
                <View style={[styles.card1, { backgroundColor: "#ee821a" }]}>
                  <View>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: "SoraBold",
                        fontSize: SIZES.medium,
                      }}
                    >
                      Definir Política de consumo
                    </Text>
                    <AntDesign
                      name="rightcircleo"
                      size={24}
                      color="white"
                      style={styles.iconStyle}
                      onPress={() => navigation.navigate("PoliticsSuggestion")}
                    />
                  </View>
                </View>
              ) : (
                <View></View>
              )}
              <View style={[styles.card1, { backgroundColor: COLORS.white }]}>
                {/* Donut Charts with space between */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <View style={styles.charts}>
                    <ProgressChart
                      data={transformToNoCategoryData(
                        essencial_selector,
                        categoryData
                      )}
                      width={screenWidth / 4}
                      height={charts_height}
                      strokeWidth={16}
                      radius={32}
                      chartConfig={chartConfig(essencial_selector)}
                      hideLegend={true}
                    />
                    <Text style={styles.charts_text}>Essenciais</Text>
                  </View>
                  <View style={styles.charts}>
                    <ProgressChart
                      data={transformToNoCategoryData(
                        non_essencial_selector,
                        categoryData
                      )}
                      width={screenWidth / 4}
                      height={charts_height}
                      strokeWidth={16}
                      radius={32}
                      chartConfig={chartConfig(non_essencial_selector)}
                      hideLegend={true}
                    />
                    <Text style={styles.charts_text}>Não Essenciais</Text>
                  </View>
                  <View style={styles.charts}>
                    <ProgressChart
                      data={transformToNoCategoryData(
                        investment_selector,
                        categoryData
                      )}
                      width={screenWidth / 4}
                      height={charts_height}
                      strokeWidth={16}
                      radius={32}
                      chartConfig={chartConfig(investment_selector)}
                      hideLegend={true}
                    />
                    <Text style={styles.charts_text}>Investimentos</Text>
                  </View>
                </View>
              </View>
            </View>
            {/*
        <View>
          <Button title="Log out" onPress={() => signOut()} />
        </View>
        <View>
          <Button title="Perfil" onPress={() => navigation.navigate('Profile')} />
        </View>
        <View>
          <Button
            title="Definir Políticas de Consumo"
            onPress={() => navigation.navigate('PoliticsSuggestion')}
          />
        </View>
        <View>
          <Button
            title="Resumo de Atividade"
            onPress={() => navigation.navigate('ActivitySummary')}
          />
        </View>
        */}
          </View>
          <ActivityTable
            data={transactionsList}
            headerHome={true} 
            navigation={navigation}
          ></ActivityTable>
          <TouchableOpacity onPress={() => navigation.navigate('OCR')}><Text>OCR</Text></TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.eggshell,
  },
  header: {
    flexDirection: "row",
    // alignItems: 'center',
    justifyContent: "space-between",
    marginTop: "3%",
  },

  container: {
    //flex: 1,
    //backgroundColor: COLORS.white,
    //alignItems: "center",
    //justifyContent: "center",
    marginHorizontal: 20,
    marginTop: "3%",
  },
  charts: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    padding: 5,
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
  },
  charts_text: {
    padding: 5,
    fontFamily: "SoraMedium",
    fontSize: SIZES.font,
    color: COLORS.wingDarkBlue,
  },
  title: {
    fontFamily: "SoraLight",
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
    marginBottom: 5,
    // align text to the right
    textAlign: "left",
  },
  name: {
    fontFamily: "SoraMedium",
    fontSize: SIZES.large,
    color: COLORS.wingDarkBlue,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileImage: {
    // put image in the upper left corner
    position: "absolute",
    top: 0,
    left: 0,
    width: 70,
    height: 70,
    borderRadius: 100,
    overflow: "hidden",
  },
  card1: {
    // outline in wing blue, rounded corners
    borderRadius: 10,
    //margin: 10,
    padding: 20,
    marginBottom: 20,
  },
  body: {
    marginTop: 40,
    // cards in column with space between
  },
  iconStyle: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});



export default HomeScreen;
