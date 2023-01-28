import React from "react";
import { StyleSheet, TextInput, View, Button, Image,useWindowDimensions } from "react-native";
import { RadioButton,Text } from 'react-native-paper';
import { useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { SelectList } from 'react-native-dropdown-select-list'
import {FONTS,COLORS, SHADOWS, SIZES } from '../../constants'
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import CustomTextButton from "../../components/CustomTextButton";
import CustomBackButton from "../../components/CustomBackButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";


function RegisterScreen({ navigation }) {
  //login form
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate,setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validBirthdate, setValidBirthdate] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);



  const { signUp } = React.useContext(AuthContext);
  const registo = async () =>{
    const params = {name,email,birthdate,gender,password}
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('09-10-2020');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  function alertMessage(){
    name=='' ? setValidName(false): setValidName(true);
    password=='' ? setValidPassword(false): setValidPassword(true);
    confirmarPassword=='' ? setValidConfirmPassword(false): setValidConfirmPassword(true);
    birthdate=='' ? setValidBirthdate(false):setValidBirthdate(true)
    email=='' ? setValidEmail(false):setValidEmail(true)
    if (password!=confirmarPassword) return "Passwords não coincidem!"
    else return "Campos obrigatórios não preenchidos!"
  }

  function showErrorField(text){
  return(<Text style= {{alignSelf: 'flex-start', paddingHorizontal:30}}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.error}> * Campo Obrigatório</Text>
          </Text>)
  }
  function setAllVarsTrue(){
    setValidEmail(true);
    setValidName(true);
    setValidBirthdate(true);
    setValidConfirmPassword(true);
    setValidName(true); 
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerLogo}>
        <CustomBackButton onPress={() => navigation.navigate("Landing")}></CustomBackButton>
        <Image source={require('../../../assets/images/logo_azul_escuro.png')} resizeMode='contain' style={[styles.logo, {height: height * 0.15}]}></Image>
        <Text style={styles.wingman}>Registo</Text>
      </View>
  
      <View style={styles.placeInput}>
      {validName? <Text style={styles.text}>Nome</Text> : showErrorField("Nome")}
        <CustomInput placeholder={"p.e.: João Miguel Silva"} value={name} setValue={setName} iconNameEntry='person'/>
        {validEmail? <Text style={styles.text}>Email</Text> : showErrorField("Email")}
        <CustomInput placeholder={"joao@email.com"} value={email} setValue={setEmail} iconNameEntry='email'/>
        {validBirthdate? <Text style={styles.text}>Data de Nascimento</Text> : showErrorField("Data de Nascimento")}
        <CustomInput placeholder={"aaaa-mm-dd"} value={birthdate} setValue={setBirthdate}iconNameEntry='date-range'/>
        <Text style={styles.text}>Género</Text>
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
        {validPassword? <Text style={styles.text}>Password</Text> : showErrorField("Password")}
        <CustomInput placeholder={"*******"} value={password} setValue={setPassword} secureTextEntry iconNameEntry='form-textbox-password'/>
        {validConfirmPassword? <Text style={styles.text}>Confirmar Password</Text> : showErrorField("Confirmar Password")}
        <CustomInput placeholder={"*******"} value={confirmarPassword} setValue={setConfirmarPassword} secureTextEntry iconNameEntry='form-textbox-password'/>

      </View>
      <View style={styles.placeButtons}>
      <CustomButton text="Registar" 
      onPress={
        () => {email!='' && password!='' && birthdate!='' && name!='' && password==confirmarPassword? 
                (registo(), setAllVarsTrue()) : alert(alertMessage())}} 
        />

      <CustomTextButton onPress={() => navigation.navigate("Login")} textNormal="Já tem conta? " textButton="Login!" textSize={16}></CustomTextButton>

      </View> 
      <View>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          style={styles.calendar}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.eggshell,
    
  },
  containerLogo: {
    flexDirection: 'row',
    top: 20,
    paddingVertical: 10,
    alignContent: 'center',
    alignItems: 'center'
  
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
    flex:0.5,
    width: "70%",
    minWidth:40,
    maxWidth: 300,
    maxHeight: 120,
    paddingVertical:40,
    padding: -20
  },
  wingman:{
    fontFamily: 'SoraBold',
    fontSize: 40,
    color: COLORS.wingDarkBlue,
    paddingVertical:40,
    flex:3
  },
  text:{
    color: COLORS.wingDarkBlue,
    fontFamily:"SoraLight",
    fontSize: 15,
    alignSelf: 'flex-start',
    paddingHorizontal:30,
  },
  error:{
    color: 'red',
    fontFamily:"SoraLight",
    fontSize: SIZES.small,
    alignSelf: 'flex-start',
    paddingHorizontal:30,
  },
  selectList:{
    backgroundColor: "#eceffa",
    borderColor: COLORS.wingblue,
  },
  dropdownStyles:{
    maxHeight: 120,
    backgroundColor: "#eceffa",
    borderColor:COLORS.wingblue
  },
  containerNovo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
 },
 calendar: {
  width: "70%",
  
},
  
});

export default RegisterScreen;
