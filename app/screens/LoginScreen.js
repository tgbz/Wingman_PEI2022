import React from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { useState } from "react";
import axios from "axios";
import { serverURL } from "../config/hosts";
import { AsyncStorage } from "react-native";

function LoginScreen(props) {
  //login form

  const handleLogin = async (email, password) => {
    return fetch(serverURL + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        return json.movies;
      })
      .catch((error) => {
        console.error(error);
      });
    /*
    await axios
      .post(serverURL + "users/login", {
        params: {
          username: email,
          password: password,
        },
      })
      .then((response) => {
        console.log(response.data);
        /*var userdata = response.data;
        if (userdata) {
          AsyncStorage.setItem("userdata", userdata);
          props.navigation.navigate("Home");
        } else {
          alert("Credenciais inválidas!");
        }
      })
      .catch((error) => {
        //verbose error
        console.log(error);
        console.log(error.response);
        alert("De momento não é possível processar a autenticação!");
      });
      */
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
