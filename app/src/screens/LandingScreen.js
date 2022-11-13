import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import AuthContext from "../context/AuthProvider";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function LandingScreen({navigation}) {
    /const { signIn } = React.useContext(AuthContext);
    console.log("oiiiiii"+navigation)
    return (
    <SafeAreaView style={styles.containerF}>
        <View style={styles.containerLogo}>       
            <Image style={styles.logo}source={require('../../assets/logo.png')}></Image>
            <Text style={styles.wingman}>Wingman</Text>

        </View>        
            <View style={styles.container}>
            <Text style={styles.text}>Ganha controlo sobre as tuas </Text>
            <Text style={styles.text}>finanças, potencia as tuas</Text>
            <Text style={styles.text}>poupanças e melhora a</Text>
            <Text style={styles.text}>alocação dos teus recursos</Text>
            <Image style={styles.logo} source={require('../../assets/images/preview-home.png')}></Image>
        </View>

        <View style={{backgroundColor:'#D3D3D3', width:240, height:400, position:'absolute', bottom:0, alignContent:'center', borderTopLeftRadius: SIZES.font, borderTopRightRadius: SIZES.font}}></View>

        <View style={styles.containerBTN}>
            <TouchableOpacity onPress={() => signIn(email, password)} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.button}>
                <Text style={styles.buttonText}>Registe-se Já!</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);
  
const styles = StyleSheet.create({
  containerF: {
    flex: 1,
    backgroundColor: COLORS.wingblue,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    bottom:60
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center",
    bottom:130 
  },
  logo: {
    width: 100,
    height: 100
  },
  text: {
    fontFamily: "roboto",
    fontSize: SIZES.large,
    color: COLORS.white,
    alignItems: "center",
    justifyContent: "center",

  },
  wingman: {
    color: 'white',
    fontFamily: "roboto",
    fontSize: 44,
  },
  button: {
    backgroundColor: COLORS.wingDarkBlue,
    padding: 20,
    borderRadius: SIZES.small,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.base

  },
  containerBTN:{
   top: 160
  },
  buttonText: {
    color: "white",
    fontSize: SIZES.large,
    fontFamily: "roboto"
  },
  preview:{
    width: 50,
    height:50
  }
});

export default LandingScreen;