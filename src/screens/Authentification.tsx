import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ButtonComponent from '../components/Button';

export default function Authentification() {
  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
    </View>
  );
}

const Welcome = () => {
    return (
        <View>
            <View>
                <Text>Welcome</Text>
                <ButtonComponent onPress={() => null} title='Log In' />
                <ButtonComponent onPress={() => null} title='Sign Up' />
            </View>
            <ButtonComponent onPress={() => null} title='No, thanks' />
        </View>
    );
}

const SignUp = () => {
    return (
        <View>
            <View>
                <Text>Username:</Text>
                <TextInput />
                <Text>Datum rodjenja:</Text>
                <TextInput />
                <Text>E-mail:</Text>
                <TextInput />
                <Text>Password:</Text>
                <TextInput />
                <Text>Confirm password:</Text>
                <TextInput />
            </View>
            <ButtonComponent onPress={() => null} title='Sign Up' />
            <ButtonComponent onPress={() => null} title='Log In' />
        </View>
    )
}

const LogIn = () => {
    return (
        <View>
            <View>
                <Text>E-mail:</Text>
                <TextInput />
                <Text>Password:</Text>
                <TextInput />
            </View>
            <ButtonComponent onPress={() => null} title='Log In' />
            <ButtonComponent onPress={() => null} title='Sign Up' />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
