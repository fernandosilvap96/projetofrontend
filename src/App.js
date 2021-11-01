import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, AsyncStorageStatic } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import api from './services/api'

//HOME
function Home({ navigation }) {

  //CADASTRO DE USUARIO - API
  async function registerUser() {
    try {
      const device_id = "1"
      const response = await api.post('/users', { device_id });
      console.log(JSON.stringify(response.data));

      const {access_token, user_identifier} = response.data;
      await AsyncStorageStatic.multiSet([
        ['@frontend:token', JSON.stringify(access_token)],
        ['@frontend:user', JSON.stringify(user_identifier)]
      ]);
    } catch(error) {
      console.error("erro" + error);
    };
  } 

  //BOTÕES DA TELA HOME
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={registerUser} style={styles.buttonContent}>
          <Text style={styles.buttonText}>NEW USER</Text>
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => {navigation.navigate('New Profile')}} style={styles.buttonContent}>
          <Text style={styles.buttonText}>NEW PROFILE</Text>
      </TouchableOpacity>
    </View>
  );

}


//FORMULARIO DE CRIAÇÃO DE PROFILE
function NewProfile() {

  const [user, setUser] = useState('');
  const [nif_number, setNifNumber] = useState('');
  const [cell_phone, setCellPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');  
  const user_identifier = '242f8461f-88cb-4ea3-9175-3abb0d42bc06';
  const [client_id, setClientId] = useState('')
  const [client_secret, setClientSecret] = useState('')


  function handleUserChange(user){ setUser(user);}
  function handleNifNumber(nif_number){ setNifNumber(nif_number);}
  function handleCellPhone(cell_phone){ setCellPhone(cell_phone);}
  function handleEmailChange(email){ setEmail(email);}
  function handlePassword(password){ setPassword(password);}
  function handlePassword_confirmation(password_confirmation){ setPassword_confirmation(password_confirmation);}
  function handleClientId(client_id){ setClientId(client_id);}
  function handleClientSecret(client_secret){ setClientSecret(client_secret);}

  // CADASTRO DO PROFILE - API 
  async function registerProfile() {
    const response = await api.post('/identity_server/oauth/users', { user, nif_number, cell_phone, email, password, password_confirmation, user_identifier, client_id, client_secret })
    .then((response) => console.log(JSON.stringify(response.data)))
    .catch((error) => {
      console.error("erro" + error);
    });
  } 

  return (
    <View style={styles.container}>
      <TextInput placeholder="Insira seu User name" style={styles.textInput} onChangeText={handleUserChange}/>
      <TextInput placeholder="Insira seu Nif number" style={styles.textInput} onChangeText={handleNifNumber}/>
      <TextInput placeholder="Insira seu CellPhone" style={styles.textInput} onChangeText={handleCellPhone}/>
      <TextInput placeholder="Insira seu email" style={styles.textInput} onChangeText={handleEmailChange}/>
      <TextInput secureTextEntry={true} placeholder="Insira sua senha" style={styles.textInput} onChangeText={handlePassword}/>
      <TextInput secureTextEntry={true} placeholder="Confirme sua senha" style={styles.textInput} onChangeText={handlePassword_confirmation}/>
      <TextInput placeholder="Insira seu Client ID" style={styles.textInput} onChangeText={handleClientId}/>
      <TextInput placeholder="Insira seu Client Secret" style={styles.textInput} onChangeText={handleClientSecret}/>


      <Button color="#6A5ACD" title="Register" onPress={registerProfile}/>
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
        <Stack.Screen name="New Profile" component={NewProfile} />
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
    padding:10

  },
  textInput:{
    width:'100%',
    height:40,
    backgroundColor:'white',
    borderRadius:20,
    paddingLeft:10,
    marginBottom:10
  },
  buttonContent:{
    backgroundColor: '#000000',
    alignItems: 'center',
    padding:20,
    margin:10,
    borderRadius:20,
  },
  buttonText:{
    color:'white',
  }
});
