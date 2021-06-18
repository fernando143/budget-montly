import React, { createContext, useEffect, useState, useContext } from 'react';

import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';

// CONTEXT
import { AuthUserContext } from './authUser'

export const DataUserContext = createContext()

const DataUserProvider = (props:any) => {
  const contextAuthUser:any = useContext(AuthUserContext)
  const [user, setUser] = useState({})

  useEffect(() => {
    if(contextAuthUser.statusUser === 'done') {
      const { uid } = contextAuthUser.user
      console.log('obtener data del usuario ' + uid)

      firestore().collection('users').doc(uid).get()
      .then(({_data}) => {
        let values = { ..._data }
        console.log(values)
        setUser(values)
      })
    }

  }, [contextAuthUser.statusUser])

  return(
    <DataUserContext.Provider
      value={{
        user
      }}
    >
      {props.children}
    </DataUserContext.Provider>
  )
}

export default DataUserProvider