import { StyleSheet } from "react-native";

const boundaryStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
});

const fallbackStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export { boundaryStyles, fallbackStyles };
