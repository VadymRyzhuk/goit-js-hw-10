import { fetchBreeds, fetchCatByBreed, refs } from './cat-api.js';

let errorText = ''; //----------------------------------------------------------------------------------------------------------------------

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

  refs.catInfo.innerHTML = markup;
}
