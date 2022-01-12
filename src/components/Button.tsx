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
        <Text style={styles.inner}>{title}</Text>
      </Pressable>
  );
}

export default ButtonComponent;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: '#9532ce',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  secondary: {
    borderColor: '#592f81',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4
  },
  text: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4
  },
  inner: {
    textAlign: 'center',
    color: 'whitesmoke'
  }
});
