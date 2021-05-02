import React, { useContext } from 'react'
import { View, Text, Keyboard } from 'react-native';

// LIBRARIES
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from "./navigation/TabNavigator"
import Toast from 'react-native-toast-message';

// CONTEXT
import { AuthUserContext } from './context/authUser'

// COMPONENTS
import Spinner from './components/Spinner'
import Login from './components/Login'

const BudgetMonthlyApp = () => {
  const { statusUser, user } = useContext(AuthUserContext)

  switch (true) {
    case statusUser === 'fetching':
      return (<Spinner/>)

    case statusUser === 'done' && !user:
      return (
        <>
          <Login />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </>
      )

    case statusUser === 'done' && user?._user.email.length > 0:
      return (
        <>
          <NavigationContainer>
            <BottomTabNavigator/>
          </NavigationContainer>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </>
      )

    default:
      return (
        <View>
          <Text>Ha ocurrido un error inesperado?...</Text>
        </View>
      )
  }
}

export default BudgetMonthlyApp