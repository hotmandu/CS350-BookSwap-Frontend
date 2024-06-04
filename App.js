import 'react-native-gesture-handler';
import React from 'react';
import i18n from './i18n/i18n';

import Navigator from "./routes/logInStack";
import ReqNavi from "./routes/requestStack";
import BookDetails from './screens/BookDetails';
import Test from './screens/Test';
import Error from './screens/Error';
import Chat from './screens/Chat';
import msgData from './utils/msgData';
import Profile from './screens/Profile';
import AccountDetails from './screens/AccountDetails';
import ProfilePages from './routes/profileStack';
import ChangePasswords from './screens/ChangePassword';
import Stack from "./routes/Stack";
import { useFonts } from 'expo-font';
import AuthProvider from './context/AuthContext';


function App() {
  const [fontsLoaded] = useFonts({
    'Geist': require('./assets/fonts/Geist.ttf'),
  });

  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}

export default App;

