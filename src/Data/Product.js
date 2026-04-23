import Blackshirt from '../assets/Products/black-shirt.png'

import Apple1 from '../assets/Products/AppleEarpode1.png'
import Apple2 from '../assets/Products/AppleEarpode2.png'
import Apple3 from '../assets/Products/AppleEarpode3.png'
import Apple4 from '../assets/Products/AppleEarpode4.png'

import Caps from '../assets/Products/Caps.png';
import Tshirt from '../assets/Products/Tshirt.png';
import Hoodies from '../assets/Products/hoodies.png'

import DenimJacket from '../assets/Products/denimjacket.png'
import Jeans from '../assets/Products/jeans.png'
import Wallet from '../assets/Products/wallet.png'
import SmartWatch from '../assets/Products/DigitalWatch.png'

import LinenShirt from '../assets/Products/Linenshirt.png'
import Shorts from '../assets/Products/shorts.png'
import FlipFlops from '../assets/Products/flipflops.png'
import StrawHat from '../assets/Products/strawhat.png'

import Sunglass from '../assets/Products/sunglass.png'
import AnalogWatch from '../assets/Products/analogwatch.png'
import Backpack from '../assets/Products/backpack.png'
import Bracelet from '../assets/Products/bracelet.png'

import Sneakers from "../assets/Products/sneakers.png"
import CrewTshirt from "../assets/Products/crewTshirt.png"
import Socks from "../assets/Products/socks.png"
import Wintersweater from "../assets/Products/wintersweater.png"


