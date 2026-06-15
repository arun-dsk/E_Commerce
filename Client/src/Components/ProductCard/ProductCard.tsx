"use client";

import Image from "next/image";
import Link from "next/link";
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
import { addToCart } from "@/redux/cartSlice";
import {
  AppDispatch,
  RootState,
} from "@/redux/store";

interface ProductCardProps {
  productId: string;
  name: string;
  image: string[];
  Offerprice: number;
  Actualprice: number;
}

const ProductCard = ({
  productId,
  name,
  image,
  Offerprice,
  Actualprice,
}: ProductCardProps) => {

  const dispatch =
    useDispatch<AppDispatch>();

  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const { cartItems } = useSelector(
    (state: RootState) => state.cart
  );

  const isInCart = cartItems.find(
    (item) => item.id === productId
  );

  const onAddtoCart = () => {

    if (!isAuthenticated) {
      toast.error(
        "Please login to add items to cart"
      );
      router.push("/account");
      return;
    }

    try {

      dispatch(
        addToCart({
          id: productId,
          count: 1,
        })
      );

      toast.success(
        "Add To Cart Successful"
      );

    } catch {

      toast.error(
        "Failed....! Please Try Again"
      );

    }

  };

  return (
    <div className="group flex flex-col gap-4 overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Product Image */}
      <Link href={`/product/${productId}`}>

        <div className="relative h-[300px] w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-100">

          <Image
            src={image[0]}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

        </div>

      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-2">

        <p className="text-lg font-semibold text-slate-900">
          {name}
        </p>

        <div className="flex items-center gap-4">

          <p className="text-lg font-bold text-emerald-600">
            Rs. {Offerprice}
          </p>

          <p className="text-gray-400 line-through">
            Rs. {Actualprice}
          </p>

        </div>

      </div>

      {/* Ratings */}
      <div className="flex items-center gap-1 text-amber-500">

        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />

      </div>

      {/* Buttons */}
      <div className="mt-2 flex gap-3">

        <button
          onClick={onAddtoCart}
          disabled={Boolean(isInCart)}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
            isInCart
              ? "cursor-not-allowed bg-slate-200 text-slate-500"
              : "bg-slate-950 text-white hover:bg-slate-800"
          }`}
        >
          {isInCart
            ? "Added"
            : "Add To Cart"}
        </button>

        <button className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-700">

          Buy Now

        </button>

      </div>

    </div>
  );
};

export default ProductCard;
