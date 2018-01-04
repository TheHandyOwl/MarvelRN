import { constants, webservices } from 'MarvelRN/src/webservices'
import qs from 'qs'

export function fetchCharactersList() {
    const fetchUrl = '/characters?apikey=' + constants.API_KEY
    return webservices.fetch(fetchUrl)
}

export function fetchCharactersListOffset(filters) {
    const fetchUrl = '/characters?' + qs.stringify(filters) + '&apikey=' + constants.API_KEY
    return webservices.fetch(fetchUrl)
}
