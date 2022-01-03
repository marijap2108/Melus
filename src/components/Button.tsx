import React, { FC } from 'react';
import { StyleSheet, Button } from 'react-native';

interface IButton {
    onPress: () => null | void,
    title: string,
    disabled?: boolean
}

const ButtonComponent: FC<IButton> = ({
    onPress,
    title,
    disabled
}) => {
  return (
      <Button 
        onPress={onPress}
        title={title}
        disabled={disabled}
        color={"gray"}
      />
  );
}

export default ButtonComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
