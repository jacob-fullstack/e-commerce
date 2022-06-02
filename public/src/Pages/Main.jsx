import React from "react";
import HeroImage from "../Components/HeroImage";
import Card from "../Components/Card";
import UserAccount from "../Components/UserAccount";

function Main(props) {
  console.log(props.orders);
  return (
    <div className="main">
      <HeroImage />
      {props.selected === "products" ? (
        props.products ? (
          <div className="card-deck">
            {props.products.map((category) => (
              <div>
                <h2 id="sideorders" className=" cardMenuHeader mt-4 mb-4 ms-4">
                  {category.category}
                </h2>
                <div className="container ">
                  <div className="row">
                    {category.products.map((prod) => (
                      <Card
                        product={prod}
                        update={props.update}
                        addToCart={props.addToCart}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          "loading"
        )
      ) : props.selected === "user-orders" ? (
        props.orders.map((order) => <UserAccount order={order} />)
      ) : (
        "do it for guests"
      )}
    </div>
  );
}

export default Main;
