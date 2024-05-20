import { CartActions } from "../reducer/cart-reducer";
import type { CartItem, GuitarT } from "../types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type HeaderProps = {
  cart: CartItem[],
  dispatch: React.Dispatch<CartActions>
}

const Header = ({
  cart,
  dispatch,
} : HeaderProps) => {

  const cartTotal = () =>
    cart.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleDeleteItem = (id: GuitarT['id']) => {
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

    if(result.isConfirmed)
    dispatch({type:"delete-item", payload:{id: id}})

  });
  }

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
        dispatch({type:'clear-cart'})
      }
    });
  };
  

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {cart.length === 0 ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${item.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{item.name}</td>
                            <td className="fw-bold">${item.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => dispatch({type: 'decrease-quantity', payload:{id: item.id }})}
                              >
                                -
                              </button>
                              {item.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => dispatch({type: 'increase-quantity', payload:{id: item.id }})}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar:{" "}
                      <span className="fw-bold">${cartTotal()}</span>
                    </p>
                    <button
                      className="btn btn-dark w-100 mt-3 p-2"
                      onClick={ () => handleClearCart()}
                    >
                      Vaciar Carrito
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
