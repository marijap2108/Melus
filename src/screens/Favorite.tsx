import React, { FC, useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, FlatList, Pressable } from 'react-native';
import MusicGroup from '../components/MusicGroup';
import Svg from '../components/Svg'
import axios from 'axios'

interface IHome {
  setScreen: (screen: string) => void,
  setCurSong: (curSong: ISong) => void,
  user: IUser
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

const Home: FC<IHome> = ({
  setScreen,
  setCurSong,
  user
}) => {
  const [songs, setSongs] = useState<ISong[]>([])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/songs/favorite?id=${user._id}`)
      .then((response) => {
        setSongs(response.data)
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleSongPressed = useCallback((song) => () => {
		setCurSong(song)
		setScreen('music')
	}, [])

  const renderSongs = useCallback(({ item }) => (
		<Pressable onPress={handleSongPressed(item)} style={{marginRight: 8}} >
			<Image
				style={styles.image}
				source={{ uri: item.artwork }}
			/>
			<Text numberOfLines={1} style={styles.title}>
				{item.title}
			</Text>
			<Text style={styles.artist}>
				{item.artist}
			</Text>
		</Pressable>
	), [])

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Favorites
        </Text>
      </View>
      <FlatList data={songs} renderItem={renderSongs} keyExtractor={(_item, index) => index.toString()}  />
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 42,
    paddingBottom: 8
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'whitesmoke'
  },
  image: {
		width: 120,
		height: 120,
		borderRadius: 4
	},
	title: {
    fontWeight: 'bold',
		fontSize: 12,
		width: 120,
		color: 'whitesmoke'
	},
	artist: {
		opacity: 0.8,
		fontSize: 12,
		color: 'whitesmoke'
	}
});
