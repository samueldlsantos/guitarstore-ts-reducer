export type GuitarT = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number
}

export type CartItem = GuitarT & {
    quantity: number
}


// export type CartItem = Pick<Guitar, "id" | "name" | "image" | "description"> & {
//     quantity: number
// }

// interface Guitar {
//     id: number,
//     name: string,
//     image: string,
//     description: string,
//     price: number
// }