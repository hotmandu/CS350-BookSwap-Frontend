import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

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

function RequestStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Received" component={ReceivedReqs} options={screens.Received.navigationOptions}/>
            <Stack.Screen name="Sent" component={SentReqs} options={screens.Sent.navigationOptions}/>
            <Stack.Screen name="Matched" component={MatchedReqs} options={screens.Matched.navigationOptions}/>
        </Stack.Navigator>
    )
}

//const ExchangeRequestStack = createStackNavigator(screens);

//export default createAppContainer(ExchangeRequestStack);
export default RequestStack;