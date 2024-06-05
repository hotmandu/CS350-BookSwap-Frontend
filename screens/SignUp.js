import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, Linking, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";

import MyButton from '../components/MyButton';

import Theme from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function SignUp({ navigation }) {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    let errors = {}
    const errMsg = "This field is required."

    if (!firstName) errors.firstName = errMsg
    if (!lastName) errors.lastName = errMsg
    if (!email) errors.email = errMsg
    if (!password) errors.password = errMsg

    if (password.length < 8) {
      errors.password = "The password should be more than 8 character length.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.email = "This should be an email adress.";
    }

    setErrors(errors)

    return Object.keys(errors).length === 0;
  }

  const registerAPI = ({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  }) => {
    fetch("https://cs350-bookswap-backend-production.up.railway.app/account_api/register/", {
      method: "POST",
      body: JSON.stringify({
        "first_name": firstName,
        "last_name":lastName,
        "email": email,
        "password": password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => {
      console.log(res)
      if (res.status == 200) {
        navigation.navigate("LoginPages", {screen: "LogIn"})
      } else {
        navigation.navigate("Error")
      }
    });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const formData = {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password,
      }
      registerAPI(formData)
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topContainer}>
        {/* Page Title */}
        <View>
          <Text style={[styles.pageHeader, styles.text]}>{t('screen.signUp.title')}</Text>
        </View>

        {/* Form */ }
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Text style={[styles.text, styles.formItemText]}>{t('screen.signUp.firstName')}</Text>
            {/* Input Validation */}
            {
              errors.firstName ? <Text style={[styles.formErr, styles.text]}>{errors.firstName}</Text> : null
            }
            <TextInput
              style={styles.input}
              onChangeText={setFirstName}
              value={firstName}
              placeholder="John"
              placeholderTextColor="rgba(31, 30, 30, 0.4)"
            />
          </View>

          <View style={styles.formItem}>
            <Text style={[styles.text, styles.formItemText]}>{t('screen.signUp.lastName')}</Text>
            {/* Input Validation */}
            {
              errors.lastName ? <Text style={[styles.formErr, styles.text]}>{errors.lastName}</Text> : null
            }
            <TextInput
              style={styles.input}
              onChangeText={setLastName}
              value={lastName}
              placeholder="Doe"
              placeholderTextColor="rgba(31, 30, 30, 0.4)"
            />
          </View>
          

          <View style={styles.formItem}>
            <Text style={[styles.text, styles.formItemText]}>{t('screen.signUp.email')}</Text>
            {/* Input Validation */}
            {
              errors.email ? <Text style={[styles.formErr, styles.text]}>{errors.email}</Text> : null
            }
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="john.doe@example.com"
              placeholderTextColor="rgba(31, 30, 30, 0.4)"
              inputMode="email"
            />
          </View>
          
            
          <View style={styles.formItem}>
            <Text style={[styles.text, styles.formItemText]}>{t('screen.signUp.password')}</Text>
            {/* Input Validation */}
            {
              errors.password ? <Text style={[styles.formErr, styles.text]}>{errors.password}</Text> : null
            }
            <TextInput
              style={styles.input}
              onChangeText={(pass) => setPassword(pass)}
              value={password}
              placeholder="> 8 characters"
              placeholderTextColor="rgba(31, 30, 30, 0.4)"
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Submit Button */ }
        <View style={styles.submit}>
          <MyButton title={t('screen.signUp.title')} onPress={handleSubmit} />
          <Text style={[styles.body, styles.text]}>
            {t('screen.signUp.haveAccount')}{' '}
            <TouchableOpacity onPress={() => navigation.navigate("LoginPages", {screen: "LogIn"})}>
              <Text style={[styles.link, styles.text]}>{t('screen.logIn.title')}</Text>
            </TouchableOpacity>
          </Text>
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
  pageHeader: {
    fontSize: 32,
    fontWeight: "700",
    left: -5,
    marginVertical: 15,
    color: colors.PrimaryBlue,
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
  text: {
    fontFamily: "Geist",
  },
  formItemText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.PrimaryBlue,
  },
  formItem: {
    marginVertical: 5,
  },
  formErr: {
    color: "red",
    marginTop: 3,
  },
  submit: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  link : {
    color: colors.PrimaryBlue,
    fontWeight: "700",
    bottom: -3,
  },
});