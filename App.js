import React from 'react';
import Navigator from "./routes/logInStack";
import ReqNavi from "./routes/requestStack";
import BookDetails from './screens/BookDetails';
import Test from './screens/Test';
import Error from './screens/Error';
import Chat from './screens/Chat';
import msgData from './utils/msgData';

function App() {
  return (
    // <Navigator />
    // <ReqNavi />
    // <BookDetails />
    // <Test />
    // <Confirm />
    // <Error />
    
    // Change input to messages history and book data from the database
    <Chat msgData={msgData} bookData={{
      owner: "John Doe",
      title: "The Diary of A Young Girl",
      author: "Anne Frank",
    }}/>
  );
}

export default App;

