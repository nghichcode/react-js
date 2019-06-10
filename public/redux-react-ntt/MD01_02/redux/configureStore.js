import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import loadingMiddleware from '../../../core/loading/redux/loadingMiddleware';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// enhance store with middleware
const composeStore = compose(
    applyMiddleware(loadingMiddleware, thunk)
)(createStore);

export default function configureStore(initialState) {
    return composeStore(reducers);
}