import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen.js"
import ProfileScreen from "../screens/ProfileScreen.js"
import ProfileEditScreen from "../screens/ProfileEditScreen.js"
const Stack = createNativeStackNavigator();

const AppStack = (name) => {
  return (
      <Stack.Navigator >
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Dont show stack navigator on top /> */}
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}  />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{headerShown: false}}  />
      </Stack.Navigator>
  );
};

export default AppStack;