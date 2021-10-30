import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import api from './services/api'

//HOME
function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('New User')}
      />
    </View>
  );
}


//FORMULARIO DE CRIAÇÃO DE USUÁRIO

function NewUser() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPassword_confirm] = useState('');  

  return (
    <View style={styles.container}>
      <TextInput placeholder="Insira seu User name" style={styles.textInput} onChangeText={text=>setUser(text)}/>
      <TextInput placeholder="Insira seu email" style={styles.textInput} onChangeText={text=>setEmail(text)}/>
      <TextInput secureTextEntry={true} placeholder="Insira sua senha" style={styles.textInput} onChangeText={text=>setPassword(text)}/>
      <TextInput secureTextEntry={true} placeholder="Confirme sua senha" style={styles.textInput} onChangeText={text=>setPassword_confirm(text)}/>

      <Button title="Register User" onPress={()=>register()}/>
    </View>
  );
}


//NAVEGAÇÃO DAS TELAS
const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="New User" component={NewUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27282D',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20
  },
  textInput:{
    width:'100%',
    height:40,
    backgroundColor:'white',
    borderRadius:20,
    paddingLeft:10,
    marginBottom:10
  }

});