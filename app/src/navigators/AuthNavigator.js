import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen.js"
import RegisterScreen from '../screens/RegisterScreen.js';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator>
       <Stack.Screen name="Login" component={LoginScreen} />
       <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
  );
};

export default AuthStack;