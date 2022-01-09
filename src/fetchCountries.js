export function fetchCountries(name) {
    const baseUrl = 'https://restcountries.com/v3.1/name/';
    // const params = {
    //     fullName: name.official,
    //     capital: capital,
    //     population: population,
    //     flag: flags.svg,
    //     language: languages,
    // }

    fetch(`${baseUrl}${name}?fields=name,capital,population,flags,languages`)
        .then((response) => response.json())
        // .then(console.log)
    .catch((error) => console.log(error));
}
