import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Switch, Text, View } from "react-native";
import { ThemeContext } from "@context/ThemeContext";
import { COLORS } from "constants/theme";
import MyKeyboard from "@comp/MyKeyboard";

export default function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme === "dark" ? "#000" : COLORS.light },
        ]}
      >
        <Switch
          value={theme === "light"}
          onValueChange={() =>
            setTheme((prevValue) => (prevValue === "light" ? "dark" : "light"))
          }
        />
      <MyKeyboard />
      </SafeAreaView>
      <StatusBar style="auto" />
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingTop: 20
    // justifyContent: "center",
  },
});
