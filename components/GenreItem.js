import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, Linking, TouchableOpacity, Image } from 'react-native';

import {Theme, Typeface} from "../utils/Theme";

// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function GenreItem(props) {
    const { genres=["Title1", "Title2", "Title3"] } = props;


    let displayedGenres = genres;
    if (genres.length > 4) {
        displayedGenres = genres.slice(0, 4);
    } 

    return (
        <View style={styles.container}>
            {displayedGenres.map((genre, index) => (
                <View style={styles.itemContainer}>
                    <Text key={index} style={styles.itemText}>{genre}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "center",
        marginHorizontal: 32,
    },
    itemContainer: {
        borderRadius: 24,
        backgroundColor: "rgba(255, 152, 152, 0.2)",
        borderStyle: "solid",
        borderColor: "#ff9898",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    itemText: {
        fontFamily: Typeface.font,
        fontSize: 12,
        textTransform: "capitalize",
        textAlign: "center",
    }
})