import axios from 'axios';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View, Image, Text, Share } from 'react-native';
import Svg from '../components/Svg';

interface IMusic {
  setScreen: (screen: string) => void,
  setCurSong: (curSong: ISong) => void,
  curSong: ISong,
  handlePlayStop: () => void,
  isPlaying: boolean,
  user: IUser | null,
  setUser: (newUser: IUser) => void
}

interface IUser {
  _id: string,
  username: string,
  email: string,
  dateOfBirth: string,
  favorites: string[]
}

interface ISong {
	_id: string,
	title: string,
	artist: string,
	artwork: string,
	album: string,
	duration: number
}

interface IMusicGroup {
  id: string,
  title: string,
  songs: ISong[],
}

const Music: FC<IMusic> = ({
  setScreen,
  curSong,
  setCurSong,
  isPlaying,
  handlePlayStop,
  user,
  setUser
}) => {
  const [musicGroups, setMusicGroups] = useState<IMusicGroup[]>([])
  const [isFavorite, setIsFavorite] = useState(user?.favorites.includes(curSong._id.toString()) || false)

  const setHomeScreen = useCallback (() => {
    setScreen('home')
  },[])

  const handleShare = useCallback(() => {
    Share.share({
      message: `'${curSong.title}' by ${curSong.artist}`,
      url: curSong.artwork,
      title: 'Melus',
    }).catch((error) => {
      console.log(error.message);
    })
  }, [])

  const handleFavorite = useCallback(() => {
    if (user?.favorites.includes(curSong._id.toString())) {
      axios.post('http://localhost:8000/api/unfavorite', {songId: curSong._id, userId: user._id})
			.then((response) => {
        setIsFavorite(false)
				setUser({...user, favorites: user.favorites.filter(v => v !== curSong._id.toString())})
			})
			.catch((error) => {
				console.log(error.toString())
			})

      return
    }

    if (user) {
      axios.post('http://localhost:8000/api/favorite', {songId: curSong._id, userId: user._id})
      .then((response) => {
        setIsFavorite(true)
        user.favorites.push(curSong._id.toString())
        setUser(user)
      })
      .catch((error) => {
        console.log(error.toString())
      })
    }

  }, [user, curSong])

  return (
     <View style={styles.music}>
        <View style={styles.back}>
          <Svg
            onPress={setHomeScreen}
            type='arrowLeft'
          /> 
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: curSong.artwork}} />
        </View>
        <View style={styles.info}>
          <Text style={styles.songName}>{curSong.title}</Text>
          <Text style={styles.songInfo}>{curSong.artist} - {curSong.album}</Text>
        </View>
        <View style={styles.buttons} > 
          {isFavorite ?
            <Svg
              onPress={handleFavorite}
              type='filledHeart'
            />
          :
            <Svg
              onPress={handleFavorite}
              type='heart'
            />
          }
          <Svg
            onPress={handleShare}
            type='share'
          />
          <Svg
            onPress={() => {}}
            type='xCircle'
          />
        </View>
        <View style={styles.song} > 
          <Svg
            onPress={() => {}}
            type='skipBack'
            disabled={!user}
          />
          {isPlaying ?
            <Svg
              onPress={handlePlayStop}
              type={'pause'}
              isPlay
            />
          :
            <Svg
              onPress={handlePlayStop}
              type={'play'}
              isPlay
            />
          }
          <Svg
            onPress={() => {}}
            type='skipForward'
            disabled={!user}
          />
        </View>
     </View>
  );
}

export default Music;

const styles = StyleSheet.create({
  music: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column'
  },
  back: {
    width: '90%',
    display: 'flex',
    alignItems: 'flex-start'
  },
  imageContainer: {
    shadowColor: "#a73ae4",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 4,
  },
  image: {
    width: 300, 
    height: 300,
    borderRadius: 8,
  },
  info: {
    alignItems: 'center'
  },
  songName: {
    fontSize: 24,
    color: 'whitesmoke'
  },
  songInfo: {
    fontSize: 18,
    color: 'whitesmoke'
  },
  buttons: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%'
  },
  song: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%'
  }
});