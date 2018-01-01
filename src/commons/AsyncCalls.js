import { constants, webservices } from 'MarvelRN/src/webservices'

export function fetchCharactersList() {
    const fetchUrl = '/characters?apikey=' + constants.API_KEY
    return webservices.fetch(fetchUrl)
}
