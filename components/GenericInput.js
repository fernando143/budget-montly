import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { withTheme, Icon } from 'react-native-elements'

const GenericInput = ({ theme, label, width = '95%', borderBottom = false, leftIcon = null, children1 = null, children2 = null }) => {
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
  const borderBottomStyle = {
    borderBottomColor: theme.colors.grey3,
    borderBottomWidth: 1
  }
  const widthStyle = { width: width }

  return (
    <View style={[styles.container, borderBottom ? borderBottomStyle : null, widthStyle ]}>
      <Text style={styleLabel}>{label}</Text>
      <View style={styles.contentContainer}>
        {
          leftIcon &&
          <Icon
            type={leftIcon.type}
            name={leftIcon.name}
            containerStyle={styles.containerIcon}
          />
        }
        {children1}
      </View>
      {children2}
    </View>
  )
}

export default withTheme(GenericInput)

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  containerIcon: {
    marginRight: 10
  }
})
