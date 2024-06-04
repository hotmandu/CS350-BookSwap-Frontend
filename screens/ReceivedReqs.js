import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, ScrollView, FlatList} from 'react-native';

import Filter from "../components/Filter";
import RequestItem from '../components/RequestItem';

import { Typeface, Theme } from '../utils/Theme';
const { colors } = Theme;

export default function ReceivedReqs({ navigation }) {
    // Change receivedReqs to incoming requests for this user
    const sentReqsData = [
        {
            "bookTitle": "One Piece, Volume 1: Romance Dawn",
            "bookAuthor": "Eiichiro Oda",
            "owner": "John Doe"
        },
        {
            "bookTitle": "Harry Potter and the Sorcerer's Stone",
            "bookAuthor": "J.K. Rowling",
            "owner": "Jane Smith"
        },
        {
            "bookTitle": "The Hobbit",
            "bookAuthor": "J.R.R. Tolkien",
            "owner": "Alice Johnson"
        },
        {
            "bookTitle": "To Kill a Mockingbird",
            "bookAuthor": "Harper Lee",
            "owner": "Bob Brown"
        },
        {
            "bookTitle": "1984",
            "bookAuthor": "George Orwell",
            "owner": "Charlie Davis"
        }
    ];
    
    const handleClick = (title) => {
        navigation.navigate(title);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                { /* Title */ }
                <View style={styles.pageTitleContainer}>
                    <Text style={styles.pageHeader}>
                        Requests
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Filter title="Received" variant="active" onPress={() => handleClick("Received")}/>
                    <Filter title="Sent" variant="inactive" onPress={() => handleClick("Sent")}/>
                    <Filter title="Matched" variant="inactive" onPress={() => handleClick("Matched")}/>
                </View>

                <FlatList
                    data={sentReqsData}
                    renderItem={({ item }) => <RequestItem {...item} status="received" navigation={navigation}/>}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.itemContainer}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        marginHorizontal: 32,
        // backgroundColor: colors.AccentPink,
      },
      container: {
        flex: 1,
        backgroundColor: colors.White,
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "left",
        gap: 10,
        marginBottom: 15,
      },
      pageHeader: {
        fontSize: 32,
        fontWeight: "700",
        marginVertical: 15,
        color: colors.PrimaryBlue,
      },
      itemContainer: {
        marginVertical: 15,
        flexDirection: "column",
        rowGap: 15,
        paddingBottom: 50,
      }
})