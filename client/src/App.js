import "./App.css";
import Finance from "./components/Finance/Finance";
import Desserts from "./components/Desserts/Desserts";
import bg from "./Images/bakerybg.jpg";

function App() {
  return (
    <>
      <div className="Hero" style={{ backgroundImage: `url(${bg})` }}>
        <h1>Bakery Inventory System</h1>
      </div>
      <div>
        <Finance />
        <div className="postres">
          <h2>Desserts</h2>
          <Desserts />
        </div>
      </div>
    </>
  );
}

export default App;
