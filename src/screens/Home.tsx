import React, { FC, useCallback, useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import MusicGroup from '../components/MusicGroup'
import Svg from '../components/Svg'
import axios from 'axios'
import Input from '../components/Input'

interface IHome {
  setScreen: (screen: string) => void,
  setCurSong: (curSong: ISong) => void,
  setSongList: (newSongList: ISong[]) => void
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

const Home: FC<IHome> = ({
  setScreen,
  setCurSong,
  setSongList
}) => {
  const [musicGroups, setMusicGroups] = useState<IMusicGroup[]>([])
  const [search, setSearch] = useState(0)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/initial`)
      .then((response) => {
        setMusicGroups(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleSearch = useCallback(() => {
    if (!search) {
      setSearch(1)
      return
    }
    setSearch(0)
  }, [search])

  return (
    <View style={styles.home}>
      <View style={styles.header}>
        <View style={styles.left}>
          {search ?
            <Input onBlur={handleSearch} />
          :
            <Text style={styles.headerText}>
              Welcome to MELUS!
            </Text>
          }
        </View>
        <Svg
          type='search'
          onPress={handleSearch}
        />
      </View>
      <ScrollView>
        {musicGroups.map((musicGroup, index) => (
          <MusicGroup setSongList={setSongList} setScreen={setScreen} setCurSong={setCurSong} groupId={musicGroup.id} musicGroupTitle={musicGroup.title} songs={musicGroup.songs} key={`musicGroup_${index}`} />
        ))}
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  home: {
    flex: 1
  },
  header: {
    marginTop: 40,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 42,
    paddingBottom: 8
  },
  left: {
    flex: 1
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'whitesmoke'
  }
});
