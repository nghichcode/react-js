// import visibilityFilter from "./visibilityFilter";
// import { SET_FILTER } from "../actionTypes";
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const SET_FILTER = "SET_FILTER";
// import { VISIBILITY_FILTERS } from "../../constants";
const VISIBILITY_FILTERS = {ALL: "all",COMPLETED: "completed",INCOMPLETE: "incomplete"};
var initialState = VISIBILITY_FILTERS.ALL;
const visibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER: {return action.payload.filter;}
    default: {return state;}
  }
};

// import todos from "./todos";
// import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";
var initialState = {allIds: [],byIds: {}};
function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {...state,allIds: [...state.allIds, id],byIds: {...state.byIds,[id]: {content,completed: false }} };
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {...state,byIds: {...state.byIds,[id]: {...state.byIds[id],completed: !state.byIds[id].completed }} };
    }
    default:return state;
  }
}
// import rootReducer from "./reducers";
// import { combineReducers } from "redux";
const rootReducer = Redux.combineReducers({ todos, visibilityFilter });
// import { createStore } from "redux";
const rstore = Redux.createStore(rootReducer);