import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from "react-native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, disabled, ...rest }) => {
  return (
    <TouchableOpacity
      style={[styles.container, !disabled ? styles.enabled : styles.disabled]}
      activeOpacity={0.7}
      disabled={disabled}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  enabled: {
    backgroundColor: colors.green,
  },
  disabled: {
    backgroundColor: "rgba(50, 183, 104, 0.5)",
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
});

export default Button;
