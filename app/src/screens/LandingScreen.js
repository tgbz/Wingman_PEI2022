import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import AuthContext from "../context/AuthProvider";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function LandingScreen({navigation}) {
    const { signIn } = React.useContext(AuthContext);
    return (
    <SafeAreaView style={styles.containerF}>
        <View style={styles.containerLogo}>       
            <Image style={styles.logo}source={require('../../assets/images/logo-white.png')}></Image>
            <Text style={styles.wingman}>Wingman</Text>

        </View>        
            <View style={styles.container}>
            <Text style={styles.text}>Ganha controlo sobre as tuas </Text>
            <Text style={styles.text}>finanças, potencia as tuas</Text>
            <Text style={styles.text}>poupanças e melhora a</Text>
            <Text style={styles.text}>alocação dos teus recursos</Text>
          
        </View>

        
        <Image style={styles.preview} source={require('../../assets/images/preview-home.png')}></Image>
        

        <View style={styles.containerBTN}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
                <Text style={styles.buttonText}>Entrar  ➜</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.button}>
                <Text style={styles.buttonText}>Registe-se Já!  ➜</Text>
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
  bgImage: {
    position: 'absolute',
  },
  containerF: {
    flex: 1,
    backgroundColor: COLORS.wingblue,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    bottom:150
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center",
    bottom:200
  },
  logo: {
    width: 100,
    height: 100
  },
  text: {
    fontFamily: "SoraRegular",
    fontSize: SIZES.large,
    color: COLORS.white,
    alignItems: "center",
    justifyContent: "center",

  },
  wingman: {
    color: 'white',
    fontFamily: "SoraLight",
    fontSize: 44,
    
  },
  button: {
    backgroundColor: COLORS.wingDarkBlue,
    borderRadius: SIZES.small,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.base,
    width:150,
    height:50

  },
  containerBTN:{
   top: 185,
  },
  buttonText: {
    color: "white",
    fontSize: SIZES.small,
    fontFamily: "SoraRegular"

  },
  preview:{
    width: "160%",
    height: 500,
    position: "absolute",
    bottom: 0
  
  }
});

export default LandingScreen;