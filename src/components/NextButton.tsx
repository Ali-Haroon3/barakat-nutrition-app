import React from "react";
import {
    GestureResponderEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { colors } from "../theme/theme";

type NextButtonProps = {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

export default function NextButton({
  title = "Next",
  onPress,
  disabled = false,
}: NextButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title} →
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.coral,
    height: 52,
    minWidth: 140,
    paddingHorizontal: 24,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  text: {
    color: colors.brand.white,
    fontSize: 18,
    fontWeight: "600",
  },
  disabledText: {
    color: colors.brand.white,
  },
});
