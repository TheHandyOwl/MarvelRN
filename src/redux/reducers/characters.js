import * as types from '../types/characters'

const initialState = {
        item: null,
        list: [],
        total: 0,
        offset: 0,
        step: 0,
        isFetching: null,
}

export default function reducer( state = initialState, action = {} ) {

    switch(action.type) {

        case types.CHARACTERS_UPDATE_LIST:
            return {
                ...state,
                list: action.list,
                total: action.total,
            };
        case types.CHARACTERS_SET_LIST_STEP: 
            return {
                ...state,
                step: action.value,
            };
        case types.CHARACTERS_UPDATE_LIST_OFFSET: 
            return {
                ...state,
                offset: action.value,
            };
        case types.CHARACTERS_UPDATE_CHARACTER:
            return {
                ...state,
                item: action.value,
            }
        default:
            return state

    }

}
