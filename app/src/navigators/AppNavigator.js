import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen.js"

const Stack = createNativeStackNavigator();

const AppStack = (name) => {
  return (
      <Stack.Navigator >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
  );
};

export default AppStack;