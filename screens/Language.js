import {useCallback, useMemo, useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View} from 'react-native';
import SelectBox from 'react-native-multi-selectbox'

import MyButton from '../components/MyButton';
import { Typeface, Theme } from '../utils/Theme';
import { useTranslation } from 'react-i18next';
const { colors } = Theme;

export default function Language({ navigation }) {
    // TODO:
    // 1. Set the useState to become the last selected language
    // 1. Send the selected language to the database @ const onChange

    const { t, i18n } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState(i18n.languages[0]);

    const onChange = useCallback((value) => {
        // console.log(value);
        // Actually change langauge and save
        i18n.changeLanguage(value.id).then(() => {
            setSelectedLanguage(value.id);
        });
    }, [i18n.changeLanguage, setSelectedLanguage]);

    const languageOptions = useMemo(() => {
        const langResources = i18n.options.resources;
        if (langResources === undefined) {
            return [{ id: "en", item: "English" }];
        } else {
            return Object.entries(langResources).map((v) => ({ id: v[0], item: v[1].translation['language'] }));
        }
    }, [i18n.options.resources]);

    // console.log(languageOptions);
    // console.log(selectedLanguage);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}> 
                <View style={{ marginVertical: 20,}}>
                    <SelectBox 
                        label={t("screen.language.selectLanguage")}
                        inputPlaceholder={t("language", {lng: selectedLanguage}) || t("screen.language.selectLanguage")}
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