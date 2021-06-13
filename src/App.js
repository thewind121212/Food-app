import React, {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider" 

const App = (props) => {

const [cartIsShown, setCartIsShown] = useState(false)

const showCartHandler = (value) => {
    setCartIsShown(true)
}

const hideCartHandler = (value) => {
    setCartIsShown(false)
}

    return (
        <CartProvider>
            {cartIsShown && <Cart onHideCartHandler={hideCartHandler}/ >}
            <Header onShowCartHandler={showCartHandler} />
            <main>
            <Meals/>
           </main>
        </CartProvider>
    );
};
export default App;
