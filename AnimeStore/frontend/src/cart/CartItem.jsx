import { useDispatch } from "react-redux";
import { decreaseCount, increaseCount, removeFromCart } from "../state/state";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
("react");
import "./cart.css";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handelaremove = () => {
    dispatch(removeFromCart(item._id));
  };

  const handleIncrease = () => {
    dispatch(increaseCount(item._id));
    console.log(item.quantity);
  };

  const handelDecrease = () => {
    dispatch(decreaseCount(item._id));
  };
  let total = item.quantity * item.price;
  return (
    <div className="cart-item">
      <div className="cart-name">
        <img src={item.image} alt="" />
        <div className="cart-desc">
          <p id="name">{item.name}</p>
          <p id="desc">{item.description}</p>
        </div>
      </div>
      <p>{item.price}</p>
      <div className="quantity">
        <button onClick={handelDecrease}>
          <FaAngleLeft />
        </button>
        <p>{item.quantity}</p>
        <button onClick={handleIncrease}>
          <FaAngleRight />
        </button>
      </div>
      <p>{total}</p>
      {
        <button onClick={handelaremove}>
          <FaTimes />
        </button>
      }
    </div>
  );
};

export default CartItem;
