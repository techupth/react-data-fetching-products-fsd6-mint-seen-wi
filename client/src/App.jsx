import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  //3.นำข้อมูลจาก server เก็บใน usestate แล้วrender บน website
  const [product, setProduct] = useState([]);

  //2.กำหนด execute
  useEffect(() => {
    dataProduct();
  });

  //1.ดึงข้อมูลสร้างrequest API
  const dataProduct = async () => {
    const productPost = await axios.get("http://localhost:4001/products");
    /* console.log(productPost.data.data); */
    setProduct(productPost.data.data);
  };

  const NewdataProduct = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    dataProduct();
  };

  //เพิ่มการกด delete

  return (
    <div className="App">
      {product.map((id) => {
        return (
          <div key={id.id}>
            <div className="app-wrapper">
              <h1 className="app-title">Products</h1>
            </div>
            <div className="product-list">
              <div className="product">
                <div className="product-preview">
                  <img
                    src={id.image}
                    alt="some product"
                    width="350"
                    height="350"
                  />
                </div>
                <div key={id.product} className="product-detail">
                  <h1>Product name: {id.name}</h1>
                  <h2>Product price: {id.price} Baht</h2>
                  <p>Product description: {id.description}</p>
                </div>

                <button
                  className="delete-button"
                  onClick={() => {
                    NewdataProduct(id.id);
                  }}
                >
                  x
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
