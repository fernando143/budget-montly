import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Text, Button, Icon } from 'react-native-elements'

// CONSTANTS & HELPERS
import { h4Styles, COLOR_AMERICAN_RIVER } from '../constants'

const Form = ({title, onCancel, onSubmit}) => {
  const [valuesForm, setValuesForm] = useState({
    name: null,
    datePaid: null,
    mount: null,
    observation: null
  })

  const onChange = (label, value) => setValuesForm({ ...valuesForm, [label]: value })

  const handleSubmit = () => {
    console.log('handleSubmit')
  }

  return (
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
        onChangeText={value => onChange('name', value)}
      />
      <Input
        label="Fecha de pago"
        placeholder="Ingrese la fecha de pago"
        leftIcon={{ type: 'font-awesome', name: 'dollar' }}
        onChangeText={value => onChange('datePaid', value)}
      />
      <Input
        label="Importe"
        placeholder="Ingrese el importe"
        leftIcon={{ type: 'font-awesome', name: 'dollar' }}
        onChangeText={value => onChange('mount', value)}
      />
      <Input
        label="Observación"
        placeholder="Ingrese alguna observación (opcional)"
        leftIcon={{ type: 'font-awesome-5', name: 'comment-alt' }}
        multiline={true}
        onChangeText={value => onChange('observation', value)}
      />

      <View style={styles.btnContainerGuardar}>
        <Button
          title="Cancelar"
          containerStyle={{marginRight: 10}}
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
          containerStyle={{marginRight: 10}}
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
  }
})
