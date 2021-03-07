import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

const GenericIcon = ({name, color, type, size, onPress}) => {
  return (
    <Icon
      name={name}
      color={color ? color : '#fff'}
      type={type ? type : 'font-awesome-5'}
      size={size ? size : 20}
      onPress={onPress}
    />
  )
}

export default GenericIcon

const styles = StyleSheet.create({})
