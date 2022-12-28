import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import AuthContext from "../../context/AuthProvider";
import {COLORS, SHADOWS, SIZES } from '../../constants'

function LandingScreen({navigation}) {
    const { signIn } = React.useContext(AuthContext);
    const { height } = useWindowDimensions();
    return (
    <SafeAreaView style={styles.root}>
        <View style={styles.containerLogo}>       
            <Image style={[styles.logo,{height: height*0.14}]} resizeMode="contain" source={require('../../../assets/images/logo-white.png')}></Image>
            <Text style={styles.wingman}>Wingman</Text>
        </View>        
            <View style={styles.container}>
            <Text style={styles.text}>Ganha controlo sobre as tuas </Text>
            <Text style={styles.text}>finanças, potencia as tuas</Text>
            <Text style={styles.text}>poupanças e melhora a</Text>
            <Text style={styles.text}>alocação dos teus recursos!</Text>
          
        </View>

        
        <Image style={[styles.preview,{height: height*0.82}]} source={require('../../../assets/images/preview-home.png')}></Image>
        
        <View style={styles.containerBTN}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
                <Text style={[styles.buttonText,{height: height*0.02}]}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.button}>
                <Text style={[styles.buttonText,{height: height*0.02}]}>Registe-se Já!</Text>
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
  root: {
    flex: 1,
    backgroundColor: COLORS.wingblue,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    bottom:"27%"
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center",
    bottom:"30%"
  },
  logo: {
    width: 200,
    maxHeight:200
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
    // space between buttons
    width:"40%", 
    height:"80%",
    //width:150, 
    //height:40
  },
  containerBTN:{
    // put the buttons after the text
    //bottom: 200,
    // Put the buttons at the bottom of the screen
    position: 'absolute',
    bottom: "8%",
    //row align items
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // margin horizontal
    //justifyContent: 'space-evenly',
    width: '100%'
  },
  buttonText: {
    color: "white",
    fontSize: SIZES.small,
    fontFamily: "SoraBold"
  },
  preview:{
    width: "150%",
    maxHeight: 700,
    position: "absolute",
    bottom: "-16%",
    }
});

export default LandingScreen;