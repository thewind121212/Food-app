import React, {useContext} from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

const Cart = props => {
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}` 
    const hasItem = cartCtx.items.length > 0


    //const cartItemRemoveHandler = id = {}
    
    //const cartItemAddHandler = item = {}

    const cartItem =<ul className={classes['cart-items']}>{ cartCtx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} />)} </ul>


    return <Modal onClose={props.onHideCartHandler}>
        {cartItem}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
        <button className={classes['button-alt']} onClick={props.onHideCartHandler} >Close</button>
        {hasItem && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
}

export default Cart