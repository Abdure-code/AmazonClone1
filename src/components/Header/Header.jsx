import React, { useContext } from "react";
import classes from "./Header.module.css";
import { FaSearch } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import Lowerheader from "./Lowerheader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Calculate the total number of items in the cart
  const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0);

  return (
    <>
      <section className={classes.fixed}>
        <section className={classes.header_container}>
          {/* Logo section */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            {/* Delivery */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search product" />
            <FaSearch size={38} />
          </div>

          {/* Right Side Links */}
          <div className={classes.order_container}>
            {/* Language Selector */}
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/800px-Flag_of_the_United_States.png?20110131151900"
                alt="US Flag"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            {/* Account Section */}
            <Link to={!user && "/Auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out </span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            {/* Orders Section */}
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            {/* Cart Section */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </section>

        <Lowerheader />
      </section>
    </>
  );
};

export default Header;