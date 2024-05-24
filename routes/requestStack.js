import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

//Get the pages
import SentReqs from '../screens/SentReqs';
import ReceivedReqs from '../screens/ReceivedReqs';
import MatchedReqs from '../screens/MatchedReqs';

const screens = {
    Received: {
        screen: ReceivedReqs,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
          }
    },
    Sent: {
        screen: SentReqs,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
          }
    },
    Matched: {
        screen: MatchedReqs,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
          }
    }
}

const ExchangeRequestStack = createStackNavigator(screens);

export default createAppContainer(ExchangeRequestStack);
