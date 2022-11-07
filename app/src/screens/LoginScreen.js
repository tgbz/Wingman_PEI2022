import React from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { useState } from "react";
import axios from "axios";
import { serverURL } from "../config/hosts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from "../context/AuthProvider";

function LoginScreen({ navigation }) {
  //login form

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = React.useContext(AuthContext);

  const register = () =>{
    navigation.navigate("Register")
  }
  
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
      <Button title="Login" onPress={() => signIn(email, password)} />
      <Button title="Regista-te" onPress={() => register(email, password)} />
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
