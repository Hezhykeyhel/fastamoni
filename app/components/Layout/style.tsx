import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tabBarStyle: {
    alignItems: "center",
    display: "flex",
    elevation: 12,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      height: 4,
      width: -2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tabText: {
    fontSize: 10,
    marginTop: 5,
  },
  tabView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
