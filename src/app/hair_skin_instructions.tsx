import { router } from "expo-router";
import InstructionComponentScreen from "../components/InstructionComponentScreen";

export default function MuacInstructions() {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/edema_review");
  };

  return (
    <InstructionComponentScreen
      title="Hair & Skin Assessment"
      imageSource={require("../../assets/hair_skin_measurement.png")}
      imageAspectRatio={425 / 509}
      onBack={handleBack}
      onOpenCamera={() => router.push("/hair_skin_camera")}
    />
  );
}
