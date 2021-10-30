import api from './api'
import React from 'react-native'


async function register() {

    const credentials = {
      user: user,
      email: email,
      password: password,
      password_confirm: password_confirm
    }
    const response = await api.post('/users', credentials)
    console.log(response)

}

componentDidMount() {
    this.loadUsers();
}