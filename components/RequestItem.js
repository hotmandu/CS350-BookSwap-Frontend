import { useContext, useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Linking,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";

import MyButton from "../components/MyButton";
import Filter from "../components/Filter";

import { Typeface, Theme } from "../utils/Theme";
import { AuthContext } from "../context/AuthContext";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function RequestItem(props) {

    const [ownerName, setOwnerName] = useState("Loading")
    const [email,setEmail] = useState("Loading")
    const context = useContext(AuthContext)

    const { id, image, requester, bookTitle, bookAuthor, owner, status, navigation} = props;
    //Should be changed according to how to fetch the last chat
    if (status == "matched") {
        lastText = email
    }

    const handleClick = () => {
        let data = {
            id: id,
            requester: requester,
            bookTitle: bookTitle,
            bookAuthor: bookAuthor,
            owner: ownerName,
            status: status,
            image: image
        };
        
        if (status === "sent") {
            navigation.navigate("RequestStack", {
                screen: "Sent Request",
                params: data,
            });
        } else if (status == "received") {
            data = {
                id: id,
                bookTitle: bookTitle,
                requester: requester,
                bookAuthor: bookAuthor,
                owner: ownerName,
                ownerID: owner,
                status: status,
                image: image
            };
            navigation.navigate("RequestStack", {
                screen: "Received Request",
                params: data,
              });
        }
    }

    const getUser = (user_id, token) =>{
        fetch(
          `https://cs350-bookswap-backend-production.up.railway.app/account_api/get_user/${user_id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            }
          }
        )
          .then((res) => {
            if (res.status != 200) {
              navigation.navigate("Error");
            } else {
              return res.json();
            }
          })
          .then((data) => {
            setOwnerName(`${data.first_name} ${data.last_name}`)
            setEmail(data.email)
          });
      }

      useEffect(()=>{
        getUser(owner, context.token)
      },[])
    

    return (
        <Pressable style={styles.container} onPress={handleClick}>
            <View>
                <Image source={{uri: `https://cs350-bookswap-backend-production.up.railway.app${image}`}} style={[styles.bookCover]}/>
            </View>
            <View style={styles.infoContainer} >
                <View style={styles.bookInfo}>
                    <Text style={[styles.text, styles.bookTitle]} numberOfLines={1}>{ bookTitle }</Text>
                    <Text style={[styles.text, styles.bookTitle]}>·</Text>
                    <Text style={[styles.text, styles.bookAuthor]} numberOfLines={1}>{ bookAuthor }</Text>
                </View>
                <Text style={[styles.text, styles.owner]}>{ ownerName }</Text>
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