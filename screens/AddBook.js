import React, {useEffect, useState, useContext} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View, Text, Button, Alert, Dimensions, Image, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { AuthContext } from '../context/AuthContext';

const styles = StyleSheet.create({
    safeAreaView: {flex: 1, flexWrap:"wrap", flexDirection: "row", padding: 10},
    Searchbar: {backgroundColor: "#FDFDFD", borderRadius: 11, fontSize: 16, padding: 10, color: "#1F1E1E"},
    Searchbar_rect: {backgroundColor: "#FDFDFD", fontSize: 16, padding: 10, color: "#1F1E1E", marginTop: 12},
    Searchbar_blue: {backgroundColor: "#FDFDFD", borderRadius: 11, fontSize: 20, padding: 10, color: "#2A4B87", fontWeight: "bold"},
    boldtext: {marginHorizontal: 2, marginBottom: 2, fontSize: 16, color: "#2A4B87", fontWeight: "bold"},
    boldtext_24: {fontSize: 24, color: "#2A4B87", fontWeight: "bold"},
    boldtext_20: {fontSize: 20, color: "#2A4B87", fontWeight: "bold"},
    text: {marginHorizontal: 2, marginBottom: 2, fontSize: 12},
    text_black: {fontSize: 16, color:"#1F1E1E"},
    box: {width: "40%", height: "45%", backgroundColor: "white", marginBottom: 10, marginHorizontal: 10},
    border: {borderWidth: 2, borderColor: "black"},
    button: {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 24},
    button_text: {fontSize: 12}
  });

function AddBookScreen({ navigation }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [isbn, setIsbn] = useState("");
    const [pubdate, setPubdate] = useState("");
    const [publisher, setPublisher] = useState("");

    const context = useContext(AuthContext)

    return (
      <FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent={
      <SafeAreaView style={[styles.safeAreaView]}>
        <View style={{padding:15, marginTop:30}}>
        <Text style={styles.boldtext_24}>
          Add books
        </Text>
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder="Book title"
          onChangeText={(title) => setTitle(title)}
          value={title}
        />
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder="Book author"
          onChangeText={(author) => setAuthor(author)}
          value={author}
        />
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder="Book genre"
          onChangeText={(genre) => setGenre(genre)}
          value={genre}
        />
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder="ISBN"
          onChangeText={(isbn) => setIsbn(isbn)}
          value={isbn}
        />
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder="Publication_date (Optional, XXXX-YY-ZZ)"
          onChangeText={(pubdate) => setPubdate(pubdate)}
          value={pubdate}
        />
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder="Publisher (Optional)"
          onChangeText={(publisher) => setPublisher(publisher)}
          value={publisher}
        />
        </View>
        <View style={{padding:15, flexDirection:'row'}}>
        <TouchableOpacity
          style={[styles.button, {marginTop: 50, marginRight: 30, backgroundColor: "white", alignItems: "center"}]}
          onPress={() => navigation.navigate("Discover_page", {screen: "Bookshelf"})
        }
        >
          <Text style={{fontSize: 24, color: "#2A4B87", alignItems: "center"}}>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {marginTop: 50, marginRight: 30, backgroundColor: "#2A4B87", alignItems: "center"}]}
          onPress={() => {
            const fixed_pubdate = pubdate.length > 0 ? pubdate : null
            const fixed_publisher = publisher.length > 0 ? publisher : null

            fetch('https://cs350-bookswap-backend-production.up.railway.app/book/', {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${context.token}`,
              },
              body: JSON.stringify({
                "title": title,
                "author": author,
                "genre": genre,
                "isbn": isbn,
                "publication_date": fixed_pubdate,
                "publisher": fixed_publisher
              }),
            })
            .then((response) => response.json())
            .then((responseData) => {
              console.log(JSON.stringify(responseData))
            })
            .then(navigation.navigate("Discover_page", {screen: "Bookshelf"}))
          }
        }
        >
          <Text style={{fontSize: 24, color: "white", alignItems: "center"}}>
            Submit
          </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
        }/>
    )
  }

  export default AddBookScreen;