const Products = [
  // --- New Arrivals ---
  {
    id: "p_001",
    name: "Apple AirPods Pro 2nd gen",
    rating:4.5,
    description: "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
    price: 29999,
    offerPrice: 26999,
    image: [Apple1,Apple2,Apple3,Apple4],
    category: "New arrivals",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_002",
    name: "Stylish Baseball Cap",
    rating:4.5,
    description: "A premium cotton twill baseball cap designed for everyday comfort and protection. The adjustable strap ensures a perfect fit for all head sizes. Ideal for sports, outdoor activities, or casual fashion styling.",
    price: 799,
    offerPrice: 499,
    image: [Caps,Caps,Caps,Caps],
    category: "New arrivals",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_003",
    name: "Graphic T-Shirt",
    rating:4.5,
    description: "This soft cotton graphic t-shirt offers comfort and style in every wear. The bold print adds a modern, trendy appeal suitable for outings and casual occasions. Lightweight and breathable, perfect for hot weather.",
    price: 999,
    offerPrice: 699,
    image: [Tshirt],
    category: "New arrivals",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_004",
    name: "Black Hoodie",
    rating:4.5,
    description: "A warm and stylish black hoodie crafted with soft fleece fabric for superior comfort. Ideal for layering on cooler days and flexible enough for daily use. Designed with a relaxed fit and durable stitching.",
    price: 1299,
    offerPrice: 1199,
    image: [Hoodies],
    category: "New arrivals",
    date: Date.now(),
    __v: 0
  },

  // --- Best Seller ---
  {
    id: "p_005",
    name: "Denim Jacket",
    rating:4.5,
    description: "A timeless blue denim jacket engineered for durability and style. Features button closure, side pockets, and a classic fit suitable for all seasons. A wardrobe essential that complements any outfit.",
    price: 2499,
    offerPrice: 1899,
    image: [DenimJacket],
    category: "Best seller",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_006",
    name: "Slim Fit Jeans",
    rating:4.5,
    description: "These slim fit jeans offer a perfect blend of stretch, comfort, and modern design. Made with high-quality denim to ensure long-lasting performance. Ideal for daily wear and stylish enough for outings.",
    price: 2799,
    offerPrice: 2199,
    image: [Jeans],
    category: "Best seller",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_007",
    name: "Leather Wallet",
    rating:4.5,
    description: "A compact, genuine leather wallet crafted with premium materials. Features multiple card slots and secure compartments. Its minimalistic design makes it suitable for both formal and casual use.",
    price: 1499,
    offerPrice: 999,
    image: [Wallet],
    category: "Best seller",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_008",
    name: "Smartwatch Pro",
    rating:4.5,
    description: "A feature-rich smartwatch equipped with advanced fitness tracking and seamless connectivity. The long-lasting battery ensures reliability throughout the day. Perfect for tech enthusiasts and fitness lovers.",
    price: 4999,
    offerPrice: 3799,
    image: [SmartWatch],
    category: "Best seller",
    date: Date.now(),
    __v: 0
  },

  // --- Summer Collections ---
  {
    id: "p_009",
    name: "Printed Linen Shirt",
    rating:4.5,
    description: "A lightweight printed linen shirt designed for extreme summer comfort. The breathable material allows airflow and keeps you cool. Stylish prints make it a perfect choice for casual outings.",
    price: 1599,
    offerPrice: 1199,
    image: [LinenShirt],
    category: "Summer collections",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_010",
    name: "Cotton Shorts",
    rating:4.5,
    description: "Soft and comfortable cotton shorts perfect for hot weather. The elastic waistband ensures a relaxed fit, making them ideal for travel, sports, and daily casual wear.",
    price: 1299,
    offerPrice: 899,
    image: [Shorts],
    category: "Summer collections",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_011",
    name: "Flip Flops",
    rating:4.5,
    description: "Lightweight and durable flip flops designed for all-day comfort. The soft rubber sole provides flexibility and grip, making them ideal for beach trips and everyday use.",
    price: 699,
    offerPrice: 499,
    image: [FlipFlops],
    category: "Summer collections",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_012",
    name: "Straw Hat",
    rating:4.5,
    description: "A stylish woven straw hat that provides excellent sun protection. Lightweight and breathable, making it perfect for beach day, vacations, or summer hikes.",
    price: 899,
    offerPrice: 649,
    image: [StrawHat],
    category: "Summer collections",
    date: Date.now(),
    __v: 0
  },

  // --- Accessories ---
  {
    id: "p_013",
    name: "Polarized Sunglasses",
    rating:4.5,
    description: "Premium polarized sunglasses that reduce glare and offer complete UV protection. Designed to enhance visual clarity and comfort in bright outdoor conditions.",
    price: 1299,
    offerPrice: 899,
    image: [Sunglass],
    category: "Accessories",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_014",
    name: "Analog Wrist Watch",
    rating:4.5,
    description: "A classic analog wrist watch with a high-quality leather strap and stainless steel case. Offers elegance, durability, and precise timekeeping.",
    price: 2999,
    offerPrice: 2499,
    image: [AnalogWatch],
    category: "Accessories",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_015",
    name: "Travel Backpack",
    rating:4.5,
    description: "A strong and spacious travel backpack built with premium materials. Includes multiple compartments for laptops, accessories, and daily essentials.",
    price: 3499,
    offerPrice: 2899,
    image: [Backpack],
    category: "Accessories",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_016",
    name: "Chain Bracelet",
    rating:4.5,
    description: "A stylish metal chain bracelet crafted to elevate any outfit. Lightweight, durable, and designed with premium finishing for a bold fashion look.",
    price: 1199,
    offerPrice: 799,
    image: [Bracelet],
    category: "Accessories",
    date: Date.now(),
    __v: 0
  },

  // --- Essentials ---
  {
    id: "p_017",
    name: "Classic White Sneakers",
    rating:4.5,
    description: "Versatile and durable white sneakers designed with a cushioned sole for all-day comfort. Crafted from premium leather, making them perfect for daily wear.",
    price: 8999,
    offerPrice: 7499,
    image: [Sneakers],
    category: "Essentials",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_018",
    name: "Basic Crew Neck T-shirt",
    rating:4.5,
    description: "A soft cotton t-shirt crafted with a comfortable and breathable fit. Available in multiple colors, making it a wardrobe essential for any season.",
    price: 799,
    offerPrice: 599,
    image: [CrewTshirt],
    category: "Essentials",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_019",
    name: "Cotton Socks Pack",
    rating:4.5,
    description: "A pack of premium cotton socks made for daily comfort and durability. The soft, breathable material ensures all-day freshness and a perfect fit.",
    price: 499,
    offerPrice: 349,
    image: [Socks],
    category: "Essentials",
    date: Date.now(),
    __v: 0
  },
  {
    id: "p_020",
    name: "Winter Sweater",
    rating:4.5,
    description: "A cozy winter sweater designed with soft fleece fabric. Provides exceptional warmth while keeping a stylish casual look suitable for cold days.",
    price: 1599,
    offerPrice: 1199,
    image: [Wintersweater],
    category: "Essentials",
    date: Date.now(),
    __v: 0
  }
];

export default Products;