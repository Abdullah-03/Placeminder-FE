import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownContainer: {
    paddingHorizontal: 16,
    display: "flex",
  },
  taskContainer: {
    marginHorizontal: "5%",
    gap: 10,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.grey,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    flexGrow: 1,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default styles;
