import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/theme";

type FormRowProps = {
  label: string;
  children: ReactNode;
};

export default function FormRow({ label, children }: FormRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.inputContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  labelContainer: {
    width: 120,
    paddingRight: 12,
  },
  label: {
    fontSize: 17,
    color: colors.text.primary,
  },
  inputContainer: {
    flex: 1,
  },
});
