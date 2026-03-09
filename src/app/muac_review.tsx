import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextField from "../components/AppTextField";
import AssessmentHeader from "../components/AssessmentHeader";
import CapturedMediaPreview from "../components/CapturedMediaPreview";
import NextButton from "../components/NextButton";
import { useAssessmentStore } from "../state_management/AssessmentFunctions";
import { colors } from "../theme/theme";
import { validateAndBuildMuacMeasurement } from "../validation/muacReviewValidation";

export default function MuacReview() {
  const photoUri = useAssessmentStore(
    (state) => state.assessment.muac.photoUri,
  );
  const setMuacMeasurement = useAssessmentStore(
    (state) => state.setMuacMeasurement,
  );
  const [muacMeasurement, setMuacMeasurementText] = useState("");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/muac_camera");
  };

  const handleNext = () => {
    const result = validateAndBuildMuacMeasurement(muacMeasurement);
    if (!result.ok) {
      Alert.alert("Please fix the form", result.message);
      return;
    }

    setMuacMeasurement(result.value);
    router.push("/PlaceHolderScreen");
    console.log(
      "assessment after MUAC update:",
      useAssessmentStore.getState().assessment,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <View style={styles.container}>
          <AssessmentHeader title="MUAC Photo Assessment" onBack={handleBack} />

          <View style={styles.tealDivider} />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <CapturedMediaPreview uri={photoUri} />

              <View style={styles.questionSection}>
                <Text style={styles.questionText}>
                  What is the MUAC measurement (cm)?
                </Text>
                <AppTextField
                  placeholder="cm"
                  value={muacMeasurement}
                  onChangeText={setMuacMeasurementText}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <NextButton onPress={handleNext} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background.muted,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 26,
  },
  questionSection: {
    marginTop: 22,
  },
  questionText: {
    color: colors.text.primary,
    fontSize: 34 / 2,
    fontWeight: "400",
    marginBottom: 16,
  },
  tealDivider: {
    height: 14,
    backgroundColor: colors.primary.teal,
  },
  footer: {
    backgroundColor: colors.primary.teal,
    paddingHorizontal: 24,
    paddingVertical: 18,
    alignItems: "flex-end",
  },
});
