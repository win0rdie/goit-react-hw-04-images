import axios from 'axios';
// const API_URL = 'https://pixabay.com/api/';
const API_KEY = '31415914-2ac89ac673c071c72663449a1';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = (currentName, amount) =>
  axios.get(
    `?key=${API_KEY}&q=${currentName}&image_type=photo&per_page=${amount}&safesearch=true`
  );
