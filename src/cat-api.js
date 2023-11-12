// function toggleSelectAndLoader(showSelect, showLoader) {
//   refs.select.style.display = showSelect ? 'block' : 'none';
//   toggleLoader(showLoader);
// }
// function toggleLoader(showLoader) {
//   refs.loader.style.display = showLoader ? 'block' : 'none';
// }
// function toggleError(showError, errorMessage) {
//   refs.errorInfo.style.display = showError ? 'block' : 'none';

//   if (showError) {
//     refs.errorInfo.textContent = errorMessage;
//   }
// }
export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/breeds';

  const url = `${BASE_URL}${END_POINT}`;
  return axios.get(url).then(response => {
    return response.data;
  });
}
//     .catch(error => {
//       toggleError(true, refs.errorInfo.textContent);
//       return [];
//     })
//     .finally(() => {
//       toggleSelectAndLoader(true, false);
//     });
// }

export function fetchCatByBreed(breedId) {
  refs.catInfo.innerHTML = '';
  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/images/search';
  const PARAMS = `?breed_ids=${breedId}`;

  const url = `${BASE_URL}${END_POINT}${PARAMS}`;

  return axios.get(url).then(response => {
    const data = response.data;

    return data;
  });
}
//     .catch(error => {
//       toggleError(true);
//       throw error;
//     })
//     .finally(() => {
//       toggleLoader(false);
//     });
// }
