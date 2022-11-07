


/* 
View é um componente que serve para renderizar elementos no ecrâ, invocando outros componentes React Native.
Text é um componente que serve para renderizar texto no ecrâ.
TouchableOpacity é um componente que serve para renderizar um botão no ecrâ.
TextInput é um componente que serve para renderizar um input de texto no ecrâ.
Image é um componente que serve para renderizar uma imagem no ecrâ.
Stylesheet é um componente que serve para definir estilos para os componentes React Native.
  

*/




//Function Component, também podemos usar Class componentes
/* 
Se está View for para IOS, esta vai estar mapeada para UIView (NATIVO IOS),
se for para Android, esta vai estar mapeada para View.

*//*
import AppStack from './src/Navigators/AppNavigator';
import AuthStack from './src/Navigators/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {useAuthorization} from './src/context/AuthProvider';
import AuthContext from './src/context/AuthProvider';
import {AuthProvider} from './src/context/AuthProvider';

const App = () => {
  const {userToken}= React.useContext(AuthContext);
  console.log(userToken)
  return (
    <AuthProvider>
      <NavigationContainer >
          {userToken==null ? (<AuthStack/>) : (<AppStack/>)}
      </NavigationContainer>
    </AuthProvider>
  );
};


export default App;
*/

import AppStack from './src/Navigators/AppNavigator';
import AuthStack from './src/Navigators/AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { serverURL } from './src/config/hosts';
import axios from 'axios';
import AuthContext from './src/context/AuthProvider';

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.userToken,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.userToken,
          };
        case 'SIGN_OUT':
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
            try{
              const jsonValue = await AsyncStorage.getItem('userToken')
              if( jsonValue != null ){
                console.log(JSON.parse(jsonValue))
                dispatch({ type: 'RESTORE_TOKEN', userToken: JSON.parse(jsonValue)});
              }     
            }
            catch(e){
              console.log(e)
            } 
          }
          getToken()
          console.log(state)
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (email,password) => {
        console.log(serverURL+"/users/login")
        await axios
        .post(serverURL+"/users/login", {
            username: email,
            password: password,
        })
        .then((response) => {
            if(response.data) {
            console.log(response.data)
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
      signOut: () =>{
        AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' })
      } ,
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer >
          {state.userToken==null ? (<AuthStack/>) : (<AppStack/>)}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};


export default App;

