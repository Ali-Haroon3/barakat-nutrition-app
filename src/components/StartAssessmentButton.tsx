import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/theme";

type StartAssessmentButtonProps = {
  title?: string;
  onPress?: () => void;
};

export default function StartAssessmentButton({
  title = "Start Malnutrition\nCheck-up",
  onPress,
}: StartAssessmentButtonProps) {
  return (
    <Pressable style={styles.card} onPress={onPress} accessibilityRole="button">
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="file-plus-outline"
          size={38}
          color={colors.brand.white}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colors.primary.navy,
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 24,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  title: {
    color: colors.brand.white,
    fontSize: 42 / 2,
    fontWeight: "700",
    lineHeight: 56 / 2,
  },
});
