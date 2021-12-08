import React, { FC, ReactElement, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import ButtonComponent from '../components/Button';
import MusicGroup from '../components/MusicGroup';
import NavBar from '../components/NavBar';

interface IHome {
    children: ReactElement[]
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

const Home: FC<IHome> = ({
    children
}) => {
  const [musicGroups, setMusicGroups] = useState<IMusicGroup[]>([])

  return (
     <View style={styles.Home}>
        <View style={styles.Home}>
         <Image
           source={{uri: ''}}
         />
         Welcome
         <ButtonComponent title='⚙' onPress={() => null} />
         </View>
        {musicGroups.map((musicGroup, index) => (
          <MusicGroup groupId={musicGroup.id} musicGroupTitle={musicGroup.title} songs={musicGroup.songs} key={`musicGroup_${index}`} />
        ))}
        <NavBar>
        <ButtonComponent
          onPress={() => null}
          title="Home"
        />
        <ButtonComponent
          onPress={() => null}
          title="Favorites"
        />
        <ButtonComponent
          onPress={() => null}
          title="Search"
        />
        <ButtonComponent
          onPress={() => null}
          title="Profile"
        />
      </NavBar>
     </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
});
