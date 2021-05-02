import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from '../screens/Profile'
import Home from '../screens/Home'
import Settings from '../screens/Settings'

import RightButtons from '../components/RightButtons'

import { COLOR_ELECTRON_BLUE } from '../constants'

// CONTEXT
import { AuthUserContext } from '../context/authUser'
const version = '0.10.5'
const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  const context = useContext(AuthUserContext)
  const { onLogout } = context

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        options={({ route }) => ({
          title: "Perfil",
          headerRight: () => <RightButtons version={version} onLogout={onLogout}/>,
          headerStyle: {
            backgroundColor: COLOR_ELECTRON_BLUE
          },
          headerTitleStyle: {
            color: "#FFFFFF"
          }
        })}
        component={Profile}
      />
    </Stack.Navigator>
  )
}

const HomeStackNavigator = () => {
  const context = useContext(AuthUserContext)
  const { onLogout } = context

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={({ route }) => ({
          title: "Home",
          headerRight: () => <RightButtons version={version} onLogout={onLogout}/>,
          headerStyle: {
            backgroundColor: COLOR_ELECTRON_BLUE
          },
          headerTitleStyle: {
            color: "#FFFFFF"
          }
        })}
        component={Home}
      />
    </Stack.Navigator>
  )
}

const SettingsStackNavigator = () => {
  const context = useContext(AuthUserContext)
  const { onLogout } = context

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        options={({ route }) => ({
          title: "Configuración",
          headerRight: () => <RightButtons version={version} onLogout={onLogout}/>,
          headerStyle: {
            backgroundColor: COLOR_ELECTRON_BLUE
          },
          headerTitleStyle: {
            color: "#FFFFFF"
          }
        })}
        component={Settings}
      />
    </Stack.Navigator>
  )
}

export {
  ProfileStackNavigator,
  HomeStackNavigator,
  SettingsStackNavigator
};