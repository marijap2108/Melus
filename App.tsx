import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Authentification from './src/screens/Authentification';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Authentification />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
