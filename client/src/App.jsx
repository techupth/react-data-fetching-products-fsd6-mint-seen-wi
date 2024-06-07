import { useEffect, useState } from "react";
import  axios  from "axios"
import "./App.css";

function App() {

  const [data, setData] = useState([])
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [errorCatch, setError] = useState(false)

  const dataFetcher = async () => {
    setLoadingStatus(true) 
    try {
      const getData = await axios.get("http://localhost:4001/products/")
      setData(getData.data.data) 
    } catch (error){
      setError(true)
    } finally {
      setLoadingStatus(false) 
    } 
  }

  useEffect(() => {dataFetcher()}, [])

  const deleteList = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    dataFetcher();
  }

  return (

    <div className="App">

      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      
      { loadingStatus ? ( <h1 className="loading-message">Loading...</h1> 
      ) : errorCatch ? ( <h1 className="loading-message">Fetching Error...</h1>  
      ) : (
      <div className="product-list">
        {data.map((item) => (
          <div key={item.id} className="product">
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
                deleteList(item.id);
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
    )}
    </div>
  )
}

export default App;
