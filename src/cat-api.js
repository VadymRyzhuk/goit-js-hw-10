import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_goF1XJ8NekrIrROIWJxE03bbF4rjAqaHyUoJRlyK6yhL04ajZE5jw15qaKHkW6pj';
export const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  errorInfo: document.querySelector('.error'),
};
function toggleSelectAndLoader(showSelect, showLoader) {
  refs.select.style.display = showSelect ? 'block' : 'none';
  toggleLoader(showLoader);
}
function toggleLoader(showLoader) {
  refs.loader.style.display = showLoader ? 'block' : 'none';
}
function toggleError(showError, errorMessage) {
  refs.errorInfo.style.display = showError ? 'block' : 'none';

  if (showError) {
    refs.errorInfo.textContent = errorMessage;
  }
}
export function fetchBreeds() {
  toggleSelectAndLoader(false, true);
  toggleError(false);
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
      //console.error('Помилка під час отримання порід: ' + error.message);
      toggleError(true, refs.errorInfo.textContent);
      return [];
    })
    .finally(() => {
      toggleSelectAndLoader(true, false);
    });
}

export function fetchCatByBreed(breedId) {
  toggleSelectAndLoader(true, true);
  toggleError(false);
  refs.catInfo.innerHTML = '';
  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/images/search';
  const PARAMS = `?breed_ids=${breedId}`;

  const url = `${BASE_URL}${END_POINT}${PARAMS}`;

  return axios
    .get(url)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('HTTP error, status = ' + response.status);
      }

      const data = response.data;

      if (data.length === 0) {
        throw new Error(refs.errorInfo.textContent);
      }

      return data;
    })
    .catch(error => {
      toggleError(true);
      throw error;
    })
    .finally(() => {
      toggleLoader(false);
    });
}
