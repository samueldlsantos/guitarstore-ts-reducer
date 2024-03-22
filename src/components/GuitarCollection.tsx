import Guitar from "./Guitar";

const GuitarCollection = ({
  guitars,
  cart,
  setCart,
  handleAddToCart,
  guitarExists,
}) => {
  return (
    <main className="container-xl mt-5">
      <h2 className="text-center">Nuestra Colección</h2>

      <div className="row mt-5">
        {guitars.length &&
          guitars.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              cart={cart}
              setCart={setCart}
              handleAddToCart={handleAddToCart}
              guitarExists={guitarExists}
            />
          ))}
      </div>
    </main>
  );
};

export default GuitarCollection;
