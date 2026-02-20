import "./co.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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

  // Updated renderNumber with fade + scale transition on number change
  const renderNumber = (value) => (
    <AnimatePresence mode="wait">
      <motion.h2
        key={value}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="count_day"
      >
        {value < 10 ? `0${value}` : value}
      </motion.h2>
    </AnimatePresence>
  );

  return (
    <section className="count luxury_count">
      <div className="luxury_card_count">
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
      </div>
    </section>
  );
};

export default Count;