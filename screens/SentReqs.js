import {useState, useContext, useEffect} from 'react';
import { Text, SafeAreaView, StyleSheet, View, ScrollView, FlatList} from 'react-native';
import { useTranslation } from "react-i18next";

import Filter from "../components/Filter";
import RequestItem from '../components/RequestItem';

import { Typeface, Theme } from '../utils/Theme';
const { colors } = Theme;

import { AuthContext } from '../context/AuthContext';

export default function SentReqs({ navigation }) {
    const { t } = useTranslation();

    // Change receivedReqs to incoming requests for this user
    const [sentReqsData, setSentReqsData] = useState()
    const context = useContext(AuthContext)

    const getSentBooksAPI = (token) => {
        fetch("https://cs350-bookswap-backend-production.up.railway.app/book_request/sent/", {
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
            console.log(data)
        });
      }

      useEffect(()=>{
        getSentBooksAPI(context.token)
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
                    <Filter title={t('screen.requestPage.received')} variant="inactive" onPress={() => handleClick("Received")}/>
                    <Filter title={t('screen.requestPage.sent')} variant="active" onPress={() => handleClick("Sent")}/>
                    <Filter title={t('screen.requestPage.matched')} variant="inactive" onPress={() => handleClick("Matched")}/>
                </View>

                <FlatList
                    data={sentReqsData}
                    renderItem={({ item }) => <RequestItem {...item} status="sent" navigation={navigation}/>}
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