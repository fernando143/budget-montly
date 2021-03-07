import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Input, Text, Button, Icon } from 'react-native-elements'

// CONSTANTS & HELPERS
import { h4Styles, COLOR_AMERICAN_RIVER } from '../constants'

// COMPONENTS
import DateInput from './DateInput'
import GenericInput from './GenericInput'
import MonthPicker from './MonthPicker'

const Form = ({currentDate, title, isSaving, data, onCancel, onSubmit}) => {
  const { year: currentYear, month: currentMonth } = currentDate
  const [valuesForm, setValuesForm] = useState({
    name: null,
    month: null,
    datePaid: null,
    mount: null,
    observation: null,
    month: null,
    year: null
  })

  useEffect(() => {
    if(data !== null) {
        initDataOnEdit(data)
    } else {
      initDataOnAdd(valuesForm, currentYear, currentMonth)
    }
  }, [data])

  const initDataOnEdit = data => setValuesForm({ ...data })

  const initDataOnAdd = (valuesForm, currentYear, currentMonth) => setValuesForm({ ...valuesForm, year: currentYear, month: currentMonth })

  const onChange = (label, value) => setValuesForm({ ...valuesForm, [label]: value })

  const handleSubmit = () => {
    onSubmit(valuesForm)

  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          h4
          h4Style={h4Styles}
        >
          {title}
        </Text>

        <Input
          label="Nombre"
          placeholder="Ingrese un nombre"
          leftIcon={{ type: 'font-awesome-5', name: 'file-invoice' }}
          defaultValue={valuesForm.name ? valuesForm.name : null}
          onChangeText={value => onChange('name', value)}
        />
        <GenericInput
          label="Seleccione Mes"
          leftIcon={{ type: 'font-awesome-5', name: 'calendar-alt' }}
          children1={
            <MonthPicker
              defaultValue={valuesForm.month ? valuesForm.month : currentMonth}
              onChangeText={value => onChange('month', value)}
            />
          }
        />
        <Input
          label="Año"
          placeholder="Ingrese el año"
          leftIcon={{ type: 'font-awesome-5', name: 'calendar-alt' }}
          keyboardType="number-pad"
          defaultValue={valuesForm.year ? valuesForm.year : currentYear}
          onChangeText={value => onChange('year', value)}
        />
        <DateInput
          label="Fecha de pago"
          placeholder="Ingrese la fecha de pago"
          leftIcon={{ type: 'font-awesome-5', name: 'calendar-alt' }}
          defaultValue={valuesForm.datePaid ? valuesForm.datePaid : null}
          onChange={value => onChange('datePaid', value)}
        />
        <Input
          label="Importe"
          placeholder="Ingrese el importe"
          leftIcon={{ type: 'font-awesome', name: 'dollar' }}
          keyboardType="number-pad"
          defaultValue={valuesForm.mount ? valuesForm.mount : null}
          onChangeText={value => onChange('mount', value)}
        />
        <Input
          label="Observación"
          placeholder="Ingrese alguna observación (opcional)"
          leftIcon={{ type: 'font-awesome-5', name: 'comment-alt' }}
          multiline={true}
          defaultValue={valuesForm.observation ? valuesForm.observation : null}
          onChangeText={value => onChange('observation', value)}
        />

        <View style={styles.btnContainerGuardar}>
          <Button
            title="Cancelar"
            containerStyle={styles.btnContainerStyle}
            buttonStyle={{backgroundColor: COLOR_AMERICAN_RIVER}}
            icon={
              <Icon
                name="times"
                type="font-awesome-5"
                color="#FFF"
                size={20}
                containerStyle={{marginRight: 5}}
              />
            }
            onPress={onCancel}
          />
          <Button
            title="Guardar"
            loading={isSaving}
            containerStyle={styles.btnContainerStyle}
            icon={
              <Icon
                name="save"
                type="font-awesome-5"
                color="#FFF"
                size={20}
                containerStyle={{marginRight: 5}}
              />
            }
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Form

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  btnContainerGuardar: {
    alignSelf: 'flex-end',
    flexDirection: 'row'
  },
  btnContainerStyle: {
    marginRight: 10,
    width: 100
  }
})
