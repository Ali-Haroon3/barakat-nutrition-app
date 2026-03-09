import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/theme";

type CapturedMediaPreviewProps = {
  uri: string | null;
  statusText?: string;
};

export default function CapturedMediaPreview({
  uri,
  statusText = "Photo capture complete",
}: CapturedMediaPreviewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <MaterialCommunityIcons
          name="check-circle"
          size={24}
          color={colors.status.success}
        />
        <Text style={styles.statusText}>{statusText}</Text>
      </View>

      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <Text style={styles.fallbackText}>No image captured yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  statusRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusText: {
    color: colors.text.primary,
    fontSize: 35 / 2,
    fontWeight: "500",
  },
  image: {
    width: "55%",
    aspectRatio: 343 / 551,
    resizeMode: "cover",
  },
  fallbackText: {
    color: colors.text.secondary,
    fontSize: 16,
  },
});
