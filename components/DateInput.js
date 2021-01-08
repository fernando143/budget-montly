import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { withTheme, Icon } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker"

const DateInput = ({placeholder, label, leftIcon, theme, onChange}) => {
  const styleLabel = {
    color: theme.colors.grey3,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  }

  const stylePlaceholder = {
    color: theme.colors.grey3,
    fontSize: 18
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
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' }

    onChange(date.toLocaleDateString('es-ES', opciones))
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
          <Text style={stylePlaceholder}>{placeholder}</Text>
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
