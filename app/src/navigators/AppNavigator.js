import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from "../screens/HomeScreen.js"
import ProfileScreen from "../screens/ProfileScreen.js"
import ProfileEditScreen from "../screens/ProfileEditScreen.js"
import PassEditScreen from '../screens/PassEditScreen.js';

// Screens Names

const homeName = "HomeTab";
const profileName = "Profile";
const profileEditName = "ProfileEdit";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn == homeName) {
              iconName = focused ? 'home' : 'home-outline'
            } else if (rn == profileName) {
              iconName = focused ? 'settings' : 'settings-outline'
            } else if (rn == profileEditName) {
              iconName = focused ? 'list' : 'list-outline'
            }

            return <Ionicons name={iconName} size = {size} color = {color}/>
          }
        })}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} options={{headerShown: false}}/>
       {/* <Tab.Screen name={profileEditName} component={ProfileEditScreen} options={{headerShown: false}}/>
        <Tab.Screen name={" "} component={PassEditScreen} options={{headerShown: false}}/>*/}
      </Tab.Navigator>
  );
}

// Nest the tab navigator inside the Home Stack Screen
// This way the bottom tab navigator will not be shown on the Profile Edit and Pass Edit Screens
export default function HomeStack() {
  return (
      <Stack.Navigator >
        <Stack.Screen name="Home" component={MainContainer} options={{headerShown: false}}/>
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{headerShown: false}}  />
        <Stack.Screen name="PassEdit" component={PassEditScreen} options={{headerShown: false}}  />
      </Stack.Navigator>
  );
};



/*
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppStack = (name) => {
  return (
      <Stack.Navigator >
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Dont show stack navigator on top /> *//*}
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}  />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{headerShown: false}}  />
      </Stack.Navigator>
  );
};

export default AppStack;

*/