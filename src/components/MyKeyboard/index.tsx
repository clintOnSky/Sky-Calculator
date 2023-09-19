import { View, Text } from "react-native";
import Button from "../Button";
import React, { useContext, useState, useCallback, useRef, useEffect } from "react";
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
  
  useEffect(() => {
    const updateInput = () => {
      console.log(result)
      result && setInput(result.toString())
    }
    updateInput();
  }, [result])

  const handleNumberPress = useCallback((value: string) => {
    // If percentage is in input, dont add more numbers

    if (input.length < 10) {
      if (value === "%") {
        if (input.includes("%")) return;
        handlePercentage();
      } else if (value === ".") {
        if (input.includes(".")) return;
        handleDotPress();
      } else {
        setInput((previousValue) => previousValue + value);
      }
      setOperatorActive(false);
    }
  }, [input[input.length - 1]]);

  const handleOperatorPress = useCallback(
    (value: string) => {
      if (operatorActive) return;

      const currentOprArr = [...operatorArr.current, value];
      operatorArr.current = currentOprArr;

      // if input contains a percentage sign, return the original array, else add the input to the original array
      handleNumberArray()

      console.log("Number array", numberArr.current);
      console.log(
        "🚀 ~ file: index.tsx:42 ~ MyKeyboard ~ operatorArr.current:",
        operatorArr.current
      );

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

  const handleNumberArray = () => {
    // Adds number input to array and calculates the percentage value if "%" is included in array
    const formattedInput: number = input.includes("%")
      ? parseFloat(input) * (1 / 100)
      : parseFloat(input);
    const currentNumArr = [...numberArr.current, formattedInput];
    numberArr.current = currentNumArr;
    console.log("Stored new input in number array")
  };

  const handlePercentage = () => {
    if (input !== "") {
      setInput((prevInput) => prevInput + "%");
    }
  };

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
    if (input !== "") {
      handleNumberArray()
    } 

    setResult(calculateResult())
  };

  const calculateResult = (): number => {
    const currentNumArr: number[] = numberArr.current;
  
    if (operatorArr.current.length === 0) {
      return currentNumArr[0];
    }
    return currentNumArr.reduce((accumulator, number, index) => {
      if (index === 0) {
        return number; // Initialize the accumulator with the first number
      }
  
      const operator = operatorArr.current[index - 1];
  
      switch (operator) {
        case "*":
          return accumulator * number;
        case "÷":
          return accumulator / number;
        case "+":
          return accumulator + number;
        case "-":
          return accumulator - number;
        default:
          return accumulator;
      }
    });
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
        <Button title="C" onPress={() => clearAll()} isGray />
        <Button
          title="+/-"
          onPress={() =>
            setInput((previousInput) =>
              previousInput[0] === "-"
                ? previousInput.slice(1)
                : "-" + previousInput
            )
          }
          isGray
        />
        <Button title="%" onPress={() => handleNumberPress("%")} isGray />
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
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="⌫" onPress={() => handleDelete()} />
        <Button title="=" onPress={() => getResult()} isBlue />
      </View>
    </View>
  );
};

export default MyKeyboard;
