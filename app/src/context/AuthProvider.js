/**
* AuthProvider.js file
*
**/
import * as React from 'react';
import {
  getItem as getToken,
  setItem as setToken,
  removeItem as removeToken,
} from '../config/async-storage';
import { serverURL } from '../config/hosts';
import axios from 'axios';

const AuthContext = React.createContext();

export default AuthContext

export const useAuthorization = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};

export const AuthProvider = props => {
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
    const initState = async () => {
      try {
        const authToken =  await getToken(); 
        if (authToken !== null) {
          dispatch({ type: 'RESTORE_TOKEN', userToken: authToken});
        } 
      } catch (e) {
        console.log(e);
      }
    };
    initState();
    console.log(state)
  });

  const actions = React.useMemo(
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
              let token = response.data
              setToken(token);
              dispatch({ type: 'SIGN_IN', userToken: JSON.stringify(token) });  
            }else{
              alert(response.status);
            }
          })
          .catch((error) => {
            console.log(error);
            alert("De momento não é possível processar a autenticação!");
          });
        
      },
      signOut: async () => {
        dispatch({type: 'SIGN_OUT'});
        await removeToken();
      },
    }),
    [state, dispatch],
  );

  return (
    <AuthContext.Provider value={{...state, ...actions}}>
      {props.children}
    </AuthContext.Provider>
  );
};