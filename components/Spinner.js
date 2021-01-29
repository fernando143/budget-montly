import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#333" size="large"/>
    </View>
  )
}

export default Spinner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
