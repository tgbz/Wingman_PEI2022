import React from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { RadioButton,Text } from 'react-native-paper';
import { useState } from "react";
import axios from "axios";
import { serverURL } from "../config/hosts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from "../context/AuthProvider";

function RegisterScreen({ navigation }) {
  //login form
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate,setBirthdate] = useState("");
  const [gender,setGender] = useState('first');
  const [savings,setSavings] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = React.useContext(AuthContext);
  
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
       <RadioButton.Group onValueChange={newGender => setGender(newGender)} gender={gender}>
        <View style={{flexDirection:'row',alignItems:"center"}}>
            <Text>Rent</Text>
            <RadioButton gender="first" />
        </View>
        <View style={{flexDirection:'row',alignItems:"center"}}>
            <Text>Other</Text>
            <RadioButton gender="second" />
        </View>
        </RadioButton.Group>
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
      <Button title="Login" onPress={() => signUp(email, password)} />
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
