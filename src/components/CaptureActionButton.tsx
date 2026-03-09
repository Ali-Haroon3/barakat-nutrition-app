import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/theme";

type CaptureActionButtonProps = {
  title?: string;
  onPress?: () => void;
};

export default function CaptureActionButton({
  title = "Open Camera",
  onPress,
}: CaptureActionButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress} accessibilityRole="button">
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.green,
    minHeight: 62,
    minWidth: 238,
    paddingHorizontal: 34,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.brand.white,
    fontSize: 38 / 2,
    fontWeight: "600",
  },
});
