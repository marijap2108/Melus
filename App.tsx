import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Authentication from './src/screens/Authentication'
import Favorite from './src/screens/Favorite'
import Home from './src/screens/Home'
import Music from './src/screens/Music'
import NavBar from './src/components/NavBar'
import Svg from './src/components/Svg'
import Sound from 'react-native-sound'
import Profile from './src/screens/Profile'

interface IUser {
  _id: string,
  username: string,
  email: string,
  favorites: string[]
}

interface ISong {
	_id: string,
	title: string,
	artist: string,
	artwork: string,
	album: string,
	duration: number,
  url: string,
}

Sound.setCategory('Playback');

export default function App() {

  const [screen, setScreen] = useState('home')
  const [user, setUser] = useState<IUser | null>(null)
  const [curSong, setCurSong] = useState<ISong | null>(null)
  const [playingSong, setPlayingSong] = useState<Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [songList, setSongList] = useState<ISong[]>([])
  const [next, setNext] = useState(false)

  const handlePlayStop = useCallback(() => {
    if (!playingSong) {
      return
    }
    if (playingSong.isPlaying()) {
      playingSong.pause()
      setIsPlaying(false)
    } else {
      playingSong.play((success) => {
        if (success) {
          setNext(true)
        }
      })
      setIsPlaying(true)
    }
  }, [playingSong])

  const handleSetUser = useCallback((newUser) => {
    setUser(newUser)
  }, [])

  const handleSetCurSong = useCallback((newSong) => {
    setCurSong(newSong)

    playingSong?.stop()
    setIsPlaying(false)

    const sound = new Sound(newSong.url,
    Sound.MAIN_BUNDLE,
    (error: any) => {
      if (error) {
        console.log(error)
      } else {
        console.log("Playing sound");
        setIsPlaying(true)
        sound.play((success) => {
          if (success) {
            setNext(true)
          }
        })
       setPlayingSong(sound)
      }
    });  
  }, [playingSong])

  const handleSetSongList = useCallback((newSongList) => {
    setSongList(newSongList)
  }, [])

  const handleSetScreen = useCallback((newScreen) => {
    setScreen(newScreen)
  }, [])

  const onPressSetScreen = useCallback((newScreen) => () => {
    setScreen(newScreen)
  }, [])

  const handleBack = useCallback(() => {
    const index = songList.findIndex(v => v._id === curSong?._id)
    if (index - 1 < 0) {
      handleSetCurSong(songList[songList.length - 1])
      return
    }
    handleSetCurSong(songList[index - 1])
  }, [handleSetCurSong, curSong, songList])

  const handleForward = useCallback(() => {
    const index = songList.findIndex(v => v._id === curSong?._id)
    if (index + 1 >= songList.length) {
      handleSetCurSong(songList[0])
      return
    }
    handleSetCurSong(songList[index + 1])
  }, [handleSetCurSong, curSong, songList])

  useEffect(()=>{
    if (next) {
      console.log('uso')
      setNext(false)
      handleForward()
    }
  }, [next, handleForward])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {screen === 'authentication' && <Authentication setScreen={handleSetScreen} setUser={handleSetUser} />}
      {screen === 'home' && <Home setScreen={handleSetScreen} setCurSong={handleSetCurSong} setSongList={handleSetSongList}  />}
      {screen === 'music' && curSong && <Music handleForward={handleForward} handleBack={handleBack} setUser={handleSetUser} user={user} setScreen={handleSetScreen} setCurSong={handleSetCurSong} curSong={curSong} handlePlayStop={handlePlayStop} isPlaying={isPlaying} />}
      {screen === 'favorites' && user && <Favorite curSong={curSong} user={user} setScreen={handleSetScreen} setCurSong={handleSetCurSong} setSongList={handleSetSongList}  />}
      {screen === 'profile' && user && <Profile setScreen={handleSetScreen} setUser={handleSetUser} user={user} />}
      {curSong && screen !== 'music' && screen !== 'authentication' &&
        <View style={styles.musicBar}>
          <Image style={styles.image} source={{uri: curSong.artwork}} />
          <Text onPress={onPressSetScreen('music')} numberOfLines={1} style={styles.text}>{curSong.title}</Text>
          <View style={styles.buttons}>
            <Svg
              onPress={handleBack}
              type='skipBack'
              disabled={!user}
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
              onPress={handleForward}
              type='skipForward'
              disabled={!user}
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
            onPress={onPressSetScreen(user ? 'favorites' : 'authentication')}
            type='heart'
            title="Favorites"
            selected={screen === 'favorites'}
          />
          <Svg
            onPress={onPressSetScreen(user ? 'profile' : 'authentication')}
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
