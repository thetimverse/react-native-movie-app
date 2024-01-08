import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/BottomNav';
import { registerRootComponent } from 'expo';

export default function App() {
  return (
    <Navigation />
  );
}