import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
    minWidth: "90%",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: 30,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  checkbox: {
    width: 25,
    height: 25,
  },
});

export default styles;
