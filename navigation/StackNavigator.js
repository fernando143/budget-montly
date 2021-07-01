import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from '../screens/Profile'
import Home from '../screens/Home'
import Settings from '../screens/Settings'

import RightButtons from '../components/RightButtons'

import { COLOR_ELECTRON_BLUE } from '../constants'

// CONTEXT
import { AuthUserContext } from '../context/authUser'
const version = '0.11.6'
/*NOTAS DE LA VERSION
0.11.6
Fix en selector que hacia que no traiga los datos cuando solo se seleccionaba el mes o el año de
Fix en el context dataUser que intentaba ejecutarse cuando el usuario es null, es decir cuando la app no tiene ningun correo ingresado
0.11.5
Actualizado la version y quitado en la pantalla de dashboard el header y el metodo onnLogout
Fixeado funcionalidad egreso cuando se agrega, edita o elimina un item
----------------------
0.10.6:
fix un problema que hacia que entre en bucle el selector y la lista se recargue indefinidamente cuando el internet està lento
*/
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