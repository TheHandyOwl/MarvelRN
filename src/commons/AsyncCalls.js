import axios from 'axios'
import { API_KEY, BASE_URL, REFERER_URL } from './constants'

export function configureAxios() {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers.common['Referer'] = REFERER_URL;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export function fetchCharacters() {
    const fetchUrl = '/characters?apikey=' + API_KEY
    return fetch(fetchUrl)
}

export function fetch(url) {
    return new Promise ( function(resolve, reject) {
        axios.get(url)
            .then( (response) => {
                console.log("webservice axios get response: ", response);

                if(response.data) {
                    resolve ( response.data )
                } else {
                    reject ( response )
                }
            })
            .catch( (error) => {
                reject ( error )
            })
        })
}
