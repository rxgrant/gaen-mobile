import React from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import { RTLEnabledText } from "../components/RTLEnabledText"
import { NavigationBarWrapper } from "../components/NavigationBarWrapper"
import { useStatusBarEffect } from "../navigation"

import { Spacing, Typography } from "../styles"

const MoreInfo = (): JSX.Element => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  useStatusBarEffect("light-content")

  const handleOnBackPress = () => {
    navigation.goBack()
  }

  return (
    <NavigationBarWrapper
      title={t("screen_titles.more_info")}
      onBackPress={handleOnBackPress}
    >
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <RTLEnabledText style={styles.headerText}>
            {t("exposure_history.why_did_i_get_an_en")}
          </RTLEnabledText>
          <RTLEnabledText style={styles.contentText}>
            {t("exposure_history.bt.why_did_i_get_an_en_para")}
          </RTLEnabledText>
        </View>
        <View style={styles.contentContainer}>
          <RTLEnabledText style={styles.headerText}>
            {t("exposure_history.how_does_this_work")}
          </RTLEnabledText>
          <RTLEnabledText style={styles.contentText}>
            {t("exposure_history.bt.how_does_this_work_para")}
          </RTLEnabledText>
        </View>
      </ScrollView>
    </NavigationBarWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.medium,
  },
  headerText: {
    ...Typography.header3,
  },
  contentContainer: {
    paddingBottom: Spacing.xLarge,
  },
  contentText: {
    ...Typography.mainContent,
    paddingTop: Spacing.small,
  },
})

export default MoreInfo
