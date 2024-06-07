import { useContext, useState, useCallback } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  Image,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Theme, Typeface } from "../utils/Theme";
import GenreItem from '../components/GenreItem';
import CustomConfirmBox from './DeleteConfirmBox';
import { useTranslation } from 'react-i18next';

import { AuthContext } from "../context/AuthContext";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function BookshelfDetail({ navigation, route }) {
  const context = useContext(AuthContext);
  const { t } = useTranslation();

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
    visibility: route.params.visibility,
    image: route.params.image,
  };

  const getImageSource = (cover) => {
    if (cover && cover !== "none") {
      return { uri: cover };
    } else {
      return require("../assets/no-book.png");
    }
  };

  const TableData = ({ title, content }) => {
    return (
      <View style={styles.detailsItem}>
        <Text style={[styles.text, styles.itemTitle]}>{title}</Text>
        <Text style={[styles.text, styles.itemContent]}>{content}</Text>
      </View>
    );
  };

  const handleEdit = () => {
    navigation.navigate("BookshelfDetailStack", {
      screen: "EditBookshelfDetail",
      params: {
        id: DATA.id,
        visibility: DATA.visibility,
        name: DATA.title,
        author: DATA.author,
        genre: DATA.genre,
        image: DATA.image,
        publisher: DATA.publisher,
        year: DATA.year,
        owner: DATA.owner,
        isbn: DATA.ISBN,
      },
    });
  };

  const handleDelete = useCallback(() => {
    console.log("Delete button pressed");
    ConfirmBox(
      t('screen.bookshelfDetails.delboxTitle'),
      t('screen.bookshelfDetails.delboxContent'),
      t('screen.bookshelfDetails.delboxDelete'),
      t('screen.bookshelfDetails.delboxCancel'),
      () => {
        console.log("Book deleted");
      }
    );
  }, [t]);

  // For Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [overlayOpacity] = useState(new Animated.Value(0));
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    console.log(modalVisible);
  };

  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListEmptyComponent={
        <SafeAreaView style={styles.container}>
          <View style={styles.topHalf}>
            <Image source={getImageSource(DATA.cover)} style={styles.image} />
          </View>
          <View style={styles.bottomHalf}>
            <View style={styles.titleContainer}>
              <Text style={[styles.text, styles.titleText]}>{DATA.title}</Text>
              <Text style={[styles.text, styles.authorText]}>
                {DATA.author}
              </Text>
            </View>

            <View style={styles.genreContainer}>
              <GenreItem genres={DATA.genres} />
            </View>

            <View style={styles.detailsContainer}>
              <TableData title={t('screen.bookDetails.publisher')} content={DATA.publisher} />
              <TableData title={t('screen.bookDetails.year')} content={DATA.year} />
              <TableData title={t('screen.bookDetails.isbn')} content={DATA.ISBN} />
              <TableData title={t('screen.bookDetails.ownedby')} content={DATA.owner} />
              <TableData title={t('term.bookVisibility')} content={DATA.visibility} />
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.edit, styles.delete]}
                onPress={toggleModal}
              >
                <MaterialIcons
                  name="delete-forever"
                  size={15}
                  color={colors.PrimaryBlue}
                />
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
              <Pressable style={[styles.edit]} onPress={handleEdit}>
                <MaterialIcons name="edit" size={14} color={colors.White} />
                <Text style={styles.editText}>Edit</Text>
              </Pressable>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={setModalVisible}
            >
              <View style={styles.modalOverlay}>
                <CustomConfirmBox
                  confirmMsg={
                    "Are you sure you want to delete " + DATA.title + "?"
                  }
                  toggleModal={toggleModal}
                  nextPage={() => {
                    fetch(
                      `https://cs350-bookswap-backend-production.up.railway.app/book/${DATA.id}/`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-type": "application/json; charset=UTF-8",
                          Authorization: `Bearer ${context.token}`,
                        },
                      }
                    ).then((res) => {
                      if (res.status != 204) {
                        navigation.navigate("Error");
                      } else {
                        navigation.navigate("Discover_page", {
                          screen: "Bookshelf",
                        });
                      }
                    });
                  }}
                />
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },
  topHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomHalf: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
  },
  text: {
    fontFamily: Typeface.font,
    color: colors.Black,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
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
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  detailsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 5,
  },
  itemTitle: {
    fontWeight: "600",
    color: colors.PrimaryBlue,
    fontSize: 14,
  },
  itemContent: {
    fontSize: 14,
    letterSpacing: 0.2,
    fontWeight: "300",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  edit: {
    backgroundColor: colors.PrimaryBlue,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderWidth: 0.1,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    fontFamily: Typeface.font,
    color: colors.White,
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },
  delete: {
    backgroundColor: colors.White,
    borderColor: colors.PrimaryBlue,
    borderWidth: 1,
  },
  deleteText: {
    fontFamily: Typeface.font,
    color: colors.PrimaryBlue,
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },
})
