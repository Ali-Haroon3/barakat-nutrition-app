import { CameraView } from "expo-camera";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Alert } from "react-native";
import CameraComponentScreen from "../components/CameraComponentScreen";
import { captureSaveAndContinue } from "../services/photoCaptureFlow";
import { useAssessmentStore } from "../state_management/AssessmentFunctions";

export default function MuacCamera() {
  const cameraRef = useRef<CameraView | null>(null);
  const setMuacPhotoUri = useAssessmentStore((state) => state.setMuacPhotoUri);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/muac_instructions");
  };

  const handleCapturePress = async () => {
    const timestamp = Date.now();
    await captureSaveAndContinue({
      cameraRef,
      fileName: `muac_photo_${timestamp}.jpg`,
      nextRoute: "/muac_review",
      saveToStore: (photoUri) => {
        setMuacPhotoUri(photoUri);
      },
      onError: (message) => {
        Alert.alert("Capture failed", message);
      },
    });
  };

  return (
    <CameraComponentScreen
      onBack={handleBack}
      captureMode="photo"
      onCapturePress={handleCapturePress}
      cameraRef={cameraRef}
    />
  );
}
