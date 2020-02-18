import {
    SET_SEARCH_VALUE,
    SET_SEARCH_ITEMS,
    SET_DETAILED_ITEM,
    CLEAN_DETAILED_ITEM,
} from '../constants/Page'

export const setSearchValue = (value) => ({
    type: SET_SEARCH_VALUE, //аналогично, теперь используем константу
    payload: value
});

export const setSearchItems = (items) => ({
    type: SET_SEARCH_ITEMS, //аналогично, теперь используем константу
    payload: items
});

export const setDetailedItem = (item) => ({
    type: SET_DETAILED_ITEM, //аналогично, теперь используем константу
    payload: item
});

export const cleanDetailedItem = () => ({
    type: CLEAN_DETAILED_ITEM, //аналогично, теперь используем константу
});