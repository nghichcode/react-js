const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* helloSaga(){yield console.log("helloSaga");}
function* incrementAsync() {console.log("Call"); yield delay(2000);yield ReduxSaga.effects.put({ type: 'INCREMENT' });}
function* watchIncrementAsync() {yield ReduxSaga.effects.takeEvery('INCREMENT_ASYNC', incrementAsync);}
function* rootSaga() {yield ReduxSaga.effects.all([helloSaga(),watchIncrementAsync()]);}

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':return state + 1
    case 'INCREMENT_IF_ODD':return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':return state - 1
    default:return state
  }
}

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
      <div>
        <button onClick={onIncrementAsync}>Increment 2s</button>{' '}
        <button onClick={onIncrement}>Increment</button>{' '}
        <button onClick={onDecrement}>Decrement</button> <hr />
        <div>Clicked: {value} times</div>
      </div>

const sagaMiddleware = ReduxSaga.default() //ReduxSaga.createSagaMiddleware()
const store = Redux.createStore(counter, Redux.applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const action = (type) => store.dispatch({type})
function render() {
  ReactDOM.render(
    <Counter value={store.getState()}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)