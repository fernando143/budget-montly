import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const Version = ({version}) => {
  return (
    <View>
      <Text style={styles.text}>v{version}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#FFF'
  }
})

export default Version
