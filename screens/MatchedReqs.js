import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, ScrollView, FlatList} from 'react-native';

import Filter from "../components/Filter";
import RequestItem from '../components/RequestItem';

import { Typeface, Theme } from '../utils/Theme';
const { colors } = Theme;

export default function MatchedReqs({ navigation }) {
    // Change receivedReqs to incoming requests for this user
    const matchedReqsData = [
        {
            "bookTitle": "Detective Conan: Case Closed",
            "bookAuthor": "Gosho Aoyama",
            "owner": "Conan"
        },
        {
            "bookTitle": "The Hunger Games",
            "bookAuthor": "Suzanne Collins",
            "owner": "Katniss Everdeen"
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
                    <Filter title="Sent" variant="inactive" onPress={() => handleClick("Sent")}/>
                    <Filter title="Matched" variant="active" onPress={() => handleClick("Matched")}/>
                </View>

                <FlatList
                    data={matchedReqsData}
                    renderItem={({ item }) => <RequestItem {...item} status="matched"/>}
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