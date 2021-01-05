import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { COLOR_SUCCESS, COLOR_WARNING } from '../constants'

const List = ({data, onTapItem}) => {

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => onTapItem(item.observation)}
    >
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
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  )
}

export default List

const styles = StyleSheet.create({})
