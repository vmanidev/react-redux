import { useEffect, useState } from "react";
import store from "./store";

export default function App() {
  const [count, setCount] = useState(store.getState().count);

  useEffect(() => {
    const subscribe = store.subscribe(() => setCount(store.getState().count));

    return () => subscribe();
  }, []);

  const increment = () => {
    store.dispatch({ type: "increment", payload: null });
  };

  const decrement = () => {
    store.dispatch({ type: "decrement", payload: null });
  };

  return (
    <div>
      <button onClick={increment}>+</button>
      <span>{count}</span>
      <button onClick={decrement}>-</button>
    </div>
  );
}
