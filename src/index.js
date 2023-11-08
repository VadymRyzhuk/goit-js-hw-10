import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_goF1XJ8NekrIrROIWJxE03bbF4rjAqaHyUoJRlyK6yhL04ajZE5jw15qaKHkW6pj';
const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
};
function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/breeds';

  const url = `${BASE_URL}${END_POINT}`;
  return axios
    .get(url)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      return response.data;
    })
    .catch(error => {
      console.error('Помилка під час отримання порід: ' + error.message);
      return [];
    });
}

fetchBreeds().then(breeds => {
  //console.log(breeds); // ------------------------------------------------------------DELETE ------------------------------------------
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    refs.select.appendChild(option);
    //console.log(breed.reference_image_id);
    //console.log(breed);
  });
});

function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/images/search';
  const PARAMS = `?breed_ids=${breedId}`;

  const url = `${BASE_URL}${END_POINT}${PARAMS}`;
  //console.log(url); // --------------------------------------------------------------------------------DELETE---------------------------------------
  return axios
    .get(url)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      return response.data;
    })
    .catch(error => {
      console.error(
        'Помилка під час отримання інформації про кота: ' + error.message
      );
      return null;
    });
}

let catName;
let catDescription;
let catTemperament;
let catUrl;

refs.select.addEventListener('change', function () {
  const selectedBreedId = refs.select.value;

  fetchCatByBreed(selectedBreedId).then(catData => {
    if (catData) {
      //console.log(catData); // -----------------------------------------INFO --------------------------
      catData.forEach(data => {
        catUrl = data.url;

        console.log(data.url);
        data.breeds.forEach(info => {
          // console.log(info);
          catName = info.name;
          console.log(info.name);
          console.log(info.temperament);
          console.log(info.description);
          catDescription = info.description;
          catTemperament = `<span style="font-weight: bold">Temperament:</span> ${info.temperament}`;
        });
        renderCat(catUrl, catName, catDescription, catTemperament);
        //console.log(data.breeds);
        //console.log(data.url);
      });
    } else {
      console.log('Інформація про кота не знайдена.');
    }
  });
});

function renderCat(catUrl, catName, catDescription, catTemperament) {
  const markup = ` <div><img src="${catUrl}" alt="${catName}" width='400px' height='400px'></div>
     <div class='wrap'> <h1>${catName}</h1>
      <p>${catDescription}</p>
      <p>${catTemperament}</p></div>`;
  //refs.catInfo.insertAdjacentHTML('afterbegin', markup);
  refs.catInfo.innerHTML = markup;
}
