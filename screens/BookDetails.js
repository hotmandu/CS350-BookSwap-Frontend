import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, Linking, TouchableOpacity, Image } from 'react-native';

import {Theme, Typeface} from "../utils/Theme";
import GenreItem from '../components/GenreItem';
import MyButton from '../components/MyButton';

// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function BookDetails() {
    const DATA = {
        cover: "../assets/no-book.png",
        title: "Book Title",
        author: "Author",
        owner: "Owner",
        publisher: "Publisher Name",
        year: "Published Year",
        ISBN: "0123456789",
        genres: [
            "genre1",
            "genre2",
            "genre3",
            "genre4",
        ],
        review: "this will be the owner review"
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                {/* Book Cover */}
                <Image 
                    source={require('../assets/no-book.png')}
                    style={styles.image}
                />

                {/* Book Title, Author, and Owner */}
                <View style={styles.titleContainer}>
                    <Text style={[styles.text, styles.titleText]}>{DATA.title}</Text>
                    <Text style={[styles.text, styles.authorText]}>{DATA.author}</Text>
                </View>

                {/* Genres */}
                <View style={styles.genreContainer}>
                    <GenreItem genres={DATA.genres}/>
                </View>

                {/* Book Details */}
                <View style={styles.detailsContainer}>
                    <View style={styles.detailsItem}>
                        <Text style={[styles.text, styles.itemTitle]}>Publisher</Text>
                        <Text style={[styles.text, styles.itemContent]}>{DATA.publisher}</Text>
                    </View>
                    <View style={styles.detailsItem}>
                        <Text style={[styles.text, styles.itemTitle]}>Year</Text>
                        <Text style={[styles.text, styles.itemContent]}>{DATA.year}</Text>
                    </View>
                    <View style={styles.detailsItem}>
                        <Text style={[styles.text, styles.itemTitle]}>ISBN</Text>
                        <Text style={[styles.text, styles.itemContent]}>{DATA.ISBN}</Text>
                    </View>
                    <View style={styles.detailsItem}>
                        <Text style={[styles.text, styles.itemTitle]}>Owned By</Text>
                        <Text style={[styles.text, styles.itemContent]}>{DATA.owner}</Text>
                    </View>
                </View>

                <View style={{ width: '100%', height: 0.3, backgroundColor: colors.PrimaryBlue }} />

                {/* Owner's Review */}
                <View style={styles.synopsisContainer}>
                    <Text style={[styles.text, styles.sectionTitle]}>Owner's Synopsis</Text>
                    <Text style={styles.text}>{DATA.review}</Text>
                </View>

                {/* Footer */}
                <View style={styles.footerContainer}>
                    {/* <View style={{ width: '100%', height: 0.3, backgroundColor: colors.PrimaryBlue }} /> */}
                    <MyButton title="Send Request"/>
                </View>
            </SafeAreaView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        marginHorizontal: 32,
      },
      container: {
        flex: 1,
        backgroundColor: colors.White,
      },
      image: {
        alignSelf: "center",
      },
      text: {
        fontFamily: Typeface.font,
        color: colors.Black,
      },
      titleContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 20,
      },
      titleText: {
        color: colors.PrimaryBlue,
        fontWeight: "700",
        fontSize: 24,
      },
      authorText: {
        fontSize: 14,
        color: colors.PrimaryBlue,
      },
      detailsContainer: {
        flexDirection: "column",
        alignItems: "center",
        width: "75%",
        alignSelf: "center",
        gap: 5,
        marginVertical: 20,
      },
      detailsItem: {
        flexDirection: "row",
        gap: 10,
      },
      itemTitle: {
        flex: 2,
        textAlign: "right",
        fontWeight: "600",
        color: colors.PrimaryBlue,
        fontSize: 14,
      },
      itemContent: {
        flex: 3,
        fontSize: 14,
      },
      sectionTitle: {
        color: colors.PrimaryBlue,
        fontWeight: "700",
        fontSize: 18,
      },
      synopsisContainer: {
        marginTop: 20,
        gap: 5,
      },
      footerContainer: {
        position: "absolute",
        bottom: 0,
        flexDirection: "column",
        // backgroundColor: "yellow",
        flex: 1,
        width: "100%",
        marginBottom: 32,
        alignItems: "center",
        gap: 20,
      }
})