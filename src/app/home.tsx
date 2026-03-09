import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StartAssessmentButton from "../components/StartAssessmentButton";
import { colors } from "../theme/theme";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.brandText}>Barakat Nutrition</Text>

        <Pressable style={styles.menuButton} accessibilityRole="button">
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={styles.welcome}>Welcome, Guest!</Text>

        <View style={styles.buttonWrap}>
          <StartAssessmentButton
            onPress={() => router.push("/parent_child_information")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary.teal,
  },
  header: {
    height: 104,
    backgroundColor: colors.brand.white,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandText: {
    color: colors.primary.navy,
    fontSize: 40 / 2,
    fontWeight: "700",
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    color: colors.text.primary,
    fontSize: 30,
    lineHeight: 30,
  },
  body: {
    flex: 1,
    paddingHorizontal: 44 / 2,
    paddingTop: 82 / 2,
  },
  welcome: {
    color: colors.brand.black,
    fontSize: 68 / 2,
    fontWeight: "500",
    marginBottom: 68 / 2,
  },
  buttonWrap: {
    width: "100%",
  },
});
