import axios from 'axios'
import React, { FC, useCallback, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import ButtonComponent from '../components/Button'
import Input from '../components/Input'
import Svg from '../components/Svg'

interface IProfile {
  setUser: (user: IUser | null) => void,
  user: IUser,
  setScreen: (newScreen: string) => void
}

interface IUser {
  _id: string,
  username: string,
  email: string,
  favorites: string[]
}

const Profile: FC<IProfile> = ({
  setUser,
  user,
  setScreen
}) => {

  const [editable, setEditable] = useState({ username: false, password: false })
  const [form, setForm] = useState({username: user.username, password: ''})

  const handleEdit = useCallback((id: 'username' | 'password') => () => {
    setEditable(pre => ({ ...pre, [id]: !pre[id] }))
  }, [])

  const handleChangeText = useCallback((id: 'username' | 'password') => (value: string) => {
    setForm(pre => ({...pre, [id]: value}))
  }, [])

  const handleSubmit = useCallback(() => {
    if (!form.password && (!form.username || form.username === user.username)) {
      return
    }
    const newUser: any = {}

    if (form.password) {
      newUser.password = form.password
    }

    if (form.username) {
      newUser.username = form.username
    }

    axios.put('http://localhost:8000/api/user', newUser)
			.then((response) => {
				setUser(({...user, ...newUser}))
        setEditable({username: false, password: false})
			})
			.catch((error) => {
				console.log(error)
			})
  }, [form, user, setUser])

  const handleLogOut = useCallback(() => {
    setScreen('home')
    setUser(null)
  }, [setScreen, setUser])

  return (
    <View style={styles.profile}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Profile
        </Text>
      </View>
      <View style={styles.field} >
        {editable.username ?
          <>
            <Text style={styles.text}>
              Username: 
            </Text>
            <View style={styles.input}>
              <Input onChangeText={handleChangeText('username')} defaultValue={form.username} />
            </View>
          </>

          :
          <Text style={styles.text}>
            Username: {user.username}
          </Text>
        }
        <Svg type='edit' onPress={handleEdit('username')} />
      </View>
      <View style={styles.field} >
        <Text style={styles.text}>
          Email: {user.email}
        </Text>
      </View>
      <View style={styles.field}>
        {editable.password ?
          <>
            <Text style={styles.text}>
              Set new password
            </Text>
            <View style={styles.input}>
              <Input onChangeText={handleChangeText('password')} defaultValue={form.password} secureTextEntry />
            </View>
          </>
          :
          <Text style={styles.text}>
            Change Password
          </Text>
        }
        <Svg type='edit' onPress={handleEdit('password')} />
      </View>
      <View style={styles.footer}>
        {editable.password ? 
          <ButtonComponent title='Submit' onPress={handleSubmit} /> 
          :
          editable.username && <ButtonComponent title='Submit' onPress={handleSubmit} /> 
        }
        <ButtonComponent title='Log out' onPress={handleLogOut} />
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 42,
    paddingBottom: 8
  },
  left: {
    flex: 1
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'whitesmoke'
  },
  profile: {
    flex: 1
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 12,
    backgroundColor: '#28193c',
    shadowColor: "#a73ae4",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    color: 'whitesmoke',
    fontSize: 16,
    paddingVertical: 18,
    marginHorizontal: 12,
  },
  input: {
    flex: 1
  },
  footer: {
    marginTop: 48,
    height: 120,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
