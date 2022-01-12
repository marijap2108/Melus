import React, { FC, useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import MusicGroup from '../components/MusicGroup';
import Svg from '../components/Svg'
import axios from 'axios'

interface IHome {
  setScreen: (screen: string) => void,
  setCurSong: (curSong: ISong) => void
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
  setCurSong
}) => {
  const [musicGroups, setMusicGroups] = useState<IMusicGroup[]>([])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/initial`)
      .then((response) => {
        setMusicGroups(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <View style={styles.header}>
        <View>
          {/* <Image
            source={{ uri: '' }}
          /> */}
          <Text style={styles.headerText}>
            Welcome to MELUS!
          </Text>
        </View>
        <Svg
          type='search'
          onPress={() => {}}
        />
      </View>
      <ScrollView>
        {musicGroups.map((musicGroup, index) => (
          <MusicGroup setScreen={setScreen} setCurSong={setCurSong} groupId={musicGroup.id} musicGroupTitle={musicGroup.title} songs={musicGroup.songs} key={`musicGroup_${index}`} />
        ))}
      </ScrollView>
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
  }
});
