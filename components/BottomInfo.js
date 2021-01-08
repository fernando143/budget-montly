import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BottomSheet, Text, Button } from 'react-native-elements'

// CONSTANTS & HELPERS
import { h4Styles } from '../constants'

const BottomInfo = ({isBottomSheet, infoItem, onCloseBottomSheet}) => {

  return (
    <BottomSheet
        isVisible={isBottomSheet}
      >
        <View style={{backgroundColor: '#FFF', padding: 10}}>
          <Text
            h4
            h4Style={h4Styles}
          >
            Observación:
          </Text>

          <Text style={styles.text}>{infoItem}</Text>

          <Button
            title="Cerrar"
            containerStyle={styles.btnCerrar}
            onPress={() => onCloseBottomSheet()}
          />
        </View>
      </BottomSheet>
  )
}

export default BottomInfo

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  btnCerrar: {
    marginTop: 20
  }
})
