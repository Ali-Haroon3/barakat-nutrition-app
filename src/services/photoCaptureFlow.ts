import { CameraView } from "expo-camera";
import * as FileSystem from "expo-file-system/legacy";
import { router } from "expo-router";
import React from "react";

type CaptureSaveAndContinueParams = {
  cameraRef: React.RefObject<CameraView | null>;
  fileName: string;
  nextRoute: string;
  saveToStore: (uri: string) => void;
  onError?: (message: string) => void;
};

type RecordSaveAndContinueParams = {
  tempUri: string;
  fileName: string;
  nextRoute: string;
  saveToStore: (uri: string) => void;
  onError?: (message: string) => void;
};

type CaptureFlowSuccess = {
  ok: true;
  uri: string;
};

type CaptureFlowError = {
  ok: false;
  error: string;
};

export type CaptureFlowResult = CaptureFlowSuccess | CaptureFlowError;

async function persistMediaFile(
  sourceUri: string,
  fileName: string,
): Promise<string> {
  if (!FileSystem.documentDirectory) {
    throw new Error("Local storage directory unavailable.");
  }

  const mediaDirectory = `${FileSystem.documentDirectory}assessment_media/`;
  await FileSystem.makeDirectoryAsync(mediaDirectory, {
    intermediates: true,
  });

  const destinationUri = `${mediaDirectory}${fileName}`;

  const existingFile = await FileSystem.getInfoAsync(destinationUri);
  if (existingFile.exists) {
    await FileSystem.deleteAsync(destinationUri, { idempotent: true });
  }

  await FileSystem.copyAsync({
    from: sourceUri,
    to: destinationUri,
  });

  return destinationUri;
}

export async function captureSaveAndContinue({
  cameraRef,
  fileName,
  nextRoute,
  saveToStore,
  onError,
}: CaptureSaveAndContinueParams): Promise<CaptureFlowResult> {
  try {
    if (!cameraRef.current) {
      throw new Error("Camera is not ready.");
    }

    const captured = await cameraRef.current.takePictureAsync();
    if (!captured?.uri) {
      throw new Error("Could not capture photo.");
    }

    const destinationUri = await persistMediaFile(captured.uri, fileName);

    saveToStore(destinationUri);
    router.push(nextRoute as never);

    return {
      ok: true,
      uri: destinationUri,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to capture photo.";

    if (onError) {
      onError(message);
    }

    return {
      ok: false,
      error: message,
    };
  }
}

export async function recordSaveAndContinue({
  tempUri,
  fileName,
  nextRoute,
  saveToStore,
  onError,
}: RecordSaveAndContinueParams): Promise<CaptureFlowResult> {
  try {
    if (!tempUri) {
      throw new Error("Could not record video.");
    }

    const destinationUri = await persistMediaFile(tempUri, fileName);

    saveToStore(destinationUri);
    router.push(nextRoute as never);

    return {
      ok: true,
      uri: destinationUri,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save video.";

    if (onError) {
      onError(message);
    }

    return {
      ok: false,
      error: message,
    };
  }
}
