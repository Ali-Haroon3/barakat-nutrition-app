import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/theme";

type CaptureMode = "photo" | "video";

type CameraComponentScreenProps = {
  onBack: () => void;
  captureMode: CaptureMode;
  onCapturePress?: () => void;
  cameraRef?: React.RefObject<CameraView | null>;
};

export default function CameraComponentScreen({
  onBack,
  captureMode,
  onCapturePress,
  cameraRef,
}: CameraComponentScreenProps) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Loading camera permissions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Camera permission is required.</Text>
          <Pressable style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Allow Camera Access</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Pressable
            style={styles.backButton}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        </View>

        <View style={styles.previewContainer}>
          <CameraView ref={cameraRef} style={styles.cameraPreview} facing="back" />
        </View>

        <View style={styles.bottomBar}>
          <Pressable
            style={[
              styles.shutterOuter,
              captureMode === "video" && styles.shutterOuterVideo,
            ]}
            onPress={onCapturePress}
            accessibilityRole="button"
            accessibilityLabel={
              captureMode === "photo" ? "Take photo" : "Start recording"
            }
          >
            <View
              style={[
                styles.shutterInner,
                captureMode === "video" && styles.shutterInnerVideo,
              ]}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#16181D",
  },
  container: {
    flex: 1,
    backgroundColor: "#16181D",
  },
  topBar: {
    height: 84,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    color: colors.brand.white,
    fontSize: 40,
    lineHeight: 40,
  },
  previewContainer: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#000000",
  },
  cameraPreview: {
    flex: 1,
  },
  bottomBar: {
    height: 132,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterOuter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    borderColor: colors.brand.white,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterOuterVideo: {
    borderColor: "#FF6B6B",
  },
  shutterInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: colors.brand.white,
  },
  shutterInnerVideo: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#FF3B30",
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16181D",
    paddingHorizontal: 24,
    gap: 16,
  },
  permissionText: {
    color: colors.brand.white,
    fontSize: 18,
    textAlign: "center",
  },
  permissionButton: {
    backgroundColor: colors.primary.green,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: colors.brand.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
