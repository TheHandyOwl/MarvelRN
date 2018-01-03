import * as types from '../types/characters'
import { AsyncCalls } from 'MarvelRN/src/commons'
import { Actions } from 'react-native-router-flux'

function updateCharactersList (value) {
    console.log("New list:", value)
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

export function deleteCharacter (deleteCharacterWithId) {

    return (dispatch, getState) => {
        const state = getState()
        const oldList = state.characters.list
        const newList = oldList.filter( item => item.id !== deleteCharacterWithId )

        dispatch(updateCharactersList(newList))
        Actions.pop()
    }
}

export function postCharacter (data) {

    // Only name will be saved
    // Image will be lost, only for react-native-image-picker testing
    const newCharacter = gimmeTheCharacter(data)

   return (dispatch, getState) => {
        const state = getState()
        const oldList = state.characters.list
        const newList = newCharacter.concat(oldList)

        dispatch(updateCharactersList(newList))
        Actions.pop()
    }
}

function gimmeTheCharacter(data) {

    // Unique ID
    const date = new Date;
    const year = date.getFullYear();
    const month = date.getMonth(); // beware: January = 0; February = 1, etc.
    const dayOfWeek = date.getDay(); // beware: Sunday = 0, Monday = 1, etc.
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliSeconds = date.getMilliseconds();
    const fecha = '' + year + month + dayOfWeek + day + hour + minutes + seconds + milliSeconds

    const returnThisCharacter = [{
        id: Number(fecha),
        name: data.name,
        description: "New Hero from React Native",
        thumbnail: data.thumbnail,
        comics: {available: 0, items: []},
        series: {available: 0, items: []},
        stories: {available: 0, items: []},
    }]

    return returnThisCharacter

}