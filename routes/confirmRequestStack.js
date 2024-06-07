import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

import ConfirmRequest from "../screens/ConfirmRequest";
import SentReqs from "../screens/SentReqs";

// Import all colors defined in defaultColors.js
import Theme from "../utils/Theme";
const { colors, Typeface } = Theme;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.PrimaryBlue,
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  pageHeader: {
    fontSize: 32,
    fontWeight: "700",
    left: -5,
    marginVertical: 15,
    color: colors.White,
  },
});

function ConfirmRequestStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ConfirmRequest"
        component={ConfirmRequest}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="SentReqs"
        component={SentReqs}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}

export default ConfirmRequestStack;
