import Guitar from "./Guitar";
import type { GuitarT} from '../types'
import { CartActions } from "../reducer/cart-reducer";

type GuitarCollectionProps = {
  guitars: GuitarT[],
  dispatch: React.Dispatch<CartActions>
  guitarExists: (id: GuitarT["id"]) => boolean
}


const GuitarCollection = ({
  guitars,
  dispatch,
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
              dispatch={dispatch}
              guitarExists={guitarExists}
            />
          ))}
      </div>
    </main>
  );
};

export default GuitarCollection;
