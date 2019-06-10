import { combineReducers } from 'redux';
import condition from './condition';
import searcher from './searcher';
import loadingReducer from '../../../core/loading/redux/loading';

export default combineReducers({
    ...condition, ...searcher,
    ...loadingReducer
});
