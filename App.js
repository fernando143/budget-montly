import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

// LIBRARIES
import { enableScreens } from 'react-native-screens';
import codePush from "react-native-code-push"
import RNBootSplash from "react-native-bootsplash";

// COMPONENTS
import BudgetMonthlyApp from './BudgetMonthlyApp'

// CONTEXTS
import AuthUserProvider from './context/authUser'
import DataUserProvider from './context/dataUser'

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

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, [])

  return (
    <AuthUserProvider>
      <DataUserProvider>
        <BudgetMonthlyApp/>
      </DataUserProvider>
    </AuthUserProvider>
  )

};

export default codePush(codePushOptions)(App);
