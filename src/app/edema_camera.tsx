import { CameraView } from "expo-camera";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Alert } from "react-native";
import CameraComponentScreen from "../components/CameraComponentScreen";
import { recordSaveAndContinue } from "../services/photoCaptureFlow";
import { useAssessmentStore } from "../state_management/AssessmentFunctions";

export default function EdemaCamera() {
  const cameraRef = useRef<CameraView | null>(null);
  const setEdemaVideoUri = useAssessmentStore(
    (state) => state.setEdemaVideoUri,
  );

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/edema_instructions");
  };

  const handleVideoRecorded = async (tempUri: string) => {
    const timestamp = Date.now();

    await recordSaveAndContinue({
      tempUri,
      fileName: `edema_video_${timestamp}.mp4`,
      nextRoute: "/edema_review",
      saveToStore: (videoUri) => {
        setEdemaVideoUri(videoUri);
      },
      onError: (message) => {
        Alert.alert("Recording failed", message);
      },
    });
    console.log(
      "assessment after edema video save:",
      useAssessmentStore.getState().assessment,
    );
  };

  return (
    <CameraComponentScreen
      onBack={handleBack}
      captureMode="video"
      onVideoRecorded={handleVideoRecorded}
      cameraRef={cameraRef}
    />
  );
}
