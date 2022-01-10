import React, { FC } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

interface IButton {
    onPress: () => null | void,
    title: string,
    disabled?: boolean,
    variant?: 'primary' | 'secondary' | 'text' 
}

const ButtonComponent: FC<IButton> = ({
    onPress,
    title,
    disabled,
    variant = 'primary'
}) => {
  return (
      <Pressable 
        style={styles[variant]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text>{title}</Text>
      </Pressable>
  );
}

export default ButtonComponent;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: 'lightblue',
    borderColor: 'whitesmoke',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: '4px',
    paddingHorizontal: '8px',
    borderRadius: 4
  },
  secondary: {
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: '4px',
    paddingHorizontal: '8px',
    borderRadius: 4
  },
  text: {
    paddingVertical: '4px',
    paddingHorizontal: '8px',
    borderRadius: 4
  }
});
