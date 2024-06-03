import { Button, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import LoginPages from "./logInStack";
import ProfilePages from "./profileStack";
import TabPages from "./TabStack";

import Theme from "../utils/Theme";
import { NavigationContainer } from '@react-navigation/native';
const { colors } = Theme;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.PrimaryBlue,
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  pageHeader: {
    fontSize: 32,
    fontWeight: "700",
    left: -5,
    marginVertical: 15,
    color: colors.White,
  },
  text: {
    fontFamily: "Geist",
  },
});

function TheStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginPages" component={LoginPages}/>
                <Stack.Screen name="TabPages" component={TabPages}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


//const UserStack = createStackNavigator({Navigator, ProfilePages, TabPages}, {headerMode: 'none'});

//export default createAppContainer(UserStack);
export default TheStack;