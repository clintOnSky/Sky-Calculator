import { View, Text } from "react-native";
import Button from "../Button";
import React, { useContext, useState, useCallback, useRef } from "react";
import Styles from "@/styles/globalStyles";
import { ThemeContext } from "@/context/ThemeContext";
import { COLORS } from "constants/theme";

const MyKeyboard = () => {
  // User input
  const [input, setInput] = useState<string>("");

  // Top Text
  const [topText, setTopText] = useState<string>("");
  const [showCalc, setShowCalc] = useState<boolean>(false);

  const numberArr = useRef<number[]>([]);

  // For operator
  const operatorArr = useRef<string[]>([]);
  const [operatorActive, setOperatorActive] = useState<boolean>(false);

  const [result, setResult] = useState<number | null>(null);

  const theme = useContext(ThemeContext);

  const handleNumberPress = (value: string) => {
    // If percentage is in input, dont add more numbers
    if (input.includes("%")) return;
    
    console.log("Number array", numberArr.current)
    if (input.length < 10) {
      setInput((previousValue) => previousValue + value);
      setOperatorActive(false);
    }
  };

  const handleOperatorPress = useCallback(
    (value: string) => {
      if (operatorActive) return;

      const currentOprArr = [...operatorArr.current, value];
      operatorArr.current = currentOprArr;

      // if input contains a percentage sign, return the original array, else add the input to the original array
      const currentNumArr = input.includes("%") ? numberArr.current : [...numberArr.current, parseInt(input)];
      numberArr.current = currentNumArr;
      console.log("🚀 ~ file: index.tsx:42 ~ MyKeyboard ~ operatorArr.current:", operatorArr.current)

      // Replaces division sign with symbol Javascript uses for division

      // setNumberArr(prevArr => [...prevArr, ]);

      setOperatorActive(true);

      // if there is a minus sign at the beginning of the input the puts it in a bracket
      setTopText((previousCalc) =>
        input[0] === "-" && topText
          ? previousCalc + "(" + input + ")" + value
          : previousCalc + input + value
      );

      // If operator is pressed, show the input on the top screen and reset bottom screen
      setShowCalc(true);
      setInput("");
    },
    [input]
  );

  const handleDotPress = () => {
    if (input.includes(".")) return;

    if (input === "") {
      setInput("0" + ".");
    } else {
      setInput((previousInput) => previousInput + ".");
    }
  };

  const handlePercentage = () => {
    if (input !== "") {
      handleNumberPress("%");

      const formattedInput: number = parseFloat(input) * (1/100);
      const currentNumArr = [...numberArr.current, formattedInput];
      numberArr.current = currentNumArr;
    }
  }

  const clearAll = () => {
    setInput("");
    setTopText("");
    numberArr.current = [];
    operatorArr.current = [];
    setResult(null);
  };

  const handleDelete = () => {
    if (input.length !== 0) {
      setInput((previousInput) => previousInput.slice(0, -1));
    }
  };

  const getResult = () => {
  };

  return (
    <View style={Styles.view}>
      <Text style={[Styles.screenSecondNum]}>{showCalc ? topText : ""}</Text>
      <Text
        style={[
          Styles.screenFirstNum,
          { color: theme === "light" ? COLORS.dark3 : COLORS.white },
        ]}
      >
        {input === "" ? 0 : input}
      </Text>
      <View style={Styles.row}>
        <Button title="C" onPress={() => clearAll()} />
        <Button
          title="+/-"
          onPress={() =>
            setInput((previousInput) =>
              previousInput[0] === "-"
                ? previousInput.slice(1)
                : "-" + previousInput
            )
          }
        />
        <Button
          title="%"
          onPress={() => handlePercentage()}
        />
        <Button title="÷" onPress={() => handleOperatorPress("÷")} isBlue />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="×" onPress={() => handleOperatorPress("*")} isBlue />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" onPress={() => handleOperatorPress("-")} isBlue />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" onPress={() => handleOperatorPress("+")} isBlue />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleDotPress()} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="⌫" onPress={() => handleDelete()} />
        <Button title="=" onPress={() => getResult()} isBlue />
      </View>
    </View>
  );
};

export default MyKeyboard;
