import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

const FilterIcon = () => {
  return (
    <Icon
      name='filter'
      color='#fff'
      type='font-awesome-5'
      size={20}
      onPress={() => console.log('icon filter press')}
    />
  )
}

export default FilterIcon

const styles = StyleSheet.create({})
