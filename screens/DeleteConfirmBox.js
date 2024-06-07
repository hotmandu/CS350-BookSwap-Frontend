import {useCallback, useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Alert, TextInput, Linking, TouchableOpacity, Image, Modal } from 'react-native';

import {Theme, Typeface} from "../utils/Theme";
import MyButton from '../components/MyButton';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function DeleteConfirmBox(props) {
    const { t } = useTranslation();
    const { confirmMsg="Confirm action?", primaryButton="Confirm", secondaryButton="Cancel", toggleModal, nextPage } = props;
    // const navigation = useNavigation();

    const handlePrimaryPress = () => {
        nextPage()
        toggleModal()
    }

    return (
        <View style={styles.container}>
            {/* Image */}
            <Image 
            source={require("../assets/search.png")}
            style={styles.image}
            />

            {/* message */}
            <Text style={styles.confirmationText}>{ confirmMsg }</Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <MyButton title={secondaryButton} variant="dark2" onPress={() => toggleModal()}/>
                <MyButton title={primaryButton} variant="dark" onPress={handlePrimaryPress}/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PrimaryBlue,
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        height: "50%",
        borderRadius: 24,
        justifyContent: "center",
        alignSelf: 'center',
        gap: 10,
    },      
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
        // marginBottom: 10,
    },
    confirmationText: {
        fontFamily: Typeface.font,
        color: colors.White,
        fontSize: 20,
        fontWeight: "700",
        // backgroundColor: "yellow",
        textAlign: "center",
        width: "75%",
        lineHeight: 24,
        
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
        marginVertical: 15,
    }
})