import {SET_SEARCH_ITEMS, SET_DETAILED_ITEM, SET_SEARCH_VALUE, CLEAN_DETAILED_ITEM} from '../constants/Page'

const initialState = {
    value: '',
    items: [],
    item: {},
}

export default function page(state = initialState, action) {

    switch (action.type) {
        case SET_SEARCH_VALUE:
            return { ...state, value: action.payload }

        case SET_SEARCH_ITEMS:
            return { ...state, items: action.payload }

        case SET_DETAILED_ITEM:
            return { ...state, item: action.payload }

        case CLEAN_DETAILED_ITEM:
            return { ...state, item: {} }

        default:
            return state;
    }
}