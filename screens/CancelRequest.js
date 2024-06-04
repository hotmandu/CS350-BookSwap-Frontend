import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Animated, Image, Modal } from 'react-native';

import {Theme, Typeface} from "../utils/Theme";
import GenreItem from '../components/GenreItem';
import MyButton from '../components/MyButton';
import ConfirmBox from './ConfirmBox';

// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function CancelRequest() {
  // TODO: Replace DATA with requested book data from the database
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

    // For Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [overlayOpacity] = useState(new Animated.Value(0));
    const toggleModal = () => {
        setModalVisible(!modalVisible);
        console.log(modalVisible);
    };
    

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                {/* Book Cover */}
                <Image 
                    source={getImageSource(DATA.cover)}
                    style={styles.image}
                />

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
                </View>

                <View style={{ width: '100%', height: 0.3, backgroundColor: colors.PrimaryBlue }} />

                {/* Owner's Review */}
                <View style={styles.synopsisContainer}>
                    <Text style={[styles.text, styles.sectionTitle]}>Owner's Synopsis</Text>
                    <Text style={[styles.text, styles.reviewText]}>{DATA.review}</Text>
                </View>

                {/* Footer */}
                <View style={styles.footerContainer}>
                    {/* <View style={{ width: '100%', height: 0.3, backgroundColor: colors.PrimaryBlue }} /> */}
                    {/* Button */}
                    <MyButton title="Cancel Request" onPress={toggleModal} />
                </View>

                {/* Modal */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={setModalVisible}
                >
                  <View style={styles.modalOverlay}>
                    <ConfirmBox 
                      confirmMsg={"Cancel exchange request for " + DATA.title + "?"} 
                      toggleModal={toggleModal}
                      nextPage="../screens/Test.js"
                    />
                  </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        marginHorizontal: 32,
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
        lineHeight: "18",
      },
      footerContainer: {
        position: "absolute",
        bottom: 0,
        flexDirection: "column",
        flex: 1,
        width: "100%",
        marginBottom: 32,
        alignItems: "center",
        gap: 20,
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }      
})