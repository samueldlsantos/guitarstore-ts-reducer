import Guitar from "./Guitar";
import type { GuitarT} from '../types'

type GuitarCollectionProps = {
  guitars: GuitarT[],
  handleAddToCart: (item: GuitarT) => void,
  guitarExists: (id: GuitarT["id"]) => boolean
}


const GuitarCollection = ({
  guitars,
  handleAddToCart,
  guitarExists,
} : GuitarCollectionProps) => {
  return (
    <main className="container-xl mt-5">
      <h2 className="text-center">Nuestra Colección</h2>

      <div className="row mt-5">
        {guitars.length &&
          guitars.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              handleAddToCart={handleAddToCart}
              guitarExists={guitarExists}
            />
          ))}
      </div>
    </main>
  );
};

export default GuitarCollection;
