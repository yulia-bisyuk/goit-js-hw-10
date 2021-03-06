import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
}

refs.countryList.style.paddingLeft = '10px';
refs.countryList.style.marginTop = '0px';

refs.input.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));


async function onSearchInput(e) {
    const countryName = e.target.value.trim();
    if (!countryName) {
        clearMarkup();
        return;
    }

    try {
        const data = await fetchCountries(countryName);
        const countriesData = await handleCountriesData(data);
    } catch(error) {
        clearMarkup();
        Notiflix.Notify.failure('Oops, there is no country with that name');
        console.log(error);
        }
}

function handleCountriesData(data) {
            if (data.length === 1) {
                const { name, capital, population, flags, languages } = data[0];
                clearMarkup();
                renderCountryMarkup(name, capital, population, flags, languages);
                
            } else if (data.length >= 2 && data.length <= 10) {
                clearMarkup();
                data.forEach(({ name, flags }) => renderCountryListMarkup(name.official, flags.svg))
                
            } else if (data.length > 10) {
                clearMarkup();
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')

            } else {
                clearMarkup();
            }
}

function renderCountryMarkup(name, capital, population, flags, languages) {
    
    const markupCard = `
    <div style="display: flex; align-items: center;">
    <img src="${flags.svg}" width='50' height='50'></img>
    <h1 style="font-size: 30px;
    margin-left: 16px;">${name.official}</h1>
    </div>
    <div style="font-size: 20px;
    margin-bottom: 8px;">Capital: ${capital}</div>
    <div style="font-size: 20px;
    margin-bottom: 8px;">Population: ${population}</div>
    <div style="font-size: 20px;
    margin-bottom: 8px;">Languages: ${Object.values(languages)}</div>`;
 
    refs.countryList.insertAdjacentHTML('beforeend', markupCard);

}

function renderCountryListMarkup(name, flags) {

    const markupList = `
    <li style="list-style-type: none; align-items: center;
    display: flex; margin-bottom: 10px;">
    <img src="${flags}" style="margin-right: 10px;"width='50' height='50'></img>
    <span style="font-weight: 400;
    font-size: 24px;">${name}</span>
    </li>
    `
    refs.countryList.insertAdjacentHTML('beforeend', markupList);
}

function clearMarkup() {
    refs.countryList.innerHTML = '';
}
// ======= fetch syntax =========
// function onSearchInput(e) {
// const countryName = e.target.value.trim();
//     if (!countryName) {
//         clearMarkup();
//         return;
//     }
//     fetchCountries(countryName)
//         .then((response) => {
//             if (response.length === 1) {

//                 const { name, capital, population, flags, languages } = response[0];
//                 clearMarkup();
//                 renderCountryMarkup(name, capital, population, flags, languages);
                
//             } else if (response.length >= 2 && response.length <= 10) {
//                 clearMarkup();
//                 response.forEach(({ name, flags }) => renderCountryListMarkup(name.official, flags.svg))
                
//             } else if (response.length > 10) {
//                 clearMarkup();
//                 Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')

//             } else {
//                 clearMarkup();
//             }
//         })
//         .catch((error) => {
//             clearMarkup();
//             Notiflix.Notify.failure('Oops, there is no country with that name');
//             console.log(error);
//         });
//    };
