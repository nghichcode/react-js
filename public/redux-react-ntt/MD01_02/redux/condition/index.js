import { reducer as reduxFormReducer } from 'redux-form';

/* CONSTANTS
============ */
const DUCK_NAME = 'condition';


/* ACTION TYPES
=============== */


/* REDUCERS
=========== */
// State Rehydration
const initialState  = {
};

// Reducer
const reducer = function(state = initialState, action) {
    switch (action.type) {

        default:
            return state;
    }
};

export default {
    [DUCK_NAME]: reducer,
    form: reduxFormReducer
};


/* ACTION CREATORS
================== */

/* ACTIONS
========== */

/* SELECTORS
========== */
export const allConditionsSelector = state => {
    return { ...state[DUCK_NAME], form: state.form.searchConditionForm };
}