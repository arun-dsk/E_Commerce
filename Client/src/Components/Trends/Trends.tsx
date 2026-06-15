"use client";

import { useState, useEffect } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import ProductCard from "@/Components/ProductCard/ProductCard";
import { API_BASE_URL } from "@/lib/api";
import type { Product } from "@/types/product";

const Trends = () => {

  const [selectedCategory, setSelectedCategory] =
    useState("New arrivals");

  const [products, setProducts] = useState<Product[]>([]);

  const categories = [
    "New arrivals",
    "Best seller",
    "Summer collections",
    "Accessories",
    "Essentials",
  ];

  useEffect(() => {

    fetch(`${API_BASE_URL}/api/products/`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const filteredProducts =
    products.filter(
      (item) =>
        item.category.toLowerCase() ===
        selectedCategory.toLowerCase()
    );

  return (
    <section className="px-6 md:px-16 py-24">

      {/* Heading */}
      <div className="text-center mb-14">

        <h3 className="text-lg md:text-xl text-gray-500 mb-4">
          Trending collections
        </h3>

        <h1 className="text-4xl md:text-6xl font-bold">
          Our{" "}
          <span className="text-green-600">
            Trending
          </span>{" "}
          Models
        </h1>

      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-5 mb-16">

        {categories.map(
          (category, index) => (

            <button
              key={index}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-green-500"
              }`}
            >
              {category}
            </button>

          )
        )}

      </div>

      {/* Products */}
      <div id="Products">

        <AnimatePresence mode="wait">

          <motion.div
            key={selectedCategory}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.9,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >

            {filteredProducts.map(
              (item, index) => (

                <motion.div
                  key={item.product_id}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                >

                  <ProductCard
                    productId={item.product_id}
                    name={item.name}
                    image={item.image}
                    Actualprice={item.price}
                    Offerprice={item.offerPrice}
                  />

                </motion.div>

              )
            )}

          </motion.div>

        </AnimatePresence>

      </div>

    </section>
  );
};

export default Trends;
