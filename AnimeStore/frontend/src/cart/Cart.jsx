import CartItem from "./CartItem";
import "./cart.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);

  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  let length = 0;
  cart.map((item) => {
    length++;
  });
  const [gTotal, setGtotal] = useState();
  useEffect(() => {
    let pricee = 0;

    cart.map((item) => {
      pricee += item.price * item.quantity;
    });
    setPrice(pricee);
    setTax(price * 0.1);
    setGtotal(price - tax);
    console.log(price);
  });

  const check = () => {
    fetch("/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json((json) => Promise.reject(json));
        }
      })
      .then(({ url }) => {
        window.location = url;
        console.log(url);
      })
      .catch((e) => {
        console.log("eeeeeeeeeee");
      });
  };

  return (
    <div className="cart">
      <div className="container">
        <div className="top">
          <h1>Your Cart {length}</h1>

          {cart.map((item) => (
            <div key={item._id}>
              <CartItem item={item} />
            </div>
          ))}
        </div>
        <div className="bottom">
          <table>
            <tr>
              <th>
                <h3>Subtotal:</h3>
              </th>
              <th>
                <p className="lff">{price}</p>
              </th>
            </tr>
            <tr>
              <th>
                <h3> Tax:</h3>
              </th>
              <th>
                <p className="lff">{tax}</p>
              </th>
            </tr>
            <tr>
              <th>
                <h3>Coupon Code</h3>
              </th>
              <th>
                <input className="lff" id="lff" type="text" />
              </th>
            </tr>
            <tr>
              <th>
                <h3>grand total</h3>
              </th>
              <th>
                <h3 className="lff">{gTotal}</h3>
              </th>
            </tr>
          </table>
        </div>
        <div className="btn">
          <button onClick={handelclick}>SetCart</button>
          <button id="check" onClick={check}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
