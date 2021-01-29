import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

// LIBRARIES
import { Text } from 'react-native-elements'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// CONSTANTS & HELPERS
import { h4Styles, WEB_CLIENT_ID } from '../constants'

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID
});

const Login = () => {
  const [isSigninInProgress, setIsSigningInProgress] = useState(false)


  const logIn = () => new Promise(async (resolve, reject) => {
    const { idToken } = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    auth().signInWithCredential(googleCredential)
    .then(({ user }) => resolve({status: 'OK', ...user}))
    .catch(error => reject(error))
  })

  const getDocUser = user => new Promise(async (resolve, reject) => {
    const { _user: { uid } } = user
    const userDoc = await firestore().collection('users').doc(uid).get()

    resolve(userDoc)
  })

  const createDocUser = (uid, displayName, photoURL) => new Promise((resolve, reject) => {
    firestore().collection('users').doc(uid).set({
      displayName,
      photoURL
    })
    .then(() => resolve('OK'))
    .catch(() => reject('error'))
  })

  const onGoogleButtonPress = async () => {
    setIsSigningInProgress(true)

    const user = await logIn()
    const { _user: { uid, displayName, photoURL } } = user

    if(user.status === 'OK') {
      const docUser = await getDocUser(user)

      if(!docUser.exists) {
        const statusDocUser = await createDocUser(uid, displayName, photoURL)
      }
    }

    setIsSigningInProgress(false)
  }

  return (
    <View style={styles.container}>
      <Text
        h4
        h4Style={h4Styles}
      >
        Iniciar sesión
      </Text>

      <GoogleSigninButton
        style={{ width: '90%', height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
        disabled={isSigninInProgress}
      />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
