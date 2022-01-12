import React, { FC, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable, FlatList } from 'react-native';

interface ISong {
	_id: string,
	title: string,
	artist: string,
	artwork: string,
	album: string,
	duration: number
}

interface IMusicGroup {
	groupId: string,
	musicGroupTitle: string,
	songs: ISong[],
	setScreen: (screen: string) => void,
  setCurSong: (curSong: ISong) => void,
}

const MusicGroup: FC<IMusicGroup> = ({
	groupId,
	musicGroupTitle,
	songs,
	setCurSong,
	setScreen,
}) => {

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
		<View style={styles.container}>
			<Text style={styles.text}>
				{musicGroupTitle}
			</Text>
			<FlatList horizontal data={songs} renderItem={renderSongs} keyExtractor={(_item, index) => index.toString()}  />
		</View>
	);
}

export default MusicGroup;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		margin: 8,
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 8,
	},
	text: {
		marginBottom: 12,
		fontSize: 16,
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
