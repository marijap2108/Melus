import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Authentication from './src/screens/Authentication'
import Home from './src/screens/Home'
import Music from './src/screens/Music'
import NavBar from './src/components/NavBar';
import Svg from './src/components/Svg'
import Sound from 'react-native-sound'
interface IUser {
  _id: string,
  username: string,
  email: string,
  dateOfBirth: string
}

interface ISong {
	_id: string,
	title: string,
	artist: string,
	artwork: string,
	album: string,
	duration: number
}

Sound.setCategory('Playback');

export default function App() {

  const [screen, setScreen] = useState('home')
  const [user, setUser] = useState<IUser | null>(null)
  const [curSong, setCurSong] = useState<ISong | null>(null)
  const [playingSong, setPlayingSong] = useState<Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const sound = new Sound('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    undefined,
    (error: any) => {
      if (error) {
        console.log(error)
      } else {
        console.log("Playing sound");
       setPlayingSong(sound)
      }
    });
  }, [])

  const handlePlayStop = useCallback(() => {
    if (!playingSong) {
      return
    }
    if (playingSong.isPlaying()) {
      playingSong.pause()
      setIsPlaying(false)
    } else {
      playingSong.play()
      setIsPlaying(true)
    }
  }, [playingSong])

  const handleSetUser = useCallback((newUser) => {
    setUser(newUser)
  }, [])

  const handleSetCurSong = useCallback((newSong) => {
    setCurSong(newSong)
  }, [])

  const handleSetScreen = useCallback((newScreen) => {
    setScreen(newScreen)
  }, [])

  const onPressSetScreen = useCallback((newScreen) => () => {
    setScreen(newScreen)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {screen === 'authentication' && <Authentication setScreen={handleSetScreen} setUser={handleSetUser} />}
      {screen === 'home' && <Home setScreen={handleSetScreen} setCurSong={handleSetCurSong} />}
      {screen === 'music' && curSong && <Music setScreen={handleSetScreen} setCurSong={handleSetCurSong} curSong={curSong} handlePlayStop={handlePlayStop} isPlaying={isPlaying} />}
      {curSong && screen !== 'music' &&
        <View style={styles.musicBar}>
          <Image style={styles.image} source={{uri: curSong.artwork}} />
          <Text onPress={onPressSetScreen('music')} numberOfLines={1} style={styles.text}>{curSong.title}</Text>
          <View style={styles.buttons}>
            <Svg
              onPress={() => {}}
              type='skipBack'
            />
            {isPlaying ?
              <Svg
                onPress={handlePlayStop}
                type={'pause'}
              />
            :
              <Svg
                onPress={handlePlayStop}
                type={'play'}
              />
            }
            <Svg
              onPress={() => {}}
              type='skipForward'
            />
          </View>
        </View>
      }
      <View style={styles.footer}>
        <NavBar>
          <Svg
            onPress={onPressSetScreen('home')}
            type='home'
            title="Home"
            selected={screen === 'home'}
          />
          <Svg
            onPress={onPressSetScreen('favorites')}
            type='heart'
            title="Favorites"
            selected={screen === 'favorites'}
          />
          <Svg
            onPress={onPressSetScreen('settings')}
            type='settings'
            title="settings"
            selected={screen === 'settings'}
          />
          <Svg
            onPress={onPressSetScreen('authentication')}
            type='profile'
            title="Profile"
            selected={screen === 'authentication'}
          />
        </NavBar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e0f2f'
  },
  musicBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
    backgroundColor: '#28193c',
    margin: 12,
    borderRadius: 8,
    shadowColor: "#a73ae4",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    height: 60,
    width: 60
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    width: '40%',
    paddingHorizontal: 12,
    paddingVertical: 20,
    color: 'whitesmoke'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  footer: {
    height: 60,
    marginBottom: 20
  }
});
