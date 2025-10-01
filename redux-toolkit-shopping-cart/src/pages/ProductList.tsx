import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductList } from "../store/features/productsSlice";
import type { AppDispatch, Product } from "../store/types";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  addItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
} from "../store/features/cartSlice";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, data, error } = useAppSelector((state) => state.products);
  const cartData = useAppSelector((status) => status.cart);

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  const addToCartBtn = (product: Product) => {
    let selectedProduct = cartData.find(
      (item) => item.product.id === product.id
    );

    if (cartData.length > 0 && selectedProduct) {
      return (
        <>
          <button
            className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-blue-900 cursor-pointer"
            onClick={() =>
              selectedProduct.quantity > 1
                ? dispatch(decreaseItemQuantity(product))
                : dispatch(removeItem(product))
            }
          >
            -
          </button>
          <span>{selectedProduct.quantity}</span>
          <button
            className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-blue-900 cursor-pointer"
            onClick={() => dispatch(increaseItemQuantity(product))}
          >
            +
          </button>
        </>
      );
    } else {
      return (
        <button
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-blue-900 cursor-pointer"
          onClick={() => dispatch(addItem({ product, quantity: 1 }))}
        >
          Add to cart
        </button>
      );
    }
  };

  const fetchProducts = () => {
    return data.map((product) => {
      return (
        <li
          key={product.id}
          className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm p-4 transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg"
        >
          <figure className="m-0 fkex flex-col text-left justify-center">
            <img
              className="max-w-full h-[180px] object-contain rounded-md mb-2 justify-self-center"
              src={product.image}
            />
            <figcaption>
              <div className="block text-xs italic text-gray-400">
                {product.category}
              </div>
              <div className="text-md font-semibold mb-2 text-gray-900">
                {product.title}
              </div>
            </figcaption>
          </figure>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-lg font-bold text-gray-900">
              &#8377; {product.price}
            </span>
            {addToCartBtn(product)}
          </div>
        </li>
      );
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-center text-gray-800 m-6">
          Products
        </h2>
        <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-blue-900 cursor-pointer mr-6 h-fit">
          View Cart
        </button>
      </div>
      {status === "loading" ? (
        <div className="text-md text-center text-blue-600">
          Fetching all products...
        </div>
      ) : status === "success" ? (
        <ul className="list-none p-0 m-0 grid [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {fetchProducts()}
        </ul>
      ) : (
        <div className="text-red-600 text-md mt-1 font-medium text-center italic">
          Error: {error?.message}
        </div>
      )}
    </div>
  );
}
