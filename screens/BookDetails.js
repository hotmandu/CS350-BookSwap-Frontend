import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  Image,
  Modal,
  FlatList,
} from "react-native";

import { Theme, Typeface } from "../utils/Theme";
import GenreItem from "../components/GenreItem";
import MyButton from "../components/MyButton";
import ConfirmBox from "./ConfirmBox";
import { AuthContext } from "../context/AuthContext";

// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function BookDetails({ navigation, route }) {
  const context = useContext(AuthContext)

  const DATA = {
    id: route.params.id,
    cover: route.params.image,
    title: route.params.name,
    author: route.params.author,
    owner: route.params.owner,
    publisher: route.params.publisher,
    year: route.params.year,
    ISBN: route.params.isbn,
    genres: [route.params.genre],
  };

  const TableData = ({ title, content }) => {
    return (
      <View style={styles.detailsItem}>
        <Text style={[styles.text, styles.itemTitle]}>{title}</Text>
        <Text style={[styles.text, styles.itemContent]}>{content}</Text>
      </View>
    );
  };

  // For Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [owner, setOwner] = useState(DATA.owner)

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
        console.log(data)
        setOwner(`${data.first_name} ${data.last_name}`)
      });
  }

  useEffect(()=>{
    getUser(DATA.owner,context.token)
  },[])

  return (
    <SafeAreaView style={styles.container}>
      {/* Book Cover */}
      <Image
        source={route.params.image ? { uri: route.params.image } : require("../assets/no-book.png")}
        style={styles.image}
      />

      {/* Book Title, Author, and Owner */}
      <View style={styles.titleContainer}>
        <Text style={[styles.text, styles.titleText]}>{DATA.title}</Text>
        <Text style={[styles.text, styles.authorText]}>{DATA.author}</Text>
      </View>

      {/* Genres */}
      <View style={styles.genreContainer}>
        <GenreItem genres={DATA.genres} />
      </View>

      {/* Book Details */}
      <View style={styles.detailsContainer}>
        <TableData title="Publisher" content={DATA.publisher} />
        <TableData title="Year" content={DATA.year} />
        <TableData title="ISBN" content={DATA.ISBN} />
        <TableData title="Owned By" content={owner} />
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <MyButton title="Send Request" onPress={toggleModal} isActive={context.user?.user_id === DATA.owner ? false : true} variant={context.user?.user_id === DATA.owner ? 'grey' : 'light'}/>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => navigation.navigate("ConfirmRequest")}
      >
        <View style={styles.modalOverlay}>
          <ConfirmBox
            confirmMsg={"Send exchange request for " + DATA.title + "?"}
            toggleModal={toggleModal}
            nextPage={()=>{navigation.navigate("ConfirmRequestStack", {screen: "ConfirmRequest"})}
            }
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    paddingHorizontal: 20,
  },
  image: {
    height: "50%",
    width: "auto",
    aspectRatio: 1,
    alignSelf: "center",
    marginTop: 20
  },
  text: {
    fontFamily: Typeface.font,
    color: colors.Black,
  },
  titleContainer: {
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
    marginVertical: 20,
  },
  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemTitle: {
    flex: 1,
    textAlign: "right",
    fontWeight: "600",
    color: colors.PrimaryBlue,
    fontSize: 14,
  },
  itemContent: {
    flex: 2,
    fontSize: 14,
    letterSpacing: 0.2,
    fontWeight: "300",
  },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
