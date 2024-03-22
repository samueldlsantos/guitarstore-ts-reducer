import Header from "./components/Header";
import GuitarCollection from "./components/GuitarCollection";
import Footer from "./components/Footer";
import useCart from "./hooks/useCart";

function App() {
  const {
    guitars,
    cart,
    handleDeleteItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleClearCart,
    cartTotal,
    handleAddToCart,
    guitarExists,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        handleDeleteItem={handleDeleteItem}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleClearCart={handleClearCart}
        cartTotal={cartTotal}
      />
      <GuitarCollection
        guitars={guitars}
        handleAddToCart={handleAddToCart}
        guitarExists={guitarExists}
      />
      <Footer />
    </>
  );
}

export default App;
