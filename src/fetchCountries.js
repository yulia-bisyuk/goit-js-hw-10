export function fetchCountries(name) {
    const baseUrl = 'https://restcountries.com/v3.1/name/';

    return fetch(`${baseUrl}${name}?fields=name,capital,population,flags,languages`)
        .then((response) => response.json());
}
