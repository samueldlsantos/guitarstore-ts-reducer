import { useState, useEffect, useMemo } from "react";
import { db } from "../data/database"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const useCart = () => {
  const [guitars] = useState(db);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? []
  );
  const MAX_ITEMS_CART = 5;
  const MIN_ITEMS_CART = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleDeleteItem = (id) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      //Para agregar css personalizado a los botones
      // buttonsStyling: false,
      // customClass: {
      //   footer:"flex justify-content-between",
      //   confirmButton: "btn btn-dark w-100",
      //   cancelButton: "btn btn-dark w-100"
      // },
      title: "Estas seguro de eliminar el articulo?",
      text: "No seras capaz de revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
      }
    });
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS_CART) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS_CART) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setCart(updatedCart);
  };

  const handleClearCart = () => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Estas seguro de vaciar el carrito?",
      text: "No seras capaz de revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, vaciar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
      }
    });
  };

  const cartTotal = () =>
    cart.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleAddToCart = (item) => {
    var guitarExists = cart.find((guitar) => guitar.id === item.id);

    if (guitarExists) {
      guitarExists.quantity += 1;

      const newCart = cart.map((item) =>
        item.id === guitarExists.id ? guitarExists : item
      );

      setCart(newCart);
    } else {
      //Hace una copia del estado actual del carrito sin tener que pasar el estado por props
      item.quantity = 1;
      setCart((prevCart) => [...prevCart, item]);
    }
  };

  const guitarExists = (id) => {
    var guitarExists = cart.find((guitar) => guitar.id === id);
    if (guitarExists) return true;
    return false;
  };

  return {
    guitars,
    cart,
    setCart,
    handleDeleteItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleClearCart,
    cartTotal,
    handleAddToCart,
    guitarExists,
  };
};

export default useCart;
