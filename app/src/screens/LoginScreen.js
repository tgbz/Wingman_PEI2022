import React from "react";
import { StyleSheet,Text, TextInput, View, Button , Image, useWindowDimensions, Pressable} from "react-native";
import { useState } from "react";
import AuthContext from "../context/AuthProvider";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import CostumInput from "../components/CostumInput";
import CostumButton from "../components/CostumButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from '@rneui/themed';


function LoginScreen({ navigation }) {
  //login form
  const [isSecureEntry, setIsSecureEntry]=useState(true)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = React.useContext(AuthContext);
  const {height, width} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require('../../assets/images/logo-white.png')} resizeMode='contain' style={[styles.logo, {height: height * 0.15}]}></Image>
        <Text style={styles.wingman}>Login</Text>
     </View>

    <View style={[styles.placeInput]}>
      <Text style={styles.text}>Email</Text>
      <CostumInput placeholder={"joao@email.com"} value={email} setValue={setEmail}/>
      <Text style={styles.text}>Password</Text>
      <CostumInput placeholder={"*******"} value={password} setValue={setPassword} secureTextEntry isPassword={true}/>

    </View>
    <View style={styles.placeButtons}>
    <CostumButton onPress={() => {email!='' && password!='' ? signIn(email, password) : alert("Necessita de introduzir credenciais!")}} text="Entrar"></CostumButton>
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
    
  },
  containerLogo: {
    flexDirection: 'row',
    top: 40,
    paddingVertical: 30,
    padding: 20
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
    top: 30,
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
    paddingHorizontal:30,
  }
});

export default LoginScreen;
