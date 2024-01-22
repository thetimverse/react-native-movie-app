import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import { styles, theme } from '../theme';
import { HomeIcon, HeartIcon, UserCircleIcon } from 'react-native-heroicons/solid';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import ShowScreen from '../screens/ShowScreen';
import ActorScreen from '../screens/ActorScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AllMoviesScreen from '../screens/AllMoviesScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home"  options={{headerShown: false}} component={HomeScreen} />
        <HomeStack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
        <HomeStack.Screen name="AllMovies" options={{headerShown: false}} component={AllMoviesScreen} />
        <HomeStack.Screen name="Shows" options={{headerShown: false}} component={ShowScreen} />
        <HomeStack.Screen name="Actor" options={{headerShown: false}} component={ActorScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'HomeScreen') {
                      iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Favorite') {
                      iconName = focused ? 'ios-heart' : 'ios-heart';
                    } else if (route.name === 'Search') {
                      iconName = focused ? 'ios-search' : 'ios-search';
                    } else if (route.name === 'Profile') {
                      iconName = focused ? 'person' : 'person';
                    }
        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#eab308',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: '#171717', borderTopColor:'#171717'}
            })}
      >
        <Tab.Screen name="HomeScreen"  options={{headerShown: false}} component={HomeStackScreen} />
        <Tab.Screen name="Favorite"  options={{headerShown: false}} component={FavoriteScreen} />
        <Tab.Screen name="Search"  options={{headerShown: false}} component={SearchScreen} />
        <Tab.Screen name="Profile"  options={{headerShown: false}} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}