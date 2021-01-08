import * as actionTypes from '../actions/actionTypes'

const initialState ={
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    lettuce: 1.3,
    cheese: 1.5,
    meat: 0.2,
    bacon: 1.7
};
const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.ADD_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name]
            }
        case(actionTypes.REMOVE_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.name]
            }
        case(actionTypes.SET_INGREDIENTS):
            return{
                ...state,
                ingredients: {
                    lettuce: action.ingredients.lettuce,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 4
            }
        case(actionTypes.FETCH_INGREDIENTS_FAILED):
            return {
                ...state,
                error: true
            }
        default: return state
    }
}

export default reducer;