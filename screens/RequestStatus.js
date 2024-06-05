import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Pressable, Image} from 'react-native';

import Filter from "../components/Filter";
import RequestItem from '../components/RequestItem';
import Dialog from "react-native-dialog";

import { Typeface, Theme } from '../utils/Theme';
import MyButton from '../components/MyButton';
const { colors } = Theme;

export default function RequestStatus({ route, navigation }) {
    // TODO: handle the data passed
    // passed from the previous screen
    // current fields: bookAuthor, bookTitle, owner, status
    const data = route.params;

    const requestedBook = {
        "title": "Updated Book Title",
        "author": "Updated Author Name",
        "isbn": "1234567890123",
        "publication_date": "2023-01-01",
        "publisher": "Updated Publisher Name",
        "image": "../assets/images/no-book.png",
    }

    const requestingUser = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "password": "your_password",
    }
    
    const handleSeeDetails = () => {
        // TODO: redirect to the bookshelf page
        navigation.navigate("Request Details");  //--PLACEHOLDER--

        // TODO: pass the chosen book data here
        // ---PLACEHOLDER---
        const chosenBook = requestedBook;
        setChosen(true);
    }

    const [chosen, setChosen] = useState(false);
    // State variables for each modal
    const [visibleAccept, setVisibleAccept] = useState(false);
    const [visibleReject, setVisibleReject] = useState(false);

    const showAcceptDialog = () => setVisibleAccept(true);
    const hideAcceptDialog = () => setVisibleAccept(false);

    const showRejectDialog = () => setVisibleReject(true);
    const hideRejectDialog = () => setVisibleReject(false);

    const AcceptDialog = () => (
        <View>
            <MyButton title="Accept" onPress={showAcceptDialog} />
            <Dialog.Container visible={visibleAccept}>
                <Dialog.Title>Accept Exchange Request</Dialog.Title>
                <Dialog.Description>
                    Do you want to accept this request? You cannot undo this action.
                </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={hideAcceptDialog} />
                <Dialog.Button label="Confirm" onPress={() => {
                    //TODO: mark this request as accepted
                    hideAcceptDialog();
                    navigation.navigate("Matched");
                }} />
            </Dialog.Container>
        </View>
    );

    const RejectDialog = () => (
        <View>
            <MyButton title="Reject" onPress={showRejectDialog} />
            <Dialog.Container visible={visibleReject}>
                <Dialog.Title>Reject Exchange Request</Dialog.Title>
                <Dialog.Description>
                    Do you want to reject this request? You cannot undo this action.
                </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={hideRejectDialog} />
                <Dialog.Button label="Confirm" onPress={() => {
                    //TODO: mark this request as REJECTED
                    // ---PLACEHOLDER---
                    hideRejectDialog();
                    navigation.navigate("Received");
                }} />
            </Dialog.Container>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                { /* Title */ }
                <View style={styles.pageTitleContainer}>
                    <Text style={[styles.pageHeader, {
                        color: colors.Black,
                        fontSize: 18,
                        fontWeight: "400",
                    }]}>
                        Sending request to
                    </Text>
                    <Text style={styles.pageHeader}>
                        {data.owner}
                    </Text>
                    
                </View>

                {/* Requested Book Details Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.text, styles.sectionHeaderText]}>Requested Book</Text>
                    </View>

                    <View style={{ width: '100%', height: 0.3, backgroundColor: colors.PrimaryBlue}} />

                    <ProfileItem title="Title" value={data.bookTitle} />
                    <ProfileItem title="Author" value={data.bookAuthor} />
                </View>

                {/* Exchange Status Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.text, styles.sectionHeaderText]}>Exchange Status</Text>
                        <Pressable onPress={handleSeeDetails}>
                            <Text style={{fontFamily: Typeface.font, color: colors.PrimaryBlue, fontWeight: "500"}}>See Details</Text>
                        </Pressable>
                    </View>

                    <View style={{ width: '100%', height: 0.3, backgroundColor: colors.PrimaryBlue}} />
                    <Text style={{color: colors.Black}}>Waiting for response.</Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <RejectDialog />
                    <AcceptDialog />
                </View>
            </SafeAreaView>
        </View>
    );
}

const BookPreview = (book, owner) => {
    title = book.title;
    author = book.author;
    username = owner.first_name + " " + owner.last_name;

    return (
        <View style={styles.bookContainer}>
            <View>
                <Image source={require("../assets/no-book.png")} style={[styles.bookCover]}/>
            </View>
            <View style={styles.bookInfoContainer}>
                <Text numberOfLines={2} style={styles.bookTitle}>{title}</Text>
                <Text numberOfLines={2} style={styles.bookAuthor}>{author}</Text>
            </View>
        </View>
    );

    
}


const ProfileItem = ({title, value}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <Text style={[styles.text, styles.sectionItemTitle]}>
                {title}
            </Text>
            <Text style={[styles.text, styles.sectionItemText]} numberOfLines={1}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        marginHorizontal: 32,
        // backgroundColor: colors.AccentPink,
      },
      container: {
        flex: 1,
        backgroundColor: colors.White,
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginVertical: 15,
      },
      pageHeader: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.PrimaryBlue,
        textAlign: "center",
      },
      itemContainer: {
        marginVertical: 15,
        flexDirection: "column",
        rowGap: 15,
        paddingBottom: 50,
      },
      sectionContainer: {
        flexDirection: "column",
        gap: 10,
        marginBottom: 20,
        // Shadow Configuration
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowRadius: 10,
        elevation: 10,
        shadowOpacity: 1,
        backgroundColor: colors.White,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline"
    },
    sectionHeaderText: {
        fontWeight: "700",
        fontSize: 18,
        color: colors.PrimaryBlue,
    },
    sectionHeaderText: {
        fontWeight: "700",
        fontSize: 18,
        color: colors.PrimaryBlue,
    },
    pageTitleContainer: {
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
        marginVertical: 25,
    },
    bookCover: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    bookContainer: {
        flexDirection: "row",
        gap: 10,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: "700",
        textTransform: "capitalize",
        color: colors.PrimaryBlue,
        overflow: "hidden",
        maxwidth: "70%",
    },
    bookAuthor: {
        fontSize: 14,
        fontWeight: "400",
        color: colors.Black,
        textAlign: "left",
        overflow: "hidden",
        maxwidth: "70%",
    },
    bookInfoContainer: {
        gap: 5,
    },
    sectionItemTitle: {
        fontSize: 14,
        color: colors.Black,
        fontWeight: "600",
    },
    sectionItemText: {
        fontSize: 14,
        color: "rgba(31, 30, 30, 0.8)",
        fontWeight: "400",
        width: "80%",
        overflow: "hidden",
        textAlign: "right",
    }
})