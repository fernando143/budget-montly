import React from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'

// CONSTANTS & HELPERS
import { h4Styles } from '../../constants'

// COMPONENTS
import Item from './Item'
import Spinner from '../Spinner'

const List = ({data = [], empty, onTapItem, onEditItem, onDeleteItem}) => {

  const renderElement = () => {
    if(data.length === 0 && empty === true)
      return <Text style={[styles.message, h4Styles]}>No hay items</Text>

    if(data.length === 0 && empty === null)
      return <Spinner />

    return (
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item
            item={item}
            onTapItem={onTapItem}
            onEditItem={onEditItem}
            onDeleteItem={onDeleteItem}
          />
        )}
        keyExtractor={item => `${item.timestamp}`}
      />
    )
  }

  return (
    <View style={{flex: 9}}>
      {
        renderElement()
      }
    </View>
  )
}

export default List

const styles = StyleSheet.create({
  message: {
    fontSize: 25,
    textAlign: 'center'
  }
})
