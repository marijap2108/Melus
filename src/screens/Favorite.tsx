import React, { FC, useCallback, useState, useEffect } from 'react'
import { StyleSheet, View, Image, Text, FlatList, Pressable } from 'react-native'
import axios from 'axios'

interface IFavorite {
  setScreen: (screen: string) => void,
  setCurSong: (curSong: ISong) => void,
  user: IUser,
  setSongList: (newSongList: ISong[]) => void,
  curSong: ISong | null
}

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
  duration: number
}

const Home: FC<IFavorite> = ({
  setScreen,
  setCurSong,
  user,
  setSongList,
  curSong
}) => {
  const [songs, setSongs] = useState<ISong[]>([])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/songs/favorite?id=${user._id}`)
      .then((response) => {
        setSongs(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleSongPressed = useCallback((song) => () => {
    setSongList(songs)
		setCurSong(song)
		setScreen('music')
	}, [songs])

  const renderSongs = useCallback(({ item }) => (
		<Pressable onPress={handleSongPressed(item)} style={styles.song} >
			<Image
				style={styles.image}
				source={{ uri: item.artwork }}
			/>
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.artist}>
          By {item.artist} - {item.album}
        </Text>
      </View>
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
  )
}

export default Home

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
  song: {
    margin: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 8,
  },
  image: {
		width: 80,
		height: 80,
		borderRadius: 4,
    margin: 4
	},
  info: {
    marginHorizontal: 8,
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
	title: {
    fontWeight: 'bold',
		fontSize: 18,
		width: 160,
		color: 'whitesmoke'
	},
	artist: {
		opacity: 0.8,
		fontSize: 12,
		color: 'whitesmoke'
	}
});
