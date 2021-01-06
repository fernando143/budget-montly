import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View
} from 'react-native';

// CONSTANTS & HELPERS
import { COLOR_ELECTRON_BLUE } from './constants'

// COMPONENTS
import BottomInfo from './components/BottomInfo'
import List from './components/List'
import ButtonFloating from './components/ButtonFloating'
import AddItemForm from './components/AddItemForm'

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
  const [infoItem, setInfoItem] = useState('')
  const [isBottomSheet, setIsBottomSheet] = useState(false)
  const [isAddItemForm, setIsAddItemForm] = useState(false)

  const onTapItem = info => {
    onSetInfo(info)
    onOpenBottomSheet()
  }

  const onSetInfo = info => setInfoItem(info)

  const onOpenBottomSheet = () => setIsBottomSheet(true)

  const onCloseBottomSheet = () => setIsBottomSheet(false)

  const onAddItem = () => setIsAddItemForm(true)

  return (
    <>
      <SafeAreaView style={styles.container}>
        { isAddItemForm ?
          <AddItemForm/>
          :
          <List
            data={data}
            onTapItem={onTapItem}
          />
        }
        <BottomInfo
          isBottomSheet={isBottomSheet}
          infoItem={infoItem}
          onCloseBottomSheet={onCloseBottomSheet}
        />

        <ButtonFloating
          color={COLOR_ELECTRON_BLUE}
          onPress={onAddItem}
        />
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
});

export default App;
