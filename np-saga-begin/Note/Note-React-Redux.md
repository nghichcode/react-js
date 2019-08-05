# Redux là gì ?
	Redux js là một thư viện JS giúp tạo ra thành một lớp quản lý trạng thái của ứng dụng.

	Redux được xây dựng dựa trên nền tảng tư tưởng của ngôn ngữ Elm và kiến trúc Flux do Facebook giới thiệu.


## Three Principles
	+ Nguồn dữ liệu tin cậy duy nhất (Single source of truth) : State của toàn bộ ứng được chứa trong một object tree nằm trong Store duy nhất

<script type="text/javascript">
	let store = createStore(counter)
	store.subscribe(() => console.log(store.getState()))
</script>

	+ Trạng thái chỉ được phép đọc (State is read-only) : Cách duy nhất để thay đổi State của ứng dụng là phát một Action (là 1 object mô tả những gì xảy ra)

<script type="text/javascript">
	store.dispatch({type: 'COMPLETE_TODO',index: 1})
	store.dispatch({type: 'SET_VISIBILITY_FILTER',filter: 'SHOW_COMPLETED'})
</script>

	+ Thay đổi chỉ bằng hàm thuần túy (Changes are made with pure functions) : Để chỉ ra cách mà State được biến đổi bởi Action chúng ta dùng các pure function gọi là Reducer

<script type="text/javascript">
	function visibilityFilter(state = 'SHOW_ALL', action) {
	  switch (action.type) {
	    case 'SET_VISIBILITY_FILTER':return action.filter
	    default:return state
	  }
	}

	function todos(state = [], action) {
	  switch (action.type) {
	    case 'ADD_TODO':return [...state,{text: action.text,completed: false}]
	    case 'COMPLETE_TODO':
	      return state.map((todo, index) => {
	        if (index === action.index) {return Object.assign({}, todo, {completed: true})}
	        return todo
	      })
	    default:return state
	  }
	}

	import { combineReducers, createStore } from 'redux'
	const reducer = combineReducers({ visibilityFilter, todos }) // Nhiều reduces
	const store = createStore(reducer)
</script>

## 4 thành phần redux

	+ Actions: Là nơi mang các thông tin dùng để gửi từ ứng dụng đến Store. Các thông tin này là 1 object mô tả những gì đã xảy ra.
<script type="text/javascript">
	// action types
	export const ADD_TODO = 'ADD_TODO'
	export const TOGGLE_TODO = 'TOGGLE_TODO'
	export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
	// other constants
	export const VisibilityFilters = {
	  SHOW_ALL: 'SHOW_ALL',SHOW_COMPLETED: 'SHOW_COMPLETED',SHOW_ACTIVE: 'SHOW_ACTIVE'
	}
	// action creators
	export function addTodo(text) {
	  return { type: ADD_TODO, text }
	}
	export function toggleTodo(index) {
	  return { type: TOGGLE_TODO, index }
	}
	export function setVisibilityFilter(filter) {
	  return { type: SET_VISIBILITY_FILTER, filter }
</script>

	+ Reducers: Là nơi xác định State thay đổi như thế nào.
<script type="text/javascript">
	export default function counterApp (state = initialState, action) {
        switch (action.type) {
            case INCREASE:return {increase: ++state.increase,decrease: state.decrease}
            case DECREASE:return {increase: state.increase,decrease: ++state.decrease}
            default:return state
        }
	}
</script>

	+ Store: Là nơi quản lý State, cho phép truy cập State qua getState(), update State qua dispatch(action), đăng kí listener qua subscribe(listener).
	Lưu ý: action để dispatch phải là object
<script type="text/javascript">
	import { createStore } from 'redux'
	import counterApp from './reducers'
	let store = createStore(counterApp)
	store.subscribe(() => console.log(store.getState()))
</script>

	+ View: Hiển thị dữ liệu được cung cấp bởi Store

	*** Cách giải thích 2
	+ Actions: các khối thông tin (payloads) gửi dữ liệu từ ứng dụng của bạn đến Store. Chúng là nguồn thông tin duy nhất cho Store. Bạn có thể gửi chúng đến Store bằng cách sử dụng store.dispatch().
	+ Reducers: Lắng nghe các hành động (Actions) và thực hiện các thay đổi trên các giá trị của Store. Hãy nhớ rằng các hành động chỉ mô tả những gì đã xảy ra, nó không thay đổi dữ liệu trên Store.
	+ Store: Quản lý nhiều reducers.
	+ Provider: là component chứa nhiều store.

## Dòng dữ liệu
### 1. You call store.dispatch(action).
	An action is a plain object describing what happened. For example:
		{ type: 'LIKE_ARTICLE', articleId: 42 }
### 2. The Redux store calls the reducer function you gave it.
	The store will pass two arguments to the reducer: the current state tree and the action
<script type="text/javascript">
	// The current application state (list of todos and chosen filter)
	let previousState = {
	  visibleTodoFilter: 'SHOW_ALL',
	  todos: [{text: 'Read the docs.',complete: false}]
	}
	// The action being performed (adding a todo)
	let action = {type: 'ADD_TODO',text: 'Understand the flow.'}
	// Your reducer returns the next application state
	let nextState = todoApp(previousState, action)
</script>

### 3. The root reducer may combine the output of multiple reducers into a single state tree.
	a) Sử dụng combineReducers helper
