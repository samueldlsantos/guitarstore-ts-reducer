
import { db } from "../data/database";
import { CartItem, GuitarT } from "../types";


export type CartActions =
    { type: 'add-to-cart', payload: { item: GuitarT } } |
    { type: 'increase-quantity', payload: { id: GuitarT['id'] } } |
    { type: 'decrease-quantity', payload: { id: GuitarT['id'] } } |
    { type: 'delete-item', payload: { id: GuitarT['id'] } } |
    { type: 'clear-cart' }

export type CartState = {
    guitars: GuitarT[]
    cart: CartItem[]
}

const initialCart = () : CartItem[] => {
    const localStorageCart : string  | null = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

export const inititalState: CartState = {
    guitars: db,
    cart: initialCart()
}

const MAX_ITEMS_CART = 5;
const MIN_ITEMS_CART = 1;

export const cartReducer =
    (
        state: CartState = inititalState,
        action: CartActions
    ) => {
        if (action.type === 'add-to-cart') {
            const guitarExists = state.cart.find((guitar) => guitar.id === action.payload.item.id);
            let updatedCart: CartItem[] = [];
            if (guitarExists) {
                updatedCart = state.cart.map(item => {
                    if (item.id === action.payload.item.id) {
                        if (item.quantity < MAX_ITEMS_CART) {
                            return { ...item, quantity: item.quantity + 1 }
                        } else {
                            return item
                        }
                    } else {
                        return item
                    }
                })
            }
            else {
                const newItem: CartItem = { ...action.payload.item, quantity: 1 }
                updatedCart = [...state.cart, newItem]
            }

            return {
                ...state,
                cart: updatedCart
            }
        }
        if (action.type === 'increase-quantity') {
            const updatedCart = state.cart.map((item : CartItem) => {
                if (item.id === action.payload.id && item.quantity < MAX_ITEMS_CART) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              });

            return {
                ...state,
                cart: updatedCart
            }
        }
        if (action.type === 'decrease-quantity') {
            const updatedCart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.quantity > MIN_ITEMS_CART) {
                  return { ...item, quantity: item.quantity - 1 };
                }
                return item;
              });
            return {
                ...state,
                cart: updatedCart
            }
        }
        if (action.type === 'delete-item') {
            const updatedCart = state.cart.filter((item) => item.id !== action.payload.id);

            return {
                ...state,
                cart: updatedCart
            }
        }
        if (action.type === 'clear-cart') {
            return {
                ...state,
                cart: []
            }
        }

        return {
            ...state
        }
    }