import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#bfbbb8",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
  },
});

export default styles;
