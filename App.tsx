import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import Authentication from './src/screens/Authentication';
import Home from './src/screens/Home';

export default function App() {

  const [screen, setScreen] = useState('home')
  
  useEffect(() => {
    AsyncStorage.getItem(
      'initial'
    ).then((value) => {
      if (!value) {
        setScreen('authentication')
      }
    });
  }, [])

  const handleSetScreen = useCallback((newScreen) => {
    setScreen(newScreen)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {screen === 'authentication' && <Authentication setScreen={handleSetScreen} />}
      {screen === 'home' && <Home />}
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
