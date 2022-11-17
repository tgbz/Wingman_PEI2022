import React from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { RadioButton,Text } from 'react-native-paper';
import { useState } from "react";
import AuthContext from "../context/AuthProvider";

function RegisterScreen({ navigation }) {
  //login form
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate,setBirthdate] = useState("");
  const [gender,setGender] = useState("0");
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
  
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        onChangeText={(birthdate) => setBirthdate(birthdate)}
      />
      <View style={{flexDirection:'row',alignItems:"center"}}>
      <RadioButton
        value="first"
        status={ gender === 0 ? 'checked' : 'unchecked' }
        onPress={() => setGender(0)}
      />
      <Text>Male</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:"center"}}>
      <RadioButton
        value="second"
        status={ gender === 1 ? 'checked' : 'unchecked' }
        onPress={() => setGender(1)}
      />
      <Text>Female</Text>
    </View>
      <TextInput
        style={styles.input}
        placeholder="Poupanças"
        onChangeText={(savings) => setSavings(savings)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Login" onPress={() => registo()} />
      <Button title="Back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});

export default RegisterScreen;
