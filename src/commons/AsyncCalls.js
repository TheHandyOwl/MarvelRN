import { constants, webservices } from 'MarvelRN/src/webservices'

export function fetchCharacters() {
    const fetchUrl = '/characters?apikey=' + constants.API_KEY
    return webservices.fetch(fetchUrl)
}
