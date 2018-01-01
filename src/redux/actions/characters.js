import * as types from '../types/characters'
import { AsyncCalls } from 'MarvelRN/src/commons' 

function updateCharactersList (value) {
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value
    }
}

export function updateSelectedCharacter (value) {
    return {
        type: types.CHARACTERS_UPDATE_CHARACTER,
        value
    }
}

export function fetchCharactersList () {
    return (dispatch, getState) => {
        AsyncCalls.fetchCharactersList()
        .then( response => {
            console.log("fetchCharactersList fetch response: ", response)
            dispatch(updateCharactersList(response.data.results))
        })
        .catch( error => {
            console.log("fetchCharactersList fetch error:", error)
            dispatch(updateCharactersList([]))
        })
    }
}
