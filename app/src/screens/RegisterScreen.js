import React from "react";
import { StyleSheet, TextInput, View, Button, Image,useWindowDimensions } from "react-native";
import { RadioButton,Text } from 'react-native-paper';
import { useState } from "react";
import AuthContext from "../context/AuthProvider";
import { SelectList } from 'react-native-dropdown-select-list'
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import CostumInput from "../components/CostumInput";
import CostumButton from "../components/CostumButton";
import { ScrollView } from "react-native-gesture-handler";


function RegisterScreen({ navigation }) {
  //login form
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate,setBirthdate] = useState("");
  const [savings,setSavings] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = React.useContext(AuthContext);
  const registo = async () =>{
    const params = {name,email,birthdate,gender,savings,password}
    const response = await signUp(params)
    if(!isNaN(+response)){
      navigation.navigate("Login")
    }
  }
  const {height, width} = useWindowDimensions();

  const data = [
      {key:"0", value:'Masculino'},
      {key:"1", value:'Feminino'},
      {key:"2", value:'Outro'},
  ]
  const [gender, setSelected] = React.useState("2");
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require('../../assets/images/logo-white.png')} resizeMode='contain' style={[styles.logo, {height: height * 0.15}]}></Image>
        <Text style={styles.wingman}>Registo</Text>
     </View>
     


     <View style={styles.placeInput}>
     <Text style={styles.text}>Nome</Text>
      <CostumInput placeholder={"p.e.: João Miguel Silva"} value={name} setValue={setName}/>
      <Text style={styles.text}>Email</Text>
      <CostumInput placeholder={"joao@email.com"} value={email} setValue={setEmail}/>
      <Text style={styles.text}>Data de Nascimento</Text>
      <CostumInput placeholder={"aaaa-mm-dd"} value={birthdate} setValue={setBirthdate}/>
      <Text style={styles.text}>Sexo</Text>
      <SelectList 
        setSelected={(val) => {val === 'Feminino'? setSelected('1') : val === 'Masculino'? setSelected('0') :setSelected('2') }} 
        data={data} 
        save="value"
        search={false}
        defaultOption={{key: "0", value: 'Masculino'}}
        fontFamily="SoraLight"
        boxStyles={styles.selectList}
        inputStyles={[styles.text, {color:'black'}]}
        dropdownStyles={styles.dropdownStyles}
        
      />
      <Text style={styles.text}>Poupanças</Text>
      <CostumInput placeholder={"100€"} value={savings} setValue={setSavings}/>
      <Text style={styles.text}>Password</Text>
      <CostumInput placeholder={"*******"} value={password} setValue={setPassword} secureTextEntry/>

    </View>
    <View style={styles.placeButtons}>
    <CostumButton onPress={() => {email!='' && password!='' ? registo() : alert("Todos os campos são obrigatórios!")}} text="Entrar"></CostumButton>
    <CostumButton onPress={() => navigation.goBack()} text="Voltar"></CostumButton>
    </View>     
    
    </ScrollView>
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
  placeButtons:{
    alignItems: 'center',
    top: 20,
    width: "100%",
  },
  placeInput:{
    alignItems: 'center',
    width: "100%",

  },
  logo: {
    flex:0.7,
    width: "80%",
    maxWidth: 300,
    maxHeight: 120,
    paddingVertical:40
  },
  wingman:{
    fontFamily: 'SoraBold',
    fontSize: 50,
    color: 'white',
    paddingVertical:40
  },
  text:{
    color:'white',
    fontFamily:"SoraLight",
    fontSize: 15,
    alignSelf: 'flex-start',
    paddingHorizontal:30,
  },
  selectList:{
    backgroundColor: 'white',
    borderColor: 'white',
  },
  dropdownStyles:{
    maxHeight: 120,
    backgroundColor: 'white',
    borderColor:'white'
  },
  
});

export default RegisterScreen;
