import { StatusBar } from 'expo-status-bar';
import React, { FC, useCallback, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, View } from 'react-native';
import ButtonComponent from '../components/Button';

interface IAuthentication {
    setScreen: (screen: string) => void
}

interface IStep {
    handleStep: any
    setInitial: () => void
}

const Authentication: FC<IAuthentication> = ({
    setScreen
}) => {
    const [step, setStep] = useState(0)

    const handleStep = useCallback((newStep: number) => () => {
        setStep(newStep)
    }, []) 

    const setInitial = useCallback(() => {
        setScreen('main')
        try {
            AsyncStorage.setItem(
                'initial',
                '1'
            );
        } catch (error) {
            console.log(error);
        }
    }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {step==0 && <Welcome handleStep={handleStep} setInitial={setInitial} />}
      {step==1 && <LogIn handleStep={handleStep} setInitial={setInitial}/>}
      {step==2 && <SignUp handleStep={handleStep} setInitial={setInitial}/>}
    </View>
  );
}

const Welcome: FC<IStep> = ({
    handleStep,
    setInitial
}) => {
    return (
        <View>
            <View>
                <Text>Welcome</Text>
                <ButtonComponent onPress={handleStep(1)} title='Log In' />
                <ButtonComponent onPress={handleStep(2)} title='Sign Up' />
            </View>
            <ButtonComponent onPress={setInitial} title='No, thanks' />
        </View>
    );
}

const SignUp: FC<IStep> = ({
    handleStep,
    setInitial
}) => {
    return (
        <View>
            <View>
                <Text>Username:</Text>
                <TextInput />
                <Text>Date of birth:</Text>
                <TextInput />
                <Text>E-mail:</Text>
                <TextInput />
                <Text>Password:</Text>
                <TextInput />
                <Text>Confirm password:</Text>
                <TextInput />
            </View>
            <ButtonComponent onPress={() => null} title='Sign Up' />
            <ButtonComponent onPress={handleStep(1)} title='Log In' />
            <ButtonComponent onPress={setInitial} title='No, thanks' />
        </View>
    )
}

const LogIn: FC<IStep> = ({
    handleStep,
    setInitial
}) => {
    return (
        <View>
            <View>
                <Text>E-mail:</Text>
                <TextInput />
                <Text>Password:</Text>
                <TextInput />
            </View>
            <ButtonComponent onPress={() => null} title='Log In' />
            <ButtonComponent onPress={handleStep(2)} title='Sign Up' />
            <ButtonComponent onPress={setInitial} title='No, thanks' />
        </View>
    )
}

export default Authentication

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
