import { createStore,combineReducers,applyMiddleware } from 'redux';
import {dishes} from './dishes';
import {comments} from './comments';
import {leaders} from './leaders';
import {promotions} from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dishes : dishes,
			comments : comments,
			leaders : leaders,
			promotions : promotions
		}),applyMiddleware(thunk,logger)
		);
	return store;
}z