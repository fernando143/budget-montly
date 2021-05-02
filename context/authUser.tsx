import React, { createContext, useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';

export const AuthUserContext = createContext()

const AuthUserProvider = (props:Type) => {
  const [user, setUser] = useState(false)
  const [statusUser, setStatusUser] = useState('fetching') // fetching || done

  const onAuthStateChanged = user => {
    setUser(user);
    setStatusUser('done')
  }

  const onLogout = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber
  }, [])

  return (
    <AuthUserContext.Provider
      value={{
        user,
        setUser,
        statusUser,
        setStatusUser,
        onLogout
      }}
    >
      {props.children}
    </AuthUserContext.Provider>
  )
}

export default AuthUserProvider