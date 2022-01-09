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
    const name = e.target.value.trim();

    fetchCountries(name)
        .then(renderCountryMarkup)
        .catch((error) => console.log(error));
   
    
}

function renderCountryMarkup({name, capital, population, flags, languages}) {
    const markup = `<li><svg>${flags.svg}</svg><span>${name.official}</span></li>`;
 
    refs.countryList.innerHTML = markup;
}


