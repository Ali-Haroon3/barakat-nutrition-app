import React from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/theme";
import AssessmentHeader from "./AssessmentHeader";
import CaptureActionButton from "./CaptureActionButton";
import InstructionImage from "./InstructionImage";

type InstructionComponentScreenProps = {
  title: string;
  imageSource: ImageSourcePropType;
  imageAspectRatio?: number;
  onBack: () => void;
  onOpenCamera?: () => void;
};

export default function InstructionComponentScreen({
  title,
  imageSource,
  imageAspectRatio,
  onBack,
  onOpenCamera,
}: InstructionComponentScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AssessmentHeader title={title} onBack={onBack} />

        <View style={styles.tealDivider} />
        <View style={styles.content}>
          <InstructionImage
            source={imageSource}
            aspectRatio={imageAspectRatio}
            containerStyle={styles.imageContainer}
          />
          <View style={styles.buttonContainer}>
            <CaptureActionButton onPress={onOpenCamera} />
          </View>
        </View>
        <View style={styles.tealDivider} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background.muted,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    paddingTop: 160,
    paddingBottom: 0,
  },
  tealDivider: {
    height: 14,
    backgroundColor: colors.primary.teal,
  },
  buttonContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
  },
});
