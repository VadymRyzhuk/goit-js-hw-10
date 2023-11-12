import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  errorInfo: document.querySelector('.error'),
};

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
  refs.loader.classList.remove('hidden');
  refs.errorInfo.classList.add('hidden');
  const selectedBreedId = refs.select.value;
  refs.catInfo.innerHTML = '';
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      const catUrl = catData[0].url;
      const catName = catData[0].breeds[0].name;
      const catDescription = catData[0].breeds[0].description;
      const catTemperament = catData[0].breeds[0].temperament;
      const markup = renderCat(catUrl, catName, catDescription, catTemperament);
      refs.catInfo.innerHTML = markup;
    })
    .catch(error => {
      refs.errorInfo.classList.remove('hidden');
      refs.catInfo.innerHTML = '';
    })
    .finally(() => {
      refs.loader.classList.add('hidden');
    });
});

function renderCat(catUrl, catName, catDescription, catTemperament) {
  return ` <div><img src="${catUrl}" alt="${catName}" width='400px' height='150px'></div>
     <div class='wrap'> <h1>${catName}</h1>
      <p>${catDescription}</p>
      <p><span style="font-weight: bold">Temperament:</span>${catTemperament}</p></div>`;
}
