// Edit the book details in the user's bookshelf.

import {useCallback, useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, Alert, Pressable} from 'react-native';
import SelectBox from 'react-native-multi-selectbox'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

import MyButton from '../components/MyButton';
import { Typeface, Theme } from '../utils/Theme';
import { useTranslation } from 'react-i18next';
const { colors } = Theme;

export default function EditBookshelfDetail({ navigation }) {
    const { t } = useTranslation();
    // TODO:
    // 1. Retrieve book data from the database @ const book
    // 2. Add logic for adding updated fields to the database @ const handleSave

    // Retrieve book data from the database here
    const book = {
        "title": "Book Title",
        "author": "Author Name",
        "isbn": "1234567890123",
        "publication_date": "2022-01-01",
        "publisher": "Publisher Name",
        "image": "../assets/no-book.png",
        "visibility": "Public",
    };

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [publisher, setPublisher] = useState('');
    const [image, setImage] = useState('');
    const [visibility, setVisibility] = useState(book.visibility);
    const [imageName, setImageName] = useState(book.image.split('/').pop());
    const [errors, seterrors] = useState({});

    const pickImage = useCallback(async () => {
        console.log("Attempting to pick image...");
        // Ask for permission to access the media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert(t('screen.editBookshelfDetail.errorPhotoPerm'));
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
    
        if (!result.cancelled) {
            // TODO: Upload Image here(?) or save the image path to the database
            console.log("Image URI:", result.uri);
            const uri = result.uri;
            const fileName = uri.split('/').pop();  // Extracting the file name from URI
    
            setImage(uri);  // Save the path to the 'image' state
            setImageName(fileName);  // Update the button to display the image name
    
            console.log(uri);  // Console log the path of the chosen image
        } else {
            console.log("Image selection cancelled");
        }
    }, [t]);
    

    const handleSave = useCallback(() => {
        const newData = {
            "title": title || book.title,
            "author":  author || book.author,
            "isbn": isbn || book.isbn,
            "publication_date": publicationDate || book.publication_date,
            "publisher": publisher || book.publisher,
            "image": image || book.image,
            "visibility": visibility || book.visibility,
        }
        console.log(newData); //Change to logic to save data to the database
        Alert.alert(t('screen.editBookshelfDetail.alertTitle'), t('screen.editBookshelfDetail.alertMsg'));
        navigation.navigate("Book Details");
    }, [t]);

    const visibilityOptions = [
        { item: "Public", id: "Public" },
        { item: "Private", id: "Private" },
    ]
    

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                {/* Profile Section */}
                <View style={styles.sectionContainer}>
                    {/* Upload or remove the current image */}
                    <Text style={[styles.text, styles.formItemText]}>Cover</Text>
                    <Pressable style={[styles.edit]} onPress={pickImage}>
                        <Text style={styles.editText}>{imageName || t('screen.editBookshelfDetail.phSelImg')}</Text>
                    </Pressable>

                    <FormItem label={t('screen.bookDetails.title')} value={title} onChangeText={setTitle} placeholder={book.title} error={errors.title} />
                    <FormItem label={t('screen.bookDetails.author')} value={author} onChangeText={setAuthor} placeholder={book.author} error={errors.author} />
                    <FormItem label={t('screen.bookDetails.isbn')} value={isbn} onChangeText={setIsbn} placeholder={book.isbn} error={errors.isbn} />
                    <FormItem label={t('screen.bookDetails.pubdate')} value={publicationDate} onChangeText={setPublicationDate} placeholder={book.publication_date} error={errors.publicationDate} />
                    <FormItem label={t('screen.bookDetails.publisher')} value={publisher} onChangeText={setPublisher} placeholder={book.publisher} error={errors.publisher} />
                    <SelectBox 
                        label={t('term.bookVisibility')}
                        inputPlaceholder={book.visibility}
                        options={visibilityOptions}
                        value={visibility}
                        onChange={setVisibility}
                        hideInputFilter={true}
                        arrowIconColor={colors.PrimaryBlue}
                        optionsLabelStyle={{
                            font: Typeface.font,
                            color: colors.Grey,
                            fontsize: 14,
                        }}
                        selectedItemStyle={{
                            font: Typeface.font,
                            color: colors.Black,
                            fontsize: 14,
                        }}
                    />
                </View>

                <MyButton title={t('screen.accountDetails.btnSave')} onPress={handleSave} />
            </SafeAreaView>
        </View>
    );
}

const FormItem = ({ label, value, onChangeText, placeholder, error }) => {
    return (
        <View style={styles.formItem}>
            <Text style={[styles.text, styles.formItemText]}>{label}</Text>
            {/* Input Validation */}
            {
            error ? <Text style={[styles.formErr, styles.text]}>{error}</Text> : null
            }
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="rgba(31, 30, 30, 0.4)"
            autoCapitalize="none"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        marginHorizontal: 32,
        gap: 20,
    },
    container: {
        flex: 1,
        backgroundColor: colors.White,
    },
    text: {
        fontFamily: Typeface.font,
    },
    pageTitleContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    pageHeader: {
        fontSize: 24,
        fontWeight: "700",
        marginVertical: 15,
        color: colors.PrimaryBlue,
    },
    sectionContainer: {
        flexDirection: "column",
        gap: 5,
        marginVertical: 5,
    },
    sectionItemTitle: {
        fontSize: 16,
        color: colors.Black,
        fontWeight: "600",
    },
    sectionItemText: {
        fontSize: 16,
        color: "rgba(31, 30, 30, 0.8)",
        fontWeight: "300",
    },
    formErr: {
        color: "red",
        marginTop: 3,
        fontSize: 11,
        fontWeight: "300",
    },
    formItem: {
        marginVertical: 5,
    },
    formItemText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.PrimaryBlue,
    },
    formErr: {
        color: "red",
        marginTop: 3,
    },
    input: {
        height: 40,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.PrimaryBlue,
        color: colors.Black,
    },
    edit: {
        alignSelf: "flex-start",
        backgroundColor: colors.Grey,
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderWidth: 0.1,
        borderRadius: 20,
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