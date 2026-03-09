import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type InstructionImageProps = {
  source: ImageSourcePropType;
  aspectRatio?: number;
  maxWidth?: number;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

export default function InstructionImage({
  source,
  aspectRatio = 398 / 509,
  maxWidth = 500,
  containerStyle,
  imageStyle,
}: InstructionImageProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={source}
        style={[
          styles.image,
          {
            aspectRatio,
            maxWidth,
          },
          imageStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  image: {
    width: "100%",
    maxHeight: "100%",
    resizeMode: "contain",
  },
});
