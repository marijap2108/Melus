import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import ButtonComponent from '../components/Button';

interface IMusic {
  setScreen: (screen: string) => void
}
interface ISong {
    songId: string,
    songTitle: string,
    artist: string,
    image: string
}
interface IMusicGroup {
  id: string,
  title: string,
  songs: ISong[]
}

const Music: FC<IMusic> = ({
  setScreen
}) => {
  const [musicGroups, setMusicGroups] = useState<IMusicGroup[]>([])

  const setHomeScreen = useCallback (() => {
    setScreen('home')
  },[])

  return (
     <View style={styles.Music}>
        <View>
          <ButtonComponent onPress={setHomeScreen} title='Back' /> 
        </View>
        <View>
          <Image source={{uri: 'https://reactjs.org/logo-og.png'}} style={{width: 400, height: 400}} />
        </View>
        <View>
          <SvgUri
            width="200"
            height="200"
            source={require('../../assets/heart.svg')}
          />
          <SvgUri
            width="200"
            height="200"
            source={require('../../assets/share-2.svg')}
          />
          <SvgUri
            width="200"
            height="200"
            source={require('../../assets/x-circle.svg')}
          />
        </View>
        <View>

        </View>
     </View>
  );
}

export default Music;

const styles = StyleSheet.create({
  Music: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
});