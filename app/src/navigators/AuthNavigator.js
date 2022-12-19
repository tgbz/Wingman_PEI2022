import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/Authentication/LoginScreen.js"
import RegisterScreen from '../screens/Authentication/RegisterScreen.js';
import LandingScreen from '../screens/Authentication/LandingScreen.js';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen.js';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}
>
       <Stack.Screen name="Landing" component={LandingScreen} />
       <Stack.Screen name="Login" component={LoginScreen} />
       <Stack.Screen name="Register" component={RegisterScreen} />
       <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

      </Stack.Navigator>
  );
};

export default AuthStack;