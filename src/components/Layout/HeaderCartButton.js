import React, {useContext,useState , useEffect} from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    
    const cartCtx = useContext(CartContext)

   const  numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {return curNumber + item.amount}, 0)

    const [classesCart, setClassesCart] = useState(false)

    const cartButtonClasses = `${classes.button} ${classesCart ? classes.bump : ''}`


    useEffect(() => {
        const timer = setTimeout(() => {
            setClassesCart(true)
        }, 500)
        return () => {
            clearTimeout(timer)
            setClassesCart(false)
        }
    },[numberOfCartItems])

    return (
        <button className={cartButtonClasses}  onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
