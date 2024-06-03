import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, View, Text, StyleSheet} from 'react-native';
import BookUnit from '../BookUnit';
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    safeAreaView: {flex: 1, flexWrap:"wrap", flexDirection: "row", padding: 10},
    Searchbar_blue: {backgroundColor: "#FDFDFD", borderRadius: 11, fontSize: 20, padding: 10, color: "#2A4B87", fontWeight: "bold"},
  });

export default function Search({ navigation, route }) {
    const [search, setSearch] = useState("")
    const [data, setData] = useState([]);
    const [recent, setRecent] = useState([]);
    const {keyword} = route.params;
  
    const handleSubmit = async () => {
      if (search.length > 0) {
        await AsyncStorage.setItem("textData", JSON.stringify(search));
        setRecent([search, ...recent]);
        setSearch("");
      }
  }
  
    const updateSearch = search => {
      setSearch(search)
      getMovies()
    }
  
    const getBooks = async () => {
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
      getBooks();
      setSearch(keyword);
    }, []);
  
    return (
      <FlatList 
        data={[]}
        renderItem={null}
        ListEmptyComponent={
          <View style={{padding: 12}}>
          <View style={{padding: 12}}>
          <Text style={styles.Searchbar_blue}>
            {keyword}
          </Text>
          </View>
          <SafeAreaView style={[styles.safeAreaView]}>
            <FlatList style={[styles.safeAreaView]}
              data={data}
              keyExtractor={({id}) => id}
              renderItem={({item}) => {if ((item.title.toUpperCase().includes(keyword.toUpperCase()) || (item.author.toUpperCase().includes(keyword.toUpperCase()))) && keyword.length > 0) {
              return (
              <BookUnit name={item.title} author={item.author} genre={item.genre}/>
            )}}
          }
        />
          </SafeAreaView>
          </View>
        }
      />
    )
  }