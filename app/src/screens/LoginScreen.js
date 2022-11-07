import React from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { serverURL } from "../config/hosts";
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen() {
  //login form

  const handleLogin = async (email, password) => {
    console.log(serverURL+"/users/login")
    await axios
      .post(serverURL+"/users/login", {
          username: email,
          password: password,
      })
      .then((response) => {
        if(response.data) {
          AsyncStorage.setItem('loginToken', response.data.token);
          navigation.navigate('HomeScreen')

        }else{
          alert(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("De momento não é possível processar a autenticação!");
      });
      
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Login" onPress={() => handleLogin(email, password)} />
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

export default LoginScreen;
