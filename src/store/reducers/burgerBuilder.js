import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../utilities";

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

const addIngredient = (state, action) => {
    const updateIngredient = {[action.name]: state.ingredients[action.name] + 1}
    const updateIngredients = updateObject(state.ingredients, updateIngredient)
    const updateState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name]
    }
    return updateObject(state, updateState);
}

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.name]: state.ingredients[action.name] - 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name]
    }
    return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    return updateObject(state,{ ingredients: {
            lettuce: action.ingredients.lettuce,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4})
}
const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error:true})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.ADD_INGREDIENT): return addIngredient(state, action);
        case(actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action);
        case(actionTypes.SET_INGREDIENTS): return setIngredients(state, action);
        case(actionTypes.FETCH_INGREDIENTS_FAILED): return fetchIngredientsFailed(state, action);
        default: return state
    }
}

export default reducer;