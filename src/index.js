import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchData from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 500;

const inputCountry = document.getElementById("search-box");
const placeForCountryList = document.querySelector(".country-list");
const placeForCountryInfo = document.querySelector(".country-info");

inputCountry.addEventListener("input", debounce(findCountries, DEBOUNCE_DELAY));

function findCountries(evt) {
    evt.preventDefault;

    const country = inputCountry.value.trim();

    fetchData(country).then(data => {
        
        const searcResult = data.length;
        
        if (searcResult > 10) {
            clearMarkup();
            Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (searcResult >=2) {
            createCounryList(data);
        } else if (searcResult === 1) {
            createCountryCard(data);
        };
    }).catch(errorOfSearch);
}

function errorOfSearch(err) {
    clearMarkup();
    Notify.failure("Oops, there is no country with that name");
}

function createCounryList(dataArray) {
    const countryList = dataArray.reduce((markup, data) => 
    markup + createCountryListItem(data), "");

    clearMarkup();
    placeForCountryList.insertAdjacentHTML("afterbegin", countryList);
}

function createCountryListItem({flags, name}) {
    return `<li class="country-list__item">
      <img  class="c" src="${flags.svg}" alt="${flags.alt}" width=80px>
      <p class="country-list__name">${name.official}</p>
    </li>`;
}

function createCountryCard(data) {
    const {name, capital, population, flags, languages} = data[0];

    const countryCard = `<img class="country-card__flag" src="${flags.svg}" alt="${flags.alt}" heigth=100%>
    <h2 class="country-name">${name.official}</h2>
    <p class="country-part">Capital:<span class="country-part-info">${capital}</span></p>
    <p class="country-part">Population:<span class="country-part-info">${population}</span></p>
    <p class="country-part">Languages:<span class="country-part-info">${Object.values(languages)}</span></p>`;

    clearMarkup();
    placeForCountryInfo.insertAdjacentHTML("afterbegin", countryCard);
}

function clearMarkup() {
    placeForCountryInfo.innerHTML = "";
    placeForCountryList.innerHTML = "";
}