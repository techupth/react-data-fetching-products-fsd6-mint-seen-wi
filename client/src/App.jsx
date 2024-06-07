import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);

  const getProductList = async () => {
    const result = await axios.get("http://localhost:4001/products");
    // console.log(result);
    setProduct(result.data.data);
  };

  const deleteProductList = async (productId) => {
    const result = await axios.delete(
      `http://localhost:4001/products/${productId}`
    );
    console.log(result);
    getProductList();
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {product.map((item) => {
        return (
          <div className="product-list" key={item.id}>
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProductList(item.id);
                }}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
