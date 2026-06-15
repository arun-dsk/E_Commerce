"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useAuth } from "@/context/AuthContext";
import {
  CartItem,
  clearCart,
  replaceCart,
} from "@/redux/cartSlice";
import {
  AppDispatch,
  RootState,
} from "@/redux/store";

const getCartKey = (userId: string) =>
  `cart:${userId}`;

const readStoredCart = (
  userId: string
): CartItem[] => {
  const storedCart = localStorage.getItem(
    getCartKey(userId)
  );

  if (!storedCart) {
    return [];
  }

  try {
    const parsed = JSON.parse(
      storedCart
    ) as CartItem[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item) =>
        typeof item.id === "string" &&
        Number.isInteger(item.count) &&
        item.count > 0
    );
  } catch {
    return [];
  }
};

const CartPersistence = () => {
  const dispatch =
    useDispatch<AppDispatch>();

  const { user, isLoading } = useAuth();
  const userId = user?.id;

  const { cartItems } = useSelector(
    (state: RootState) => state.cart
  );

  const hydratedUserIdRef =
    useRef<string | null>(null);

  const skipNextSaveRef = useRef(false);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!userId) {
      hydratedUserIdRef.current = null;
      skipNextSaveRef.current = false;
      dispatch(clearCart());
      return;
    }

    if (
      hydratedUserIdRef.current === userId
    ) {
      return;
    }

    const storedCart = readStoredCart(
      userId
    );

    hydratedUserIdRef.current = userId;
    skipNextSaveRef.current = true;
    dispatch(replaceCart(storedCart));
  }, [dispatch, isLoading, userId]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (
      !userId ||
      hydratedUserIdRef.current !== userId
    ) {
      return;
    }

    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    localStorage.setItem(
      getCartKey(userId),
      JSON.stringify(cartItems)
    );
  }, [cartItems, isLoading, userId]);

  return null;
};

export default CartPersistence;
