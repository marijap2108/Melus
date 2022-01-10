import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Authentication from './src/screens/Authentication'
import Home from './src/screens/Home'
//import SoundPlayer from 'react-native-sound-player'

interface IUser {
  _id: string,
  username: string,
  email: string,
  dateOfBirth: string
}

export default function App() {

  const [screen, setScreen] = useState('home')
  const [user, setUser] = useState<IUser | null>(null)

  const handleSetUser = useCallback((newUser) => {
    console.log(newUser)
    setUser(newUser)
  }, [])

  // useEffect(() => {
  //   try {
  //     SoundPlayer.playSoundFile('Circles', 'mp3')
  //   } catch (e) {
  //     console.log(`cannot play the sound file`, e)
  //   }
  // }, [])

  const handleSetScreen = useCallback((newScreen) => {
    setScreen(newScreen)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{user?.username}</Text>
      {screen === 'authentication' && <Authentication setScreen={handleSetScreen} setUser={handleSetUser} />}
      {screen === 'home' && <Home setScreen={handleSetScreen} />}
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
