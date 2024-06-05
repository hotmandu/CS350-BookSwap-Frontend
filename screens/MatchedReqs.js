import {useState, useEffect, useContext} from 'react';
import { Text, SafeAreaView, StyleSheet, View, ScrollView, FlatList} from 'react-native';

import Filter from "../components/Filter";
import RequestItem from '../components/RequestItem';

import { Typeface, Theme } from '../utils/Theme';
import { useTranslation } from 'react-i18next';
const { colors } = Theme;

import { AuthContext } from '../context/AuthContext';

export default function MatchedReqs({ navigation }) {
    // Change receivedReqs to incoming requests for this user
    const [matchedReqsData, setMatchedReqsData] = useState()
    const context = useContext(AuthContext)

    const { t } = useTranslation();

    const getReceivedBooksAPI = (token) => {
        fetch("https://cs350-bookswap-backend-production.up.railway.app/book_request/ongoing/", {
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
            setMatchedReqsData(data)
            console.log(data)
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
                        {t('screen.matchedReqs.requests')}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Filter title={t('screen.matchedReqs.received')} variant="inactive" onPress={() => handleClick("Received")}/>
                    <Filter title={t('screen.matchedReqs.sent')} variant="inactive" onPress={() => handleClick("Sent")}/>
                    <Filter title={t('screen.matchedReqs.matched')} variant="active" onPress={() => handleClick("Matched")}/>
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