import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Theme from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function MyButton(props) {
  const { onPress, title = 'Button Title', variant = 'light' } = props;

  // Styles for each variant
  const buttonStyles = {
    light: styles.buttonLight,
    dark: styles.buttonDark,
    dark2: styles.buttonDark2,
  };

  const textStyles = {
    light: styles.textWhite,
    dark: styles.textBlue,
    dark2: styles.textWhite,
  }

  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, buttonStyles[variant]]} onPress={onPress}>
        <Text style={[styles.text, textStyles[variant]]}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    borderWidth: 1.5,
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  buttonLight: {
    backgroundColor: colors.PrimaryBlue,
    borderColor: colors.PrimaryBlue,
  },
  buttonDark: {
    backgroundColor: colors.White,
    borderColor: colors.White,
  },
  buttonDark2: {
    backgroundColor: colors.PrimaryBlue,
    borderColor: colors.White,
  },
  textWhite: {
    color: colors.White,
  },
  textBlue: {
    color: colors.PrimaryBlue,
  },
});
