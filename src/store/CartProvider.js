import React, {useReducer} from 'react'
import CartContext from './cart-context'


    const initCartState = {
        items: [],
        totalAmount: 0,
    }
     
    
    const cartReducer = (state, action) => {
        if (action.type === 'ADD_ITEM') {
            const updateItems = state.items.concat(action.item)
            const newTotalAmount = state.totalAmount + action.item.price * action.item.amount
            return {
                items:updateItems,
                totalAmount:newTotalAmount
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