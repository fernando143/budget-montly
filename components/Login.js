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
import Toast from 'react-native-toast-message';

// CONSTANTS & HELPERS
import { h4Styles, WEB_CLIENT_ID } from '../constants'

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID
});


const Login = () => {
  const [isSigninInProgress, setIsSigningInProgress] = useState(false)
  const [currentStep, setCurrentStep] = useState('')

  const steps = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
  const handleError = error => {
    Toast.show({
      topOffset: 70,
      type: 'error',
      text1: 'ERROR',
      text2: `${error.code} ${error.message}`
    })

    setIsSigningInProgress(false)
  }

  const logIn = () => new Promise(async (resolve, reject) => {
    setCurrentStep(steps[1])
    // const { idToken } = await GoogleSignin.signIn()d
    let idToken = ''

    GoogleSignin.signIn()
    .then(data => {
      idToken = data.idToken
      console.log(data)
      setCurrentStep(steps[2])

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      setCurrentStep(steps[3])

      auth().signInWithCredential(googleCredential)
        .then(({ user }) => resolve({ status: 'OK', ...user }))
        .catch(error => {
          const { code, message } = error
          handleError({ code, message })
          reject(error)
        })

    })
    .catch(error => {
      setCurrentStep(steps[4])
      console.log(error)
    })
  })

  const getDocUser = user => new Promise(async (resolve, reject) => {
    setCurrentStep(steps[7])
    const { _user: { uid } } = user
    const userDoc = await firestore().collection('users').doc(uid).get()
    setCurrentStep(steps[8])
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
    setCurrentStep(steps[0])
    setIsSigningInProgress(true)

    const user = await logIn()
    setCurrentStep(steps[5])
    if(user.status === 'OK') {
      setCurrentStep(steps[6])
      const { _user: { uid, displayName, photoURL } } = user
      const docUser = await getDocUser(user)
      setCurrentStep(steps[9])
      if(!docUser.exists) {
        setCurrentStep(steps[10])
        await createDocUser(uid, displayName, photoURL)
        setCurrentStep(steps[11])
      }
      setCurrentStep(steps[12])
    }

    setCurrentStep(steps[13])
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
      <Text>{currentStep}</Text>
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
