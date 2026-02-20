import "./mi.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import start from "../../assets/stars.png";
import susa from "../../assets/th.jpg";
import susat from "../../assets/tw.jpg";
import tura from "../../assets/25.png"
import sc from "../../assets/ds3.PNG"
import scm from "../../assets/dm4.PNG"

import Rsvp from "./Rsvp";
const container = {
  hidden: { opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.3,
    },
  },
};

const luxuryCardReveal = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.88,
    rotateX: 20,
    filter: "blur(16px)",
    backdropFilter: "blur(20px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 45,
      damping: 18,
      mass: 1.2,
      duration: 2.2,
    },
  },
};

const nameReveal = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delay: 0.4,
    },
  },
};

const starFloat = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
      bounce: 0.3,
      delay: 0.8,
    },
  },
};

const dateReveal = {
  hidden: {
    opacity: 0,
    x: 60,
    scale: 0.85,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
      delay: 0.6,
    },
  },
};

const locationGlow = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.92,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 28,
      delay: 1.0,
    },
  },
};

const imageLuxuryReveal = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    rotate: -8,
    filter: "blur(20px)",
    rotateY: 15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 55,
      damping: 22,
      mass: 1.1,
      duration: 2.5,
    },
  },
};

const imageHover = {
  hover: {
    scale: 1.08,
    rotateY: 5,
    filter: "brightness(1.15) drop-shadow(0 25px 40px rgba(0,0,0,0.3))",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: 0.5,
    },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.15 },
  },
};

const shimmerEffect = {
  animate: {
    // backgroundPosition: ["0% 0%", "200% 0%", "0% 0%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const Middle = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="middle luxury_section">
<div className="jkob">
  <img src={sc} alt="" className="kob_img" />
</div>


<div className="jkobs">
  <img src={scm} alt="" className="kob_img" />
</div>
      <div className="miss">




        <motion.div 
          className="middle_grid"
          variants={container}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* LEFT SIDE - Wedding Cards */}
          <motion.div className="middle_sub go kami">
            {/* Couple Name Card */}
            <motion.div 
              className="middle_card luxury_card" 
              variants={luxuryCardReveal}
              whileHover={{ 
                y: -10, 
                rotateX: -2,
                boxShadow: "0 35px 60px rgba(0,0,0,0.25)"
              }}
            >
              <div className="dosh">
                <div className="depth">
                  <motion.div className="names_container">
                    <motion.h2 
                      className="middle_couple_name tos" 
                      variants={nameReveal}
                      whileHover={{ scale: 1.05, color: "#f8d442" }}
                    >
                      Aike
                    </motion.h2>
                    <motion.h2 className="middle_couple_name rba">&</motion.h2>
                    <motion.h2 
                      className="middle_couple_name tos musra" 
                      variants={nameReveal}
                      whileHover={{ scale: 1.05, color: "#f8d442" }}
                    >
                      Ngozi
                    </motion.h2>
                  </motion.div>

                  <motion.div className="line" variants={starFloat}>
                    <motion.img 
                      src={start} 
                      alt="Love Star" 
                      className="star_img"
                      animate={{ 
                        rotate: [360, 360],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity }
                      }}
                    />
                  </motion.div>

                  {/* <motion.h2 className="year" variants={dateReveal}> */}
                    {/* 25 Years */}
                  {/* </motion.h2> */}
<div className="kol">

                  <img src={tura} alt="" className="tf_img" />
</div>
                  <motion.h2 
                    className="yearma" 
                    variants={locationGlow}
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(248,212,66,0.5)",
                        "0 0 20px rgba(248,212,66,0.8)",
                        "0 0 30px rgba(248,212,66,0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Celebrating Our Journey
                  </motion.h2>
                </div>
              </div>
            </motion.div>

         
          </motion.div>

          {/* RIGHT SIDE - Luxury Images */}
          <motion.div className="middle_sub kas">
            <div
              className="img_card luxury_img ppp"
            >
              <div className="depths">
                <motion.img 
                  src={susa} 
                  alt="Wedding Bliss" 
                  className="inside_img "
                  animate={{
                    filter: [
                      "brightness(1) contrast(1)",
                      "brightness(1.1) contrast(1.05)",
                      "brightness(1) contrast(1)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>

            <div
              className="img_card luxury_img ii kxx"
            >
              <div className="depths">
                <motion.img 
                  src={susat} 
                  alt="Love Eternal" 
                  className="inside_img"
                  
                />
              </div>
            </div>
          </motion.div>




            <motion.div className="middle_sub go kami">
         

            {/* Date & Location Card */}
            <motion.div 
              className="middle_card luxury_card" 
              variants={luxuryCardReveal}
              whileHover={{ 
                y: -10, 
                rotateX: -2,
                boxShadow: "0 35px 60px rgba(0,0,0,0.25)"
              }}
            >
              <motion.div 
                className="dosh"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="depth">
                  <motion.h2 className="year" variants={dateReveal}>
                    September 11-13, 2026
                  </motion.h2>

                  <motion.div className="line malka" variants={starFloat}>
                    <motion.img 
                      src={start} 
                      alt="Event Star" 
                      className="star_img"
                      animate={{ 
                        rotate: [360, 360],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        rotate: { duration: 14, repeat: Infinity, ease: "linear" },
                        scale: { duration: 5, repeat: Infinity }
                      }}
                    />
                  </motion.div>

                  <motion.h2 
                    className="yearma" 
                    variants={locationGlow}
                  >
                    Charlotte, NC
                  </motion.h2>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <Rsvp/>
      <div className="jucy">

      <img className="jff" src={start} alt="" />
      </div>


    </div>
  );
};

export default Middle;
