import axios from 'axios';
import { defineAction } from 'redux-define';
/* CONSTANTS
============ */
const DUCK_NAME = 'searcher';
/* ACTION TYPES
=============== */
const SEARCH_PRODUCTS = defineAction('SEARCH_PRODUCTS', [
    'REQUESTED', 'FAILED', 'SUCCEEDED'
], DUCK_NAME);
const DELETE_PRODUCT = defineAction('DELETE_PRODUCT', DUCK_NAME);
const EXPORT_BALANCE = defineAction('EXPORT_BALANCE', ['REQUESTED', 'FAILED', 'SUCCEEDED'], DUCK_NAME);
const SELECT_SERIAL = defineAction('SELECT_SERIAL', ['SELECT_ALL','SELECT_ONE'], DUCK_NAME);
/* REDUCERS
=========== */
// State Rehydration
const initialState = {
    isLoading: false,
    isError: false,
    data: [],
    modal: false,
    checkboxes: [],
    result: []
};
// Reducer
const reducer = function(state = initialState, action) {
    switch (action.type) {

        case EXPORT_BALANCE.REQUESTED:
            return { ...state, isLoading: true, isError: false };
        case EXPORT_BALANCE.FAILED:
            return { ...state, isLoading: false, isError: true };
        case EXPORT_BALANCE.SUCCEEDED:
        	return { ...fetchModal(state, action), ...action.payload };

        case SEARCH_PRODUCTS.REQUESTED:
            return { ...state, isLoading: true, isError: false };
        case SEARCH_PRODUCTS.FAILED:
            return { ...state, isLoading: false, isError: true };
        case SEARCH_PRODUCTS.SUCCEEDED:
            return { ...fetch(state, action), ...action.payload };


        case DELETE_PRODUCT:
            return { ...state, isLoading: false, isError: false, ...action.payload };

        case SELECT_SERIAL.SELECT_ONE:
            return { ...checkOne(state, action) }
        case SELECT_SERIAL.SELECT_ALL:
            return { ...checkAll(state, action) }

        default:
            return state;
    }
};
export default {
    [DUCK_NAME]: reducer
};

const checkAll = function(state, action) {
    state.checkboxes = state.checkboxes.map(function() {
        return action.checked;
    })
    return state;
}

const checkOne = function(state, action) {
    state.checkboxes[action.index] = action.checked;
    return state;
}
/* ACTION CREATORS
================== */
export const searchRequested = () => ({
    type: SEARCH_PRODUCTS.REQUESTED
});
export const searchFailed = (err) => ({
    type: SEARCH_PRODUCTS.FAILED
});
export const searchSucceeded = (json) => ({
    type: SEARCH_PRODUCTS.SUCCEEDED,
    payload: json
});

export const resultRequested = () => ({
    type: EXPORT_BALANCE.REQUESTED
});
export const resultFailed = (err) => ({
    type: EXPORT_BALANCE.FAILED
});
export const resultSucceeded = (json) => ({
    type: EXPORT_BALANCE.SUCCEEDED,
    payload: json
});

export const deleteProduct = () => ({
    type: DELETE_PRODUCT
});

export const selectAll = (checked) => {
    return dispatch => {
        dispatch({
            type: SELECT_SERIAL.SELECT_ALL,
            checked: checked
        })
    }
}

export const selectOne = (checked, index) => {
    return dispatch => {
        dispatch({
            type: SELECT_SERIAL.SELECT_ONE,
            checked: checked,
            index: index
        })
    }
}
/* ACTIONS
========== */
export const fetchData = (form, page = 0, pageSize) => {
    let formRequest = Object.assign({}, form);
    formRequest['page'] = page;
    formRequest['size'] = pageSize;
    let url = window.ACTION_PATH + "/api/inventory/stockMergeDivides/search";
    return dispatch => {
        dispatch(searchRequested());
        return axios.get(url, {
            params: formRequest
        })
            .then(response => {
            	
                dispatch(searchSucceeded(response.data));
            })
            .catch(error => {
                dispatch(searchFailed(error.response.data));
            })
            ;
    }
};



export const download = (instanceList, cuttingPoint, printer) => {
//    var formData = new FormData();
//    formData.append("printList", printList);
//    formData.append("instanceList", instanceList);
//    formData.append("cuttingPoint", cuttingPoint);
//    formData.append("printer", printer);
    let url = window.ACTION_PATH + "/api/inventory/stockMergeDivides/download";
    return dispatch => {
        dispatch(resultRequested());
            return axios.post(url, {
                instanceList, cuttingPoint, printer
            }
        )
        .then(response => {
            dispatch(resultSucceeded(response.data));
        })
        .catch(error => {
            dispatch(resultFailed(error.response.data));
        })
        ;
    }
};

const fetch = function(state, action) {
	
    state.isLoading = false;
    state.isError = false;
    state.checkboxes = action.payload.allInstance.map(function() {return false;});
    return state;
}

const fetchModal = function(state, action) {
    state.isLoading = false;
    state.isError = false;
    state.modal = false;
    return state;
}

/* SELECTORS
========== */
export const allResultsSelector = state => {
    return state[DUCK_NAME];
};