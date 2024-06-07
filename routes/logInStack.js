import { Button, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Landing from "../screens/Landing";
import LogIn from "../screens/LogIn";
import SignUp from "../screens/SignUp";
// I dont know how to connect it with the pages after user logged in so I just put this file

// Import all colors defined in defaultColors.js
import Theme from "../utils/Theme";
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
});

const screens = {
  Welcome: {
    screen: Landing,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    }
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    }
  }  
}

function LoginPages() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={Landing} options={screens.Welcome.navigationOptions}/>
          <Stack.Screen name="LogIn" component={LogIn} options={screens.LogIn.navigationOptions}/>
          <Stack.Screen name="SignUp" component={SignUp} options={screens.SignUp.navigationOptions}/>
      </Stack.Navigator>
  )
}

//const UserLoginStack = createStackNavigator(screens);

//export default createAppContainer(UserLoginStack);
export default LoginPages;