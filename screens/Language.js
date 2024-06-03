import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View} from 'react-native';
import SelectBox from 'react-native-multi-selectbox'

import MyButton from '../components/MyButton';
import { Typeface, Theme } from '../utils/Theme';
const { colors } = Theme;

export default function Language({ navigation }) {
    // TODO:
    // 1. Set the useState to become the last selected language
    // 1. Send the selected language to the database @ const onChange

    const currentLanguage = "en";
    const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

    const onChange = (value) => {
        console.log(value);
        setSelectedLanguage(value);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}> 
                <View style={{ marginVertical: 20,}}>
                    <SelectBox 
                        label= "Select Language"
                        inputPlaceholder= {getItemById(selectedLanguage) || "Select Language"}
                        options={languageOptions}
                        value={selectedLanguage}
                        onChange={onChange}
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
            </SafeAreaView>
        </View>
    );
}

const languageOptions = [
    {
        item: "English",
        id: "en",
    },
    {
        item: "Korean",
        id: "ko",
    }
]

const getItemById = (id) => {
    const language = languageOptions.find(option => option.id === id);
    return language ? language.item : null;
};

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        marginHorizontal: 32,
    },
    container: {
        flex: 1,
        backgroundColor: colors.White,
    },
});