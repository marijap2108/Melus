import { StatusBar } from 'expo-status-bar'
import React, { FC, useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ButtonComponent from '../components/Button'
import Input from '../components/Input'
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
			{step == 0 && <Welcome handleStep={handleStep} />}
			{step == 1 && <LogIn handleStep={handleStep} setUser={setUser} setScreen={setScreen} />}
			{step == 2 && <SignUp handleStep={handleStep} setUser={setUser} setScreen={setScreen} />}
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

	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [form, setFrom] = useState({
		username: '',
		email: '',
		password: ''
	})

	const handleChange = useCallback((key) => (value: string) => {
		setFrom(oldForm => ({ ...oldForm, [key]: value }))
	}, [])

	const postUser = useCallback(() => {
		if (!form.username || !form.email || !form.password) {
			setErrorMessage('All fields must be filled!')
			return
		}

		if (form.password.length < 8) {
			setErrorMessage('Password must have at least 8 characters!')
			return
		}

		axios.post('http://localhost:8000/api/user', form)
			.then((response) => {
				if (response.data.error) {
					setErrorMessage(response.data.error)
					return
				}
				setUser?.({
					_id: response.data._id as string,
					username: response.data.username as string,
					email: response.data.email as string,
				})

				setScreen?.('home')
			})
			.catch((error) => {
				setErrorMessage(error.toString())
			})
	}, [form])

	return (
		<View>
			<Text style={styles.text}>Sign Up</Text>
			<View style={styles.margin}>
				<View style={styles.formElement}>
					<Text style={styles.label} >Username:</Text>
					<Input isError={errorMessage && !form.username} defaultValue={form.username} onChangeText={handleChange('username')} />
				</View>
				<View style={styles.formElement}>
					<Text style={styles.label} >E-mail:</Text>
					<Input isError={errorMessage && !form.email} defaultValue={form.email} onChangeText={handleChange('email')} />
				</View>
				<View style={styles.formElement}>
					<Text style={styles.label} >Password:</Text>
					<Input isError={errorMessage && (!form.password || form.password.length < 8)} secureTextEntry={true} defaultValue={form.password} onChangeText={handleChange('password')} />
				</View>
				<Text style={styles.error}>{errorMessage}</Text>
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
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [form, setFrom] = useState({
		email: '',
		password: ''
	})

	const handleChange = useCallback((key) => (value: string) => {
		setFrom(oldForm => ({ ...oldForm, [key]: value }))
	}, [])


	const getUser = useCallback(() => {
		if (!form.email || !form.password) {
			setErrorMessage('All fields must be filled!')
			return
		}

		if (form.password.length < 8) {
			setErrorMessage('Password must have at least 8 characters!')
			return
		}

		axios.get(`http://localhost:8000/api/user?email=${form.email}&password=${form.password}`)
			.then((response) => {
				if (!response.data._id) {
					setErrorMessage('Invalid email or password!')
					return
				}
				setUser?.({
					_id: response.data._id,
					username: response.data.username,
					email: response.data.email,
					favorites: response.data.favorites,
				})

				setScreen?.('home')
			})
			.catch((error) => {
				setErrorMessage(error.toString())
			})
	}, [form])

	return (
		<View>
			<Text style={styles.text}>Log In</Text>
			<View style={styles.margin}>
				<View style={styles.formElement}>
					<Text style={styles.label} >E-mail:</Text>
					<Input isError={errorMessage && !form.email} defaultValue={form.email} onChangeText={handleChange('email')} />
				</View>
				<View style={styles.formElement}>
					<Text style={styles.label} >Password:</Text>
					<Input isError={errorMessage && !form.password} secureTextEntry={true} defaultValue={form.password} onChangeText={handleChange('password')} />
				</View>
				<Text style={styles.error}>{errorMessage}</Text>
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
		paddingTop: 120
	},
	welcomeText: {
		fontSize: 28,
		paddingBottom: 40,
		textAlign: 'center',
		color: 'whitesmoke'
	},
	label: {
		color: 'whitesmoke',
		paddingBottom: 2
	},
	text: {
		fontSize: 20,
		color: 'whitesmoke'
	},
	margin: {
		marginTop: 34
	},
	buttonMargin: {
		marginTop: 12,
		width: 240
	},
	formElement: {
		marginBottom: 8
	},
	error: {
		color: 'red',
		position: 'absolute',
		bottom: -24
	}
});
