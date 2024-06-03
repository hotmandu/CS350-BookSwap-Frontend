import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FlatList, SafeAreaView, StyleSheet, Image} from 'react-native';
import BookUnit from '../BookUnit';

import ProfilePages from "./profileStack";
import RequestPages from "./requestStack";

import Discover from "../screens/Discover";
import Search from "../screens/Search";
import BookDetails from '../screens/BookDetails';
import BookShelf from '../screens/BookShelf';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    safeAreaView: {flex: 1, flexWrap:"wrap", flexDirection: "row", padding: 10},
    Searchbar: {backgroundColor: "#FDFDFD", borderRadius: 11, fontSize: 16, padding: 10, color: "#1F1E1E"},
    Searchbar_rect: {backgroundColor: "#FDFDFD", fontSize: 16, padding: 10, color: "#1F1E1E", marginTop: 12},
    Searchbar_blue: {backgroundColor: "#FDFDFD", borderRadius: 11, fontSize: 20, padding: 10, color: "#2A4B87", fontWeight: "bold"},
    boldtext: {marginHorizontal: 2, marginBottom: 2, fontSize: 16, color: "#2A4B87", fontWeight: "bold"},
    boldtext_24: {fontSize: 24, color: "#2A4B87", fontWeight: "bold"},
    boldtext_20: {fontSize: 20, color: "#2A4B87", fontWeight: "bold"},
    text: {marginHorizontal: 2, marginBottom: 2, fontSize: 12},
    text_black: {fontSize: 16, color:"#1F1E1E"},
    box: {width: "40%", height: "45%", backgroundColor: "white", marginBottom: 10, marginHorizontal: 10},
    border: {borderWidth: 2, borderColor: "black"},
    button: {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 24},
    button_text: {fontSize: 12}
  });

function ProfileScreen() {
    return (
      <FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent={
      <SafeAreaView style={[styles.safeAreaView]}>
        <BookUnit name="A" author="Me" genre="comedy"/>
        <BookUnit name="b" author="You" genre="SF"/>
        <BookUnit name="b" author="You" genre="SF"/>
        <BookUnit name="b" author="You" genre="SF"/>
        <BookUnit name="b" author="You" genre="SF"/>
        <BookUnit name="b" author="You" genre="SF"/>
      </SafeAreaView>
        }
      />
    )
}

function TabBar() {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size}) => {
            //let thisIcon = home;
            if (route.name == "Discover") {
              return (
                <Image
                  source={focused? require('../assets/home_active.jpg') : require('../assets/home_inactive.jpg')}
                />
              );
            }
            if (route.name == "Request") {
              return (
                <Image
                  source={focused? require('../assets/request_active.jpg') : require('../assets/request_inactive.jpg')}
                />
              );
            }
            if (route.name == "Bookshelf") {
              return (
                <Image
                  source={focused? require('../assets/bookshelf_active.jpg') : require('../assets/bookshelf_inactive.jpg')}
                />
              );
            }
            if (route.name == "Profile") {
              return (
                <Image
                  source={focused? require('../assets/profile_active.jpg') : require('../assets/profile_inactive.jpg')}
                />
              );
            }
          }
        })}>
          <Tab.Screen name="Discover" component={Discover} options={{headerShown: false}}/>
          <Tab.Screen name="Request" component={RequestPages} options={{headerShown: false}}/>
          <Tab.Screen name="Bookshelf" component={BookShelf} options={{headerShown: false}}/>
          <Tab.Screen name="Profile" component={ProfilePages} options={{headerShown: false}}/>
        </Tab.Navigator>
      )
}

function TabBar2() {
    return (
      <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({ focused, color, size}) => {
          //let thisIcon = home;
          if (route.name == "Discover") {
            return (
              <Image
                source={focused? require('../assets/home_active.jpg') : require('../assets/home_inactive.jpg')}
              />
            );
          }
          if (route.name == "Request") {
            return (
              <Image
                source={focused? require('../assets/request_active.jpg') : require('../assets/request_inactive.jpg')}
              />
            );
          }
          if (route.name == "Bookshelf") {
            return (
              <Image
                source={focused? require('../assets/bookshelf_active.jpg') : require('../assets/bookshelf_inactive.jpg')}
              />
            );
          }
          if (route.name == "Profile") {
            return (
              <Image
                source={focused? require('../assets/profile_active.jpg') : require('../assets/profile_inactive.jpg')}
              />
            );
          }
        }
      })}>
        <Tab.Screen name="Discover" component={Search} options={{headerShown: false}}/>
        <Tab.Screen name="Request" component={RequestPages} options={{headerShown: false}}/>
        <Tab.Screen name="Bookshelf" component={BookShelf} options={{headerShown: false}}/>
        <Tab.Screen name="Profile" component={ProfilePages} options={{headerShown: false}}/>
      </Tab.Navigator>
    )
  }

function TabStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Discover_page" component={TabBar} options={{headerShown: false}}/>
            <Stack.Screen name="Search_page" component={TabBar2} options={{headerShown: false}}/>
            <Stack.Screen name="Book_page" component={BookDetails} options={{headerShown: false}}/>
        </Stack.Navigator>
      )
}

//const New_TabStack = createStackNavigator(TabBar);

//export default createAppContainer(New_TabStack);
export default TabStack;