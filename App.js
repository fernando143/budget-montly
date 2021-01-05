import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView
} from 'react-native';
import { ListItem, Icon, BottomSheet } from 'react-native-elements';

const data = [
  {
    name: 'personal',
    datePaid: null,
    mount: '720,50',
    observation: 'lorem ipsum dolor sit amet',
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
  const COLOR_SUCCESS = '#27ae60'
  const COLOR_WARNING = '#f39c12'

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <Icon
        name={ item.datePaid ? 'check-circle' : 'exclamation-circle'}
        color={item.datePaid ? COLOR_SUCCESS : COLOR_WARNING}
        type='font-awesome'
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.datePaid ? 'Pagado' : 'Impago'}</ListItem.Subtitle>
        {item.datePaid ?
          <ListItem.Subtitle>{item.datePaid}</ListItem.Subtitle>
          : null
        }
      </ListItem.Content>
    </ListItem>
  )

  return (
    <>
      <View>
        <Text>App</Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
        <SafeAreaView>
          <BottomSheet
            isVisible={true}
            containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
          >
          </BottomSheet>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
