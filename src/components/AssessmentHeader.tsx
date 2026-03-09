import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/theme";

type AssessmentHeaderProps = {
  title: string;
  onBack: () => void;
};

export default function AssessmentHeader({
  title,
  onBack,
}: AssessmentHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        accessibilityRole="button"
        accessibilityLabel="Back"
        onPress={onBack}
      >
        <Text style={styles.backIcon}>‹</Text>
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 86,
    backgroundColor: colors.background.main,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    color: colors.text.primary,
    fontSize: 34,
    lineHeight: 34,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 42,
  },
});
