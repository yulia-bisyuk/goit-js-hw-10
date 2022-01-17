export async function fetchCountries(name) {
    const baseUrl = 'https://restcountries.com/v3.1/name/';

    try {
        const response = await fetch(`${baseUrl}${name}?fields=name,capital,population,flags,languages`);
        const countries = await handleResponse(response);
        return countries;  
    } catch(error) {
            console.error(error);
        };
    
}

function handleResponse(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error fetching data');
            }           
}

// ======= fetch syntax =========
// export function fetchCountries(name) {
//     const baseUrl = 'https://restcountries.com/v3.1/name/';

//     return fetch(`${baseUrl}${name}?fields=name,capital,population,flags,languages`)
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error('Error fetching data');
//             }           
//         }).catch((error) => {
//             console.error(error);
//         });
//    
// }