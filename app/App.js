
import 'react-native-gesture-handler';
import AppStack from "./src/navigators/AppNavigator";
import AuthStack from "./src/navigators/AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { serverURL } from "./src/config/hosts";
import axios from "axios";
import AuthContext from "./src/context/AuthProvider";
import LandingScreen from "./src/screens/LandingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import {useFonts} from 'expo-font';


const Stack = createStackNavigator();
const App = () => {
  /*
  const [loaded] = useFonts({
    SoraMedium: require('./assets/fonts/Sora-Medium.ttf'),
    SoraBold: require('./assets/fonts/Sora-Bold.ttf'),
    SoraLight: require('./assets/fonts/Sora-Light.ttf'),
  });

  if(!loaded){
    return null;
  }*/

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.userToken,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.userToken,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const getToken = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userToken");
        if (jsonValue != null) {
          console.log(JSON.parse(jsonValue));
          dispatch({ type: "RESTORE_TOKEN", token: JSON.parse(jsonValue) });
        }
      } catch (e) {
        console.log(e);
      }
      //dispatch({ type: "RESTORE_TOKEN", userToken: userToken });
    };
    getToken();
    console.log(state);
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        console.log(serverURL + "/users/login");
        //sign in request with fetch,
        //if success, save token in async storage and dispatch SIGN_IN action
        //if error, show error message
        try {
          const response = await axios.post(serverURL + "/users/login", {
            email: email,
            password: password,
          });
          console.log(response.data);
          
          if (response.data.success) {
            await AsyncStorage.setItem(
              "userToken",
              JSON.stringify(response.data.token)
            );
            dispatch({ type: "SIGN_IN", token: response.data.token });
          } else {
            alert(response.data.message);
          }
        } catch (e) {
          // print full error
          console.log(e)
        }
      },
      signOut: () => {
        AsyncStorage.removeItem("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? <AuthStack/> : <AppStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
