import useCartStore from "../Zustand/useCartStore";

export default function FoodCard({ idCategory, strCategory, strCategoryDescription, strCategoryThumb, onClick }) {
  const { cart, addToCart, decreaseFromCart } = useCartStore();

  const itemInCart = cart.find((item) => item.idCategory === idCategory);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer max-w-sm bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-all duration-300"
    >
      <img src={strCategoryThumb} alt={strCategory} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{strCategory}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{strCategoryDescription}</p>

        {itemInCart ? (
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                decreaseFromCart(idCategory);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
            <span>{itemInCart.quantity}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart({ idCategory, strCategory, strCategoryThumb });
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ idCategory, strCategory, strCategoryThumb });
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
