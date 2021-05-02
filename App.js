import 'react-native-gesture-handler';
import React from 'react';


// LIBRARIES
import { enableScreens } from 'react-native-screens';
import codePush from "react-native-code-push"


// COMPONENTS
import BudgetMonthlyApp from './BudgetMonthlyApp'

// CONTEXTS
import AuthUserProvider from './context/authUser'

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: {
    title: 'Actualización disponible',
    mandatoryUpdateMessage: 'Es necesario actualizar para continuar.',
    mandatoryContinueButtonLabel: 'Actualizar',
    updateTitle: 'Actualización disponible',
    optionalUpdateMessage: 'Es necesario actualizar para continuar.',
    optionalIgnoreButtonLabel: "Cancelar",
    optionalInstallButtonLabel: 'Actualizar'
  }
};

enableScreens();

const App = () => {

  codePush.sync({
    updateDialog: true,
    installMode: codePush.InstallMode.IMMEDIATE
  });

  return (
    <AuthUserProvider>
      <BudgetMonthlyApp/>
    </AuthUserProvider>
  )

};

export default codePush(codePushOptions)(App);
