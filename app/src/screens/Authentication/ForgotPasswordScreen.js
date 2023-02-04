import React from "react";
import { StyleSheet,Text, TextInput, View, Button , Image, useWindowDimensions, Pressable} from "react-native";
import { useState } from "react";
import AuthContext from "../../context/AuthProvider";
import {FONTS,COLORS, SHADOWS, SIZES } from '../../constants'
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomTextButton from "../../components/CustomTextButton";
import CustomBackButton from "../../components/CustomBackButton";

export default function ForgotPasswordScreen({ navigation }) {
  //login form
  const [isSecureEntry, setIsSecureEntry]=useState(true)
  const [email, setEmail] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const {height, width} = useWindowDimensions();
  const [validEmail, setValidEmail] = useState(true);

  function alertMessage(){
    if (email == ''){
      setShowWarning(false)
      return "Campos obrigatórios não preenchidos!"}
  }
  function showErrorField(text){
    return(<Text style= {{alignSelf: 'flex-start', paddingHorizontal:30}}>
              <Text style={styles.text}>{text}</Text>
              <Text style={styles.error}> * Campo Obrigatório</Text>
            </Text>)
    }
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <CustomBackButton onPress={() => navigation.navigate("Landing")}></CustomBackButton>
        <Image source={require('../../../assets/images/logo_azul_escuro.png')} resizeMode='contain' style={[styles.logo, {height: height * 0.15}]}></Image>
        <Text style={styles.wingman}>Recuperação de Password</Text>
     </View>

      <View style={styles.placeInput}>
      
      {validEmail? <Text style={styles.text}>Introduza o seu email:</Text> : showErrorField("Email")}
        <CustomInput placeholder={"joao@email.com"} value={email} setValue={setEmail} iconNameEntry='email'/>
        <CustomButton onPress={() => {email!='' ? (console.log("Válido"), setShowWarning(true)) : alert(alertMessage())}} text="Enviar Email de Recuperação"></CustomButton>
        {showWarning ? <Text style={styles.warning}>Verifique o seu email. Deverá receber uma hiperligação para recuperação de password.</Text>: <Text></Text> }
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.eggshell,
    
  },
  containerLogo: {
    flexDirection: 'row',
    top: 40,
    paddingVertical: 20,
    alignContent: 'center',
    alignItems: 'center'
  },

  logo: {
    flex:0.5,
    width: "70%",
    minWidth:40,
    maxWidth: 300,
    maxHeight: 120,
    paddingVertical:0,
    padding: -20
  },
  placeInput:{
    alignItems: 'left',
    top: 50,
    width: "100%",
    alignItems: 'center',

  },
  wingman:{
    fontFamily: 'SoraBold',
    fontSize: 20,
    color: COLORS.wingDarkBlue,
    paddingVertical:20,
    flex:3
  },

  placeButtons:{
    alignItems: 'center',
    width: "100%",
    alignContent: 'space-between'
  },
  text:{
    color: COLORS.wingDarkBlue,
    fontFamily:"SoraLight",
    fontSize: 20,
    alignSelf: 'flex-start',
    paddingHorizontal:30,
  },
  warning:{
    padding: 15,
    color: COLORS.wingDarkBlue,
    fontFamily:"SoraLight",
    fontSize: 14,
    textAlign: 'center'
  },
});

