import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from './src/components/Button';
import NavBar from './src/components/NavBar';

export default function App() {
  return (
    <View style={styles.container}>
      <NavBar>
        <ButtonComponent
          onPress={() => null}
          title="Home"
        />
        <ButtonComponent
          onPress={() => null}
          title="Favorites"
        />
        <ButtonComponent
          onPress={() => null}
          title="Search"
        />
        <ButtonComponent
          onPress={() => null}
          title="Profile"
        />
      </NavBar>
      <StatusBar style="auto" />
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
