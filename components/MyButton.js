import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Theme from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function MyButton(props) {
  const { onPress, title = 'Button Title' } = props;
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
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
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.PrimaryBlue,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: colors.White,
  },
  container: {
    flexDirection: "row",
    alignSelf: "center",
  }
});
