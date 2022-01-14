import React, { FC } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

interface ISvg {
    onPress: () => void,
    title?: string,
    selected?: boolean,
    type: 'arrowLeft' | 'heart' | 'pause' | 'play' | 'share' | 'skipBack' | 'skipForward' | 'xCircle' | 'home' | 'profile' | 'settings' | 'search' | 'filledHeart' | 'edit',
    width?: number,
    height?: number,
    isPlay?: boolean,
    disabled?: boolean
}

const Svg: FC<ISvg> = ({
    onPress,
    title,
    type,
    width = 24,
    height = 24,
    selected,
    isPlay,
    disabled
}) => {
  const svgs = {
    arrowLeft: require('../../assets/arrow-left-circle.svg'),
    heart: require('../../assets/heart.svg'),
    pause: require('../../assets/pause.svg'),
    play: require('../../assets/play.svg'),
    share: require('../../assets/share.svg'),
    skipBack: require('../../assets/skip-back.svg'),
    skipForward: require('../../assets/skip-forward.svg'),
    xCircle: require('../../assets/x-circle.svg'),
    home: require('../../assets/home.svg'),
    profile: require('../../assets/user.svg'),
    settings: require('../../assets/settings.svg'),
    search: require('../../assets/search.svg'),
    filledHeart: require('../../assets/heartFilled.svg'),
    edit: require('../../assets/edit.svg')
  }

  return (
      <TouchableHighlight
        underlayColor="#a73ae466"
        style={isPlay ? styles.play : styles.svg}
        onPress={!disabled ? onPress : undefined}
      >
        <>
          <View style={disabled && styles.disabled}>
            <SvgUri
              source={svgs[type]}
              height={selected ? height + 2 : height}
              width={selected ? width + 2 : width}
            />
          </View>
          {title && <Text style={selected ? styles.selected : styles.unselected}>{title}</Text>}
          </>
      </TouchableHighlight>
  );
}

export default Svg;

const styles = StyleSheet.create({
  svg: {
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  play: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: 'whitesmoke',
    padding: 16,
    shadowColor: "#a73ae4",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
  },
  selected: {
    fontWeight: 'bold',
    color: 'whitesmoke'
  },
  unselected: {
    color: 'whitesmoke'
  },
  disabled: {
    opacity: 0.5,
  }
});
