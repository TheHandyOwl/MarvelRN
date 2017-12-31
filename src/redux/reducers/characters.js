import * as types from '../types/characters'

const initialState = {
        item: null,
        list: {},
        isFetching: null,
}

export default function reducer( state = initialState, action = {} ) {

    switch(action.type) {

        case types.CHARACTERS_UPDATE_LIST:
            return {
                ...state,
                list: action.value,
            }
        default:
            return state

    }

}