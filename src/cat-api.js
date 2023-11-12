import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_goF1XJ8NekrIrROIWJxE03bbF4rjAqaHyUoJRlyK6yhL04ajZE5jw15qaKHkW6pj';

export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/breeds';

  const url = `${BASE_URL}${END_POINT}`;
  return axios.get(url).then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/images/search';
  const PARAMS = `?breed_ids=${breedId}`;

  const url = `${BASE_URL}${END_POINT}${PARAMS}`;

  return axios.get(url).then(response => {
    const data = response.data;
    return data;
  });
}
