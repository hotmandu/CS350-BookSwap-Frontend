import { Text, StyleSheet, View, Image } from 'react-native';

import Theme from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function PageHeader(props) {
  const { pageTitle } = props;
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {/*
        <Image
          source={require("../assets/ion_arrow-back.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.pageTitle}> Book Details </Text>
      </View>
      <View style={styles.iconContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer:{
    flex: 1,
    alignItems: "center",
  },
  icon:{
    height: "50%",
    width: "50%",
    backgroundColor: colors.AccentPink,
  },
  textContainer: {
    flex: 4,
  },
  pageTitle: {
    fontFamily: "Geist",
    flex: 1,
    textAlign: "center",
    color: colors.PrimaryBlue,
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: "700",
  }
});
