import React from 'react'
import { StyleSheet, TouchableOpacity, Text} from 'react-native'
import { Icon } from 'react-native-elements';

const ButtonFloating = ({color, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.touchableOpacityStyle}>
        <Icon
          name='plus-circle'
          color={color ? color : '#27ae60'}
          type='font-awesome'
          size={50}
        />
    </TouchableOpacity>
  )
}

export default ButtonFloating

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  },
})
