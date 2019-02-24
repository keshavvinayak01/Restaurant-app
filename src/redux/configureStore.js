import { createStore,combineReducers,applyMiddleware } from 'redux';
import {dishes} from './dishes';
import {comments} from './comments';
import {leaders} from './leaders';
import {promotions} from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';
import {InitialFeedback} from './forms';
export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dishes : dishes,
			comments : comments,
			leaders : leaders,
			promotions : promotions,
			...createForms({
				feedback : InitialFeedback
			})
		}),applyMiddleware(thunk,logger)
		);
	return store;
}