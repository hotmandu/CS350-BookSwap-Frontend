// // Use this page for dummy page

// import {useState} from 'react';
// import { Text, SafeAreaView, StyleSheet, View, Image } from 'react-native';

// import ConfirmRequestStack from '../routes/confirmRequestStack';

// import Theme from "../utils/Theme";
// import BookDetails from './BookDetails';
// import EditBookDetails from './BookshelfDetail';
// // Import all colors defined in defaultColors.js
// const { colors } = Theme;

// export default function Test() {
//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={styles.topContainer}>
//         <EditBookDetails />
//       </SafeAreaView>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.White,
//     flex: 1,
//   },
//   topContainer: {
//     // marginHorizontal: 32,
//     flex: 1,
//     gap: 50,
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// })

//extraxted bookshelf page
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, View, Text, Button, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import BookUnit from '../BookUnit';
import MyButton from '../components/MyButton';

const styles = StyleSheet.create({
    safeAreaView: {flex: 1, flexWrap:"wrap", flexDirection: "row", padding: 10},
    boldtext_24: {fontSize: 24, color: "#2A4B87", fontWeight: "bold"},
    button: {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 24},
    button_text: {fontSize: 12}
  });

function Test({ navigation }) {
    const [data, setData] = useState([]);
    const [select, setSelect] = useState("All Books");
  
    const handleSelect = select => {
      setSelect(select);
    }
  
    const getMovies = async () => {
      try {
        const response = await fetch('https://cs350-bookswap-backend-production.up.railway.app/book/');
        const json = await response.json();
        setData(json)
        //console.log(json[0].title)
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      getMovies();
    }, []);
  
    function active (route, rev) {
      let same = (route == select)
      if (same ^ rev) {
        return "#2A4B87"
      } else {
        return "white"
      }
    }

    const handleChooseBook = () => {
      const requestedBook = {
        "title": "Updated Book Title",
        "author": "Updated Author Name",
        "isbn": "1234567890123",
        "publication_date": "2023-01-01",
        "publisher": "Updated Publisher Name",
        "image": "../assets/images/no-book.png",
      }

      navigation.navigate("RequestDetails");
    }
    
    return (
      <FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent={
          <SafeAreaView style={{padding:18}}>
            <Text style={[styles.boldtext_24]}>
              Your Bookshelf
            </Text>
            <View style={{ flexDirection: 'row', marginRight: 8, marginTop: 8 }}>
        
              <View style={{marginRight: 8}}>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: active("All Books", false)}]}
                  onPress={() => handleSelect("All Books")}>
                  <Text style={[styles.button_text, {color: active("All Books", true)}]}>
                    All Books
                  </Text>
                  </TouchableOpacity>
              </View>
              <View style={{marginRight: 8}}>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: active("Private", false)}]}
                  onPress={() => handleSelect("Private")}>
                  <Text style={[styles.button_text, {color: active("Private", true)}]}>
                    Private
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginRight: 8}}>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: active("Public", false)}]}
                  onPress={() => handleSelect("Public")}>
                  <Text style={[styles.button_text, {color: active("Public", true)}]}>
                    Public
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginLeft: 100}}>
                <Button
                  onPress={() => 
                    //navigation.navigate("Add_Book_page")
                    alert("Pressed!")
                  }
                  title="+"
                  color="#2A4B87"
                />
              </View>
              <View style={{ marginLeft: 10}}>
                <Button
                  onPress={() => 
                    fetch('https://cs350-bookswap-backend-production.up.railway.app/book/11/', {
                      method: "DELETE",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        // Sample authorization
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5ODg3OTM1LCJpYXQiOjE3MTcyOTU5MzUsImp0aSI6IjViYzY1ZTNmODk2ZTQ1NjI4MGU0NGEwMTM5ZWZmY2U3IiwidXNlcl9pZCI6Nn0.2cuZvUsB38UjyvYSHQGLjerPge5EdZSmOEcwgt88ht0"
                      },
                    })
                    .then((responseData) => {
                      console.log(JSON.stringify(responseData))
                    }).catch(error => {console.error(error)})
                    .then(Alert.alert('Done!'))
                    .then(() => {getMovies()})
                  }
                  title="-"
                  color="#2A4B87"
                />
              </View>
            </View>
            <FlatList style={[styles.safeAreaView]}
              data={data}
              keyExtractor={({id}) => id}
              renderItem={({item}) => { if (select != "Private") {
                return (
                  <BookUnit id={item.id} name={item.title} author={item.author} genre={item.genre}/>
                )
              }}}/>

              <MyButton title="Choose Book" onPress={handleChooseBook} />
          </SafeAreaView>
        }
      />
    );
  }

  export default Test;