import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { withTheme, Icon } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker"

const DateInput = ({ defaultValue, placeholder, label, leftIcon, theme, onChange}) => {
  const styleLabel = {
    color: theme.colors.grey3,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  }

  const stylePlaceholder = {
    color: theme.colors.grey3,
    fontSize: 18,
    width: '90%'
  }

  const styleContainer = {
    borderBottomColor: theme.colors.grey3
  }
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const confirmarFecha = date => {
    const dateParsed = date.toLocaleDateString('es-ES')
    console.log(dateParsed)
    onChange(dateParsed)

    hideDatePicker();
  };

  return (
    <View style={{...styles.container, ...styleContainer}}>
      <Text style={styleLabel}>{label}</Text>
      <View style={styles.contentContainer}>
        <Icon
          type={leftIcon.type}
          name={leftIcon.name}
          containerStyle={styles.containerIcon}
        />
        <TouchableWithoutFeedback
          onPress={showDatePicker}
        >
          <Text style={stylePlaceholder}>{defaultValue ? defaultValue : placeholder}</Text>
        </TouchableWithoutFeedback>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={confirmarFecha}
        onCancel={hideDatePicker}
        locale='es_ES'
      />
    </View>
  )
}

export default withTheme(DateInput)

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginBottom: 20,
    borderBottomWidth: 1
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: 15
  },
  containerIcon: {
    marginRight: 10
  }
})
