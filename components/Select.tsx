import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import GenericInput from './GenericInput'

type SelectProps = {
  currentDate: {
    year: string,
    month: string
  },
  onUpdateDate: () => void
}

const Select = ({ currentDate, onUpdateDate } : SelectProps) => {
  const { year, month } = currentDate

  return (
    <View style={{marginTop: 10, flexDirection:'row', justifyContent: 'center'}}>
      <GenericInput
        label="Mes"
        width="45%"
        children1={
          <Picker
            style={{ height: 20, width: '100%' }}
            selectedValue={month}
            onValueChange={monthSelected => onUpdateDate(year, monthSelected)}
          >
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
        }
      />

      <GenericInput
        label="Año"
        width="45%"
        children1={
          <Picker
            style={{ height: 20, width: '100%' }}
            selectedValue={year}
            onValueChange={yearSelected => onUpdateDate(yearSelected, month)}
          >
            <Picker.Item label="2020" value="2020" />
            <Picker.Item label="2021" value="2021" />
          </Picker>
        }
      />
    </View>
  )
}

export default Select

const styles = StyleSheet.create({})
