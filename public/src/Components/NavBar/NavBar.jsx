import React from "react";
import "../../Styles/nav-bar-styles.css";
import logo from "../../Assets/png-clipart-bakery-roast-chicken-chef-platter-graphy-chef-silhouette-food-retro-thumbnail.png";
import CheckoutDialog from "../Checkout/CheckoutDialog";

import AdminNavBar from "./AdminNavBar";
import UserNavBar from "./UserNavBar";
import GuestNavBar from "./GuestNavBar";
import SignInDialog from "../SignIn/SignInDialog";
import SignUpDialog from "../SignUp/SignUpDialog";

function NavBar(props) {
  const [checkoutDialog, setCheckoutDialog] = React.useState(false);

  const handleCheckoutDialog = () => {
    setCheckoutDialog(!checkoutDialog);
  };

  console.log(props.cart.length);
  console.log(props.totalAmount);

  const [signInDialog, setSignInDialog] = React.useState(false);
  const [signUpDialog, setSignUpDialog] = React.useState(false);

  const handleSignInDialog = () => {
    setSignInDialog(!signInDialog);
  };

  const handleSignUpDialog = () => {
    setSignUpDialog(!signUpDialog);
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <div className="container-fluid align-items-end">
        <img src={logo} className="img-fluid logo" alt="" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          <CheckoutDialog
            open={checkoutDialog}
            onClose={handleCheckoutDialog}
            user={props.user}
            cart={props.cart}
            totalAmount={props.totalAmount}
            update={props.update}
          />
          {props.user ? (
            props.user.admin ? (
              <AdminNavBar
                update={props.update}
                handleSelected={props.handleSelected}
              />
            ) : (
              <UserNavBar
                update={props.update}
                handleSelected={props.handleSelected}
                cart={props.cart}
                user={props.user}
                totalAmount={props.totalAmount}
                deleteFromCart={props.deleteFromCart}
              />
            )
          ) : (
            <GuestNavBar
              update={props.update}
              handleSelected={props.handleSelected}
            />
          )}
          <ul className="navbar-nav ">
            <li className="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Menu
              </a>
              {/* <img
                src={user}
                className="img-fluid nav-link dropdown-toggle user"
                role="button"
                data-bs-toggle="dropdown"
                alt=""
              /> */}
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#sideorders">
                    SIDE ORDERS
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#mains">
                    MAINS
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#deserts">
                    DESERTS
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#drinks">
                    DRINKS
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link">Items in my Cart : {props.cart.length}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Total Price: {props.totalAmount}</a>
            </li>
            {props.cart.length !== 0 ? (
              <li className="nav-item">
                <button
                  onClick={handleCheckoutDialog}
                  className="nav-link text-danger checkoutButton"
                >
                  checkout
                </button>
              </li>
            ) : null}

            <div>
              <SignInDialog
                open={signInDialog}
                onClose={handleSignInDialog}
                update={props.update}
                handleSignUpDialog={handleSignUpDialog}
              />
              <SignUpDialog
                open={signUpDialog}
                onClose={handleSignUpDialog}
                update={props.update}
                handleSignInDialog={handleSignInDialog}
              />

              <li className="nav-item dropdown dropleft me-3">
                <a
                  className="nav-link text-danger"
                  clbuttonss="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  onClick={handleSignInDialog}
                >
                  LOGIN
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
