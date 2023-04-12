import {Home, Cart} from "./components"
import { cartItemsContext } from "./components/Context"
import { useState } from "react";
import {Routes, Route} from "react-router-dom"

function App() {

  const [cartItems, setCartItems] = useState([]);


  return (
    <div className="App">
      <cartItemsContext.Provider
       value={{cartItems, setCartItems }}
      >
        <Routes>
          <Route exact path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        </Routes>
      </cartItemsContext.Provider> 
    </div>
  );
}

export default App;
