import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View, Image, Text, Share } from 'react-native';
import Svg from '../components/Svg';

interface IMusic {
  setScreen: (screen: string) => void,
  setCurSong: (curSong: ISong) => void,
  curSong: ISong,
  handlePlayStop: () => void,
  isPlaying: boolean
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
  songs: ISong[]
}

const Music: FC<IMusic> = ({
  setScreen,
  curSong,
  setCurSong,
  isPlaying,
  handlePlayStop
}) => {
  const [musicGroups, setMusicGroups] = useState<IMusicGroup[]>([])

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
          <Svg
            onPress={() => {}}
            type='heart'
          />
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