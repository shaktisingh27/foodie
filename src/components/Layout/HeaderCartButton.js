import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';



const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const { items } = cartCtx;
    //this is javascript method(reduce) allows us to transfer array data into single value
    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${isHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setIsHighlighted(true);

        const timer = setTimeout(() => {
            setIsHighlighted(false);
        }, 300);

        return (() => {
            clearTimeout(timer);
        });
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>

        </button>
    )

};

export default HeaderCartButton;