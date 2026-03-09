import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextField from "../components/AppTextField";
import AssessmentHeader from "../components/AssessmentHeader";
import FormRow from "../components/FormRow";
import NextButton from "../components/NextButton";
import { useAssessmentStore } from "../state_management/AssessmentFunctions";
import { colors } from "../theme/theme";
import { validateAndBuildChildAssessment1 } from "../validation/childAssessment1Validation";

type GenderOption = "male" | "female" | null;

export default function ParentChildInformation() {
  const setChildAssessment1 = useAssessmentStore(
    (state) => state.setChildAssessment1,
  );
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);

  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<GenderOption>(null);
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/home");
  };

  const handleNext = () => {
    const result = validateAndBuildChildAssessment1({
      parentName,
      phone,
      address,
      whatsappOptIn,
      childName,
      age,
      weight,
      height,
      gender,
    });

    if (!result.ok) {
      Alert.alert("Please fix the form", result.message);
      return;
    }

    setChildAssessment1(result.value);
    router.push("/muac_instructions");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <View style={styles.container}>
          <AssessmentHeader title="Malnutrition Check-up" onBack={handleBack} />

          <View style={styles.tealDivider} />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Parent Information</Text>
            </View>
            <View style={styles.sectionBody}>
              <FormRow label="Name">
                <AppTextField
                  placeholder="name"
                  value={parentName}
                  onChangeText={setParentName}
                />
              </FormRow>

              <FormRow label="Phone">
                <AppTextField
                  placeholder="+93 20 000 0000"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </FormRow>

              <FormRow label="Address">
                <AppTextField
                  placeholder="Value"
                  value={address}
                  onChangeText={setAddress}
                />
              </FormRow>

              <FormRow label="WhatsApp opt-in">
                <View style={styles.optionRow}>
                  <Pressable
                    style={styles.option}
                    onPress={() => setWhatsappOptIn(true)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        whatsappOptIn && styles.checkboxChecked,
                      ]}
                    >
                      {whatsappOptIn ? (
                        <Text style={styles.checkmark}>✓</Text>
                      ) : null}
                    </View>
                    <Text style={styles.optionText}>Yes</Text>
                  </Pressable>

                  <Pressable
                    style={styles.option}
                    onPress={() => setWhatsappOptIn(false)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        !whatsappOptIn && styles.checkboxChecked,
                      ]}
                    >
                      {!whatsappOptIn ? (
                        <Text style={styles.checkmark}>✓</Text>
                      ) : null}
                    </View>
                    <Text style={styles.optionText}>No</Text>
                  </Pressable>
                </View>
              </FormRow>
            </View>

            <View style={styles.tealDivider} />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Child Information</Text>
            </View>

            <View style={styles.sectionBody}>
              <FormRow label="Name">
                <AppTextField
                  placeholder="Value"
                  value={childName}
                  onChangeText={setChildName}
                />
              </FormRow>

              <FormRow label="Age">
                <AppTextField
                  placeholder="Value"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="number-pad"
                />
              </FormRow>

              <FormRow label="Weight">
                <AppTextField
                  placeholder="kg"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="decimal-pad"
                />
              </FormRow>

              <FormRow label="Height">
                <AppTextField
                  placeholder="cm"
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="decimal-pad"
                />
              </FormRow>

              <FormRow label="Gender">
                <View style={styles.genderOptionRow}>
                  <Pressable
                    style={styles.option}
                    onPress={() => setGender("male")}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        gender === "male" && styles.checkboxChecked,
                      ]}
                    >
                      {gender === "male" ? (
                        <Text style={styles.checkmark}>✓</Text>
                      ) : null}
                    </View>
                    <Text style={styles.optionText}>Boy</Text>
                  </Pressable>

                  <Pressable
                    style={styles.option}
                    onPress={() => setGender("female")}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        gender === "female" && styles.checkboxChecked,
                      ]}
                    >
                      {gender === "female" ? (
                        <Text style={styles.checkmark}>✓</Text>
                      ) : null}
                    </View>
                    <Text style={styles.optionText}>Girl</Text>
                  </Pressable>
                </View>
              </FormRow>
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
  container: {
    flex: 1,
    backgroundColor: colors.background.muted,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  tealDivider: {
    height: 14,
    backgroundColor: colors.primary.teal,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 96,
  },
  sectionHeader: {
    height: 92,
    justifyContent: "center",
    backgroundColor: colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
    paddingHorizontal: 24,
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: 17,
    fontWeight: "700",
  },
  sectionBody: {
    backgroundColor: colors.background.muted,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 36,
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
  genderOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 36,
  },
  footer: {
    backgroundColor: colors.primary.teal,
    paddingHorizontal: 24,
    paddingVertical: 18,
    alignItems: "flex-end",
  },
});
