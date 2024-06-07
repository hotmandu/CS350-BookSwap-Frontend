import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import MyButton from '../components/MyButton';

import Theme from "../utils/Theme";
import { useTranslation } from 'react-i18next';
// Import all colors defined in defaultColors.js
const { colors, Typeface } = Theme;

export default function ConfirmRequest({ navigation }) {
  const { t } = useTranslation();
    // TODO: Fetch book data from previous screen
    const book = {
        title: "Harry Potter and the Philosopher's Stone"
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>

                <Image 
                source={require("../assets/request-sent.png")}
                style={styles.image}
                />

                {/* Title */}
                <View style={styles.textContainer}>
                <Text style={[styles.text, styles.bookswap]}>{t('screen.confirmRequest.title')}</Text>
                <Text style={[styles.text, styles.welcomeTo]}>{t('screen.confirmRequest.msg', {title: book.title})}</Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                <MyButton 
                    title={t('screen.confirmRequest.back')}
                    variant="dark2"
                    onPress={() => navigation.navigate("TabPages", {screen: "Discover_page"})}
                />
                <MyButton 
                    title={t('screen.confirmRequest.checkReq')}
                    variant="dark" 
                    onPress={() => navigation.navigate("SentReqs", {screen: "SentReqs"})}
                />
                </View>
            </SafeAreaView>
        </View>
    );

    
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
      gap: 15,
    },
    text: {
      color: colors.White
    },
    welcomeTo: {
      fontSize: 16,
      textAlign: "center"
    },
    bookswap: {
      fontSize: 30,
      fontWeight: "black",
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 15,
      justifyContent: "center",
    },
    image: {
      width: 200,
      height: 200,
      alignSelf: "center",
      marginVertical: -50,
    }
  })