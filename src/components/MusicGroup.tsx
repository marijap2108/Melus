import React, { FC } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

interface ISong {
    songId: string,
    songTitle: string,
    artist: string,
    image: string
}

interface IMusicGroup {
    groupId: string,
    musicGroupTitle: string,
    songs: ISong[]
}

const MusicGroup: FC<IMusicGroup> = ({
    groupId,
    musicGroupTitle,
    songs
}) => {
  return (
      <View>
        <Text>
            {musicGroupTitle}
        </Text>
        <View>
            {songs.map((song:ISong) => (
                <Pressable>
                    <Image
                        style={styles.image}
                        source={{uri: song.image}}
                    />
                    <Text>
                        {song.songTitle}
                    </Text>
                    <Text>
                        {song.artist}
                    </Text>
                </Pressable>
            ))}
        </View>
      </View>
  );
}

export default MusicGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
      
  }
});
