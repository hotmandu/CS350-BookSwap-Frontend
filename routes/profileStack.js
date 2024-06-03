import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { Theme } from '../utils/Theme';
const { colors } = Theme;

//Get the pages
import Profile from '../screens/Profile';
import AccountDetails from '../screens/AccountDetails';
import ChangePasswords from '../screens/ChangePassword';
import Language from "../screens/Language";

const screens = {
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
          }
    },
    AccountDetails: {
        screen: AccountDetails,
        navigationOptions: {
            headerShown: true,
            gestureEnabled: false,
            title: "Account Details",
            headerStyle: {
                backgroundColor: "#f9f9f9",
                shadowColor: "#f9f9f9",
                elevation: 1,
            },
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "700",
                color: colors.PrimaryBlue,
            },
            headerTintColor: colors.PrimaryBlue,
        }
    },
    ChangePasswords: {
        screen: ChangePasswords,
        navigationOptions: {
            headerShown: true,
            gestureEnabled: false,
            title: "Change Password",
            headerStyle: {
                backgroundColor: "#f9f9f9",
                shadowColor: "#f9f9f9",
                elevation: 1,
            },
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "700",
                color: colors.PrimaryBlue,
            },
            headerTintColor: colors.PrimaryBlue,
        }
    },
    Language: {
        screen: Language,
        navigationOptions: {
            headerShown: true,
            gestureEnabled: false,
            title: "Language",
            headerStyle: {
                backgroundColor: "#f9f9f9",
                shadowColor: "#f9f9f9",
                elevation: 1,
            },
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "700",
                color: colors.PrimaryBlue,
            },
            headerTintColor: colors.PrimaryBlue,
        }
    }

}

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={screens.Profile.navigationOptions}/>
            <Stack.Screen name="AccountDetails" component={AccountDetails} options={screens.AccountDetails.navigationOptions}/>
            <Stack.Screen name="ChangePasswords" component={ChangePasswords} options={screens.ChangePasswords.navigationOptions}/>
            <Stack.Screen name="Language" component={Language} options={screens.Language.navigationOptions}/>
        </Stack.Navigator>
    )
}

//const ProfilePages = createStackNavigator(screens);

//export default createAppContainer(ProfilePages);
export default ProfileStack;
