// The BookshelfDetail screen displays the details of a book that is editable by the owner

import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Animated, Image, Modal, FlatList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import {Theme, Typeface} from "../utils/Theme";
import GenreItem from '../components/GenreItem';
import CustomConfirmBox from './DeleteConfirmBox';

// Import all colors defined in defaultColors.js
const { colors } = Theme;


export default function BookshelfDetail({ navigation }) {
    const DATA = {
        cover: "none",
        title: "Book Title",
        author: "Author",
        owner: "Owner",
        publisher: "Publisher Name",
        year: "Published Year",
        ISBN: "0123456789",
        genres: [
            "genre1",
            "genre2",
            "genre3",
            "genre4",
        ],
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse venenatis aliquet maximus. Mauris rutrum, eros id consequat consequat, eros orci luctus turpis, vel porta nunc turpis sed velit. Quisque nibh tortor, placerat a dapibus porttitor, mattis in risus. Pellentesque tristique lacus vel libero pellentesque, dignissim ultrices sem dapibus. Fusce rhoncus ornare felis non vehicula. Sed posuere, lectus tristique sagittis tincidunt, risus tortor semper libero, ut mollis turpis odio eu est.",
        visibility: "Public"
    }

    const getImageSource = (cover) => {
      if (cover && cover !== "none") {
        return { uri: cover };
      } else {
        return require('../assets/no-book.png');
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
      console.log(navigation);
      navigation.navigate("EditBookshelfDetail");
    }

    const handleDelete = () => {
      console.log("Delete button pressed");
      ConfirmBox(
        "Delete Book",
        "Are you sure you want to delete this book?",
        "Delete",
        "Cancel",
        () => {
          console.log("Book deleted");
        }
      );
    }
    
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
        <View style={[styles.container, {padding:30}]}>
            <SafeAreaView style={styles.topContainer}>
                <View style={styles.imageContainer}>
                  {/* Book Cover */}
                  <Image 
                      source={getImageSource(DATA.cover)}
                      style={styles.image}
                  />
                </View>


                {/* Book Title, Author, and Owner */}
                <View style={styles.titleContainer}>
                    <Text style={[styles.text, styles.titleText]}>{DATA.title}</Text>
                    <Text style={[styles.text, styles.authorText]}>{DATA.author}</Text>
                </View>

                {/* Genres */}
                <View style={styles.genreContainer}>
                    <GenreItem genres={DATA.genres}/>
                </View>

                {/* Book Details */}
                <View style={styles.detailsContainer}>
                  <TableData title="Publisher" content={DATA.publisher} />
                  <TableData title="Year" content={DATA.year} />
                  <TableData title="ISBN" content={DATA.ISBN} />
                  <TableData title="Owned By" content={DATA.owner} />
                  <TableData title="Visibility" content={DATA.visibility} />
                </View>
                
                {/* Edit or Delete Button */}
                <View style={styles.buttonContainer}>
                  <Pressable style={[styles.edit, styles.delete]} onPress={toggleModal}>
                      <MaterialIcons name="delete-forever" size={15} color={colors.PrimaryBlue} />
                      <Text style={styles.deleteText}>Delete</Text>
                  </Pressable>
                  <Pressable style={[styles.edit]} onPress={handleEdit}>
                    <MaterialIcons name="edit" size={14} color={colors.White} />
                    <Text style={styles.editText}>Edit</Text>
                </Pressable>

                </View>
                
                {/* Divider */}
                <View style={{ width: '100%', height: 0.3, backgroundColor: colors.PrimaryBlue, marginTop: 15, }} />

                {/* Owner's Review */}
                <View style={styles.synopsisContainer}>
                    <Text style={[styles.text, styles.sectionTitle]}>Owner's Synopsis</Text>
                    <Text style={[styles.text, styles.reviewText]}>{DATA.review}</Text>
                </View>

                {/* Modal */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={setModalVisible}
                >
                  <View style={styles.modalOverlay}>
                    <CustomConfirmBox
                      confirmMsg={"Are you sure you want to delete " + DATA.title + "?"}
                      toggleModal={toggleModal}

                    />
                  </View>
                </Modal>

            </SafeAreaView>
        </View>
      }/>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        // marginHorizontal: 32,
      },
      container: {
        flex: 1,
        backgroundColor: colors.White,
      },
      image: {
        alignSelf: "center",
      },
      text: {
        fontFamily: Typeface.font,
        color: colors.Black,
      },
      titleContainer: {
        flexDirection: "column",
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
        flexDirection: "column",
        alignItems: "center",
        width: "75%",
        alignSelf: "center",
        gap: 5,
        marginVertical: 20,
      },
      detailsItem: {
        flexDirection: "row",
        gap: 15,
      },
      itemTitle: {
        flex: 2,
        textAlign: "right",
        fontWeight: "600",
        color: colors.PrimaryBlue,
        fontSize: 14,
      },
      itemContent: {
        flex: 3,
        fontSize: 14,
        letterSpacing: 0.2,
        fontWeight: "300",
      },
      sectionTitle: {
        color: colors.PrimaryBlue,
        fontWeight: "700",
        fontSize: 18,
      },
      synopsisContainer: {
        marginTop: 20,
        gap: 5,
      },
      reviewText: {
        fontSize: 14,
        fontWeight: "300",
      },
      buttonContainer: {
        flexDirection: "row",
        flex: 1,
        width: "100%",
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      edit: {
        alignSelf: "flex-start",
        backgroundColor: colors.PrimaryBlue,
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderWidth: 0.1,
        borderRadius: 20,
        flexDirection: "row",
        gap: 5,
      },
      editPosition: {
        position: "absolute",
        top: 0,
        right: 0,
      },
      editText: {
        fontFamily: Typeface.font,
        color: colors.White,
        fontSize: 12,
        fontWeight: "700",
      },
      imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
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
      },
})