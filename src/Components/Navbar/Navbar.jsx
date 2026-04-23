import logo from "../../assets/logo.svg"
import { IoSearchOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars, FaCartShopping } from "react-icons/fa6";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import './Navbar.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "../../Context/ThemeContext";

const Navbar = () => {
    const [dropDown, setDropdown] = useState(false)
    const { theme, toggleTheme } = useContext(ThemeContext)
    // console.log("Theme in navbar==", theme)
    return (
        <div className={`Navbar ${theme}`}>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="navlinks">
                <Link to="/" className="link">Home</Link>
                <Link to="/about" className="link">AboutUs</Link>
                <div className="dropdown"
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}>

                    <span>Products <IoIosArrowDown /> </span>
                    <AnimatePresence>
                        {dropDown && (
                            <motion.div className={`dropdown-menu ${theme}`}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -100 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span>Electronics</span>
                                <span>Clothing</span>
                                <span>Accessories</span>
                                <span>Groceries</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <span>ContactUs</span>
            </div>
            <div className="auth">
                <IoSearchOutline />
                <p> <FiUser /> Account</p>

                <Link to="/cart"><FaCartShopping className="carticon" /></Link>

                <span onClick={toggleTheme}>{theme == 'light' ? <MdOutlineDarkMode className="icon" /> :
                    <MdLightMode className="icon" />}</span>
            </div>
            <div className="hamburger">
                <FaBars className="icon" />
            </div>
        </div>
    )
}

export default Navbar