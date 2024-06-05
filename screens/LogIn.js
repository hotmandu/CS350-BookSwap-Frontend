import { useContext, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import MyButton from "../components/MyButton";

import Theme from "../utils/Theme";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from 'react-i18next';
// Import all colors defined in defaultColors.js
const { colors } = Theme;

export default function LogIn({ navigation }) {
  const context = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState("");
  const { t } = useTranslation();

  const validateForm = () => {
    let errors = {};
    const errMsg = t('screen.logIn.emailError');

    if (!email) errors.email = errMsg;
    if (!password) errors.password = errMsg;

    if (password.length < 8) {
      errors.password = t('screen.logIn.passwordError');
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const loginAPI = ({ email: email, password: password }) => {
    context.setLoading(true);
    fetch(
      "https://cs350-bookswap-backend-production.up.railway.app/account_api/token/",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => {
        context.setLoading(false);
        console.log(res)
        if (res.status != 200) {
          navigation.navigate("Error");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        context.setToken(data.access);
        navigation.navigate("TabPages", { screen: "Discover" });
      });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const formData = {
        email: email,
        password: password,
      };
      loginAPI(formData);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topContainer}>
        {/* Page Title */}
        <View>
          <Text style={[styles.pageHeader, styles.text]}> {t('screen.logIn.logIn')} </Text>
        </View>

        {/* Form */}
        <View style={styles.formItem}>
          <Text style={[styles.text, styles.formItemText, {height: 30}]}>{t('screen.logIn.email')}</Text>
          {/* Input Validation */}
          {errors.email ? (
            <Text style={[styles.formErr, styles.text, {height: 20}]}>{errors.email}</Text>
          ) : null}
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
          <Text style={[styles.text, styles.formItemText, {height: 30}]}>{t('screen.logIn.password')}</Text>
          {/* Input Validation */}
          {errors.password ? (
            <Text style={[styles.formErr, styles.text, {height: 20}]}>{errors.password}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            onChangeText={(pass) => setPassword(pass)}
            value={password}
            placeholder={t('screen.logIn.passwordPlaceholder')}
            placeholderTextColor="rgba(31, 30, 30, 0.4)"
            secureTextEntry={true}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.submit}>
          <MyButton title={t('screen.logIn.logIn')} onPress={handleSubmit} />
          <Text style={[styles.body, styles.text]}>
            {t('screen.logIn.accountAsk')}{" "}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LoginPages", { screen: "SignUp" })
              }
            >
              <Text style={[styles.link, styles.text]}>{t('screen.logIn.signUp')}</Text>
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
  link: {
    color: colors.PrimaryBlue,
    fontWeight: "700",
    bottom: -3,
  },
});
