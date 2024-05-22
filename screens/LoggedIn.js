import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image } from 'react-native';
import MyButton from '../components/MyButton';

export default function LoggedIn({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text> Log in success!!! yeayyyyy!!! </Text>
      <Text> This should be the pages of things inside the app. </Text>
      <MyButton title="redo" onPress={() => navigation.navigate("Welcome")} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 30,
  }
})