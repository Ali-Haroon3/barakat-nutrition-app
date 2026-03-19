import { CameraView } from "expo-camera";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Alert } from "react-native";
import CameraComponentScreen from "../components/CameraComponentScreen";
import { captureSaveAndContinue } from "../services/photoCaptureFlow";
import { useAssessmentStore } from "../state_management/AssessmentFunctions";

export default function HairSkinCamera() {
  const cameraRef = useRef<CameraView | null>(null);
  const setHairPhotoUri = useAssessmentStore((state) => state.setHairPhotoUri);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/hair_skin_instructions");
  };

  const handleCapturePress = async () => {
    const timestamp = Date.now();
    await captureSaveAndContinue({
      cameraRef,
      fileName: `hair_skin_photo_${timestamp}.jpg`,
      nextRoute: "/hair_skin_review",
      saveToStore: (photoUri) => {
        setHairPhotoUri(photoUri);
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
