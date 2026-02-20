import "./co.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import start from "../../assets/star.png";

const targetDate = new Date("2026-10-11T00:00:00");

const Count = () => {
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const renderNumber = (value) => (
    <AnimatePresence mode="wait">
      <motion.h2
        key={value}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="count_day"
      >
        {value < 10 ? `0${value}` : value}
      </motion.h2>
    </AnimatePresence>
  );

  return (
    <section className="count luxury_count">
      <motion.div
        className=" luxury_card_count"
        initial={{ opacity: 0, y: 120, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <div className="depth">
         

          <div className="count_grid">
            <div className="count_subs">
              {renderNumber(timeLeft.days || 0)}
              <h3 className="count_value">Days</h3>
            </div>

               <div className="count_subs drt">
              <h3 className="count_value frt">.</h3>
            </div>

            <div className="count_subs">
              {renderNumber(timeLeft.hours || 0)}
              <h3 className="count_value">Hours</h3>
            </div>


    <div className="count_subs drt">
              <h3 className="count_value frt">.</h3>
            </div>

            <div className="count_subs josa">
              {renderNumber(timeLeft.minutes || 0)}
              <h3 className="count_value">Minutes</h3>
            </div>



    <div className="count_subs drt">
              <h3 className="count_value frt">.</h3>
            </div>

            <div className="count_subs">
              {renderNumber(timeLeft.seconds || 0)}
              <h3 className="count_value">Seconds</h3>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Count;
