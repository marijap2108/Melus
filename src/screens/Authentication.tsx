import { StatusBar } from 'expo-status-bar';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ButtonComponent from '../components/Button';
import axios from 'axios'

interface IAuthentication {
    setScreen: (screen: string) => void,
    setUser: (user: {}) => void
}

interface IStep {
    handleStep: any,
    setUser?: (user: {}) => void,
    setScreen?: (screen: string) => void
}

const Authentication: FC<IAuthentication> = ({
    setScreen,
    setUser
}) => {
    const [step, setStep] = useState(0)

    const handleStep = useCallback((newStep: number) => () => {
        setStep(newStep)
    }, []) 

    const setInitial = useCallback(() => {
        setScreen('home')
    }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {step==0 && <Welcome handleStep={handleStep} />}
      {step==1 && <LogIn handleStep={handleStep} setUser={setUser} setScreen={setScreen}/>}
      {step==2 && <SignUp handleStep={handleStep} setUser={setUser} setScreen={setScreen} />}
      <View style={styles.margin}>
        <ButtonComponent variant='text' onPress={setInitial} title='No, thanks' />
      </View>
    </View>
  );
}

const Welcome: FC<IStep> = ({
    handleStep,
}) => {
    return (
        <View>
            <View>
                <Text style={styles.welcomeText}>Welcome</Text>
                <View style={styles.margin}>
                    <ButtonComponent onPress={handleStep(1)} title='Log In' />
										<View style={styles.buttonMargin}>
                    	<ButtonComponent variant='secondary' onPress={handleStep(2)} title='Sign Up' />
										</View>
                </View>
            </View>
        </View>
    );
}

const SignUp: FC<IStep> = ({
    handleStep,
    setUser,
    setScreen
}) => {

    const [form, setFrom] = useState({
        username: '',
        dateOfBirth: '',
        email: '',
        password: ''
    }) 

    const handleChange = useCallback((key) => (value: string) => {
        setFrom(oldForm => ({...oldForm, [key]: value}))
    }, [])

    const postUser = useCallback(() => {
        axios.post('http://localhost:8000/api/user', form)
        .then((response) => {
            setUser?.({
                _id: response.data._id as string,
                username: response.data.username as string,
                email: response.data.email as string,
                dateOfBirth: response.data.dateOfBirth as string
            })

            setScreen?.('home')
        })
        .catch((error) => {
            console.log(error);
        })
    }, [form]) 

    return (
        <View>
						<Text style={styles.text}>Sign Up</Text>
            <View style={styles.margin}>
							<View style={styles.formElement}>
								<Text>Username:</Text>
                <TextInput defaultValue={form.username} onChangeText={handleChange('username')}  />
							</View>
							<View style={styles.formElement}>
                <Text>Date of birth:</Text>
                <TextInput defaultValue={form.dateOfBirth} onChangeText={handleChange('dateOfBirth')} />
							</View>
							<View style={styles.formElement}>
                <Text>E-mail:</Text>
                <TextInput defaultValue={form.email} onChangeText={handleChange('email')} />
							</View>
							<View style={styles.formElement}>
                <Text>Password:</Text>
                <TextInput defaultValue={form.password} onChangeText={handleChange('password')} />
							</View>
            </View>
            <View style={styles.margin}>
                <ButtonComponent onPress={postUser} title='Sign Up' />
								<View style={styles.buttonMargin}>
                	<ButtonComponent variant='secondary' onPress={handleStep(1)} title='Log In' />
								</View>
            </View>
        </View>
    )
}

const LogIn: FC<IStep> = ({
    handleStep,
    setUser,
    setScreen
}) => {
    const [form, setFrom] = useState({
        email: '',
        password: ''
    }) 

    const handleChange = useCallback((key) => (value: string) => {
        setFrom(oldForm => ({...oldForm, [key]: value}))
    }, [])


    const getUser = useCallback(() => {
        axios.get(`http://localhost:8000/api/user?email=${form.email}&password=${form.password}`)
        .then((response) => {
            console.log(response)
            setUser?.({
                _id: response.data._id as string,
                username: response.data.username as string,
                email: response.data.email as string,
                dateOfBirth: response.data.dateOfBirth as string
            })

            setScreen?.('home')
        })
        .catch((error) => {
            console.log(error);
        })
    }, [form])

    return (
        <View>
						<Text style={styles.text}>Log In</Text>
            <View style={styles.margin}>
							<View style={styles.formElement}>
                <Text>E-mail:</Text>
                <TextInput defaultValue={form.email} onChangeText={handleChange('email')} />
							</View>
							<View style={styles.formElement}>
                <Text>Password:</Text>
                <TextInput defaultValue={form.password} onChangeText={handleChange('password')} />
							</View>
            </View>
            <View style={styles.margin}>
                <ButtonComponent onPress={getUser} title='Log In' />
								<View style={styles.buttonMargin}>
                	<ButtonComponent variant='secondary' onPress={handleStep(2)} title='Sign Up' />
								</View>
            </View>
        </View>
    )
}

export default Authentication

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
      fontSize: 28,
      paddingBottom: '40px'
  },
	text: {
		fontSize: 20,
},
  margin: {
    marginTop: '34px'
  },
	buttonMargin: {
		marginTop: '12px'
	},
	formElement: {
		marginBottom: '8px'
	}
});
