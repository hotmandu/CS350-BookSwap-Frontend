import 'react-native-gesture-handler';
import React from 'react';
import i18n from './i18n/i18n';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import Navigator from "./routes/logInStack";
import ReqNavi from "./routes/requestStack";
import Test from './screens/Test';
import ProfilePages from './routes/profileStack';
import TheStack from "./routes/Stack";
import AuthProvider from './context/AuthContext';

import RequestDetails from './screens/RequestDetails';
import Bookshelf from './screens/BookShelf';

function App() {
  return (
    <AuthProvider>
      <TheStack />
    </AuthProvider>
  );
}

export default App;

