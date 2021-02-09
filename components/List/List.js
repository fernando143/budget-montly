import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'

// COMPONENTS
import Item from './Item'

const List = ({data, onTapItem, onEditItem}) => {

  const renderItem = ({ item }) => <Item item={item} onTapItem={onTapItem} onEditItem={onEditItem}/>

  return (
    <View>
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
