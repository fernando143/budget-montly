import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfileStackNavigator, HomeStackNavigator, SettingsStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="MyProfile"
        options={{
          title: 'Mi Perfil',
        }}
        component={ProfileStackNavigator}
      />
       <Tab.Screen
        name="Home"
        options={{
          title: 'Home',
        }}
        component={HomeStackNavigator}
      />
      <Tab.Screen
      name="Settings"
      options={{
        title: 'Settings'
      }}
      component={SettingsStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;