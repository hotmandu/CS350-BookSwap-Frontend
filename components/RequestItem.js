import { useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";

import MyButton from "../components/MyButton";
import Filter from "../components/Filter";

import { Typeface, Theme } from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function RequestItem(props) {

    const { bookTitle, bookAuthor, owner, status, navigation} = props;
    
    //Should be changed according to how to fetch the last chat
    if (status == "matched") {
        lastText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor purus sit amet tortor imperdiet, ut tristique neque ornare. Maecenas bibendum ex ac neque ullamcorper, a tincidunt eros aliquet."
    }

    const handleClick = () => {
        const data = {
            bookTitle: bookTitle,
            bookAuthor: bookAuthor,
            owner: owner,
            status: status,
        };
        console.log(data);
        
        if (status === "sent") {
            navigation.navigate("Sent Request", data);
        } else if (status == "received") {
            navigation.navigate("Received Request", data);
        }
    }

    return (
        <Pressable style={styles.container} onPress={handleClick}>
            <View>
                <Image source={require("../assets/no-book.png")} style={[styles.bookCover]}/>
            </View>
            <View style={styles.infoContainer} >
                <View style={styles.bookInfo}>
                    <Text style={[styles.text, styles.bookTitle]} numberOfLines={1}>{ bookTitle }</Text>
                    <Text style={[styles.text, styles.bookTitle]}>·</Text>
                    <Text style={[styles.text, styles.bookAuthor]} numberOfLines={1}>{ bookAuthor }</Text>
                </View>
                <Text style={[styles.text, styles.owner]}>{ owner }</Text>
                {
                    status === "matched" && (
                        <Text style={[styles.text, styles.chat]} numberOfLines={1}>{ lastText }</Text>
                    )
                }


            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        marginLeft: -15,
    },
    bookCover: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    text: {
        fontFamily: Typeface.font,
    },
    infoContainer: {
        paddingVertical: 5,
        flexDirection: "column",
        rowGap: 3,
        flex: 1,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: "700",
        textTransform: "capitalize",
        color: colors.PrimaryBlue,
        overflow: "hidden",
        maxWidth: "60%",
    },
    bookAuthor: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.PrimaryBlue,
        textAlign: "left",
        overflow: "hidden",
    },
    owner: {
        color: colors.Black,
        fontSize: 12,
        fontWeight: "300",
        textAlign: "left",
        overflow: "hidden",
        width: "90%",
    },
    bookInfo: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center"
    },
    chat: {
        textAlign: "left",
        color: colors.Black,
        fontSize: 14,
        marginTop: 5,
        fontWeight: "300",
    }
})