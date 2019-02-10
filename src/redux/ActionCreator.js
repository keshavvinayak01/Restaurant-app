import * as ActionTypes from './ActionTypes'

export const addComment = (dishId,rating,author,comment) =>  ({
	type:ActionTypes.ADD_COMMENT,
	payload: {
		dishId:dish,
		rating:rating,
		author:author,
		comment:comment
	}
});