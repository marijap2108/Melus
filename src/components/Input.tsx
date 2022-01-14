import React, { FC } from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface IInput {
    isError?: boolean
}

const Input: FC<IInput & any> = ({
    isError,
    ...props
}) => {
  return (
      <TextInput 
        style={isError ? styles.error : styles.normal}
        {...props}
      />
  );
}

export default Input;

const styles = StyleSheet.create({
  error: {
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginVertical: 4,
    color: 'whitesmoke',
    backgroundColor: '#592f8144',
  },
  normal: {
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginVertical: 4,
    color: 'whitesmoke',
    backgroundColor: '#592f8144',
  }
});
