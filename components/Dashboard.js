import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

// LIBRARIES
import { Header, Button } from 'react-native-elements'
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

// CONSTANTS & HELPERS
import { COLOR_ELECTRON_BLUE } from '../constants'

// COMPONENTS
import BottomInfo from './BottomInfo'
import List from './List/List'
import ButtonFloating from './ButtonFloating'
import Form from './Form'
import Version from './Version'

const Dashboard = ({user, onLogout}) => {
  const version = '0.5.1'
  const { displayName, uid } = user._user

  const [infoItem, setInfoItem] = useState('')
  const [isBottomSheet, setIsBottomSheet] = useState(false)
  const [isAddItemForm, setIsAddItemForm] = useState(false)

  const [isEditingItem, setIsEditingItem] = useState(false)
  const [itemEdit, setItemEdit] = useState(null)

  const [isSaving, setIsSaving] = useState(false)

  const [data, setData] = useState([])

  useEffect(() => {
      getData()
  }, [])

  const onTapItem = info => {
    onSetInfo(info)
    onOpenBottomSheet()
  }

  const getData = () => {
    let resultado = []

    firestore()
      .collection(`users/${uid}/data`)
      .orderBy('timestamp', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const document = doc.data()
          const docId = doc.id

          resultado.push({...document, docId})
        })

        setData(resultado)
      })
  }

  const onSetInfo = info => setInfoItem(info)

  const onOpenBottomSheet = () => setIsBottomSheet(true)

  const onCloseBottomSheet = () => setIsBottomSheet(false)

  const onAddItem = () => setIsAddItemForm(true)

  const onEditItem = item => {
    setIsEditingItem(true)
    setItemEdit(item)
  }

  const onSubmit = values => {
    setIsSaving(true)

    const updateItem = values => {
      const docRef = firestore().collection('users').doc(uid).collection('data').doc(values.docId)

      docRef.update({
        ...values
      })
        .then(() => {
          setIsEditingItem(false)
          setItemEdit(null)
          getData()
          Toast.show({
            topOffset: 70,
            text1: 'ACTUALIZADO!'
          })
        })
        .catch(() => {
          Toast.show({
            topOffset: 70,
            type: 'error',
            text1: 'ERROR',
            text2: 'Vuelva a intentarlo'
          })
        })
        .finally(() => {
          setIsSaving(false)
        })
    }

    const addItem = values => {
      const dataRef = firestore().collection('users').doc(uid).collection('data')

      dataRef.add({
        ...values,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
        .then(() => {
          setIsAddItemForm(false)
          getData()
          Toast.show({
            topOffset: 70,
            text1: 'GUARDADO!'
          })
        })
        .catch(() => {
          Toast.show({
            topOffset: 70,
            type: 'error',
            text1: 'ERROR',
            text2: 'Vuelva a intentarlo'
          })
        })
        .finally(() => {
          setIsSaving(false)
        })
    }

    if(isEditingItem) {
      updateItem(values)
    } else {
      addItem(values)
    }
  }

  const onCancel = () => {
    setIsAddItemForm(false)
    setIsEditingItem(false)
    setItemEdit(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{ text: 'Presupuesto mensual', style: { color: '#fff' } }}
        rightComponent={<Version version={version} />}
      />

      { isAddItemForm || isEditingItem ?
        <Form
          title={ isAddItemForm ? "Agregar item" : "Editar item"}
          isSaving={isSaving}
          data={itemEdit}
          onCancel={onCancel}
          onSubmit={values => onSubmit(values)}
        />
        :
        (
          <>
            <List
              data={data}
              onTapItem={onTapItem}
              onEditItem={onEditItem}
            />
            <BottomInfo
              isBottomSheet={isBottomSheet}
              infoItem={infoItem}
              onCloseBottomSheet={onCloseBottomSheet}
            />
            <ButtonFloating
              color={COLOR_ELECTRON_BLUE}
              onPress={onAddItem}
            />
          </>
        )
      }
      <Button title="Salir" onPress={onLogout}/>
    </SafeAreaView>

  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})
