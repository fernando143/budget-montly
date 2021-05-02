import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'

// LIBRARIES
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

// CONSTANTS & HELPERS
import { COLOR_ELECTRON_BLUE } from '../constants'
import { getDateNow, getData } from '../helpers'

// CONTEXT
import { AuthUserContext } from '../context/authUser'

// COMPONENTS
import BottomInfo from '../components/BottomInfo'
import List from '../components/List/List'
import ButtonFloating from '../components/ButtonFloating'
import Form from '../components/Form'

import Modal from '../components/Modal'
import Select from '../components/Select'

const Home = () => {

  const context = useContext(AuthUserContext)
  const {
    user: {
      uid
    }
  } = context

  console.log(context)
  const [infoItem, setInfoItem] = useState('')
  const [isBottomSheet, setIsBottomSheet] = useState(false)
  const [isAddItemForm, setIsAddItemForm] = useState(false)

  const [isEditingItem, setIsEditingItem] = useState(false)
  const [itemEdit, setItemEdit] = useState(null)

  const [isSaving, setIsSaving] = useState(false)
  const [isVisibleModalDelete, setIsVisibleModalDelete] = useState(false)

  const [itemDelete, setItemDelete] = useState(null)
  const [isDeletingItem, setIsDeletingItem] = useState(false)
  const [data, setData] = useState([])
  const [empty, setEmpty] = useState(null)
  const [currentDate, setCurrentDate] = useState({year: '', month: ''})

  useEffect(() => {
    const loadData = async () => {
      const { year, month } = getDateNow()
      const { data, empty } = await getData(uid, year, month)

      setCurrentDate({ year, month })
      setData(data)
      setEmpty(empty)
    }

    loadData()
  }, [])


  const updateData = async (year, month) => {
    setData([])
    setEmpty(null)

    const { data, empty } = await getData(uid, year, month)

    setData(data)
    setEmpty(empty)
    setCurrentDate({year, month})
  }

  const onTapItem = info => {
    onSetInfo(info)
    onOpenBottomSheet()
  }

  const onSetInfo = info => setInfoItem(info)

  const onOpenBottomSheet = () => setIsBottomSheet(true)

  const onCloseBottomSheet = () => setIsBottomSheet(false)

  const onAddItem = () => setIsAddItemForm(true)

  const onEditItem = item => {
    setIsEditingItem(true)
    setItemEdit(item)
  }

  const onDeleteItem = item => {
    setItemDelete(item)
    setIsVisibleModalDelete(true)
  }

  const onCancelDeleteItem = () => {
    setItemDelete(null)
    setIsVisibleModalDelete(false)
  }

  const onConfirmDeleteItem = itemDelete => {
    setIsDeletingItem(true)

    const docRef = firestore().collection('users').doc(uid).collection('data').doc(itemDelete.docId)

    docRef
    .delete()
    .then(async () => {
      const { data, empty } = await getData(uid, currentDate.year, currentDate.month)

      setData(data)
      setEmpty(empty)
    }).catch(error => {
      console.error("Error removing document: ", error);
    })
    .finally(() => {
      setIsDeletingItem(false)
      setItemDelete(null)
      setIsVisibleModalDelete(false)
    })
  }

  const onSubmit = values => {
    setIsSaving(true)

    const updateItem = values => {
      const docRef = firestore().collection('users').doc(uid).collection('data').doc(values.docId)

      docRef.update({
        ...values
      })
        .then(async () => {
          setIsEditingItem(false)
          setItemEdit(null)
          const { data, empty } = await getData(uid, currentDate.year, currentDate.month)

          setEmpty(empty)
          setData(data)
          Toast.show({
            topOffset: 70,
            text1: 'ACTUALIZADO!'
          })
        })
        .catch((err) => {
          console.log('error')
          console.log(err)
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
        .then(async () => {
          setIsAddItemForm(false)
          setEmpty(null)
          setData([])
          const { data, empty } = await getData(uid, currentDate.year, currentDate.month)

          setEmpty(empty)
          setData(data)
          Toast.show({
            topOffset: 70,
            text1: 'GUARDADO!'
          })
        })
        .catch((err) => {
          console.log('error')
          console.log(err)
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
    <SafeAreaView>
      <View style={styles.container}>
        { isAddItemForm || isEditingItem ?
          <Form
            currentDate={currentDate}
            title={ isAddItemForm ? "Agregar item" : "Editar item"}
            isSaving={isSaving}
            data={itemEdit}
            onCancel={onCancel}
            onSubmit={values => onSubmit(values)}
          />
          :
          (
            <>
              <Select currentDate={currentDate} onUpdateDate={updateData}/>
              <List
                data={data}
                empty={empty}
                onTapItem={onTapItem}
                onEditItem={onEditItem}
                onDeleteItem={onDeleteItem}
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

        <Modal
          isVisible={isVisibleModalDelete}
          isLoading={isDeletingItem}
          onCancel={onCancelDeleteItem}
          onConfirm={() => onConfirmDeleteItem(itemDelete)}
        />
      </View>
    </SafeAreaView>

  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})
