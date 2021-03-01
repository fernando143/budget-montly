import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// LIBRARIES
import codePush from "react-native-code-push"
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

// COMPONENTS
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Spinner from './components/Spinner'

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: {
    title: 'Actualización disponible',
    mandatoryUpdateMessage: 'Es necesario actualizar para continuar.',
    mandatoryContinueButtonLabel: 'Actualizar',
    updateTitle: 'Actualización disponible',
    optionalUpdateMessage: 'Es necesario actualizar para continuar.',
    optionalIgnoreButtonLabel: "Cancelar",
    optionalInstallButtonLabel: 'Actualizar'
  }
};

const App = () => {

  codePush.sync({
    updateDialog: true,
    installMode: codePush.InstallMode.IMMEDIATE
  });

  const [user, setUser] = useState(false)
  const [statusUser, setStatusUser] = useState('fetching') // fetching || done


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber
  }, [])


  const onAuthStateChanged = user => {
    setUser(user);
    setStatusUser('done')
  }

  const onLogout = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }

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
          <Dashboard user={user} onLogout={onLogout} />
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
};

const styles = StyleSheet.create({
});

export default codePush(codePushOptions)(App);
