import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack, usePathname } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { colors } from "../theme/theme";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const showBottomNav =
    pathname === "/home" || pathname === "/PlaceHolderScreen";

  const isHome = pathname === "/home";
  const isSaveContinue = pathname === "/PlaceHolderScreen";

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <View
        style={[
          styles.stackContainer,
          showBottomNav && { paddingBottom: 72 + insets.bottom },
        ]}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {showBottomNav ? (
        <View
          style={[
            styles.bottomNav,
            {
              height: 72 + insets.bottom,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <Pressable
            style={styles.tabButton}
            accessibilityRole="button"
            onPress={() => router.replace("/home")}
          >
            <MaterialCommunityIcons
              name="home-outline"
              size={24}
              color={isHome ? colors.primary.navy : "#7A8791"}
            />
            <Text style={[styles.tabLabel, isHome && styles.activeTabLabel]}>
              Home
            </Text>
          </Pressable>

          <Pressable
            style={styles.tabButton}
            accessibilityRole="button"
            onPress={() => router.replace("/PlaceHolderScreen")}
          >
            <MaterialCommunityIcons
              name="content-save-outline"
              size={24}
              color={isSaveContinue ? colors.primary.navy : "#7A8791"}
            />
            <Text
              style={[styles.tabLabel, isSaveContinue && styles.activeTabLabel]}
            >
              Save & Continue
            </Text>
          </Pressable>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  stackContainer: {
    flex: 1,
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    backgroundColor: colors.background.main,
    borderTopWidth: 1,
    borderTopColor: "#D7DDE2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 13,
    color: "#7A8791",
    fontWeight: "500",
  },
  activeTabLabel: {
    color: colors.primary.navy,
    fontWeight: "700",
  },
});
