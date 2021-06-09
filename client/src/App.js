import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import ProductdetailPage from "./routes/ProductdetailPage";
import UpdateProduct from "./routes/UpdateProduct";
import { ProductContextProvider } from "./context/ProductsContext";
import UpdateIngredient from "./routes/UpdateIngredient";
// import Finance from "./components/Finance/Finance";
// import Desserts from "./components/Desserts/Desserts";
// import bg from "./Images/bakerybg.jpg";

function App() {
  return (
    <>
      <ProductContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id/update" component={UpdateProduct} />
            <Route exact path="/product/:id" component={ProductdetailPage} />
            <Route exact path="/ingredient/:id" component={UpdateIngredient} />
          </Switch>
        </Router>
      </ProductContextProvider>
    </>
  );
}

export default App;

/* <div className="Hero" style={{ backgroundImage: `url(${bg})` }}>
          <h1>Bakery Inventory System</h1>
        </div>
        <div>
          <Finance />
          <div className="postres">
            <h2>Desserts</h2>

            <Desserts />
          </div>
        </div> */
