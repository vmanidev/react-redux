import { useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppState } from "../store/types";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;