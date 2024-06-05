import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

//Get the pages
import SentReqs from '../screens/SentReqs';
import ReceivedReqs from '../screens/ReceivedReqs';
import MatchedReqs from '../screens/MatchedReqs';
import RequestDetails from '../screens/RequestDetails';
import RequestStatus from '../screens/RequestStatus';
import Bookshelf from '../screens/BookShelf';
import Test from '../screens/Test'; //--PLACEHOLDER
import CancelRequest from '../screens/CancelRequest';

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
    },
    RequestDetails: {   // for received requests
        screen: RequestDetails,
        navigationOptions: {
            headerShown: true,
            gestureEnabled: true,
          }
    },
    CancelRequest: {    // for sent requests
        screen: CancelRequest,
        navigationOptions: {
            headerShown: true,
            gestureEnabled: true,
        }
    },
    Bookshelf: {
        screen: Bookshelf,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
        }
    },
    Test: {
        screen: Test,
        navigationOptions: {
            headerShown: true,
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
                <Stack.Screen name="Received Request" component={RequestDetails} options={screens.RequestDetails.navigationOptions}/>
                <Stack.Screen name="Sent Request" component={CancelRequest} options={screens.CancelRequest.navigationOptions}/>
                <Stack.Screen name="Bookshelf" component={Bookshelf} options={screens.Bookshelf.navigationOptions}/>
                {/* --PLACEHOLDER-- */}
                <Stack.Screen name="Test" component={Test} options={screens.Test.navigationOptions}/>
            </Stack.Navigator>
    )
}

//const RequestStack = createStackNavigator(screens);

//export default createAppContainer(ExchangeRequestStack);
export default RequestStack;