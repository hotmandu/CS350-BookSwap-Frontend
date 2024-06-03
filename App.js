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


function App() {
  return (
    // <Navigator />
    // <ReqNavi />
    // <BookDetails />
    // <Test />
    // <Confirm />
    // <Error />
    
    // Change input to messages history and book data from the database
    // <Chat msgData={msgData} bookData={{
    //   owner: "John Doe",
    //   title: "The Diary of A Young Girl",
    //   author: "Anne Frank",
    // }}/>

    // <Profile />
    <ProfilePages />
    // <AccountDetails />
    // <ChangePasswords />
  );
}

export default App;

