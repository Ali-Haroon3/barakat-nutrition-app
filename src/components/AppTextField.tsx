import React from "react";
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
} from "react-native";
import { colors } from "../theme/theme";

type AppTextFieldProps = TextInputProps & {
  containerStyle?: StyleProp<TextStyle>;
};

export default function AppTextField({
  containerStyle,
  style,
  placeholderTextColor = "#B8B8B8",
  ...props
}: AppTextFieldProps) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={placeholderTextColor}
      style={[styles.input, containerStyle, style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 14,
    backgroundColor: colors.brand.white,
    paddingHorizontal: 18,
    fontSize: 16,
    color: colors.text.primary,
  },
});
