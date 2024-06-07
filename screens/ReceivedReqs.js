import {useContext, useEffect, useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, ScrollView, FlatList} from 'react-native';
import { useTranslation } from "react-i18next";

import Filter from "../components/Filter";
import RequestItem from '../components/RequestItem';

import { Typeface, Theme } from '../utils/Theme';
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
const { colors } = Theme;

export default function ReceivedReqs({ navigation }) {
    const { t } = useTranslation();

    // Change receivedReqs to incoming requests for this user
    const [sentReqsData, setSentReqsData] = useState()
    const context = useContext(AuthContext)

    const getReceivedBooksAPI = (token) => {
        fetch("https://cs350-bookswap-backend-production.up.railway.app/book_request/received/", {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`,
          },
        }).then((res) => {
            if (res.status != 200) {
              navigation.navigate("Error");
            } else {
              return res.json();
            }
          }).then((data) => {
            setSentReqsData(data)
        });
      }

      useEffect(()=>{
        getReceivedBooksAPI(context.token)
      },[])
  
    const handleClick = (title) => {
        navigation.navigate(title);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                { /* Title */ }
                <View style={styles.pageTitleContainer}>
                    <Text style={styles.pageHeader}>
                      {t('screen.requestPage.title')}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Filter title={t('screen.requestPage.received')} variant="active" onPress={() => handleClick("Received")}/>
                    <Filter title={t('screen.requestPage.sent')} variant="inactive" onPress={() => handleClick("Sent")}/>
                    <Filter title={t('screen.requestPage.matched')} variant="inactive" onPress={() => handleClick("Matched")}/>
                </View>

                <FlatList
                    data={sentReqsData}
                    renderItem={({ item }) => <RequestItem key={item.id} requester={item.requester} id={item.id} image={item.image} bookTitle={item.title} bookAuthor={item.author} owner={item.current_owner} status="received" navigation={navigation}/>}
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