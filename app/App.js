
import 'react-native-gesture-handler';
import AppStack from "./src/navigators/AppNavigator";
import AuthStack from "./src/navigators/AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { serverURL } from "./src/config/hosts";
import axios from "axios";
import AuthContext from "./src/context/AuthProvider";

import { useCallback } from 'react';
//import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Sora_100Thin,
  Sora_200ExtraLight,
  Sora_300Light,
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold,
} from '@expo-google-fonts/sora';

const App = () => {

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
          dispatch({ type: "RESTORE_TOKEN", userToken: JSON.parse(jsonValue) });
        }
      } catch (e) {
        console.log(e);
      }
      //dispatch({ type: "RESTORE_TOKEN", userToken: userToken });
    };
    getToken();
  }, []);


  
  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        console.log(serverURL+"/users/login")
        await axios
        .post(serverURL+"/users/login", {
            username: email,
            password: password,
        })
        .then((response) => {
            if(response.data) {
            AsyncStorage.setItem('userToken', JSON.stringify(response.data));
            dispatch({ type: 'SIGN_IN', userToken: JSON.stringify(response.data) });

            }else{
            alert(response.status);
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Credenciais Inválidas!");
        });
      },
      signOut: () => {
        AsyncStorage.removeItem("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        const id =  await axios
        .post(serverURL+"/users/register", data)
        .then((response) => {
            if(response.data) {
            return response.data
            }else{
            alert(response.status);
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Erro ao registar!");
        });
        return  id
      },
    }),
    []
  );

  let [fontsLoaded,error] = useFonts({
    SoraThin:Sora_100Thin,
    SoraExtraLight:Sora_200ExtraLight,
    SoraLight:Sora_300Light,
    SoraRegular:Sora_400Regular,
    SoraMedium:Sora_500Medium,
    SoraSemiBold:Sora_600SemiBold,
    SoraBold:Sora_700Bold,
    SoraExtraBold:Sora_800ExtraBold,
  });
  SplashScreen.hideAsync();
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? <AuthStack /> : <AppStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
