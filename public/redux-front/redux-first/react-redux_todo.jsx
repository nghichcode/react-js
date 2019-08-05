				let nextTodoId = 0
				const addTodo = text => ({type: 'ADD_TODO',id: nextTodoId++,text})
				const setVisibilityFilter = filter => ({type: 'SET_VISIBILITY_FILTER',filter})
				const toggleTodo = id => ({type: 'TOGGLE_TODO',id})
				const VisibilityFilters = {SHOW_ALL: 'SHOW_ALL',SHOW_COMPLETED: 'SHOW_COMPLETED',SHOW_ACTIVE: 'SHOW_ACTIVE'}

				const Link = ({ active, children, onClick }) => (<button onClick={onClick} disabled={active} style={{marginLeft: '4px',}} >{children}</button>)
			const mapStateToProps = (state, ownProps) => ({active: ownProps.filter === state.visibilityFilter})
			const mapDispatchToProps = (dispatch, ownProps) => ({onClick: () => dispatch(setVisibilityFilter(ownProps.filter)) })
			const FilterLink=ReactRedux.connect(mapStateToProps,mapDispatchToProps)(Link)
		const Footer = () => (
		  <div>
		    <span>Show: </span>
		    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
		    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
		    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
		  </div>
		)
		const AddTodoAct = ({ dispatch }) => {
		  let input
		  return (
		    <div>
		      <form onSubmit={e => {e.preventDefault();if (!input.value.trim()) {return;}dispatch(addTodo(input.value));input.value = '';}}>
		        <input ref={node => input = node} /><button type="submit">Add Todo</button>
		      </form>
		    </div>
		  )
		}
		const AddTodo=ReactRedux.connect()(AddTodoAct)

				const Todo = ({ onClick, completed, text }) => (<li onClick={onClick} style={{textDecoration: completed ? 'line-through' : 'none'}}>{text}</li>)
			const TodoList = ({ todos, toggleTodo }) => (<ul>{todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} /> )}</ul>)
		const getVisibleTodos = (todos, filter) => {
		  switch (filter) {
		    case VisibilityFilters.SHOW_ALL:return todos
		    case VisibilityFilters.SHOW_COMPLETED:return todos.filter(t => t.completed)
		    case VisibilityFilters.SHOW_ACTIVE:return todos.filter(t => !t.completed)
		    default:throw new Error('Unknown filter: ' + filter)
		  }
		}
		const VTLmapStateToProps = state => ({todos: getVisibleTodos(state.todos, state.visibilityFilter)})
		const VTLmapDispatchToProps = dispatch => ({toggleTodo: id => dispatch(toggleTodo(id))})
		const VisibleTodoList = ReactRedux.connect(VTLmapStateToProps,VTLmapDispatchToProps)(TodoList)
	const App = () => (<div><AddTodo /><VisibleTodoList /><Footer /></div>)

		const todos = (state = [], action) => {
		  switch (action.type) {
		    case 'ADD_TODO':return [...state,{id: action.id,text: action.text,completed: false}]
		    case 'TOGGLE_TODO':return state.map(todo =>(todo.id === action.id)? {...todo, completed: !todo.completed}: todo)
		    default:return state
		  }
		}
		const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
		  switch (action.type) {
		    case 'SET_VISIBILITY_FILTER':return action.filter;
		    default:return state
		  }
		}
	const rootReducer = Redux.combineReducers({todos,visibilityFilter})
const store = Redux.createStore(rootReducer)
ReactDOM.render(
  <ReactRedux.Provider store={store}><App /></ReactRedux.Provider>,
  document.getElementById('root')
)

