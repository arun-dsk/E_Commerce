import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Trending.scss';
import ProductCard from '../ProductCard/ProductCard';
import Products from '../../Data/Product';

const Trending = () => {
  
  const [selectedCategory, setSelectedCategory] = useState('New arrivals');
  const Categories = [
    "New arrivals",
    "Best seller",
    "Summer collections",
    "Accessories",
    "Essentials"
  ];

  const filteredProducts = Products.filter(
    (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="container">
      <h3>Trending collections</h3>
      <h1>Our <span>Trending</span> Models</h1>

      {/* Category Tabs */}
      <div className="options">
        {Categories.map((category, index) => (
          <span
            key={index}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </span>
        ))}
      </div>

      <div className="products" id='Products'>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory} 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="product-grid"
          >
            {filteredProducts.map((item, index) => (
              <motion.div 
                onClick={()=> navigate(`/product/${item.name}`)}
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard 
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  Actualprice={item.price}
                  Offerprice={item.offerPrice}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Trending;