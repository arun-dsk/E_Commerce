"use client";

import Link from "next/link";
import Image from "next/image";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useMemo,
  useState,
  useEffect,
} from "react";

import Popup from "@/Components/Popup/Popup";

import {
  incrementCount,
  decrementCount,
} from "@/redux/cartSlice";

import {
  AppDispatch,
  RootState,
} from "@/redux/store";

import { API_BASE_URL } from "@/lib/api";
import type { Product } from "@/types/product";

type CartProduct = Product & {
  count: number;
};

const MyCart = () => {

  const dispatch =
    useDispatch<AppDispatch>();

  const [products, setProducts] =
    useState<Product[]>([]);

  const [popupPage, setPopupPage] =
    useState(false);

  const [removeItem, setRemoveItem] =
    useState<string | null>(null);

  const { cartItems, cartCount } =
    useSelector(
      (state: RootState) => state.cart
    );

  useEffect(() => {

    fetch(
      `${API_BASE_URL}/api/products/`
    )
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const cart = cartItems
    .map((item) => {

      const product = products.find(
        (prod) => prod.product_id === item.id
      );

      if (!product) {
        return null;
      }

      return {
        ...product,
        count: item.count,
      };

    })
    .filter(
      (
        item
      ): item is CartProduct =>
        item !== null
    );

  const onRemove = (
    item: string
  ) => {

    setPopupPage(true);

    setRemoveItem(item);

  };

  const totalActualPrice =
    useMemo(() => {

      return cart.reduce(
        (sum, item) =>
          sum +
          item.price * item.count,
        0
      );

    }, [cart]);

  const totalOfferPrice =
    useMemo(() => {

      return cart.reduce(
        (sum, item) =>
          sum +
          item.offerPrice *
            item.count,
        0
      );

    }, [cart]);

  // Empty Cart
  if (cartCount === 0) {

    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">

        <h2 className="text-3xl font-bold text-slate-900">
          Your Cart Is Empty
        </h2>

        <Link
          href="/#Products"
          className="rounded-xl bg-slate-950 px-6 py-3 font-semibold !text-green-600 transition-colors hover:bg-slate-800"
        >
          Purchase Now
        </Link>

      </div>
    );

  }

  return (
    <div className="mx-auto max-w-7xl overflow-x-auto px-6 py-12 md:px-16">

      <div className="mb-10">

        <h2 className="text-4xl font-bold tracking-tight text-slate-900">
          Your Cart
        </h2>

        <p className="mt-2 text-slate-600">
          Review your picks,
          adjust quantities,
          and checkout when
          you are ready.
        </p>

      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-2xl">

        <table className="w-full border-collapse">

          <thead className="bg-slate-50">

            <tr className="border-b border-slate-200">

              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Quantity
              </th>

              <th className="p-4 text-left">
                Actual Price
              </th>

              <th className="p-4 text-left">
                Offer Price
              </th>

              <th className="p-4"></th>

            </tr>

          </thead>

          <tbody>

            {cart.map(
              (item) => (

                <tr
                  key={item.product_id}
                  className="border-b border-slate-200 last:border-b-0"
                >

                  {/* Image */}
                  <td className="p-4">

                    <Image
                      src={item.image[0]}
                      alt={item.name}
                      width={90}
                      height={90}
                      className="rounded-xl object-cover"
                    />

                  </td>

                  {/* Name */}
                  <td className="p-4 font-medium text-slate-900">

                    {item.name}

                  </td>

                  {/* Quantity */}
                  <td className="p-4">

                    <div className="flex items-center gap-4">

                      <button
                        onClick={() =>
                          dispatch(
                            decrementCount(
                              item.product_id
                            )
                          )
                        }
                        className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                      >
                        -
                      </button>

                      <p className="min-w-6 text-center font-semibold">

                        {item.count}

                      </p>

                      <button
                        onClick={() =>
                          dispatch(
                            incrementCount(
                              item.product_id
                            )
                          )
                        }
                        className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                      >
                        +
                      </button>

                    </div>

                  </td>

                  {/* Actual Price */}
                  <td className="p-4 text-slate-700">

                    Rs.{" "}
                    {item.price *
                      item.count}

                  </td>

                  {/* Offer Price */}
                  <td className="p-4 font-semibold text-emerald-600">

                    Rs.{" "}
                    {item.offerPrice *
                      item.count}

                  </td>

                  {/* Remove */}
                  <td
                    onClick={() =>
                      onRemove(item.product_id)
                    }
                    className="cursor-pointer p-4 font-semibold text-red-500 transition-colors hover:text-red-600"
                  >
                    Remove
                  </td>

                </tr>

              )
            )}

            {/* Totals */}
            <tr className="bg-slate-50">

              <td colSpan={3}></td>

              <td className="p-4 font-semibold text-slate-800">

                Total Actual:
                <br />
                Rs.{" "}
                {totalActualPrice}

              </td>

              <td className="p-4 font-semibold text-emerald-600">

                Total Offer:
                <br />
                Rs.{" "}
                {totalOfferPrice}

              </td>

              <td className="p-4 font-semibold text-slate-800">

                Saved:
                <br />
                Rs.{" "}
                {totalActualPrice -
                  totalOfferPrice}

              </td>

            </tr>

            {/* Buttons */}
            <tr>

              <td colSpan={3}></td>

              <td className="p-4">

                <button className="rounded-xl bg-slate-950 px-5 py-2 font-semibold text-white transition-colors hover:bg-slate-800">

                  Add Coupon

                </button>

              </td>

              <td className="p-4">

                <button className="rounded-xl bg-emerald-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-emerald-700">

                  Buy Now

                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* Popup */}
      {popupPage && (

        <Popup
          close={() =>
            setPopupPage(false)
          }
          removeitem={removeItem}
        />

      )}

    </div>
  );
};

export default MyCart;
