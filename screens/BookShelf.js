import React, {useEffect, useState, useContext, useCallback} from 'react';
import {FlatList, SafeAreaView, View, Text, Button, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import BookUnit from '../BookUnit';
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 10,
  },
  boldtext_24: { fontSize: 24, color: "#2A4B87", fontWeight: "bold" },
  button: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 24 },
  button_text: { fontSize: 12 },
});

function Bookshelf({ navigation }) {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [select, setSelect] = useState("All Books");
  const context = useContext(AuthContext);

  const handleSelect = (select) => {
    setSelect(select);
    getBooks(select, context.token);
  };

  const getBooks = async (select, token) => {
    try {
      if (select === "All Books") {
        fetch(
          "https://cs350-bookswap-backend-production.up.railway.app/book/user_books/",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
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
            setData(data);
          });
      } else if (select === "Private") {
        fetch(
          "https://cs350-bookswap-backend-production.up.railway.app/book/user_books/private/",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
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
            setData(data);
          });
      } else {
        fetch(
          "https://cs350-bookswap-backend-production.up.railway.app/book/user_books/public/",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
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
            setData(data);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBooks("All Books", context.token);
      return () => {}
    }, [select])
  );

  function active(route, rev) {
    let same = route == select;
    if (same ^ rev) {
      return "#2A4B87";
    } else {
      return "white";
    }
  }

  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListEmptyComponent={
        <SafeAreaView style={{ padding: 18 }}>
          <Text style={[styles.boldtext_24]}>{t('screen.bookshelf.yourBookshelf')}</Text>
          <View style={{ flexDirection: "row", marginRight: 8, marginTop: 8 }}>
            <View style={{ marginRight: 8 }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: active("All Books", false) },
                ]}
                onPress={() => handleSelect("All Books")}
              >
                <Text
                  style={[
                    styles.button_text,
                    { color: active("All Books", true) },
                  ]}
                >
                  {t('screen.bookshelf.allBooks')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginRight: 8 }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: active("Private", false) },
                ]}
                onPress={() => handleSelect("Private")}
              >
                <Text
                  style={[
                    styles.button_text,
                    { color: active("Private", true) },
                  ]}
                >
                  {t('screen.bookshelf.private')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginRight: 8 }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: active("Public", false) },
                ]}
                onPress={() => handleSelect("Public")}
              >
                <Text
                  style={[
                    styles.button_text,
                    { color: active("Public", true) },
                  ]}
                >
                  {t('screen.bookshelf.public')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 100 }}>
              <Button
                onPress={() =>
                  navigation.navigate("BookshelfDetailStack", {screen: "AddBookPage"})
                }
                title="+"
                color="#2A4B87"
              />
            </View>
          </View>
          <FlatList
            style={[styles.safeAreaView]}
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => {
              if (select != "Private") {
                return (
                  <BookUnit id={item.id} visibility={select} name={item.title} author={item.author} publisher={item.publisher} year={item.publication_date} owner={item.current_owner} isbn={item.isbn} image={`https://cs350-bookswap-backend-production.up.railway.app${item.image}`} genre={item.genre} />
                );
              }
            }}
          />
        </SafeAreaView>
      }
    />
  );
}

export default Bookshelf;
