"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/lib/api";
import { addToCart } from "@/redux/cartSlice";
import {
  AppDispatch,
  RootState,
} from "@/redux/store";
import type { Product } from "@/types/product";

interface ProductInfoProps {
  id: string;
}

const ProductInfo = ({
  id,
}: ProductInfoProps) => {

  const [mainImage, setMainImage] = useState(0);

  const [product, setProduct] = useState<Product | null>(null);

  const dispatch =
    useDispatch<AppDispatch>();

  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const { cartItems } = useSelector(
    (state: RootState) => state.cart
  );

  const isInCart = product
    ? cartItems.some(
        (item) =>
          item.id === product.product_id
      )
    : false;

  useEffect(() => {

    fetch(`${API_BASE_URL}/api/products/`)
      .then((res) => res.json())
      .then((data: Product[]) => {

        const foundProduct = data.find(
          (prod) =>
            prod.product_id === id
        );

        setProduct(foundProduct ?? null);

      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  const onAddToCart = () => {
    if (!isAuthenticated) {
      toast.error(
        "Please login to add items to cart"
      );
      router.push("/account");
      return;
    }

    dispatch(
      addToCart({
        id: product.product_id,
        count: 1,
      })
    );

    toast.success(
      "Add To Cart Successful"
    );
  };

  return (
    <div className="grid min-h-screen grid-cols-1 gap-14 px-6 py-20 md:px-16 lg:grid-cols-2">

      {/* Left Section */}
      <div className="flex flex-col gap-6">

        {/* Main Image */}
        <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl">

          <Image
            src={product.image[mainImage]}
            alt={product.name}
            fill
            className="object-cover"
          />

        </div>

        {/* Thumbnail Images */}
        <div className="flex flex-wrap gap-4">

          {product.image.map(
            (img: string, index: number) => (

              <button
                key={index}
                type="button"
                onClick={() =>
                  setMainImage(index)
                }
                className={`relative h-24 w-24 overflow-hidden rounded-2xl border-2 transition-all ${
                  mainImage === index
                    ? "border-slate-950 shadow-lg"
                    : "border-transparent"
                }`}
              >

                <Image
                  src={img}
                  alt="product"
                  fill
                  className="object-cover"
                />

              </button>

            )
          )}

        </div>

      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center gap-8">

        {/* Name */}
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {product.name}
        </h1>

        {/* Ratings */}
        <div className="flex items-center gap-2 text-xl text-amber-500">

          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />

          <span className="ml-2 text-lg text-slate-700">
            ({product.rating})
          </span>

        </div>

        {/* Description */}
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-6">

          <p className="text-4xl font-bold text-emerald-600">
            Rs. {product.offerPrice}
          </p>

          <p className="text-2xl text-slate-400 line-through">
            Rs. {product.price}
          </p>

        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-5">

          <button
            onClick={onAddToCart}
            disabled={isInCart}
            className={`rounded-2xl px-8 py-4 font-semibold text-white transition-all duration-300 ${
              isInCart
                ? "cursor-not-allowed bg-slate-300"
                : "bg-slate-950 hover:bg-slate-800"
            }`}
          >
            {isInCart
              ? "Added"
              : "Add To Cart"}
          </button>

          <button className="rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-emerald-700">
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductInfo;
