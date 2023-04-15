import { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";

export default function useGetHeight(ref: HTMLAttributes<HTMLElement>, storeName: string) {
  const dispatch = useDispatch()

  // dispatch({type: storeName, height: height})

  // return { elemHeight }
}