import * as HapticFeedback from "expo-haptics";

type Style = "Light" | "Medium" | "Heavy";
export function hapticFeedback(type: Style = "Light") {
  const style = HapticFeedback.ImpactFeedbackStyle[type];
  HapticFeedback.impactAsync(style);
}
