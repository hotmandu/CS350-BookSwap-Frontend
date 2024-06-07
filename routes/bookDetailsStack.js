// Navigation stack for book details screen (editable) and editing the users book details.

import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

import BookshelfDetail from '../screens/BookshelfDetail';
import EditBookshelfDetail from '../screens/EditBookshelfDetail';

// Import all colors defined in defaultColors.js
import Theme from "../utils/Theme";
import AddBookScreen from '../screens/AddBook';
import { useTranslation } from 'react-i18next';
const { colors } = Theme;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.White,
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  pageHeader: {
    fontSize: 18,
    left: -5,
    marginVertical: 15,
    color: colors.PrimaryBlue,
  },
});

function BookshelfDetailStack() {
  const { t } = useTranslation();

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Book Details"
          component={BookshelfDetail}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="AddBookPage"
          component={AddBookScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="EditBookshelfDetail"
          component={EditBookshelfDetail}
          options={{ 
            headerShown: true, 
            gestureEnabled: true,
            headerStyle: styles.header,
            headerTitle: t("route.bookDetails.editBookshelfDetail"),
            headerTitleStyle: styles.pageHeader,
            
        }}
        />
      </Stack.Navigator>
  );
}

export default BookshelfDetailStack;
