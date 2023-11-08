const refs = {
  select: document.querySelector('.breed-select'),
};
function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/breeds';

  const url = BASE_URL + END_POINT;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      return response.json();
    })
    .then(breeds => {
      return breeds;
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
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      // data - це дані про кота
      return data;
      //console.log(data);
    })
    .catch(error => {
      console.error(
        'Помилка під час отримання інформації про кота: ' + error.message
      );
      return null;
    });
}
refs.select.addEventListener('change', function () {
  const selectedBreedId = refs.select.value;

  fetchCatByBreed(selectedBreedId).then(catData => {
    if (catData) {
      console.log(catData); // -----------------------------------------INFO --------------------------
    } else {
      console.log('Інформація про кота не знайдена.');
    }
  });
});
