import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Theme from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function Filter(props) {
  const { onPress, title = 'Filter Title', variant = 'active' } = props;

  // Styles for each variant
  const buttonStyles = {
    active: styles.buttonActive,
    inactive: styles.buttonInactive,
  };

  const textStyles = {
    active: styles.textActive,
    inactive: styles.textInactive,
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 24,
    borderWidth: 0.7,
  },
  text: {
    fontSize: 12,
    letterSpacing: 0.25,
  },
  container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  buttonActive: {
    backgroundColor: colors.PrimaryBlue,
    borderColor: colors.PrimaryBlue,
  },
  buttonInactive: {
    backgroundColor: "rgba(42, 75, 135, 0.2)",
    borderColor: colors.PrimaryBlue,
  },
  textActive: {
    color: colors.White,
  },
  textInactive: {
    color: colors.PrimaryBlue,
  },
});
