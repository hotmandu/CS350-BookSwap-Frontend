import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image } from 'react-native';

import MyButton from '../components/MyButton';

import Theme from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function Landing({ navigation }) {
  const [isLogIn, setLogIn] = useState('');
  const [isSignUp, setSignUp] = useState('');

  const pressHandler = () => {
    navigation.push('LogIn');
  }
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topContainer}>

        <Image 
          source={require("../assets/icon.png")}
          style={styles.image}
        />
        {/* Title */}
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.welcomeTo]}>Welcome to</Text>
          <Text style={[styles.text, styles.bookswap]}>BookSwap</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <MyButton 
            title="Log In"
            variant="dark2"
            onPress={() => navigation.navigate("LogIn")}
          />
          <MyButton 
            title="Sign Up" 
            variant="dark" 
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PrimaryBlue,
    flex: 1,
  },
  topContainer: {
    marginHorizontal: 32,
    flex: 1,
    gap: 50,
    flexDirection: "column",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: colors.PrimaryBlue,
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  text: {
    fontFamily: "Geist",
    color: colors.White
  },
  welcomeTo: {
    fontSize: 24,
  },
  bookswap: {
    fontSize: 48,
    fontWeight: "700",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 350,
    alignSelf: "center",
    marginVertical: -50,
  }
})