import { Text, SafeAreaView, StyleSheet, View, Image } from 'react-native';

import MyButton from '../components/MyButton';

import { Theme, Typeface } from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function NetworkError({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topContainer}>
        <Image 
          source={require("../assets/error.png")}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.pageTitle]}>No Internet Connection.</Text>
          <Text style={[styles.text, styles.body]}>Please check your internet connection and try again.</Text>
        </View>

        <View style={styles.buttonContainer}>
          <MyButton title="Retry"/>
        </View>

      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.White,
    flex: 1,
  },
  topContainer: {
    marginHorizontal: 32,
    flex: 1,
    gap: 25,
    flexDirection: "column",
    justifyContent: "center",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontFamily: Typeface.font,
    color: Typeface.color,
    textAlign: "center",
    width: "100%",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.PrimaryBlue,
  },
  body: {
    fontSize: 20,
    fontWeight: "300",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 350,
    marginVertical: -50,
  }
})