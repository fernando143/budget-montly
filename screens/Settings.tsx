import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Text } from 'react-native-elements';
import { Divider } from 'react-native-elements';

import { h4Styles } from '../constants'

const Settings = () => {
  return (
    <View>
      <View>
        <Text h4 style={h4Styles}>Ingreso mensual</Text>
        <Divider style={{ height: 1 }} />
        <Text h4>180.000 AR$</Text>
      </View>

      <View>
        <Text h4 style={h4Styles}>Egreso</Text>
        <Divider style={{ height: 1 }} />
      </View>

      <View>
        <Text h4 style={h4Styles}>Restante</Text>
        <Divider style={{ height: 1 }} />
      </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})
