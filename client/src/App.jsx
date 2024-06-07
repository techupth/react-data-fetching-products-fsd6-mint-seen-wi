import { useEffect, useState } from "react";
import  axios  from "axios"
import "./App.css";


function App() {

  const [data, setData] = useState([])

  const dataFetcher = async () => {
    const getData = await axios.get("http://localhost:4001/products/")
    setData(getData.data.data)
  }

  useEffect(() => {dataFetcher()}, [])

  const deleteList = async (id) => {
    const deleteData = await axios.delete(`http://localhost:4001/products/${id}`);
    dataFetcher();
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
       {data.map((item,index) => {
            return (
            <div className="product-list">
        <div className="product">
          <div className="product-preview">
            <img
              src={data[index].image}
              alt="some product"
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name:{data[index].name}</h1>
            <h2>Product price:{data[index].price} Baht</h2>
            <p>Product description: {data[index].description}</p>
          </div>
          <button className="delete-button" onClick={() => {
            deleteList(item.id)
          }}>x</button>
        </div>
      </div>)
          })}
    </div>
  );
}

export default App;
