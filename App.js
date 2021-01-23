import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { Header } from 'react-native-elements'
import codePush from "react-native-code-push"
import Toast from 'react-native-toast-message';

// CONSTANTS & HELPERS
import { COLOR_ELECTRON_BLUE } from './constants'

// COMPONENTS
import BottomInfo from './components/BottomInfo'
import List from './components/List'
import ButtonFloating from './components/ButtonFloating'
import Form from './components/Form'
import Version from './components/Version'

const data = [
  {
    name: 'personal',
    datePaid: null,
    mount: '720,50',
    observation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in est in eros pulvinar placerat id in ligula. Aenean fermentum, arcu vel varius rhoncus, libero nisl egestas est, sit amet condimentum tortor elit et risus. Donec quis lacinia velit, a ullamcorper tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    id: 1
  },
  {
    name: 'Internet',
    datePaid: '03-01-2021',
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
    id: 2
  },
  {
    name: 'Seguro',
    datePaid: '',
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
    id: 3
  },
  {
    name: 'Seguro',
    datePaid: '',
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
    id: 4
  },
  {
    name: 'Seguro',
    datePaid: '',
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
    id: 5
  },
  {
    name: 'Seguro',
    datePaid: '',
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
    id: 6
  },
  {
    name: 'Seguro',
    datePaid: '',
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
    id: 7
  },
  {
    name: 'Seguro',
    datePaid: '',
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
    id: 8
  },
  {
    name: 'Seguro',
    datePaid: '',
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
    id: 9
  },
  {
    name: 'Seguro',
    datePaid: '',
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
    id: 10
  },
  {
    name: 'Seguro',
    datePaid: '',
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
    id: 11
  },
  {
    name: 'Seguro',
    datePaid: '',
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
    id: 12
  }
]
const App = () => {
  let codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
  };

  codePush.sync({
    updateDialog: true,
    installMode: codePush.InstallMode.IMMEDIATE
  });

  const version = '0.4.0'

  const [infoItem, setInfoItem] = useState('')
  const [isBottomSheet, setIsBottomSheet] = useState(false)
  const [isAddItemForm, setIsAddItemForm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const onTapItem = info => {
    onSetInfo(info)
    onOpenBottomSheet()
  }

  const onSetInfo = info => setInfoItem(info)

  const onOpenBottomSheet = () => setIsBottomSheet(true)

  const onCloseBottomSheet = () => setIsBottomSheet(false)

  const onAddItem = () => setIsAddItemForm(true)

  const onSubmit = values => {
    console.log(values)
    setIsSaving(true)

    setTimeout(() => {
      setIsSaving(false)
      if (false) {
        setIsAddItemForm(false)
        Toast.show({
          topOffset: 70,
          text1: 'GUARDADO!'
        })
      } else {
        Toast.show({
          topOffset: 70,
          type: 'error',
          text1: 'ERROR',
          text2: 'Vuelva a intentarlo'
        })
      }
    }, 1500);

  }

  const onCancel = () => setIsAddItemForm(false)

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          centerComponent={{ text: 'Presupuesto mensual', style: { color: '#fff' } }}
          rightComponent={<Version version={version} />}
        />

        { isAddItemForm ?
          <Form
            title="Agregar item"
            isSaving={isSaving}
            onCancel={onCancel}
            onSubmit={values => onSubmit(values)}
          />
          :
          (
            <>
              <List
                data={data}
                onTapItem={onTapItem}
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
      </SafeAreaView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

const styles = StyleSheet.create({
});

export default codePush(App);
