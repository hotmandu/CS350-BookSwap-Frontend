import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
  Searchbar: {
    backgroundColor: "#FDFDFD",
    borderRadius: 11,
    fontSize: 16,
    padding: 10,
    color: "#1F1E1E",
  },
  boldtext_24: { fontSize: 24, color: "#2A4B87", fontWeight: "bold" },
  text_black: { fontSize: 16, color: "#1F1E1E" },
});

export default function Discover({ navigation }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [recent, setRecent] = useState([]);

  const handleSubmit = async () => {
    if (search.trim().length > 0) {
      await AsyncStorage.setItem("textData", JSON.stringify(search));
      setRecent([search, ...recent]);
      setSearch("");
    }
  };

  const updateSearch = (search) => {
    setSearch(search);
    getBooks();
  };

  const getBooks = async () => {
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
        console.log(data)
      });
  };

  useEffect(() => {
    navigation.addListener('focus', () => getBooks())
  }, []);
  useEffect(() => {
    navigation.addListener('blur', () => getBooks())
  }, []);

  if (search.length > 0) {
    return (
      <FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent={
          <View style={{ padding: 12 }}>
            <View style={{ padding: 12 }}>
              <TextInput
                style={styles.Searchbar}
                type="search"
                placeholder={t('screen.discover.phSearch')}
                onChangeText={updateSearch}
                onSubmitEditing={({ nativeEvent }) => {
                  console.log("ehre")
                  console.log(search.trim().length)
                  if (search.trim().length > 0){
                    console.log(nativeEvent.text);
                    handleSubmit();
                    navigation.navigate("Search_page", {
                      screen: "Discover",
                      params: { keyword: search },
                    });
                  }
                }}
                value={search}
                lightTheme="true"
              />
            </View>
            <View style={{ padding: 12 }}>
              <Text style={styles.boldtext_24}>{t('screen.discover.hot')}</Text>
            </View>
            <View style={{ padding: 12 }}>
              <Text style={styles.boldtext_24}>{t('screen.discover.recent')}</Text>
            </View>
            <View
              style={{
                marginHorizontal: 12,
                height: 1,
                backgroundColor: "rgba(42, 75, 135, 0.25)",
              }}
            />
            <FlatList
              style={{ paddingHorizontal: 12 }}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: "rgba(42, 75, 135, 0.25)",
                  }}
                />
              )}
              data={recent}
              renderItem={({ item }) => {
                return (
                  <View style={{ paddingVertical: 12, flexDirection: "row" }}>
                    <Text style={styles.text_black}>{item}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (search.trim().length > 0){
                        navigation.navigate("Search_page", {
                          screen: "Discover",
                          params: { keyword: item },
                        });
                      }
                      }}
                    >
                      <Image
                        style={{ marginHorizontal: 20 }}
                        source={require("../assets/north_west.jpg")}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
            <FlatList
              style={{ padding: 12 }}
              data={data}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => {
                if (
                  (item.title.toUpperCase().includes(search.toUpperCase()) ||
                    item.author.toUpperCase().includes(search.toUpperCase())) &&
                  search.length > 0
                ) {
                  return (
                    <Text>
                      {item.title}, {item.author}
                    </Text>
                  );
                }
              }}
            />
          </View>
        }
      />
    );
  } else {
    return (
      <FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent={
          <View style={{ padding: 12 }}>
            <View style={{ padding: 12 }}>
              <TextInput
                style={styles.Searchbar}
                type="search"
                placeholder={t('screen.discover.phSearch')}
                onChangeText={updateSearch}
                onSubmitEditing={({ nativeEvent }) => {
                  if(search.trim().length > 0){
                    console.log(nativeEvent.text);
                    handleSubmit();
                    navigation.navigate("Search_page", {
                      screen: "Discover",
                      params: { keyword: search },
                    });
                  }
                }}
                value={search}
                lightTheme="true"
              />
            </View>
            <SafeAreaView style={[styles.safeAreaView]}>
                {data.map((item, index)=>(
                  <BookUnit key={index} id={item.id} name={item.title} author={item.author} publisher={item.publisher} year={item.publication_date} owner={item.current_owner} isbn={item.isbn} image={`https://cs350-bookswap-backend-production.up.railway.app${item.image}`} genre={item.genre} />
                ))}
            </SafeAreaView>
          </View>
        }
      />
    );
  }
}
