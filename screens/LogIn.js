import {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

import MyButton from '../components/MyButton';

import Theme from "../utils/Theme";
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    let errors = {}
    const errMsg = "This field is required."

    if (!email) errors.email = errMsg
    if (!password) errors.password = errMsg

    if (password.length < 8) {
      errors.password = "The password should be more than 8 character length.";
    }

    setErrors(errors)

    return Object.keys(errors).length === 0;
  }

  const handleSubmit = () => {
    if (validateForm()) {
      const formData = {
        "email": email,
        "password": password,
      }
      console.log(formData)
      navigation.navigate("LoggedIn")
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topContainer}>
        {/* Page Title */}
        <View>
          <Text style={[styles.pageHeader, styles.text]}> Log In </Text>
        </View>

        {/* Form */ }
        <View style={styles.formItem}>
            <Text style={[styles.text, styles.formItemText]}>E-mail</Text>
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
            <Text style={[styles.text, styles.formItemText]}>Password</Text>
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
            />
          </View>

        {/* Submit Button */ }
        <View style={styles.submit}>
          <MyButton title="Log In" onPress={handleSubmit} />
          <Text style={[styles.body, styles.text]}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={[styles.link, styles.text]}>Sign Up</Text>
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
    backgroundColor: "FDFDFD",
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