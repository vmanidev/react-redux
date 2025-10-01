import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductList } from "../store/features/productsSlice";
import type { AppDispatch } from "../store/types";
import { useAppSelector } from "../hooks/useAppSelector";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, data, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const fetchProducts = () => {
    return data.map((product) => {
      return (
        <li key={product.id}>
          <figure>
            <img src={product.image} />
            <figcaption>{product.title}</figcaption>
          </figure>
          <div>
            <span>{product.description}</span>
            <span>{product.category}</span>
          </div>
          <div>
            <span>{product.price}</span>
            <button>Add to cart</button>
          </div>
        </li>
      );
    });
  };

  return (
    <div>
      <h2>Products</h2>
      {status === "loading" ? (
        <div>Fetching all products...</div>
      ) : (
        <ul>{fetchProducts()}</ul>
      )}
    </div>
  );
}
