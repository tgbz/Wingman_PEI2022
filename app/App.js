
import 'react-native-gesture-handler';
import AppStack from "./src/navigators/AppNavigator";
import AuthStack from "./src/navigators/AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { serverURL } from "./src/config/hosts";
import axios from "axios";
import AuthContext from "./src/context/AuthProvider";


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
            alert("De momento não é possível processar a autenticação!");
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

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? <AuthStack/> : <AppStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
