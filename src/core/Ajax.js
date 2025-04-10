import axios from 'axios';
export default axios.create({
  baseURL: 'https://www.omdbapi.com/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  },
  params: {
    apikey: '62878274' // 🔑  API key por defecto
  }
});