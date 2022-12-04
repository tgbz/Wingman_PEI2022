import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from "../screens/HomeScreen.js"
import ProfileScreen from "../screens/ProfileScreen.js"
import ProfileEditScreen from "../screens/ProfileEditScreen.js"
import PassEditScreen from '../screens/PassEditScreen.js';
import PoliticsScreen from '../screens/PoliticsScreen.js';

import { COLORS,SIZES } from '../constants/theme.js';


// Screens Names

const homeName = "HomeTab";
const profileName = "Profile";
const politics = "Politics";

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
            } 
            return <Ionicons name={iconName} size = {size} color = {color}/>
          },
          headerTitleStyle: {
            fontFamily: 'SoraMedium',
            fontSize: SIZES.medium,
            },
           headerTintColor: COLORS.wingDarkBlue,
           headerTitleAlign:"center"
           /*LEFT BUTTON Ionicons name="chevron-back to navigate back
            headerLeft: ({navigation}) => (
              <Ionicons name="chevron-back"
              size={30}
              color={COLORS.wingDarkBlue}
              onPress={() => navigation.goBack()} />
            ),*/
        })}>
          
        <Tab.Screen name={homeName} component={HomeScreen} options={{headerShown: false}} />
        <Tab.Screen name={profileName} component={ProfileScreen} options={{title:"Meu Perfil"}}/>
        <Tab.Screen name={politics} component={PoliticsScreen} options={{title:"Políticas de Consumo"}}/>

       {/* <Tab.Screen name={profileEditName} component={ProfileEditScreen} options={{headerShown: false}}/>
        <Tab.Screen name={" "} component={PassEditScreen} options={{headerShown: false}}/>*/}
      </Tab.Navigator>
  );
}

// Nest the tab navigator inside the Home Stack Screen
// This way the bottom tab navigator will not be shown on the Profile Edit and Pass Edit Screens
export default function HomeStack() {
  return (
      <Stack.Navigator screenOptions={{
        headerTitleStyle: {
        fontFamily: 'SoraMedium',
        fontSize: SIZES.medium,
        },headerBackTitleVisible: false, headerTintColor: COLORS.wingDarkBlue,headerTitleAlign:"center", 
       /*headerLeft: () => (
        <Ionicons name="chevron-back"
        size={30}
        color={COLORS.wingDarkBlue}
        onPress={() => navigation.goBack()} />
        )*/
      }}>
        
        <Stack.Screen name="Home" component={MainContainer} options={{headerShown: false}}/>
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{title:"Editar Perfil"}} />
        <Stack.Screen name="PassEdit" component={PassEditScreen}   options={{title:"Alterar Password"}}/>
        <Stack.Screen name="Politics" component={PoliticsScreen} options={{title:"Políticas de Consumo"}}/>

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