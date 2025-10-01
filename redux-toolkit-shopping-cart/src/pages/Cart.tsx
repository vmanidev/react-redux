import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/useAppSelector";
import type { AppDispatch } from "../store/types";
import {
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
} from "../store/features/cartSlice";
import { useNavigate } from "react-router-dom";
import { calculatePrice, grandTotal } from "../utils/priceCalculator";

export default function Cart() {
  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const getCartItems = () => {
    return cartData.map(({ product, quantity }) => {
      return (
        <li
          key={product.id}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-gray-200"
        >
          <div className="flex items-start sm:items-center gap-4 flex-1 w-full">
            <img
              src={product.image}
              alt={product.title}
              className="w-16 h-16 object-contain rounded-md border"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{product.title}</span>
              <span className="text-sm text-gray-500">{quantity} Qts.</span>
            </div>
          </div>

          <div className="text-gray-800 font-semibold mt-2 sm:mt-0">
            &#8377; {calculatePrice(product.price, quantity).toFixed(2)}
          </div>

          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              className="bg-blue-600 text-white px-3 py-1 text-sm rounded-md transition-colors duration-200 hover:bg-blue-900 cursor-pointer"
              onClick={() =>
                quantity > 1
                  ? dispatch(decreaseItemQuantity(product))
                  : dispatch(removeItem(product))
              }
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              className="bg-blue-600 text-white px-3 py-1 text-sm rounded-md transition-colors duration-200 hover:bg-blue-900 cursor-pointer"
              onClick={() => dispatch(increaseItemQuantity(product))}
            >
              +
            </button>
          </div>
        </li>
      );
    });
  };

  const getEmptyCart = () => {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-xl font-semibold text-gray-700 mb-4">
          Cart is empty
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-blue-900 cursor-pointer"
        >
          Explore Products
        </button>
      </div>
    );
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 m-6">🛒 Cart</h2>
      {cartData.length > 0 ? (
        <div className="m-6 p-6">
          <ul>{getCartItems()}</ul>
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md mt-6">
            <span className="text-lg font-medium text-gray-700">
              Grand Total:
            </span>
            <span className="text-xl font-semibold text-gray-900">
              &#8377; {grandTotal(cartData).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 text-sm hover:text-blue-900 cursor-pointer"
            >
              + Add More Items
            </button>
            <button
              className="text-red-600 text-sm hover:text-red-900 cursor-pointer"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        </div>
      ) : (
        getEmptyCart()
      )}
    </>
  );
}
