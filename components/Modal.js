import React from 'react'
import { StyleSheet, View } from 'react-native'

// LIBRARIES
import { Text, Button, Overlay } from 'react-native-elements';

// CONSTANTS & HELPERS
import { h4Styles, COLOR_AMERICAN_RIVER } from '../constants'

const Modal = ({ isVisible, isLoading, onCancel, onConfirm }) => {
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={{width: '90%'}}
    >
      <View>
        <Text h4 h4Style={{...h4Styles, textAlign: 'center'}}>ELIMINAR ITEM</Text>
        <Text>Está seguro que desea eliminar?</Text>

        <View style={styles.actionsContainer}>
          <Button
            containerStyle={{width: '48%'}}
            buttonStyle={{ backgroundColor: COLOR_AMERICAN_RIVER}}
            title="NO"
            onPress={onCancel}
          />
          <Button
            containerStyle={{ width: '48%' }}
            title="SI"
            loading={isLoading}
            onPress={onConfirm}
          />
        </View>
      </View>
    </Overlay>
  )
}

export default Modal

const styles = StyleSheet.create({
  actionsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
