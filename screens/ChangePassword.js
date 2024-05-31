import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, Alert} from 'react-native';

import MyButton from '../components/MyButton';
import { Typeface, Theme } from '../utils/Theme';
const { colors } = Theme;

export default function ChangePasswords({ navigation }) {
    // TODO: 
    // 1. Retrieve user data from the database @ const user
    // 2. Add logic to add updated password to the database @ const handleSubmit

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

    const validateForm = () => {
        let errors = {}
    
        if (!currentPassword) {
            errors.currentPassword = "This field is required."
        } else if (currentPassword !== user.password) {
            errors.currentPassword = "Incorrect password."
        }
    
        if (!newPassword) {
            errors.newPassword = "This field is required."
        } else {
            if (newPassword.length < 8) {
                errors.newPassword = "The password should be more than 8 character length."
            } else if (newPassword === currentPassword) {
                errors.newPassword = "New password should be different from the current password."
            }
        }
    
        if (!confirmPassword) {
            errors.confirmPassword = "This field is required."
        } else if (newPassword !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match."
        }
    
        setErrors(errors)
    
        return Object.keys(errors).length === 0;
    };
    

    const handleSubmit = () => {
        if (validateForm()) {
            const newData = {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "password": confirmPassword
            }
            console.log(newData); //Change to logic to save data to the database
            Alert.alert("Changes Saved.", "Your password have been changed successfully.");
            navigation.navigate("Profile");
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topContainer}>
                <View style={styles.sectionContainer}>
                    <FormItem 
                        label="Current Password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder={"Enter your current password"}
                        error={errors.currentPassword}
                    />

                    <FormItem 
                        label="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder={"Enter your new password"}
                        error={errors.newPassword}
                    />

                    <FormItem 
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder={"Confirm your new password"}
                        error={errors.confirmPassword}
                    />
                </View>

                <MyButton title="Change Password" onPress={handleSubmit} />
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