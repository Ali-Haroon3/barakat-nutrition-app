import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/theme";

type CapturedVideoPreviewProps = {
  uri: string | null;
  statusText?: string;
};

export default function CapturedVideoPreview({
  uri,
  statusText = "Recording complete",
}: CapturedVideoPreviewProps) {
  const player = useVideoPlayer(uri, (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.muted = true;
    videoPlayer.play();
  });

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
        <VideoView
          player={player}
          style={styles.video}
          nativeControls={false}
          contentFit="cover"
        />
      ) : (
        <Text style={styles.fallbackText}>No video recorded yet.</Text>
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
  video: {
    width: "55%",
    aspectRatio: 343 / 551,
    borderRadius: 2,
    overflow: "hidden",
  },
  fallbackText: {
    color: colors.text.secondary,
    fontSize: 16,
  },
});
