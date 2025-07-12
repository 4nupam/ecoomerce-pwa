import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const exists = state.cart.find((i) => i.idCategory === item.idCategory);
          if (exists) {
            return {
              cart: state.cart.map((i) =>
                i.idCategory === item.idCategory
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return {
            cart: [...state.cart, { ...item, quantity: 1 }],
          };
        }),

      decreaseFromCart: (idCategory) =>
        set((state) => {
          const item = state.cart.find((i) => i.idCategory === idCategory);
          if (item.quantity > 1) {
            return {
              cart: state.cart.map((i) =>
                i.idCategory === idCategory
                  ? { ...i, quantity: i.quantity - 1 }
                  : i
              ),
            };
          }
          return {
            cart: state.cart.filter((i) => i.idCategory !== idCategory),
          };
        }),

      removeFromCart: (idCategory) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.idCategory !== idCategory),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // 🔑 key in localStorage
    }
  )
);

export default useCartStore;
