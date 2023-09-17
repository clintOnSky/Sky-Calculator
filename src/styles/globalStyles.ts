import { COLORS } from "constants/theme";
import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  btnBlue: {
    padding: 35,
    borderRadius: 24,
    backgroundColor: COLORS.blue,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnDark: {
    padding: 35,
    borderRadius: 24,
    backgroundColor: COLORS.dark1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnLight: {
    padding: 35,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnGray: {
    padding: 35,
    borderRadius: 24,
    backgroundColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  smallTextLight: {
    position: "absolute",
    alignItems: "center",
    fontSize: 30,
    color: COLORS.white,
  },
  smallTextDark: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    color: COLORS.dark2,
  },
  row: {
    maxWidth: "100%",
    flexDirection: "row",
    
    justifyContent: "center"
  },
  view: {
    position: "absolute",
    width: "100%",
    bottom: 50,
  },
  screenFirstNum: {
    fontSize: 90,
    color: COLORS.gray,
    fontWeight: "200",
    paddingHorizontal: 20,
    alignSelf: "flex-end",
  },
  screenSecondNum: {
    fontSize: 40,
    color: COLORS.gray2,
    fontWeight: "200",
    paddingHorizontal: 20,
    alignSelf: "flex-end",
  },
});

export default Styles;
