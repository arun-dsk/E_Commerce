import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Hero.scss'
import Bg1 from '../../assets/Herowallpaper1.jpg'
import Bg2 from '../../assets/Herowallpaper2.jpg'
import Bg3 from '../../assets/Herowallpaper3.jpg'
import Bg4 from '../../assets/Herowallpaper4.jpg'
import Amiparis from '../../assets/Amiparis.png'
import Dior from '../../assets/dior.png'
import Gucci from '../../assets/gucci.png'
import Lv from '../../assets/lv.png'

const Hero = () => {

    const [currentSlide, setCurrentSlide] = useState(0)

    const background = [Bg1, Bg2, Bg3, Bg4]
    const Headings = ['Level up your Style', 'Upgrade Your Vibe','Elevate Everyday Elegance', 'Discover Refined Style']
    const brands = [Amiparis,Gucci,Dior,Lv]

    // auto slide for hero page
    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % background.length)
        }, 5000)
        return () => clearInterval(interval)

    }, [])
    // console.log("Current slide", currentSlide)

    return (
        <div className='Hero'
            // style={{ backgroundImage: `url(${background[currentSlide]})` }}
            style={{
                backgroundImage: `linear-gradient(rgba(40, 40, 45, 0.48),rgba(40,40,45, 0.482)), url(${background[currentSlide]})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'center'
            }}
        >

            <div className="first">
                <h3>Summer Collection</h3>

                <AnimatePresence mode='wait'>
                    <motion.h1
                        key={currentSlide}
                        initial={{opacity:0,scale:0}}
                        animate={{opacity:1,scale:1}}
                        exit={{opacity:0,scale:0}}
                        transition={{duration:0.75,ease:"linear"}}
                    >{Headings[currentSlide]}</motion.h1>
                </AnimatePresence>

            </div>

            <div className="second">
                <div className="brands">
                    {brands.map((item, index) => (
                        <motion.img src={item} alt="" key={index}
                            animate={{
                                scale: currentSlide == index ? 1.25 : 1,
                                y: currentSlide == index ? -20 : 0
                            }}
                            transition={{duration:0.25,stiffness:300}}
                        />
                    ) )}
                </div>
                <p>We ensure our customers have the best shopping experience</p>
                <div className="indicators">
                    {background.map((item,index) => (
                        <button
                            key={index}
                            className={`${currentSlide == index
                                ? "active" : ""}`}
                            onClick={()=> setCurrentSlide(index)}
                        ></button>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default Hero