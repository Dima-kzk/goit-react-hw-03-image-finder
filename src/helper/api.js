import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default function getImages(query, page) {
  return axios.get(
    `?q=${query}&page=${page}&key=35695692-b29213b84af7336a869b1efb1&image_type=photo&orientation=horizontal&per_page=12`
  );
}
