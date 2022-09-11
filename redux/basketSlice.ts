import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';

export interface BasketState {
    items: Product[]
}

// const [items, setitems] = useState([]) will only for specific component


// the following allow  to share states in diff comp
const initialState: BasketState = {
    items: [],
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state: BasketState, action: PayloadAction<Product>) => {
            state.items = [...state.items, action.payload];
        },
        removeFromBasket: (state: BasketState, action: PayloadAction<{ id: string }>) => {
            const index = state.items.findIndex(
                (item: Product) => item._id === action.payload.id
            );

            let newBasket = [...state.items];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.log(
                    `Cant remove product (id: ${action.payload.id}) as its not in basket!`
                );
            }

            state.items = newBasket;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// selectors(retrieve items from basket)----
// got state,select basket name slice and then access items (all basket items)
export const selectBasketItems = (state: RootState) => state.basket.items;
// now seleckt with id because we want to group items if it is same
export const selectBasketItemsWithId = (state: RootState, id: string) => {
    // return the itemm with matched id
    state.basket.items.filter((item: Product) => item._id === id)
}
// for total
export const selectBasketTotal = (state: RootState) =>
    state.basket.items.reduce(
        (total: number, item: Product) => (total += item.price),
        0
    );
export default basketSlice.reducer;