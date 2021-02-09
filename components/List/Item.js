import React from 'react'
import { StyleSheet } from 'react-native'

// LIBRARIES
import { ListItem, Icon } from 'react-native-elements'

// CONSTANTS & HELPERS
import { COLOR_SUCCESS, COLOR_WARNING } from '../../constants'

const Item = ({item, onTapItem, onEditItem}) => (
  <ListItem
    bottomDivider
    onPress={() => onTapItem(item.observation)}
  >
    <Icon
      name={item.datePaid ? 'check-circle' : 'exclamation-circle'}
      color={item.datePaid ? COLOR_SUCCESS : COLOR_WARNING}
      type='font-awesome'
    />

    <ListItem.Content style={styles.container}>

      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.datePaid ? 'Pagado' : 'Impago'}</ListItem.Subtitle>
        {item.datePaid ?
          <ListItem.Subtitle>{item.datePaid}</ListItem.Subtitle>
          : null
        }
      </ListItem.Content>

      <ListItem.Content style={styles.mountContainer}>
        <ListItem.Title>$ {item.mount}</ListItem.Title>
      </ListItem.Content>

      <ListItem.Chevron
        size={26}
        type="font-awesome5"
        name="edit"
        onPress={() => onEditItem(item)}
      />

    </ListItem.Content>
  </ListItem>
)

export default Item

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mountContainer: {
    alignItems: 'flex-end',
    marginRight: 30
  }
})