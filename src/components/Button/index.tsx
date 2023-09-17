import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "@context/ThemeContext";
import { useContext } from "react";
import Styles from "@styles/globalStyles";

interface ButtonProps {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
}

const Button = ({ onPress, title, isBlue, isGray }: ButtonProps) => {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={
        isBlue
          ? Styles.btnBlue
          : isGray
          ? Styles.btnGray
          : theme === "light"
          ? Styles.btnLight
          : Styles.btnDark
      }
      onPress={onPress}
    >
      <Text
        style={
          isBlue
            ? Styles.smallTextLight
            : isGray && theme === "light"
            ? Styles.smallTextDark
            : theme === "light"
            ? Styles.smallTextDark
            : Styles.smallTextLight
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
