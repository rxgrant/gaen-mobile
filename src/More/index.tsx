import React, { FunctionComponent } from "react"
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack"
import { useTranslation } from "react-i18next"

import MoreMenuScreen from "./Menu"
import AboutScreen from "./About"
import LicensesScreen from "./Licenses"
import ENDebugMenu from "./ENDebugMenu"
import ENLocalDiagnosisKeyScreen from "./ENLocalDiagnosisKeyScreen"
import ExposureListDebugScreen from "./ExposureListDebugScreen"
import LanguageSelection from "./LanguageSelection"

import { Colors } from "../styles"

import { Screens } from "../navigation/index"

const Stack = createStackNavigator()

const SCREEN_OPTIONS: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryViolet,
  },
  headerTitleStyle: {
    color: Colors.white,
    textTransform: "uppercase",
  },
  headerBackTitleVisible: false,
  headerTintColor: Colors.white,
}

const MoreStack: FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name={Screens.Menu} component={MoreMenuScreen} />
      <Stack.Screen name={Screens.About} component={AboutScreen} />
      <Stack.Screen name={Screens.Licenses} component={LicensesScreen} />
      <Stack.Screen
        name={Screens.ENDebugMenu}
        component={ENDebugMenu}
        options={{ headerTitle: t("screen_titles.debug") }}
      />
      <Stack.Screen
        name={Screens.LanguageSelection}
        component={LanguageSelection}
        options={{ headerTitle: t("screen_titles.select_language") }}
      />
      <Stack.Screen
        name={Screens.ExposureListDebugScreen}
        component={ExposureListDebugScreen}
      />
      <Stack.Screen
        name={Screens.ENLocalDiagnosisKey}
        component={ENLocalDiagnosisKeyScreen}
      />
    </Stack.Navigator>
  )
}

export default MoreStack
