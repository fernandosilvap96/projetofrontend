import axios from 'axios'

export default axios.create({
  baseURL: 'https://cda-admin-backend.herokuapp.com/api',
});