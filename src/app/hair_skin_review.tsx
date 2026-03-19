import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AssessmentHeader from "../components/AssessmentHeader";
import CapturedMediaPreview from "../components/CapturedMediaPreview";
import NextButton from "../components/NextButton";
import { YesNoUnsure } from "../state_management/Assessment";
import { useAssessmentStore } from "../state_management/AssessmentFunctions";
import { colors } from "../theme/theme";
import { validateAndBuildEdemaDentRemain } from "../validation/edemaReviewValidation";

export default function HairSkinReview() {
  const photoUri = useAssessmentStore(
    (state) => state.assessment.hair.photoUri,
  );
  const setHairIssue = useAssessmentStore((state) => state.setHairIssue);
  const [hairIssue, setHairIssueSelection] = useState<YesNoUnsure | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/hair_skin_camera");
  };

  const handleNext = () => {
    const result = validateAndBuildEdemaDentRemain(hairIssue);
    if (!result.ok) {
      Alert.alert("Please fix the form", result.message);
      return;
    }

    setHairIssue(result.value);
    router.push("/PlaceHolderScreen");
    console.log(
      "assessment after hair assessment save:",
      useAssessmentStore.getState().assessment,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AssessmentHeader title="Hair & Skin Assessment" onBack={handleBack} />

        <View style={styles.tealDivider} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <CapturedMediaPreview uri={photoUri} />

            <View style={styles.questionSection}>
              <Text style={styles.questionText}>
                Do you see discoloration, hair loss, or depigmentation?
              </Text>

              <View style={styles.optionColumn}>
                <Pressable
                  style={styles.option}
                  onPress={() => setHairIssueSelection("yes")}
                >
                  <View
                    style={[
                      styles.checkbox,
                      hairIssue === "yes" && styles.checkboxChecked,
                    ]}
                  >
                    {hairIssue === "yes" ? (
                      <Text style={styles.checkmark}>✓</Text>
                    ) : null}
                  </View>
                  <Text style={styles.optionText}>Yes</Text>
                </Pressable>

                <Pressable
                  style={styles.option}
                  onPress={() => setHairIssueSelection("no")}
                >
                  <View
                    style={[
                      styles.checkbox,
                      hairIssue === "no" && styles.checkboxChecked,
                    ]}
                  >
                    {hairIssue === "no" ? (
                      <Text style={styles.checkmark}>✓</Text>
                    ) : null}
                  </View>
                  <Text style={styles.optionText}>No</Text>
                </Pressable>

                <Pressable
                  style={styles.option}
                  onPress={() => setHairIssueSelection("unsure")}
                >
                  <View
                    style={[
                      styles.checkbox,
                      hairIssue === "unsure" && styles.checkboxChecked,
                    ]}
                  >
                    {hairIssue === "unsure" ? (
                      <Text style={styles.checkmark}>✓</Text>
                    ) : null}
                  </View>
                  <Text style={styles.optionText}>Unsure</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <NextButton onPress={handleNext} />
        </View>
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
  optionColumn: {
    gap: 18,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#9A9A9A",
    backgroundColor: colors.background.main,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary.navy,
    borderColor: colors.primary.navy,
  },
  checkmark: {
    color: colors.brand.white,
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 18,
  },
  optionText: {
    color: colors.text.primary,
    fontSize: 18,
  },
});
