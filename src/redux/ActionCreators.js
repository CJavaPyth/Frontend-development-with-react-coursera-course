import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl'; //becos need to communicate with server


export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})//an action creator; a function that creates an action object
//now addComment wil be used by postComment to push the comment into the redux store

export const postComment = (dishId, rating, author, comment) => (dispatch) => { //postComment is a thunk
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();
    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment), 
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin' //dont rly need to know what is this, more of backend nodeJS
    }) //'Post' operation, updates comments in the server, if method is unspecified, the default will be 'GET'
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;  //this 2nd parameter is to account for the situation
                            //where you dont hear anything from the server 
        })
        .then(response => response.json())  //this response coming in from the server will contain the updated comment
        .then(response => dispatch(addComment(response))) //which will be posed to the redux store   
        .catch(error => {console.log('Post comments', error.message); 
            alert('Your comment could not be posted\nError: ' + error.message); });
};

export const fetchDishes = () => (dispatch) => {    //fetchDishes is a thunk, returns a function
    dispatch(dishesLoading(true));  //when fetchDishes is called, it will fetch the dishes
                                    //by setting isLoading==true

    // setTimeout(() => {
    //     dispatch(addDishes(DISHES));
    // }, 2000)        //after 2s, push DISHES to the state of store
    
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;  //this 2nd parameter is to account for the situation
                            //where you dont hear anything from the server 
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({   //returns an action object
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({ //returns an action object
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
})

export const addDishes = (dishes) => ({ //returns an action object, payload is dishes
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {    //fetchDishes is a thunk, returns a function

    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;  //this 2nd parameter is to account for the situation
                            //where you dont hear anything from the server 
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errMess) => ({ //returns an action object
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
})

export const addComments = (comments) => ({ //returns an action object, payload is dishes
    type: ActionTypes.ADD_COMMENTS,
    payload: comments 
});

export const fetchPromos = () => (dispatch) => {    //fetchDishes is a thunk, returns a function
    dispatch(promosLoading(true));  //when fetchDishes is called, it will fetch the dishes
                                    //by setting isLoading==true
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;  //this 2nd parameter is to account for the situation
                            //where you dont hear anything from the server 
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({   //returns an action object
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMess) => ({ //returns an action object
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
})

export const addPromos = (promos) => ({ //returns an action object, payload is dishes
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders= () => (dispatch) => {    //fetchDishes is a thunk, returns a function
    dispatch(leadersLoading(true));  //when fetchDishes is called, it will fetch the dishes
                                    //by setting isLoading==true
    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;  //this 2nd parameter is to account for the situation
                            //where you dont hear anything from the server 
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({   //returns an action object
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errMess) => ({ //returns an action object
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
})

export const addLeaders = (leaders) => ({ //returns an action object, payload is dishes
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType
    , message) => (dispatch) => { //postFeedback is a thunk
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message,
    }
    newFeedback.date = new Date().toISOString();
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback), 
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin' //dont rly need to know what is this, more of backend nodeJS
    }) //'Post' operation, updates comments in the server, if method is unspecified, the default will be 'GET'
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;  //this 2nd parameter is to account for the situation
                            //where you dont hear anything from the server 
        })
        .then(response => response.json())  //this response coming in from the server will contain the updated comment
        .then(response => alert(JSON.stringify(response)))
        .catch(error => {console.log('Post Feedback', error.message); 
            alert('Your feedback could not be posted\nError: ' + error.message); });
};
