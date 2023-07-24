import { useDispatch } from "react-redux";
import {
  addToCart,
  increaseCount,
  decreaseCount,
  setSize,
} from "../state/state";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./detail.css";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const [sizze, setSizze] = useState("");
  const [product, setProduct] = useState();

  //DATA
  /* const [product, setData] = useState({
    id: 2,
    name: "prossdsdgduc",
    image: shirt,
    description: "paly  adaz sda",
    price: 900,
    quantity: 1,
  }); */

  //searsh for product
  const id = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/produits${id}`);
        const jsonData = await response.json();
        setProduct(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  //ADD TO CART
  const handeladd = () => {
    dispatch(addToCart(product));
  };
  //INCREASE QTY
  const handleIncrease = () => {
    dispatch(increaseCount(product._id));
  };
  //DECREASE QTY
  const handelDecrease = () => {
    dispatch(decreaseCount(product._id));
  };
  const handelSize = () => {
    dispatch(setSize({ id: product._id, size: sizze }));
  };

  const handleOptionChange = (event) => {
    setSizze(event.target.value);
  };


  return (
    <div className="product-detail">
      <div className="left">
        <img src={product.image} alt="dsqsddqs" />
      </div>
      <div className="right">
        <div className="right-container">
          <h2> {product.name} </h2>
          <br />
          <p>{product.price} DT </p>

          <div class="quantity-control">
            <button
              onClick={handelDecrease}
              class="quantity-btn"
              id="decrease-btn"
            >
              <span>-</span>
            </button>
            <input
              type="number"
              class="quantity-input"
              value="1"
              min="1"
              max="10"
            />
            <button
              onClick={handleIncrease}
              class="quantity-btn"
              id="increase-btn"
            >
              <span>+</span>
            </button>
            <button onClick={handeladd}> ADD TO CART</button>
          </div>
          <div className="size">
            <select
              value={sizze}
              onClick={handelSize}
              onChange={handleOptionChange}
            >
              <option value="">Select a size</option>
              <option value="S"> S</option>
              <option value="M">M </option>
              <option value="L"> L</option>
            </select>
          </div>
          <p>{product.description} </p>
          {/*  {exist && <p> In Stock</p>} */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
