import {ColorSchemeName, Image, ImageSourcePropType, StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabParamList} from '../types/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/MainTab/Home';
import SetLocation from '../screens/MainTab/SetLocation';
import Favorite from '../screens/MainTab/Favorite';
import Profile from '../screens/MainTab/Profile';


import LocationManager from '../screens/LocationManager';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import DetailScreen from '../screens/DetailScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();



const TabBarIcon = ({name,color}:{name:ImageSourcePropType,color:string}) =>{
  return (
    <Image
    source={name}
    style={{
      width:30,
      height:30,
      tintColor:color
    }}
    />
  )
}




const RootNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManagerLocation"
        component={LocationManager}
        options={{headerShown: false}}
      />
      <Stack.Screen
      name='DetailScreen'
      component={DetailScreen}
      options={{headerShown: false}}
      
      />
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const BottomTabNavigator = () => {
 
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#111827',
        tabBarInactiveTintColor:'#D1D5DB',
        tabBarStyle:styles.tabBarStyle,
        tabBarLabelStyle:styles.tabBarLabelStyle
       
      }}>
      <BottomTab.Screen name="Home" component={Home} options={{
          title: "Trang chủ",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name={require('../assets/iconHome.png')} color={color} />,
        }} />
      <BottomTab.Screen name="SetLocation" component={SetLocation}  options={{
          title: "Vị trí",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name={require('../assets/iconSearch.png')} color={color} />,
        }}  />
      <BottomTab.Screen name="Favorite" component={Favorite}   options={{
          title: "Yêu thích",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name={require('../assets/iconFavorite.png')} color={color} />,
        }} />
      <BottomTab.Screen name="Profile" component={Profile} options={{
          title: "Cá nhân",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name={require('../assets/iconPersonal.png')} color={color} />,
        }} />
    </BottomTab.Navigator>
  );
};

const Navigation = ({colorScheme}: {colorScheme: ColorSchemeName}) => {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  tabBarStyle:{
    marginBottom:20,
    marginHorizontal:10,
    borderRadius:10,
    marginVertical:10,
    padding:10,
    height:60,
    position:'absolute',
  
    
  },
  tabBarLabelStyle:{
    padding:5,
    margin:5
  }
});
