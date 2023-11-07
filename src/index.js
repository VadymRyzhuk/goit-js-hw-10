import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_goF1XJ8NekrIrROIWJxE03bbF4rjAqaHyUoJRlyK6yhL04ajZE5jw15qaKHkW6pj';

function searchCats() {
  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/breeds/';
  //const PARAMS = `?hero=${hero}`;
  const url = BASE_URL + END_POINT;
  console.log(url);
  return fetch(url, options).then(res => res.json());
}

console.log(123);
