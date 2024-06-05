import {useContext, useEffect, useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Typeface, Theme } from '../utils/Theme';
import { AuthContext } from '../context/AuthContext';
const { colors } = Theme;

export default function Profile({ navigation }) {
    const context = useContext(AuthContext)
    const [user, setUser] = useState({
        "first_name": "Loading",
        "last_name": "Loading",
        "user_email": "Loading",
      })

    const getUserAPI = (token) => {
        fetch("https://cs350-bookswap-backend-production.up.railway.app/account_api/user/", {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`,
          },
        }).then((res) => {
            context.setLoading(false);
            if (res.status != 200) {
              navigation.navigate("Error");
            } else {
              return res.json();
            }
          }).then((data) => {
            context.setUser(data)
            setUser(data)
        });
      }
      

    useEffect(()=>{
        if(context.user){
            setUser(context.user)
        }else{
            getUserAPI(context.token)
        }
    },[])

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                { /* Title */ }
                <View style={styles.pageTitleContainer}>
                    <Text style={styles.pageHeader}>
                        Profile
                    </Text>
                    <Ionicons name="person-circle" size={50} color={colors.PrimaryBlue} />
                </View>

                {/* Profile Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.text, styles.sectionHeaderText]}>Account Details</Text>
                        <Pressable onPress={() => navigation.navigate("AccountDetails")}>
                            <Text style={{fontFamily: Typeface.font, color: colors.PrimaryBlue, fontWeight: "500"}}>Edit</Text>
                        </Pressable>
                    </View>

                    <View style={{ width: '100%', height: 0.3, backgroundColor: colors.PrimaryBlue}} />

                    <ProfileItem title="First Name" value={user.first_name} />
                    <ProfileItem title="Last Name" value={user.last_name} />
                    <ProfileItem title="Email" value={user.user_email} />

                </View>

                {/* Account Settings Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.text, styles.sectionHeaderText]}>Account Settings</Text>
                    </View>

                    <View style={{ width: '100%', height: 0.3, backgroundColor: colors.PrimaryBlue}} />

                    <Pressable onPress={() => {
                        context.logout
                        navigation.navigate("Welcome")
                        }}>
                        <ProfileItem title="Logout" />
                    </Pressable>
                </View>

                {/* Application Settings Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.text, styles.sectionHeaderText]}>Application Settings</Text>
                    </View>

                    <View style={{ width: '100%', height: 0.3, backgroundColor: colors.PrimaryBlue}} />
                    <Pressable onPress={() => navigation.navigate("Language")}>
                        <ProfileItem title="Language" value="English" />
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}

const ProfileItem = ({title, value}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <Text style={[styles.text, styles.sectionItemTitle]}>
                {title}
            </Text>
            <Text style={[styles.text, styles.sectionItemText]}>
                {value}
            </Text>
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
    pageTitleContainer: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "space-between",
        marginBottom: 10,
        alignItems: "center",
    },
    pageHeader: {
        fontSize: 32,
        fontWeight: "700",
        marginVertical: 15,
        color: colors.PrimaryBlue,
      },
    sectionContainer: {
        flexDirection: "column",
        gap: 10,
        marginBottom: 20,
        // Shadow Configuration
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowRadius: 10,
        elevation: 10,
        shadowOpacity: 1,
        backgroundColor: colors.White,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline"
    },
    text: {
        fontFamily: Typeface.font,
    },
    sectionHeaderText: {
        fontWeight: "700",
        fontSize: 18,
        color: colors.PrimaryBlue,
    },
    sectionItemTitle: {
        fontSize: 16,
        color: colors.Black,
        fontWeight: "600",
    },
    sectionItemText: {
        fontSize: 16,
        color: "rgba(31, 30, 30, 0.8)",
        fontWeight: "300",
    }
});