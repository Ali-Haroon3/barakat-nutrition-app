import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/theme";

type CaptureMode = "photo" | "video";

type CameraComponentScreenProps = {
  onBack: () => void;
  captureMode: CaptureMode;
  onCapturePress?: () => void;
  onVideoRecorded?: (tempUri: string) => Promise<void> | void;
  cameraRef?: React.RefObject<CameraView | null>;
};

export default function CameraComponentScreen({
  onBack,
  captureMode,
  onCapturePress,
  onVideoRecorded,
  cameraRef,
}: CameraComponentScreenProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const internalCameraRef = useRef<CameraView | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resolvedCameraRef = cameraRef ?? internalCameraRef;

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const clearRecordingTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startRecordingTimer = () => {
    clearRecordingTimer();
    intervalRef.current = setInterval(() => {
      setRecordSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);
  };

  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  };

  const handleVideoCapturePress = async () => {
    if (!resolvedCameraRef.current) {
      Alert.alert("Recording failed", "Camera is not ready.");
      return;
    }

    if (isBusy) {
      return;
    }

    if (isRecording) {
      setIsBusy(true);
      resolvedCameraRef.current.stopRecording();
      return;
    }

    try {
      setIsBusy(true);
      setRecordSeconds(0);
      setIsRecording(true);
      startRecordingTimer();

      setIsBusy(false);
      const recorded = await resolvedCameraRef.current.recordAsync();

      if (!recorded?.uri) {
        throw new Error("Could not record video.");
      }

      await onVideoRecorded?.(recorded.uri);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to record video.";
      Alert.alert("Recording failed", message);
    } finally {
      clearRecordingTimer();
      setRecordSeconds(0);
      setIsRecording(false);
      setIsBusy(false);
    }
  };

  const handleShutterPress = () => {
    if (captureMode === "video") {
      void handleVideoCapturePress();
      return;
    }

    onCapturePress?.();
  };

  const handleBackPress = () => {
    if (isRecording || isBusy) {
      return;
    }
    onBack();
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Loading camera permissions...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Camera permission is required.
          </Text>
          <Pressable
            style={styles.permissionButton}
            onPress={requestPermission}
          >
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
            onPress={handleBackPress}
            disabled={isRecording || isBusy}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          {captureMode === "video" && isRecording ? (
            <View style={styles.recordingBadge}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>
                REC {formatRecordingTime(recordSeconds)}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.previewContainer}>
          <CameraView
            ref={resolvedCameraRef}
            style={styles.cameraPreview}
            facing="back"
            mode={captureMode === "video" ? "video" : "picture"}
            mute={captureMode === "video"}
          />
        </View>

        <View style={styles.bottomBar}>
          <Pressable
            style={[
              styles.shutterOuter,
              captureMode === "video" &&
                isRecording &&
                styles.shutterOuterVideoRecording,
            ]}
            onPress={handleShutterPress}
            disabled={isBusy}
            accessibilityRole="button"
            accessibilityLabel={
              captureMode === "photo"
                ? "Take photo"
                : isRecording
                  ? "Stop recording"
                  : "Start recording"
            }
          >
            <View
              style={[
                styles.shutterInner,
                captureMode === "video" && styles.shutterInnerVideoIdle,
                captureMode === "video" &&
                  isRecording &&
                  styles.shutterInnerVideoRecording,
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
  shutterOuterVideoRecording: {
    borderColor: colors.brand.white,
  },
  shutterInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: colors.brand.white,
  },
  shutterInnerVideoIdle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FF3B30",
  },
  shutterInnerVideoRecording: {
    width: 34,
    height: 34,
    borderRadius: 10,
  },
  recordingBadge: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF3B30",
  },
  recordingText: {
    color: colors.brand.white,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
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
