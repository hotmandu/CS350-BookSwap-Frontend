import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, Text, StyleSheet } from "react-native";
import BookUnit from "../BookUnit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 10,
  },
  Searchbar_blue: {
    backgroundColor: "#FDFDFD",
    borderRadius: 11,
    fontSize: 20,
    padding: 10,
    color: "#2A4B87",
    fontWeight: "bold",
  },
});

export default function Search({ navigation, route }) {
  const { t } = useTranslation();
  
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [recent, setRecent] = useState([]);
  const { keyword } = route.params;

  const handleSubmit = async () => {
    if (search.length > 0) {
      await AsyncStorage.setItem("textData", JSON.stringify(search));
      setRecent([search, ...recent]);
      setSearch("");
    }
  };

  const updateSearch = (search) => {
    setSearch(search);
    getMovies();
  };

  const getBooks = async () => {
    try {
      fetch("https://cs350-bookswap-backend-production.up.railway.app/book/", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          if (res.status != 200) {
            navigation.navigate("Error");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setData(data);
        });
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
        <View style={{ padding: 12 }}>
          <View style={{ padding: 12 }}>
            <Text style={styles.Searchbar_blue}>{keyword}</Text>
          </View>
          <SafeAreaView style={[styles.safeAreaView]}>
            <FlatList
              style={[styles.safeAreaView]}
              data={data}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => {
                if (
                  (item.title.toUpperCase().includes(keyword.toUpperCase()) ||
                    item.author
                      .toUpperCase()
                      .includes(keyword.toUpperCase())) &&
                  keyword.length > 0
                ) {
                  return (
                    <BookUnit
                    id={item.id}
                      name={item.title}
                      author={item.author}
                      genre={item.genre}
                      image={`https://cs350-bookswap-backend-production.up.railway.app${item.image}`}
                      publisher={item.publisher}
                      year={item.publication_date}
                      isbn={item.isbn}
                      owner={item.current_owner}
                    />
                  );
                }
              }}
            />
          </SafeAreaView>
        </View>
      }
    />
  );
}