<script type="text/javascript">
	function todos(state = [], action) {
	  // Somehow calculate it...
	  return nextState
	}
	function visibleTodoFilter(state = 'SHOW_ALL', action) {
	  // Somehow calculate it...
	  return nextState
	}
	let todoApp = combineReducers({todos,visibleTodoFilter})
</script>
	
	b) Khi emit 1 action, todoApp returned by combineReducers sẽ gọi tất cả reducers:
<script type="text/javascript">
	let nextTodos = todos(state.todos, action)
	let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action)	
</script>

	c) Sau đó nó sẽ kết hợp 2 tập kết quả vào 1 cây duy nhất
<script type="text/javascript">
	return {todos: nextTodos,visibleTodoFilter: nextVisibleTodoFilter}
</script>

### 4. The Redux store saves the complete state tree returned by the root reducer.

## Usage with React

	Note:
		mapStateToProps : thực hiện việc map state vào prop của react component với các thuộc tính: state, ownProps
		mapDispatchToProps : thực hiện việc map dispatch vào prop của react component với các thuộc tính: state, ownProps
		Trong đó ownProps là props sẵn có của component, ví dụ: <Component propOne="Hello" />

<script type="text/javascript">
	// Thực hiện thêm state ownProps.filter==visibilityFilter vào props active
	const mapStateToProps = (state, ownProps) => ({active: ownProps.filter === state.visibilityFilter})
	// Thực hiện thêm props onClick, và khi onClick => dispatch sụ kiện filter
	const mapDispatchToProps = (dispatch, ownProps) => ({onClick: () => dispatch(setVisibilityFilter(ownProps.filter)) })
	const FilterLink=ReactRedux.connect(mapStateToProps,mapDispatchToProps)(Link)
	// filter chính là ownProps
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
</script>


# Middleware
## Khái niệm
	Middleware khá phổ biến với các Framework server-side, nó được đặt giữa thời điểm server nhận request và thời điểm server response.
	Ở Redux, Middleware giải quyết vấn đề khác với các Framework server-side nhưng định nghĩa có phần tương tự:
		Middleware cho phép chúng ta can thiệp vào giữa thời điểm dispatch một action và thời điểm action đến được reducer.
		![ No Middleware](middleware.gif)
		![Middleware](middleware2.gif)

# Redux Thunk
## Khái niệm
	Redux thunk cho phép chúng ta viết action (để truyền vào dispatch) là function thay vì bắt buộc là object như định nghĩa action mà Redux đưa ra.
	Thunk có thẻ dùng để trì hoãn việc dispatch 1 action, or chỉ dispatch nếu thỏa mãn 1 điều kiện nhất định. The inner function nhận vào 2 tham số là store methods dispatch và getState.

<script type="text/javascript">
	// Ví dụ action return function
	function incrementIfOdd() {
	  return (dispatch, getState) => {
	    const { counter } = getState();
	    if (counter % 2 === 0) {return;}
	    dispatch(increment());
	  };
	}
	//Sử dụng middleware
	const store = createStore(rootReducer, Redux.applyMiddleware(ReduxThunk.default));
	// Sử dụng thunk
	function fetchData() {
	  return (dispatch) => {
	  	dispatch(getData());
	  	getPeople().then((data)=>{...}).catch((err)=>{...} );
	  }
	}
	function mapDispatchToProps (dispatch) {return {fetchData:() => dispatch(fetchData()) }}
	// Không sử dụng thunk => action phải là object
	const setVisibilityFilter = filter => ({type: 'SET_VISIBILITY_FILTER',filter})
	const mapDispatchToProps = (dispatch, ownProps) => ({onClick: () => dispatch(setVisibilityFilter(ownProps.filter)) })

