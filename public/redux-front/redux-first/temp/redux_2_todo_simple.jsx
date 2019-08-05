var act = [
  { type: 'ADD_TODO', text: 'Go to swimming pool' },
  { type: 'TOGGLE_TODO', index: 1 },
  { type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }];

var gstate = {
  todos: [{text: 'Eat food',completed: true}, {text: 'Exercise',completed: false}],
  visibilityFilter: 'SHOW_COMPLETED'
}

function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter
  } else {return state;}
}
function todos(state = [], action) {  
  switch (action.type) {
    case 'ADD_TODO':
      return [...state,{ text: action.text, completed: false } ];
    case 'TOGGLE_TODO':
      return state.map(
        (todo, index)=>action.index===index?{ text: todo.text, completed: !todo.completed }:todo
      )
    case 'COMPLETE_TODO':
      return state.map(
        (todo, index)=>action.index===index?{ text: todo.text, completed: true }:todo
      )
    default:return state;
  }
}
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}

const reducer=Redux.combineReducers({visibilityFilter,todos});
const store =Redux.createStore(reducer);

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))

store.dispatch({type: 'ADD_TODO', text: 'Exercise' });
store.dispatch({type: 'ADD_TODO', text: 'Eat' });
store.dispatch({type: 'COMPLETE_TODO',index: 1})
store.dispatch({type: 'SET_VISIBILITY_FILTER',filter: 'SHOW_COMPLETED'})

// console.log();