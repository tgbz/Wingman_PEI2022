import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useWindowDimensions } from 'react-native';
// Screens
import HomeScreen from "../screens/HomeScreen.js"
import ProfileScreen from "../screens/ProfileScreen.js"
import ProfileEditScreen from "../screens/ProfileEditScreen.js"
import PassEditScreen from '../screens/PassEditScreen.js';
import AccountsScreen from '../screens/AccountsScreen.js';
import AccountScreen from '../screens/AccountScreen.js';
import AddAccountScreen from '../screens/AddAccountScreen.js';
import PoliticsScreen from '../screens/PoliticsScreen.js';
import ActivitySummaryScreen from '../screens/ActivitySummaryScreen.js';
import FilterScreen from '../screens/FilterScreen.js';
import AddExpenseScreen from '../screens/AddExpenseScreen.js';
import EditExpenseScreen from '../screens/EditExpenseScreen.js';
import OCRScreen from '../screens/OCRScreen.js';
import { COLORS,SIZES } from '../constants/theme.js';
import PoliticsSuggestionScreen from '../screens/PoliticsSuggestionScreen.js';
import ActivityTable from '../components/ActivityTable.js';
import StatisticsScreen from '../screens/StatisticsScreen.js';


// Screens Names

const homeName = "Casa";
const profileName = "Profile";
const politics = "Politica";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// get width and height of the screen
//const { width, height } = useWindowDimensions();


function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarShowLabel:false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn == homeName) {
              iconName = focused ? 'home' : 'home-outline'
            } else if (rn == profileName) {
              iconName = focused ? 'person-circle' : 'person-circle-outline'
            } else if (rn == politics) {
              iconName = focused ? 'journal' : 'journal-outline'
            }else if (rn == "Stats") {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline'
            }
            return <Ionicons name={iconName} size = {size} color = {color}/>
          },
          headerTitleStyle: {
            fontFamily: 'SoraMedium',
            fontSize: SIZES.medium,
            },
          headerShadowVisible: false, // applied here
          headerTintColor: COLORS.wingDarkBlue,
          headerTitleAlign:"center",
          headerTransparent: true,
          tabBarActiveTintColor:'#ed711e',
          tabBarInactiveTintColor:'#fff',
          tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'SoraMedium',
          marginBottom: 15,
          },
         tabBarStyle: {
          backgroundColor: COLORS.wingDarkBlue,
          paddingBottom:0,
          borderRadius: 24,
          marginHorizontal: 10,
          marginBottom: 10,
          position: 'absolute',
          overflow: 'hidden',
          },
         /*LEFT BUTTON Ionicons name="chevron-back to navigate back
          headerLeft: ({navigation}) => (
            <Ionicons name="chevron-back"
            size={30}
            color={COLORS.wingDarkBlue}
            onPress={() => navigation.goBack()} />
          ),*/
        })}>
          
        <Tab.Screen name={politics} component={PoliticsScreen} options={{title:"Políticas"}}/>
        <Tab.Screen name={homeName} component={HomeScreen} options={{headerShown: false}} />
  {/* add screen to a new tab called add expense, no label */}
        <Tab.Screen name="AddExpense" component={AddExpenseScreen} options={{headerShown: false, 
        tabBarIcon: () => (
          <Ionicons name='add-circle' size = {70} color = '#ed711e'/>
        ),
        title:"Adicionar Despesa"
      }}/>
        <Tab.Screen name="Stats" component={StatisticsScreen} options={{title:"Estatísticas",headerShown: false}} />
        <Tab.Screen name={profileName} component={ProfileScreen} options={{title:"Perfil",headerShown: false}}/>

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
        backgroundColor: 'transparent',
        },headerBackTitleVisible: false, headerTintColor: COLORS.wingDarkBlue,headerTitleAlign:"center",headerShadowVisible: false, headerTransparent: true,
        // backgrond color of the header 
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
        <Stack.Screen name="Accounts" component={AccountsScreen}   options={{title:"Minhas Contas"}}/>
        <Stack.Screen name="Account" component={AccountScreen} options={({ route }) => ({ title: route.params.name })} />
        <Stack.Screen name="AddAccount" component={AddAccountScreen}   options={{title:"Adicionar Conta"}}/>
        <Stack.Screen name="Politics" component={PoliticsScreen} options={{title:"Políticas de Consumo"}}/>
        <Stack.Screen name="PoliticsSuggestion" component={PoliticsSuggestionScreen} options={{title:"Sugestões de Consumo"}}/>
        <Stack.Screen name="ActivitySummary" component={ActivitySummaryScreen} options={({ navigation }) => ({
                                                                                title: 'Resumo de Atividade',
                                                                                headerRight: () => (
                                                                                  <Ionicons name="options" size={24} onPress={() => navigation.navigate("Filter")}/>
                                                                                )
                                                                               
                                                                              })}/>
        <Stack.Screen name="Filter" component={FilterScreen} options={{title:"Filtros",  presentation: 'modal'}}/>
        <Stack.Screen name="EditExpense" component={EditExpenseScreen} options={{title:"Transação"}}/>
        <Stack.Screen name="OCR" component={OCRScreen} options={{title:"OCR"}}/>

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