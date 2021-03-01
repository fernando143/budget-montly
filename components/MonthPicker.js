import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const MonthPicker = ({ onChangeText, defaultValue }) => {
  return (
    <Picker
      style={{ height: 20, width: '95%' }}
      selectedValue={defaultValue}
      onValueChange={itemValue =>
        onChangeText(itemValue)
      }>
      <Picker.Item label="Enero" value="01" />
      <Picker.Item label="Febrero" value="02" />
      <Picker.Item label="Marzo" value="03" />
      <Picker.Item label="Abril" value="04" />
      <Picker.Item label="Mayo" value="05" />
      <Picker.Item label="Junio" value="06" />
      <Picker.Item label="Julio" value="07" />
      <Picker.Item label="Agosto" value="08" />
      <Picker.Item label="Septiembre" value="09" />
      <Picker.Item label="Octubre" value="10" />
      <Picker.Item label="Noviembre" value="11" />
      <Picker.Item label="Diciembre" value="12" />
    </Picker>
  )
}

export default MonthPicker

const styles = StyleSheet.create({})
