import React from "react";
import { StyleSheet,Text, TextInput, View, Button , Image, useWindowDimensions, Pressable} from "react-native";
import { useState } from "react";
import AuthContext from "../context/AuthProvider";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import CustomTextButton from "../components/CustomTextButton";
import CustomBackButton from "../components/CustomBackButton";

function LoginScreen({ navigation }) {
  //login form
  const [isSecureEntry, setIsSecureEntry]=useState(true)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = React.useContext(AuthContext);
  const {height, width} = useWindowDimensions();
  const [validPassword, setValidPassword] = useState(true);
  const [validEmail, setValidEmail] = useState(true);

  function alertMessage(){
    password=='' ? setValidPassword(false): setValidPassword(true);
    email=='' ? setValidEmail(false):setValidEmail(true)
    return "Campos obrigatórios não preenchidos!"
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
        <Image source={require('../../assets/images/logo_azul_escuro.png')} resizeMode='contain' style={[styles.logo, {height: height * 0.15}]}></Image>
        <Text style={styles.wingman}>Login</Text>
     </View>

      <View style={styles.placeInput}>
      
      {validEmail? <Text style={styles.text}>Email</Text> : showErrorField("Email")}
        <CustomInput placeholder={"joao@email.com"} value={email} setValue={setEmail} iconNameEntry='email'/>
        {validPassword? <Text style={styles.text}>Password</Text> : showErrorField("Password")}
        <CustomInput placeholder={"*******"} value={password} setValue={setPassword} secureTextEntry isPassword={true} iconNameEntry='form-textbox-password'/>
        <CustomTextButton onPress={() => alert("Não está feito")} textNormal="Esqueceu-se da password? " textButton="Carregue aqui!" textSize={12}></CustomTextButton>
      </View>
      <View style={[styles.placeButtons, {position: 'absolute', top: height*0.8 }]}>
        <CustomButton onPress={() => {email!='' && password!='' ? (signIn(email, password), setValidEmail(true), setValidPassword(true)) : alert(alertMessage())}} text="Entrar"></CustomButton>
        <CustomTextButton onPress={() => navigation.navigate("Register")} textNormal="Não tem conta? " textButton="Registe-se!" textSize={16}></CustomTextButton>
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
  error:{
    color: 'red',
    fontFamily:"SoraLight",
    fontSize: SIZES.small,
    alignSelf: 'flex-start',
    paddingHorizontal:30,
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
    top: 30,
    width: "100%",
    alignItems: 'center',

  },
  wingman:{
    fontFamily: 'SoraBold',
    fontSize: 40,
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
  }
});

export default LoginScreen;
