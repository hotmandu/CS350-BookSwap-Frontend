import 'react-native-gesture-handler';
import React from 'react';
import i18n from './i18n/i18n';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import Navigator from "./routes/logInStack";
import ReqNavi from "./routes/requestStack";
import Test from './screens/Test';
import ProfilePages from './routes/profileStack';
import Stack from "./routes/Stack";
import BookshelfDetailStack from './routes/bookDetailsStack';

import BookshelfDetail from './screens/BookshelfDetail';

function App() {
  const [fontsLoaded] = useFonts({
    'Geist': require('./assets/fonts/Geist.ttf'),
  });

  return (
    <BookshelfDetailStack />
  );
}

export default App;

