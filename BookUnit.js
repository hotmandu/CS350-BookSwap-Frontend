import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import BookDetails from "./screens/BookDetails";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 10,
  },
  boldtext: {
    marginHorizontal: 2,
    marginBottom: 2,
    fontSize: 16,
    color: "#2A4B87",
    fontWeight: "bold",
  },
  text: { marginHorizontal: 2, marginBottom: 2, fontSize: 12 },
  box: { width: 150, height: 300, marginBottom: 10, marginHorizontal: 10 },
});

function BookUnit({ id, visibility, name, author, publisher, year, owner, isbn, genre, image }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.box]}
      onPress={() => {
        if(visibility){
          navigation.navigate("BookshelfDetailStack", {
            screen: "Book Details",
            params: { id, visibility, name, author, genre, image, publisher, year, owner, isbn  },
          });
        }else{
          navigation.navigate("TabPages", {
            screen: "Book_page",
            params: { id, name, author, genre, image, publisher, year, owner, isbn  },
          });
        }
      }}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "75%", resizeMode: "stretch" }}
        />
      ) : (
        <Image
          source={require("./assets/no-book.png")}
          style={{ width: "100%", height: "75%", resizeMode: "stretch" }}
        />
      )}
      <Text style={styles.boldtext}>{name}</Text>
      <Text style={[styles.text, { color: "#2A4B87" }]}>{author}</Text>
      <Text style={[styles.text, { color: "rgba(31, 30, 30, 0.50)" }]}>
        {genre}
      </Text>
    </TouchableOpacity>
  );
}

export default BookUnit;
