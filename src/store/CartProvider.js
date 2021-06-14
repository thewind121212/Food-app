import React, {useReducer} from 'react'
import CartContext from './cart-context'


    const initCartState = {
        items: [],
        totalAmount: 0,
    }
     
    
    const cartReducer = (state, action) => {
        if (action.type === 'ADD_ITEM') {
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
            const existingCartItem = state.items[existingCartItemIndex] 
            let updateItems; 
            if (existingCartItem) {
                 const updateItem = {
                     ...existingCartItem,
                     amount: existingCartItem.amount + action.item.amount
                 }
                 updateItems = [
                     ...state.items
                 ]
                 updateItems[existingCartItemIndex] = updateItem
            }
            else {
                updateItems = state.items.concat(action.item)
            }
            const newTotalAmount = state.totalAmount + action.item.price * action.item.amount
            return {
                items:updateItems,
                totalAmount:newTotalAmount
            }
        }
        if (action.type === 'REMOVE_ITEM') {
            const existingCartItemIndex = state.items.findIndex( items => items.id === action.id)
            const existingCartItem = state.items[existingCartItemIndex]
            const updateItem = {...existingCartItem, amount: existingCartItem.amount - 1}
            const newTotalAmount = state.totalAmount - existingCartItem.price
            let updateItems = [...state.items]
            if (updateItem.amount === 0) {
                updateItems = updateItems.filter(item => item.id !== existingCartItem.id)
            }
            else {
            updateItems[existingCartItemIndex] = updateItem
            }
            return {
                items:updateItems,
                totalAmount: newTotalAmount
            }
        }
        return initCartState
    } 

const CartProvider = props => {

const [cartState, dispatchCartAction] = useReducer(cartReducer, initCartState)
const addItemToCartHandler = item => {
    dispatchCartAction({type:'ADD_ITEM', item:item})
}

const removeItemFromCartHandler = id => {
    dispatchCartAction({type:'REMOVE_ITEM', id: id})
}

const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
}
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider