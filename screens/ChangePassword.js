import {useState, useCallback} from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, Alert} from 'react-native';
import { useTranslation } from 'react-i18next';

import MyButton from '../components/MyButton';
import { Typeface, Theme } from '../utils/Theme';
const { colors } = Theme;

export default function ChangePasswords({ navigation }) {
    // TODO: 
    // 1. Retrieve user data from the database @ const user
    // 2. Add logic to add updated password to the database @ const handleSubmit

    const { t } = useTranslation();

    // TODO 1. Change this to fetch user data from the database
    const user = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "password": "your_password"
      };

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');

    const validateForm = useCallback(() => {
        let errors = {}
    
        if (!currentPassword) {
            errors.currentPassword = t('screen.changePassword.errorRequired')
        } else if (currentPassword !== user.password) {
            errors.currentPassword = t('screen.changePassword.errorIncorrect')
        }
    
        if (!newPassword) {
            errors.newPassword = t('screen.changePassword.errorRequired')
        } else {
            if (newPassword.length < 8) {
                errors.newPassword = t('screen.changePassword.errorShort')
            } else if (newPassword === currentPassword) {
                errors.newPassword = t('screen.changePassword.errorMustDiffer')
            }
        }
    
        if (!confirmPassword) {
            errors.confirmPassword = t('screen.changePassword.errorRequired')
        } else if (newPassword !== confirmPassword) {
            errors.confirmPassword = t('screen.changePassword.errorMustMatch')
        }
    
        setErrors(errors)
    
        return Object.keys(errors).length === 0;
    }, [t]);
    

    const handleSubmit = useCallback(() => {
        if (validateForm()) {
            const newData = {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "password": confirmPassword
            }
            Alert.alert(t('screen.changePassword.alertTitle'), t('screen.changePassword.alertContent'));
            navigation.navigate("Profile");
        }
    }, [t]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                <View style={styles.sectionContainer}>
                    <FormItem 
                        label={t('screen.changePassword.labelCurrentPassword')}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder={t('screen.changePassword.phCurrentPassword')}
                        error={errors.currentPassword}
                    />

                    <FormItem 
                        label={t('screen.changePassword.labelNewPassword')}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder={t('screen.changePassword.phNewPassword')}
                        error={errors.newPassword}
                    />

                    <FormItem 
                        label={t('screen.changePassword.labelConfirmPassword')}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder={t('screen.changePassword.phConfirmPassword')}
                        error={errors.confirmPassword}
                    />
                </View>

                <MyButton title={t('screen.changePassword.btnChange')} onPress={handleSubmit} />
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
            //   secureTextEntry={true}
            />
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
    text: {
        fontFamily: Typeface.font,
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
    sectionContainer: {
        flexDirection: "column",
        gap: 10,
        marginVertical: 15,
    },
})