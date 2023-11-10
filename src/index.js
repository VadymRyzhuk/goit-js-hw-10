import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_goF1XJ8NekrIrROIWJxE03bbF4rjAqaHyUoJRlyK6yhL04ajZE5jw15qaKHkW6pj';
const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  errorInfo: document.querySelector('.error'),
};

function toggleLoader(showLoader) {
  refs.loader.style.display = showLoader ? 'block' : 'none';
}

function toggleSelectAndLoader(showSelect, showLoader) {
  refs.select.style.display = showSelect ? 'block' : 'none';
  toggleLoader(showLoader);
}

function fetchBreeds() {
  toggleSelectAndLoader(false, true); //-------------------------------------------------------------------------------------------------------------------------------------------
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
    })
    .finally(() => {
      toggleSelectAndLoader(true, false); // Приховати завантажувач після отримання порід
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
  toggleSelectAndLoader(true, true);
  refs.catInfo.innerHTML = ''; //-------------------------------------------------------------------------------------------------------------------------------------------
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
      //return response.data;
      const data = response.data;

      if (data.length === 0) {
        throw new Error(refs.errorInfo.textContent);
      }

      return data;
    })
    .catch(error => {
      console.error(
        'Помилка під час отримання інформації про кота: ' + error.message
      );
      throw error;
    })
    .finally(() => {
      toggleLoader(false); // Приховати завантажувач після отримання інформації про кота
    });
}

let catName;
let catDescription;
let catTemperament;
let catUrl;

refs.select.addEventListener('change', function () {
  const selectedBreedId = refs.select.value;

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      if (catData) {
        catData.forEach(data => {
          catUrl = data.url;

          data.breeds.forEach(info => {
            catName = info.name;
            catDescription = info.description;
            catTemperament = `<span style="font-weight: bold">Temperament:</span> ${info.temperament}`;
          });
          renderCat(catUrl, catName, catDescription, catTemperament);
        });
        refs.errorInfo.classList.add('hidden'); // При успіху, ховаємо блок помилки
      } else {
        // refs.errorInfo.textContent = 'Кота не знайдено.';
        refs.errorInfo.classList.remove('hidden');
        refs.catInfo.innerHTML = ''; // Очищуємо блок інформації про кота
      }
    })
    .catch(error => {
      refs.errorInfo.textContent = error.message;
      refs.errorInfo.classList.remove('hidden');
      refs.catInfo.innerHTML = ''; // Очищуємо блок інформації про кота
    });
});

function renderCat(catUrl, catName, catDescription, catTemperament) {
  const markup = ` <div><img src="${catUrl}" alt="${catName}" width='400px' height='150px'></div>
     <div class='wrap'> <h1>${catName}</h1>
      <p>${catDescription}</p>
      <p>${catTemperament}</p></div>`;
  //refs.catInfo.insertAdjacentHTML('afterbegin', markup);
  refs.catInfo.innerHTML = markup;
}
