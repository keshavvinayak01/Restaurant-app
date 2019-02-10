import { comments } from '../shared/comments';
import * as ActionTypes from './ActionTypes';
export const comments = (state = comments,action) => {
	switch(action.type) {
		case ActionTypes.ADD_COMMENT:
			var comment = action.payload;
			comment.id = state.length;
			comment.date = new Date().toISOString();
			return state.concat(comment);
		default : 
		return state;
	}
}