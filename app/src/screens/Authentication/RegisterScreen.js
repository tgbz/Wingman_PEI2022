import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Platform

} from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { SelectList } from "react-native-dropdown-select-list";
import { FONTS, COLORS, SHADOWS, SIZES } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import CustomTextButton from "../../components/CustomTextButton";
import CustomBackButton from "../../components/CustomBackButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from '@expo/vector-icons'

function RegisterScreen({ navigation }) {
  //login form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState(new Date("1999-01-01"));
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validBirthdate, setValidBirthdate] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);

  const { signUp } = React.useContext(AuthContext);
  const registo = async () => {
    console.log(name);
    console.log(birthdate);
    const date = birthdate.toISOString().split("T")[0];
    const params = { name, email, birthdate:date, gender, password };
    const response = await signUp(params);
    if (!isNaN(+response)) {
      navigation.navigate("Login");
    }
  };
  const { height, width } = useWindowDimensions();

  const data = [
    { key: "0", value: "Masculino" },
    { key: "1", value: "Feminino" },
    { key: "2", value: "Outro" },
  ];
  const [gender, setSelected] = React.useState("2");


  function alertMessage() {
    name == "" ? setValidName(false) : setValidName(true);
    password == "" ? setValidPassword(false) : setValidPassword(true);
    confirmarPassword == ""
      ? setValidConfirmPassword(false)
      : setValidConfirmPassword(true);
    birthdate == "" ? setValidBirthdate(false) : setValidBirthdate(true);
    email == "" ? setValidEmail(false) : setValidEmail(true);
    if (password != confirmarPassword) return "Passwords não coincidem!";
    else return "Erro no registo!";
  }

  function showErrorField(text) {
    var textToWrite = "";
    if (text == "Nome") {
      if (!name) textToWrite = "* Campo Obrigatório";
      else if (name.length < 3) textToWrite = "* Nome inválido";
    } else if (text == "Email") {
      if (!email) textToWrite = "* Campo Obrigatório";
      //check if email is valid
      else if (!email.includes("@") || !email.includes("."))
        textToWrite = "* Email inválido";
      
    /*} else if (text == "Data de Nascimento") {
      if (!birthdate) textToWrite = "* Campo Obrigatório";
      //check if birthdate is in yyyy-mm-dd format and above 18 years old from today
      else if (
        !birthdate.includes("-") ||
        birthdate.length != 10 ||
        birthdate.split("-")[0].length != 4 ||
        birthdate.split("-")[1].length != 2 ||
        birthdate.split("-")[2].length != 2
      )
        textToWrite = "* Data de nascimento inválida";
      else {
        var birthdateArray = birthdate.split("-");
        var birthdateDate = new Date(
          birthdateArray[0],
          birthdateArray[1],
          birthdateArray[2]
        );
        var today = new Date();
        var age = today.getFullYear() - birthdateDate.getFullYear();
        var m = today.getMonth() - birthdateDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdateDate.getDate())) {
          age--;
        }
        if (age < 18) textToWrite = "* Idade inválida";
      }
      */


    } else if (text == "Password") {
      if (!password) textToWrite = "* Campo Obrigatório";
      else if (password.length < 8) textToWrite = "* Password muito curta";
      else if (password.search(/[a-z]/i) < 0)
        textToWrite = "* Password sem letras";
      else if (password.search(/[0-9]/) < 0)
        textToWrite = "* Password sem números";
    } else if (text == "Confirmar Password") {
      if (!confirmarPassword) textToWrite = "* Campo Obrigatório";
      else if (password != confirmarPassword)
        textToWrite = "* Passwords não coincidem";
    }

    return (
      <Text style={{ alignSelf: "flex-start", paddingHorizontal: 30 }}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.error}>{textToWrite}</Text>
      </Text>
    );
  }


  function validateForm() {
    let isValid = true;
    if (!name) {
      setValidName(false);
      isValid = false;
    }
    if (!email) {
      setValidEmail(false);
      isValid = false;
    }
    /*
    if (!birthdate) {
      setValidBirthdate(false);
      isValid = false;
    }
    */
    if (!password) {
      setValidPassword(false);
      isValid = false;
    }
    if (!confirmarPassword) {
      setValidConfirmPassword(false);
      isValid = false;
    }
    if (password != confirmarPassword) {
      setValidConfirmPassword(false);
      isValid = false;
    }

    //password validation
    if (password.length < 8) {
      setValidPassword(false);
      isValid = false;
    }
    if (password.search(/[a-z]/i) < 0) {
      setValidPassword(false);
      isValid = false;
    }
    if (password.search(/[0-9]/) < 0) {
      setValidPassword(false);
      isValid = false;
    }
    
    

    return isValid;
  };

  function setAllVarsTrue() {
    setValidEmail(true);
    setValidName(true);
    setValidBirthdate(true);
    setValidConfirmPassword(true);
    setValidName(true);
  }

  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setBirthdate(currentDate)
  }

  return (
    console.log(birthdate),
    <ScrollView style={styles.container}>
      <View style={{ paddingBottom: 35 }}>
        <View style={styles.containerLogo}>
          <CustomBackButton
            onPress={() => navigation.navigate("Landing")}
          ></CustomBackButton>
          <Image
            source={require("../../../assets/images/logo_azul_escuro.png")}
            resizeMode="contain"
            style={[styles.logo, { height: height * 0.15 }]}
          ></Image>
          <Text style={styles.wingman}>Registo</Text>
        </View>

        <View style={styles.placeInput}>
          {validName ? (
            <Text style={styles.text}>Nome</Text>
          ) : (
            showErrorField("Nome")
          )}
          <CustomInput
            placeholder={"p.e.: João Miguel Silva"}
            value={name}
            setValue={setName}
            iconNameEntry="person"
          />
          {validEmail ? (
            <Text style={styles.text}>Email</Text>
          ) : (
            showErrorField("Email")
          )}
          <CustomInput
            placeholder={"joao@email.com"}
            value={email}
            setValue={setEmail}
            iconNameEntry="email"
          />
          <Text style={styles.text}>Data de Nascimento</Text>
          {/*validBirthdate ? (
            <Text style={styles.text}>Data de Nascimento</Text>
          ) : (
            showErrorField("Data de Nascimento")
          )*/}
          <View
          style={[
            styles.buttonStyle,
            { width: width * 0.85, flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <Text style={styles.textButton}>
            {birthdate.getDate() +
              '/' +
              (birthdate.getMonth() + 1 < 10
                ? '0' + (birthdate.getMonth() + 1)
                : birthdate.getMonth() + 1) +
              '/' +
              birthdate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => setShow(!show)}>
            <MaterialIcons name="date-range" size={18} color={COLORS.wingDarkBlue} />
          </TouchableOpacity>
        </View>
            
        {show && (
          <View style={{ width: width * 0.85, alignSelf: 'center' }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={birthdate}
            mode={mode}
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onChange}
            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
          />
          </View>
        )}
          <Text style={styles.text}>Género</Text>
          <SelectList
            setSelected={(val) => {
              val === "Feminino"
                ? setSelected("1")
                : val === "Masculino"
                ? setSelected("0")
                : setSelected("2");
            }}
            data={data}
            save="value"
            search={false}
            defaultOption={{ key: "0", value: "Masculino" }}
            fontFamily="SoraLight"
            boxStyles={styles.selectList}
            dropdownStyles={styles.dropdownStyles}
            iconContainer={styles.iconContainerStyles}
            inputStyles={[styles.text, { color: "black", textAlign: "left" }]}
          />
          {validPassword ? (
            <Text style={styles.text}>Password</Text>
          ) : (
            showErrorField("Password")
          )}
          <CustomInput
            placeholder={"*******"}
            value={password}
            setValue={setPassword}
            secureTextEntry
            iconNameEntry="form-textbox-password"
          />
          {validConfirmPassword ? (
            <Text style={styles.text}>Confirmar Password</Text>
          ) : (
            showErrorField("Confirmar Password")
          )}
          <CustomInput
            placeholder={"*******"}
            value={confirmarPassword}
            setValue={setConfirmarPassword}
            secureTextEntry
            iconNameEntry="form-textbox-password"
          />
        </View>
        <View style={styles.placeButtons}>
          <CustomButton
            text="Registar"
            onPress={() => {
              {
                if (validateForm() == true) {
                  setAllVarsTrue();
                  registo();
                } else {
                  alert("Preencha todos os campos corretamente!")
                }

              };
            }}
          />

          <CustomTextButton
            onPress={() => navigation.navigate("Login")}
            textNormal="Já tem conta? "
            textButton="Login!"
            textSize={16}
          ></CustomTextButton>
        </View>
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
    flexDirection: "row",
    top: 10,
    paddingVertical: 4,
    paddingTop: 20,
    alignContent: "center",
    alignItems: "center",
  },
  placeButtons: {
    alignItems: "center",
    top: 20,
    width: "100%",
  },
  placeInput: {
    alignItems: "center",
    width: "100%",
  },
  logo: {
    flex: 0.5,
    width: "70%",
    minWidth: 40,
    maxWidth: 300,
    maxHeight: 120,
    paddingVertical: 40,
    padding: -20,
  },
  wingman: {
    fontFamily: "SoraBold",
    fontSize: 40,
    color: COLORS.wingDarkBlue,
    paddingVertical: 40,
    flex: 3,
  },
  text: {
    color: COLORS.wingDarkBlue,
    fontFamily: "SoraLight",
    fontSize: 15,
    alignSelf: "flex-start",
    paddingHorizontal: 30,
  },
  error: {
    color: "red",
    fontFamily: "SoraLight",
    fontSize: SIZES.small,
    alignSelf: "flex-start",
    paddingHorizontal: 30,
  },
  selectList: {
    backgroundColor: "#eceffa",
    borderColor: COLORS.wingblue,
    borderRadius: 5,
    //align box to the right

  },
  iconContainerStyles: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  dropdownStyles: {
    backgroundColor: "#eceffa",
    borderColor: COLORS.wingblue,
    maxHeight: 120,
  },
  containerNovo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    width: "70%",
  },
  buttonStyle: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: COLORS.wingblue,
    alignItems: 'center',
  },
});

export default RegisterScreen;