</script>

# Redux Saga
## Khái niệm
	Khác với Redux-thunk, thì Redux-saga tạo ra phần side-effect độc lập với actions và mỗi action tương ứng sẽ có 1 saga tương ứng xử lý.
	Saga = Worker + Watcher
## Saga effects
	Call (Gọi tới api hoặc 1 Promise, có truyền tham số)
	Fork: rẽ nhánh sang 1 generator khác.
	Take: tạm dừng cho đến khi nhận được action
	Race: chạy nhiều effect đồng thời, sau đó hủy tất cả nếu một trong số đó kết thúc.
	Call:gọi function. Nếu nó return về một promise, tạm dừng saga cho đến khi promise được giải quyết.
	All:gọi các function. Thực hiện effects song song và đợi đến khi tất cả được giải quyết.
	Put: dispatch một action. (giống như dispatch của redux-thunk)
	Select: chạy một selector function để lấy data từ state.
	takeLatest: có nghĩa là nếu chúng ta thực hiện một loạt các actions, nó sẽ chỉ thực thi và trả lại kết quả của của actions cuối cùng.
	takeEvery: thực thi và trả lại kết quả của mọi actions được gọi.

## Sử dụng: applyMiddleware, sau đó run rootSaga, rootSaga sẽ watch tất cả các hành động
<script type="text/javascript">
	function* helloSaga(){yield console.log("helloSaga");}
	function* incrementAsync() {yield delay(1000);yield ReduxSaga.effects.put({ type: 'INCREMENT' });}
	function* watchIncrementAsync() {yield ReduxSaga.effects.takeEvery('INCREMENT_ASYNC', incrementAsync);}
	function* rootSaga() {yield ReduxSaga.effects.all([helloSaga(),watchIncrementAsync()]);}

	const sagaMiddleware = createSagaMiddleware()
	const store = createStore(reducer,applyMiddleware(sagaMiddleware))
	sagaMiddleware.run(rootSaga)
</script>

# React Router
	* Lưu ý: dùng exact để so khớp hoàn toàn url
	* Route : Route sẽ so sánh <Route>'s path prop với current location’s pathname. Nếu <Route> matches nó sẽ render content, ngược lại nó sẽ render null. Một <Route> không có path sẽ luôn luôn match.
	* Switch : Sẽ render duy nhất 1 content mà nó match đầu tiên với location.

<script type="text/html">
	const rootPath='/redux-begin/';
	// Link
    <div>
      <ReactRouterDOM.Link to={'/redux-begin/'}>Home</ReactRouterDOM.Link> || 
      <ReactRouterDOM.Link to={'/redux-begin/abc'}>Blog1</ReactRouterDOM.Link> || 
      <ReactRouterDOM.Link to={'/redux-begin/abd'}>Blog2</ReactRouterDOM.Link> || 
      <ReactRouterDOM.Link to={'/redux-begin/abd/a'}>Blog1</ReactRouterDOM.Link>
      <ReactRouterDOM.Link to={'/redux-begin/abd/b'}>Blog3</ReactRouterDOM.Link> ||
    </div>
    // App
	<ReactRedux.Provider store={store}>
	    <ReactRouterDOM.BrowserRouter>
	      <div>
	      	// Route
	        <ReactRouterDOM.Route exact path={rootPath} component={Home} />
	        <ReactRouterDOM.Route path={rootPath+"abc"} component={Blog1} />
	        <ReactRouterDOM.Route exact path={rootPath+"abd"} component={Blog2} />
	        <ReactRouterDOM.Route path={rootPath+"abd/a"} component={Blog1} />
	        <ReactRouterDOM.Route path={rootPath+"abd/b"} component={Blog3} />
			// Switch
	        <ReactRouterDOM.Switch>
		        <ReactRouterDOM.Route path={rootPath+"abd/b"} component={Blog3} />
		        <ReactRouterDOM.Route path={rootPath+"abd/a"} component={Blog1} />
		        <ReactRouterDOM.Route path={rootPath+"abc"} component={Blog1} />
		        <ReactRouterDOM.Route path={rootPath+"abd"} component={Blog2} />
		        <ReactRouterDOM.Route path={rootPath} component={Home} />
	        </ReactRouterDOM.Switch>
	      </div>
	    </ReactRouterDOM.BrowserRouter>
	</ReactRedux.Provider>
</script>





