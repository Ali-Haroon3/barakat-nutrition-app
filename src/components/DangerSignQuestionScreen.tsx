import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AssessmentHeader from "../components/AssessmentHeader";
import { DangerSigns, YesNo } from "../state_management/Assessment";
import { useAssessmentStore } from "../state_management/AssessmentFunctions";
import { colors } from "../theme/theme";

type DangerSignQuestionScreenProps = {
  question: string;
  dangerKey: keyof DangerSigns;
  onBack: () => void;
  onNext: () => void;
};

export default function DangerSignQuestionScreen({
  question,
  dangerKey,
  onBack,
  onNext,
}: DangerSignQuestionScreenProps) {
  const storedValue = useAssessmentStore(
    (state) => state.assessment.dangerSigns[dangerKey],
  );
  const setDangerSign = useAssessmentStore((state) => state.setDangerSign);
  const [selectedValue, setSelectedValue] = useState<YesNo | null>(storedValue);

  useEffect(() => {
    setSelectedValue(storedValue);
  }, [storedValue]);

  const handleSelect = (value: YesNo) => {
    setSelectedValue(value);
    setDangerSign(dangerKey, value);
    onNext();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AssessmentHeader title="Danger Signs Assessment" onBack={onBack} />

        <View style={styles.tealDivider} />

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.questionText}>{question}</Text>

            <View style={styles.optionsRow}>
              <Pressable
                style={[
                  styles.answerButton,
                  selectedValue === "yes" && styles.answerButtonSelected,
                ]}
                onPress={() => handleSelect("yes")}
              >
                <Text
                  style={[
                    styles.answerButtonText,
                    selectedValue === "yes" && styles.answerButtonTextSelected,
                  ]}
                >
                  Yes
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.answerButton,
                  selectedValue === "no" && styles.answerButtonSelected,
                ]}
                onPress={() => handleSelect("no")}
              >
                <Text
                  style={[
                    styles.answerButtonText,
                    selectedValue === "no" && styles.answerButtonTextSelected,
                  ]}
                >
                  No
                </Text>
              </Pressable>
            </View>
          </View>
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
    backgroundColor: colors.primary.teal,
  },
  tealDivider: {
    height: 14,
    backgroundColor: colors.primary.teal,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 92,
  },
  card: {
    backgroundColor: colors.background.card,
    minHeight: 560,
    paddingHorizontal: 34,
    paddingTop: 140,
    paddingBottom: 40,
    alignItems: "center",
  },
  questionText: {
    color: colors.text.primary,
    fontSize: 24,
    lineHeight: 38,
    textAlign: "center",
    fontWeight: "400",
  },
  optionsRow: {
    flexDirection: "row",
    gap: 34,
    marginTop: 74,
  },
  answerButton: {
    minWidth: 110,
    height: 64,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#B8B8B8",
    backgroundColor: colors.background.card,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  answerButtonSelected: {
    borderColor: colors.primary.navy,
    backgroundColor: "#F0F5F7",
  },
  answerButtonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: "700",
  },
  answerButtonTextSelected: {
    color: colors.primary.navy,
  },
});
