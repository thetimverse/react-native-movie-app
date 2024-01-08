import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import MovieScreen from '../screens/MovieScreen';
import HomeScreen from '../screens/HomeScreen';
import ActorScreen from '../screens/ActorScreen';
import SearchScreen from '../screens/SearchScreen';
import ShowScreen from '../screens/ShowScreen';

// const Stack = createNativeStackNavigator();

// export default function Navigation() {
//     return (
//         <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
//           <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
//           <Stack.Screen name="Shows" options={{headerShown: false}} component={ShowScreen} />
//           <Stack.Screen name="Actor" options={{headerShown: false}} component={ActorScreen} />
//           <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     )
// }

