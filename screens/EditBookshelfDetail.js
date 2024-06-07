// Edit the book details in the user's bookshelf.

import { useContext, useCallback, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

import MyButton from "../components/MyButton";
import { Typeface, Theme } from "../utils/Theme";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from 'react-i18next';
const { colors } = Theme;

export default function EditBookshelfDetail({ navigation, route }) {
  const { t } = useTranslation();
  const context = useContext(AuthContext);

  const [title, setTitle] = useState(route.params.name);
  const [author, setAuthor] = useState(route.params.author);
  const [isbn, setIsbn] = useState(route.params.isbn);
  const [publicationDate, setPublicationDate] = useState(route.params.year);
  const [publisher, setPublisher] = useState(route.params.publisher);
  const [image, setImage] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [imageName, setImageName] = useState(
    route.params.image.split("/").pop()
  );
  const [errors, seterrors] = useState({});

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert(t('screen.editBookshelfDetail.errorPhotoPerm'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      const uri = result.assets[0].uri;
      const fileName = uri.split("/").pop();

      setImage(uri);
      setImageName(fileName);
    } 
  };

  const handleSave = () => {
    const fixed_pubdate = publicationDate.length > 0 ? publicationDate : null;
    const fixed_publisher = publisher.length > 0 ? publisher : null;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', route.params.genre);
    formData.append('isbn', isbn);
    formData.append('publication_date', fixed_pubdate);
    formData.append('publisher', fixed_publisher);
    formData.append('isPrivate', visibility === "Private");

    if (image) {
      const localUri = image;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('image', { uri: localUri, name: filename, type });
    }

    fetch(
      `https://cs350-bookswap-backend-production.up.railway.app/book/${route.params.id}/`,
      {
        method: "PUT",
        headers: {
            Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${context.token}`,
        },
        body: formData
      }
    ).then((res) => {
      if (res.status != 200) {
        navigation.navigate("Error");
      } else {
        Alert.alert(t('screen.editBookshelfDetail.alertTitle'), t('screen.editBookshelfDetail.alertMsg'));
        const id = route.params.id
        navigation.navigate("BookshelfDetailStack", {
          screen: "Book Details",
          params: { id, visibility, title, author, genre, image, publisher, year, owner, isbn  },
        });
      }
    });
  };

  const visibilityOptions = [
    { item: "Public", id: "Public" },
    { item: "Private", id: "Private" },
  ];

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

                    <FormItem label={t('screen.bookDetails.title')} value={title} onChangeText={setTitle} placeholder={title} error={errors.title} />
                    <FormItem label={t('screen.bookDetails.author')} value={author} onChangeText={setAuthor} placeholder={author} error={errors.author} />
                    <FormItem label={t('screen.bookDetails.isbn')} value={isbn} onChangeText={setIsbn} placeholder={isbn} error={errors.isbn} />
                    <FormItem label={t('screen.bookDetails.pubdate')} value={publicationDate} onChangeText={setPublicationDate} placeholder={publicationDate} error={errors.publicationDate} />
                    <FormItem label={t('screen.bookDetails.publisher')} value={publisher} onChangeText={setPublisher} placeholder={publisher} error={errors.publisher} />
                    <SelectBox 
                        label={t('term.bookVisibility')}
                        inputPlaceholder={visibility}
                        options={visibilityOptions}
                        value={visibility}
                        onChange={(e)=>{
                          console.log(e.id)
                          setVisibility(e.id)}}
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
      {error ? (
        <Text style={[styles.formErr, styles.text]}>{error}</Text>
      ) : null}
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
};

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
