import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

import { RTLEnabledText } from "../components/RTLEnabledText"

import { Colors, Typography } from "../styles"

/**
 * @typedef { import("react").ReactNode } ReactNode
 */

/** @type {React.FunctionComponent<{
 *   textColor?: string;
 *   backgroundColor?: string;
 *   onPress: () => void;
 *   title: string;
 *   disabled: boolean;
 * }>} */
export const Button = ({
  textColor,
  backgroundColor,
  onPress,
  title,
  buttonStyle,
  textStyle,
  disabled = false,
}) => {
  const dynamicBackgroundColor = () => {
    if (backgroundColor) return backgroundColor
    else if (disabled) return Colors.secondaryBackground
    else return Colors.secondaryBlue
  }

  const dynamicTextColor = () => {
    if (textColor) return textColor
    else if (disabled) return Colors.disabledButtonText
    else return Colors.white
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      testID="assessment-button"
    >
      <View
        style={[
          styles.cta,
          buttonStyle,
          { backgroundColor: dynamicBackgroundColor() },
        ]}
      >
        <RTLEnabledText
          style={[styles.ctaText, textStyle, { color: dynamicTextColor() }]}
        >
          {title}
        </RTLEnabledText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cta: {
    borderRadius: 10,
    paddingVertical: 22,
    paddingHorizontal: 14,
  },
  ctaText: {
    ...Typography.mainContent,
    color: Colors.faintGray,
    textAlign: "center",
  },
})
