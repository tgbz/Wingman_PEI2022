import React from "react";
import { StyleSheet,Text, TextInput, View, Button , Image, useWindowDimensions, Pressable} from "react-native";
import { useState } from "react";
import AuthContext from "../context/AuthProvider";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import CostumInput from "../components/CostumInput";
import CostumButton from "../components/CostumButton";
import { TouchableOpacity } from "react-native-gesture-handler";



function LoginScreen({ navigation }) {
  //login form

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = React.useContext(AuthContext);
  const {height} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require('../../assets/images/logo-white.png')} resizeMode='contain' style={[styles.logo, {height: height * 0.15}]}></Image>
        <Text style={styles.wingman}>Login</Text>
     </View>

    <View style={styles.placeInput}>
      <Text style={styles.text}>Email</Text>
      <CostumInput placeholder={"joao@email.com"} value={email} setValue={setEmail}/>
      <Text style={styles.text}>Password</Text>
      <CostumInput placeholder={"*******"} value={password} setValue={setPassword} secureTextEntry/>

    </View>
    <View style={styles.placeButtons}>
    <CostumButton onPress={() => signIn(email, password)} text="Entrar"></CostumButton>
    <CostumButton onPress={() => navigation.goBack()} text="Voltar"></CostumButton>
    <CostumButton onPress={() => alert("Não está feito")} text="Esqueceu-se da password? Carregue aqui" type='TERTIARY'></CostumButton>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.wingblue,
    paddingVertical: 50,
    padding: 20
  },
  containerLogo: {
    flexDirection: 'row',
    top: 40
  },
  logo: {
    flex:0.5,
    width: "70%",
    maxWidth: 300,
    maxHeight: 120,
    paddingVertical:40
  },
  placeInput:{
    alignItems: 'center',
    top: 50,
    width: "100%",

  },
  wingman:{
    fontFamily: 'SoraBold',
    fontSize: 50,
    color: 'white',
    paddingVertical:40
  },

  placeButtons:{
    alignItems: 'center',
    top: 260,
    width: "100%",
  },
  text:{
    color:'white',
    fontFamily:"SoraLight",
    fontSize: 20,
    alignSelf: 'flex-start',
    paddingHorizontal:20
  }
});

export default LoginScreen;
