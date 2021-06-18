import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'

// LIBRARIES
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

// CONSTANTS & HELPERS
import { COLOR_ELECTRON_BLUE } from '../constants'
import { getDateNow, getData } from '../helpers'
import { addItem } from '../services/api'

// CONTEXT
import { AuthUserContext } from '../context/authUser'
import { DataUserContext } from '../context/dataUser'

// COMPONENTS
import BottomInfo from '../components/BottomInfo'
import List from '../components/List/List'
import ButtonFloating from '../components/ButtonFloating'
import Form from '../components/Form'
import Modal from '../components/Modal'
import Select from '../components/Select'

// API
import { addEgreso, updateEgreso } from '../services/api'

const Home = () => {

  const context = useContext(AuthUserContext)
  const {
    user: {
      uid
    }
  } = context

  const contextDataUser:any = useContext(DataUserContext)

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
  const [initialDate, setInitialDate] = useState({year: '', month: ''})
  const [newDate, setNewDate] = useState({year: null, month: null})

  useEffect(() => {
    console.log('useEffect Home')
    const loadData = async () => {
      const { year, month } = getDateNow()
      const { data, empty } = await getData(uid, year, month)

      setInitialDate({ year, month })
      setData(data)
      setEmpty(empty)
    }

    loadData()
  }, [])


  const updateData = async (year:string, month:string) => {
    // if(year === initialDate.year && month === initialDate.month)
    //   return

    setData([])
    setEmpty(null)

    const { data, empty } = await getData(uid, year, month)

    setData(data)
    setEmpty(empty)
    setNewDate({year, month})
  }

  const onTapItem = (info:any) => {
    onSetInfo(info)
    onOpenBottomSheet()
  }

  const onSetInfo = (info:any) => setInfoItem(info)

  const onOpenBottomSheet = () => setIsBottomSheet(true)

  const onCloseBottomSheet = () => setIsBottomSheet(false)

  const onAddItem = () => setIsAddItemForm(true)

  const onEditItem = (item:any) => {
    setIsEditingItem(true)
    setItemEdit(item)
  }

  const onDeleteItem = (item:any) => {
    setItemDelete(item)
    setIsVisibleModalDelete(true)
  }

  const onCancelDeleteItem = () => {
    setItemDelete(null)
    setIsVisibleModalDelete(false)
  }

  const onConfirmDeleteItem = (itemDelete:any) => {
    setIsDeletingItem(true)

    const docRef = firestore().collection('users').doc(uid).collection('data').doc(itemDelete.docId)

    docRef
    .delete()
    .then(async () => {
      const year = newDate.year ? newDate.year : initialDate.year
      const month = newDate.month ? newDate.month : initialDate.month
      const { data, empty } = await getData(uid, year, month)

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

  const onSubmit = (values:any) => {
    const year = newDate.year ? newDate.year : initialDate.year
    const month = newDate.month ? newDate.month : initialDate.month
    setIsSaving(true)

    const updateItem = (values:any) => {
      const docRef = firestore().collection('users').doc(uid).collection('data').doc(values.docId)

      docRef.update({
        ...values
      })
        .then(async () => {
          setIsEditingItem(false)
          setItemEdit(null)
          const { data, empty } = await getData(uid, year, month)

          if(values.datePaid && values.mount) {
            updateEgreso(parseInt(values.mount), {...contextDataUser.user, uid})
            .then(() => console.log('actualizado correctamente'))
            .catch((error) => {
              console.log(error)
            })
          }

          setEmpty(empty)
          setData(data)
          Toast.show({
            type: 'success',
            topOffset: 70,
            text1: 'ACTUALIZADO!'
          })
        })
        .catch((err) => {
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
      addItem(values, uid)
      .then(async () => {
        setEmpty(null)
        setData([])

        if(values.datePaid && values.mount)
          addEgreso(values.mount, uid, { year: values.year, month: values.month })
          .then(data => console.log('añadido egreso'))
          .catch(error => console.log(error))

        const { data, empty } = await getData(uid, year, month)

        setEmpty(empty)
        setData(data)

        Toast.show({
          type: 'success',
          topOffset: 70,
          text1: 'GUARDADO!'
        })

        setIsAddItemForm(false)
      })
      .catch(err => {
        console.log(err)
        Toast.show({
          type: 'error',
          topOffset: 70,
          text1: 'ERROR',
          text2: 'Vuelva a intentarlo'
        })
      })
      .finally(() => {
        setIsSaving(false)
      })
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
            currentDate={newDate.year && newDate.month ? newDate : initialDate}
            title={ isAddItemForm ? "Agregar item" : "Editar item"}
            isSaving={isSaving}
            data={itemEdit}
            onCancel={onCancel}
            onSubmit={(values:any) => onSubmit(values)}
          />
          :
          (
            <>
              <Select initialDate={initialDate} onUpdateDate={updateData}/>
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
