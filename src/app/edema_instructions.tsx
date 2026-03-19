import { router } from "expo-router";
import InstructionComponentScreen from "../components/InstructionComponentScreen";

export default function MuacInstructions() {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/muac_review");
  };

  return (
    <InstructionComponentScreen
      title="Edema Assessment"
      imageSource={require("../../assets/edema_measurement.png")}
      imageAspectRatio={425 / 509}
      onBack={handleBack}
      onOpenCamera={() => router.push("/edema_camera")}
    />
  );
}
