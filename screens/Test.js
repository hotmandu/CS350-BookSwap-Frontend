// Use this page for dummy page

import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image } from 'react-native';

import ConfirmRequestStack from '../routes/confirmRequestStack';

import Theme from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function Test() {
  return (
    // <View style={styles.container}>
    //   <SafeAreaView style={styles.topContainer}>
    <ConfirmRequestStack />
    //   </SafeAreaView>
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.White,
    flex: 1,
  },
  topContainer: {
    // marginHorizontal: 32,
    flex: 1,
    gap: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
})