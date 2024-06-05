import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View, Text, Alert, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import { Typeface, Theme } from '../utils/Theme';
const { colors } = Theme;
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, flexWrap: "wrap", flexDirection: "row", padding: 10 },
  Searchbar: { backgroundColor: "#FDFDFD", borderRadius: 11, fontSize: 16, padding: 10, color: "#1F1E1E" },
  Searchbar_rect: { backgroundColor: "#FDFDFD", fontSize: 16, padding: 10, color: "#1F1E1E", marginTop: 12 },
  Searchbar_blue: { backgroundColor: "#FDFDFD", borderRadius: 11, fontSize: 20, padding: 10, color: "#2A4B87", fontWeight: "bold" },
  boldtext: { marginHorizontal: 2, marginBottom: 2, fontSize: 16, color: "#2A4B87", fontWeight: "bold" },
  boldtext_24: { fontSize: 24, color: "#2A4B87", fontWeight: "bold" },
  boldtext_20: { fontSize: 20, color: "#2A4B87", fontWeight: "bold" },
  text: { marginHorizontal: 2, marginBottom: 2, fontSize: 12 },
  text_black: { fontSize: 16, color: "#1F1E1E" },
  box: { width: "40%", height: "45%", backgroundColor: "white", marginBottom: 10, marginHorizontal: 10 },
  border: { borderWidth: 2, borderColor: "black" },
  button: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
  button_text: { fontSize: 12 },
  edit: {
    alignSelf: "flex-start",
    backgroundColor: colors.Grey,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderWidth: 0.1,
    borderRadius: 5,
    flexDirection: "row",
    gap: 5,
    marginVertical: 5,
  },
  editText: {
    fontFamily: Typeface.font,
    color: colors.Black,
    fontSize: 12,
    fontWeight: "700",
  },
});

function AddBookScreen({ navigation }) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [pubdate, setPubdate] = useState("");
  const [publisher, setPublisher] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('no image selected')

  const context = useContext(AuthContext);

  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      const uri = result.assets[0].uri;
      const fileName = uri.split('/').pop();  

      setImage(uri); 
      setImageName(fileName);  
    } else {
      console.log("Image selection cancelled");
    }
  };

  const handleSubmit = async () => {
    const fixed_pubdate = pubdate.length > 0 ? pubdate : null;
    const fixed_publisher = publisher.length > 0 ? publisher : null;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('isbn', isbn);
    formData.append('publication_date', fixed_pubdate);
    formData.append('publisher', fixed_publisher);

    if (image) {
      const localUri = image;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('image', { uri: localUri, name: filename, type });
    }

    try {
      const response = await fetch('https://cs350-bookswap-backend-production.up.railway.app/book/', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${context.token}`,
        },
        body: formData,
      });

      const responseData = await response.json();

      navigation.navigate("Discover_page", { screen: "Bookshelf" });
    } catch (error) {
      navigation.navigate("Error");
    }
  };

    return (
      <FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent={
      <SafeAreaView style={[styles.safeAreaView]}>
        <View style={{padding:15, marginTop:30}}>
        <Text style={styles.boldtext_24}>
          {t('screen.addBook.addBooks')}
        </Text>
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder={t('screen.addBook.phTitle')}
          onChangeText={(title) => setTitle(title)}
          value={title}
        />
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder={t('screen.addBook.phAuthor')}
          onChangeText={(author) => setAuthor(author)}
          value={author}
        />
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder={t('screen.addBook.phGenre')}
          onChangeText={(genre) => setGenre(genre)}
          value={genre}
        />
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder={t('screen.addBook.phIsbn')}
          onChangeText={(isbn) => setIsbn(isbn)}
          value={isbn}
        />
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder={t('screen.addBook.phPubdate')}
          onChangeText={(pubdate) => setPubdate(pubdate)}
          value={pubdate}
        />
        <TextInput
          style={[styles.Searchbar_rect]}
          placeholder={t('screen.addBook.phPublisher')}
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
            {t('screen.addBook.back')}
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
          {t('screen.addBook.submit')}
          </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
        }/>
    )
  }

  export default AddBookScreen;