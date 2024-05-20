import Header from "./components/Header";
import GuitarCollection from "./components/GuitarCollection";
import Footer from "./components/Footer";
import { useReducer, useEffect } from "react";
import { cartReducer, inititalState } from "./reducer/cart-reducer";

function App() {

  const [state, dispatch] = useReducer(cartReducer, inititalState )

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const guitarExists = (id: number) => {
    var guitarExists = state.cart.find((guitar) => guitar.id === id);
    if (guitarExists) return true;
    return false;
  };
 
  return (
    <>
      <Header
        cart={ state.cart }
        dispatch={dispatch}
      />
      <GuitarCollection
        guitars={ state.guitars }
        dispatch={dispatch}
        guitarExists={guitarExists}
      />
      <Footer />
    </>
  );
}

export default App;
