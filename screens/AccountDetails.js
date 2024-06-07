import {useState, useCallback} from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, Alert} from 'react-native';

import MyButton from '../components/MyButton';
import { Typeface, Theme } from '../utils/Theme';
import { useTranslation } from 'react-i18next';
const { colors } = Theme;

export default function AccountDetails({ navigation }) {
    // TODO:
    // 1. Retrieve user data from the database @ const user
    // 2. Add logic for adding updated fields to the database @ const handleSave
    const { t } = useTranslation();

    // Retrieve user data from the database here
    const user = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "password": "your_password"
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    const validateForm = useCallback(() => {
        let errors = {}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
          errors.email = t("screen.accountDetails.errorsEmail");
        }
    
        setErrors(errors)
    
        return Object.keys(errors).length === 0;
    }, [t]);

    const handleSave = useCallback(() => {
        if (validateForm()) {
            const newData = {
                "first_name": firstName || user.first_name,
                "last_name": lastName || user.last_name,
                "email": email || user.email,
                "password": user.password
            }
            Alert.alert("Changes Saved.", "Your changes have been saved successfully.");
        }
    }, [t, validateForm]);
    

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                {/* Profile Section */}
                <View style={styles.sectionContainer}>
                    <FormItem label={t("screen.accountDetails.formFirstName")} value={firstName} onChangeText={setFirstName} placeholder={user.first_name} error={errors.firstName} />
                    <FormItem label={t("screen.accountDetails.formLastName")} value={lastName} onChangeText={setLastName} placeholder={user.last_name} error={errors.lastName} />
                    <FormItem label={t("screen.accountDetails.formEmail")} value={email} onChangeText={setEmail} placeholder={user.email} error={errors.email} />
                </View>

                <MyButton title={t("screen.accountDetails.btnSave")} onPress={handleSave} />
            </SafeAreaView>
        </View>
    );
}

const ProfileItem = ({title, value, onChangeText, errors}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
            }}
        >
            <View>
                <Text style={[styles.text, styles.sectionItemTitle]}>
                    {title}
                </Text>
                {/* Input Validation */}
                {
                    errors && errors.email ? <Text style={[styles.text, styles.formErr]}>{errors.email}</Text> : null
                }
            </View>
            
            <TextInput 
                style={[styles.text, styles.sectionItemText]}
                placeholder={value}
                placeholderTextColor="rgba(31, 30, 30, 0.4)"
                onChangeText={onChangeText}
            />
        </View>
    );
}

const FormItem = ({ label, value, onChangeText, placeholder, error }) => {
    return (
        <View style={styles.formItem}>
            <Text style={[styles.text, styles.formItemText, {height: 30}]}>{label}</Text>
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
            //   secureTextEntry={true}
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
        gap: 10,
        marginVertical: 15,
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
})