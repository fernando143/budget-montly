import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native';

// LIBRARIES
import { Input, Button, Text, Overlay, Divider } from 'react-native-elements';

// CONSTANTS & HELPERS
import { h4Styles, COLOR_ELECTRON_BLUE } from '../constants'
import { getDateNow, calculateRestante } from '../helpers'

// CONTEXT
import { AuthUserContext } from '../context/authUser'

// COMPONENTS
import GenericInput from '../components/GenericInput'

// API
import { getBudget, addBudget, updateBudget, getEgreso } from '../services/api'



const Settings = () => {
  const [isModal, setIsModal] = useState(false)
  const [budget, setBudget] = useState('')
  const [egreso, setEgreso] = useState('0')
  const [restante, setRestante] = useState(0)
  const [currentDate, setCurrentDate] = useState({ year: '', month: '' })
  const unidad = "AR$"
  const isFocused = useIsFocused()

  const context:any = useContext(AuthUserContext)
  const { user: { uid } } = context

  useEffect(() => {
    if(isFocused) {
      const currentDate = getDateNow()

      getBudget(uid, currentDate)
      .then((docBudget:any) => {
        if(docBudget.exists)
          setBudget(docBudget.budget)
      })

      getEgreso(uid, currentDate)
      .then((data:any) => {
        setEgreso(data.egreso)
      })

      setCurrentDate(currentDate)
    }
  }, [isFocused])

  useEffect(() => {
    let sumRestante = calculateRestante(parseInt(budget), parseInt(egreso))

    setRestante(sumRestante)
}, [budget, egreso])

  const onSubmit = () => {
    getBudget(uid, currentDate)
    .then((data:any) => {
      if(data.exist) {
        updateBudget(budget,  uid, data.id)
        .then(() => console.log('budget actualizado'))
        .catch(error => console.log('budget error'))
      } else {
        addBudget(budget, uid, currentDate)
        .then(data => console.log('añadido budget'))
        .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))



    setIsModal(false)
  }

  return (
    <View>
      <View>
        <Text h4 style={h4Styles}>Ingreso mensual</Text>
        <Divider style={{ height: 1 }} />

        <Button
          type="clear"
          icon={{
            name: "edit",
            size: 15,
            color: COLOR_ELECTRON_BLUE
          }}
          title={`${budget} ${unidad}`}
          onPress={() => setIsModal(true)}
        />
      </View>

      <View>
        <Text h4 style={h4Styles}>Egreso</Text>
        <Divider style={{ height: 1 }} />

        <Text style={styles.number}>{egreso} {unidad}</Text>
      </View>

      <View>
        <Text h4 style={h4Styles}>Restante</Text>
        <Divider style={{ height: 1 }} />

        <Text style={styles.number}>{restante ? restante : budget} {unidad}</Text>
      </View>

      <Overlay
        isVisible={isModal}
        overlayStyle={{width: '90%'}}
        onBackdropPress={() => setIsModal(false)}
      >
        <View>
          <Input
            label="Ingrese el monto mensual"
            placeholder="Solo numeros"
            defaultValue={budget.length ? budget : ''}
            onChangeText={value => setBudget(value)}
          />
          <Button
              title="Aceptar"
              onPress={onSubmit}
            />
        </View>
      </Overlay>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  number: {
    marginLeft: 'auto',
    fontSize: 18
  }
})
