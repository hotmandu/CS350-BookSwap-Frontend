// Navigation stack for book details screen (editable) and editing the users book details.

import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

import BookshelfDetail from '../screens/BookshelfDetail';
import EditBookshelfDetail from '../screens/EditBookshelfDetail';

// Import all colors defined in defaultColors.js
import Theme from "../utils/Theme";
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
  text: {
    fontFamily: "Geist",
  },
});

function BookshelfDetailStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Book Details"
          component={BookshelfDetail}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="EditBookshelfDetail"
          component={EditBookshelfDetail}
          options={{ 
            headerShown: true, 
            gestureEnabled: true,
            headerStyle: styles.header,
            headerTitle: "Edit Book Details",
            headerTitleStyle: styles.pageHeader,
            
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BookshelfDetailStack;
