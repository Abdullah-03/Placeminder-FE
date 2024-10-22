import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchBar: {
    position: "absolute",
    top: "10%",
    width: "94%",
    marginHorizontal: "3%",
  },
  radiusBar: {
    position: "absolute",
    bottom: "2%",
    width: "94%",
    marginHorizontal: "3%",
  },
  radiusBarBottomContainer: {
    paddingVertical: "3%",
    backgroundColor: Colors.blue,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
  },
  radiusBarTopContainer: {
    width: "60%",
    marginHorizontal: "auto",
    backgroundColor: Colors.blue,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "5%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  radiusBarIconContainer: {
    display: "flex",
    flexGrow: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  radiusBarTextContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
