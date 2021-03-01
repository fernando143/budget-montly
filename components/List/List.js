import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'

// COMPONENTS
import Item from './Item'

const List = ({data, onTapItem, onEditItem, onDeleteItem}) => {

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onTapItem={onTapItem}
      onEditItem={onEditItem}
      onDeleteItem={onDeleteItem}
    />
  )

  return (
    <View style={{flex: 9}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item.timestamp}`}
      />
    </View>
  )
}

export default List

const styles = StyleSheet.create({})
