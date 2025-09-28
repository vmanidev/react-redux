import { useEffect, useState } from "react";
import store from "./store";

import "./style.css";

export default function App() {
  const [count, setCount] = useState(store.getState().count);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setCount(store.getState().count));

    return () => unsubscribe();
  }, []);

  const increment = () => {
    store.dispatch({ type: "increment", payload: null });
  };

  const decrement = () => {
    store.dispatch({ type: "decrement", payload: null });
  };

  return (
    <>
      <h1>Redux - Count App </h1>
      <div id="main-container">
        <button onClick={increment}>+</button>
        <span>{count}</span>
        <button onClick={decrement}>-</button>
      </div>
    </>
  );
}
