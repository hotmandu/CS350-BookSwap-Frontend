import {useState} from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { Theme, Typeface } from "../utils/Theme";
const { colors } = Theme;

export function TimeStamp(props){
    const { time="Today" } = props

    return (
        <View style={styles.row}>
            <Text style={styles.day}>{ time }</Text>
        </View>
    );
}

export function SelfPOV(props) {
    const { msg="hi ken" } = props
    
    return (
        <View style={[styles.textContainer, styles.selfContainer]}>
            <Text style={[styles.text, styles.selfText]}>{ msg }</Text>
        </View>
    );
}

export function OppPOV(props) {
    const { msg="hi barbie" } = props

    return (
        <View style={[styles.textContainer, styles.oppContainer]}>
            <Text style={[styles.text, styles.oppText]}>{ msg }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        alignItems: "center",
    },
    day: {
        fontFamily: Typeface.font,
        fontSize: 12,
        fontWeight: "600",
        color: "rgba(0, 0, 0, 0.3)",
    },
    text: {
        fontFamily: Typeface.font,
        fontSize: 12,
        color: colors.Black,
        lineHeight: 14,
    },
    selfText: {
        textAlign: "right",
        color: colors.White,
    },
    oppText: {
        textAlign: "left",
    },
    textContainer: {
        backgroundColor: colors.AccentPink,
        maxWidth: "75%",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    selfContainer: {
        alignSelf: "flex-end",
        backgroundColor: colors.PrimaryBlue,
        borderBottomRightRadius: 0,
    },
    oppContainer: {
        alignSelf: "flex-start",
        backgroundColor: colors.Grey,
        borderBottomLeftRadius: 0,
    }
})