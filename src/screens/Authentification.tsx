import { StatusBar } from 'expo-status-bar';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ButtonComponent from '../components/Button';

interface IStep {
    handleStep: any
}

export default function Authentification() {
    const [step, setStep] = useState(0)

    const handleStep = useCallback((newStep: number) =>() => {
        setStep(newStep)
        return null
    }, []) 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {step==0 && <Welcome handleStep={handleStep} />}
      {step==1 && <LogIn handleStep={handleStep} />}
      {step==2 && <SignUp handleStep={handleStep} />}
    </View>
  );
}

const Welcome: FC<IStep> = ({
    handleStep
}) => {
    return (
        <View>
            <View>
                <Text>Welcome</Text>
                <ButtonComponent onPress={handleStep(1)} title='Log In' />
                <ButtonComponent onPress={handleStep(2)} title='Sign Up' />
            </View>
            <ButtonComponent onPress={() => null} title='No, thanks' />
        </View>
    );
}

const SignUp: FC<IStep> = ({
    handleStep
}) => {
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
            <ButtonComponent onPress={handleStep(1)} title='Log In' />
        </View>
    )
}

const LogIn: FC<IStep> = ({
    handleStep
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
