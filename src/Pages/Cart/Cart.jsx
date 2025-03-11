import React, { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/Currencyformat";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // Calculate total price
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  // Increment item quantity
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  // Decrement item quantity
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET, // Fixed action type
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cartContainer}>
          <h2>Hello, {user?.name || "Guest"}</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket.length === 0 ? (
            <p>Oops! No item in the cart</p>
          ) : (
            basket.map((item, i) => (
              <section key={i} className={classes.cartProduct}>
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={classes.btnContainer}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <TbArrowBadgeUp size={20} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <TbArrowBadgeDown size={20} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket.length > 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/Payment">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
