import { router } from "expo-router";
import InstructionComponentScreen from "../components/InstructionComponentScreen";

export default function MuacInstructions() {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/parent_child_information");
  };

  return (
    <InstructionComponentScreen
      title="MUAC Photo Assessment"
      imageSource={require("../../assets/muac_measurement.png")}
      imageAspectRatio={398 / 509}
      onBack={handleBack}
      onOpenCamera={() => router.push("/muac_camera")}
    />
  );
}
