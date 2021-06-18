import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import GenericInput from './GenericInput'

type SelectProps = {
  initialDate: {
    year: string,
    month: string
  },
  onUpdateDate: (internalYear:string, internalMonth:string) => void
}

const Select = ({ initialDate, onUpdateDate } : SelectProps) => {
  const { year, month } = initialDate

  const [internalYear, setInternalYear] = useState('')
  const [internalMonth, setInternalMonth] = useState('')

  useEffect(() => {
    if(internalYear.length && internalMonth.length) {
      console.log('onUpdateDate')
      onUpdateDate(internalYear, internalMonth)
    }

  }, [internalYear, internalMonth])

  return (
    <View style={{marginTop: 10, flexDirection:'row', justifyContent: 'center'}}>
      <GenericInput
        label="Mes"
        width="45%"
        children1={
          <Picker
            style={{ height: 20, width: '100%' }}
            selectedValue={internalMonth.length ? internalMonth : month}
            onValueChange={monthSelected => {
              if(monthSelected !== 'month')
                setInternalMonth(monthSelected)
            }}
          >
            <Picker.Item label="Mes" value="month" />
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
            selectedValue={internalYear.length ? internalYear : year}
            onValueChange={yearSelected => {
              if(yearSelected !== 'year')
                setInternalYear(yearSelected)
              }}
          >
            <Picker.Item label="Año" value="year" />
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
