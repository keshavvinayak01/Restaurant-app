import { dishes } from '../shared/dishes';
import { comments } from '../shared/comments';
import { leaders } from '../shared/leaders';
import { promotions } from '../shared/promotions';

export const initialState = {
	      dishes : dishes,
	      promotions: promotions,
	      leaders : leaders,
	      comments : comments,
	      selectedDish : null
    	};

export const Reducer = (state = initialState,action) => {
	return state;

};