import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_goF1XJ8NekrIrROIWJxE03bbF4rjAqaHyUoJRlyK6yhL04ajZE5jw15qaKHkW6pj';
export const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  errorInfo: document.querySelector('.error'),
};
let errorText = '';

fetchBreeds().then(breeds => {
  const options = breeds.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    return option;
  });
  refs.select.append(...options);
});

refs.select.addEventListener('change', function () {
  const selectedBreedId = refs.select.value;

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      const catUrl = catData.url;
      const catName = catData.breeds.name;
      const catDescription = catData.breeds.description;
      const catTemperament = catData.breeds.temperament;
    })
    .catch(error => {
      refs.errorInfo.classList.remove('hidden');
      refs.catInfo.innerHTML = '';
    })
    .finally(() => {
      refs.loader.classList.add('hidden');
    });
  const markup = renderCat(catUrl, catName, catDescription, catTemperament);
  refs.catInfo.innerHTML = markup;
});

function renderCat(catUrl, catName, catDescription, catTemperament) {
  return ` <div><img src="${catUrl}" alt="${catName}" width='400px' height='150px'></div>
     <div class='wrap'> <h1>${catName}</h1>
      <p>${catDescription}</p>
      <p><span style="font-weight: bold">Temperament:</span>${catTemperament}</p></div>`;
}
