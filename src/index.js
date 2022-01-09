import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');
const refs = {
    input: document.querySelector('input#search-box'),
    countryList: document.querySelector('country-list'),
}

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));


function onSearchInput(e) {
    const name = e.target.value;

   fetchCountries(name).then(renderCountriesList);
   
    
}

function renderCountriesList(countries) {
    const markup = countries.map((country) => `<li><svg>${country.flags.svg}</svg><span>${country.name}</span></li>`).join('');
    console.log(markup);
    refs.countryList.innerHTML = markup;
}


