import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// LIBRARIES
import GenericIcon from './GenericIcon'
import Version from './Version'

type RightButtonsProps = {
  version: string,
  onLogout: () => void
}

const RightButtons = ({ version, onLogout } : RightButtonsProps) => {
  return (
    <View style={styles.container}>
      <Version version={version}/>
      <GenericIcon name="sign-out-alt" size={25} onPress={onLogout}/>

    </View>
  )
}

export default RightButtons

const styles = StyleSheet.create({
  container: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn: {
    marginLeft: 10
  }
})
