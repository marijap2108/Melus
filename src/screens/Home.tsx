import React, { FC, ReactElement, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import ButtonComponent from '../components/Button';
import MusicGroup from '../components/MusicGroup';

interface IHome {
    children: ReactElement[]
}

const Home: FC<IHome> = ({
    children
}) => {
  const [musicGroups, setMusicGroups] = useState([])

  return (
     <View style={styles.Home}>
         <View style={styles.Home}>
          <Image
            source={{uri: ''}}
          />
          Welcome
          <ButtonComponent title='⚙' onPress={() => null} />
         </View>
        
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
