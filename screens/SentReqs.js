import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, ScrollView, FlatList} from 'react-native';

import Filter from "../components/Filter";
import RequestItem from '../components/RequestItem';

import { Typeface, Theme } from '../utils/Theme';
const { colors } = Theme;

export default function SentReqs({ navigation }) {
    // Change receivedReqs to incoming requests for this user
    const sentReqsData = [
        {
            "bookTitle": "The Catcher in the Rye",
            "bookAuthor": "J.D. Salinger",
            "owner": "Hank Lewis"
        },
        {
            "bookTitle": "Pride and Prejudice",
            "bookAuthor": "Jane Austen",
            "owner": "David Evans"
        },
        {
            "bookTitle": "Moby Dick",
            "bookAuthor": "Herman Melville",
            "owner": "Frank Thompson"
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
                    <Filter title="Received" variant="inactive" onPress={() => handleClick("Received")}/>
                    <Filter title="Sent" variant="active" onPress={() => handleClick("Sent")}/>
                    <Filter title="Matched" variant="inactive" onPress={() => handleClick("Matched")}/>
                </View>

                <FlatList
                    data={sentReqsData}
                    renderItem={({ item }) => <RequestItem {...item} status="unmatched"/>}
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