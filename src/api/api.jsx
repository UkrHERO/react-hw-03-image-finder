import axios from 'axios';

const API_KEY = '24403167-bc8633b03f504153a86662e6a';
const BASE_URL = 'https://pixabay.com/api';

const api = ({ query = '', currentPage = 1 }) => {
  return axios
    .get(
      `${BASE_URL}/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${currentPage}&per_page=12`,
    )
    .then(response => {
      if (response.data.total === 0) {
        return Promise.reject(new Error());
      } else {
        return response.data.hits;
      }
    });
};
const apiImages = {
  api,
};

export default apiImages;
