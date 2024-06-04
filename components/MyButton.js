import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Theme from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function MyButton(props) {
  const { onPress, isActive=true, title = 'Button Title', variant = 'light' } = props;

  // Styles for each variant
  const buttonStyles = {
    light: styles.buttonLight,
    dark: styles.buttonDark,
    dark2: styles.buttonDark2,
    grey: styles.buttonGrey
  };

  const textStyles = {
    light: styles.textWhite,
    dark: styles.textBlue,
    dark2: styles.textWhite,
    grey: styles.textGrey
  }

  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, buttonStyles[variant]]} onPress={isActive ? onPress : null}>
        <Text style={[styles.text, textStyles[variant]]}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    borderWidth: 1.5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
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
  buttonGrey:{
    backgroundColor: colors.Grey,
    borderColor: colors.White,
  },
  textWhite: {
    color: colors.White,
  },
  textGrey: {
    color: colors.White,
  },
  textBlue: {
    color: colors.PrimaryBlue,
  },
});
