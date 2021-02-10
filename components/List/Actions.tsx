import React from 'react'
import { StyleSheet, View } from 'react-native'

// LIBRARIES
import { ListItem } from 'react-native-elements'

// CONSTANTS & HELPERS
import { COLOR_PINK_GLAMOUR } from '../../constants'
type ActionsProps = {
  item: {};
  onEditItem: (item: {}) => void;
  onDeleteItem: (item: {}) => void;
}

const Actions = ({ item, onEditItem, onDeleteItem } : ActionsProps) => {
  return (
    <View style={styles.container}>
      <ListItem.Chevron
        containerStyle={{marginRight: 15}}
        size={26}
        type="font-awesome5"
        name="edit"
        onPress={() => onEditItem(item)}
      />
      <ListItem.Chevron
        color={COLOR_PINK_GLAMOUR}
        size={26}
        type="font-awesome5"
        name="delete"
        onPress={() => onDeleteItem(item)}
      />
    </View>
  )
}

export default Actions

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})
