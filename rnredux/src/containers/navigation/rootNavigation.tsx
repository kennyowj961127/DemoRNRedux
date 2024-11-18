import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import Home from '../home';
import Detail from '../detail';
const RootStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const animatedNavigationEnable = true;
export const HomeStacks = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: animatedNavigationEnable,
      }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Detail" component={Detail} />
    </HomeStack.Navigator>
  );
};

const RootNavigation = () => {
  useEffect(() => {}, []);

  return (
    <>
      <RootStack.Navigator
        initialRouteName={'Root'}
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          animationEnabled: animatedNavigationEnable,
        }}>
        <RootStack.Screen name="Root" component={HomeStacks} />
      </RootStack.Navigator>
    </>
  );
};

export default RootNavigation;
