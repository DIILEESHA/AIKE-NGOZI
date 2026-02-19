import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Framer Motion Variants
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
};

const smoothReveal = {
  hidden: { opacity: 0, y: 80, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 60, damping: 18, duration: 1.4 },
  },
};

const cardReveal = {
  hidden: { opacity: 0, scale: 0.9, y: 120, rotateX: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 50, damping: 20, duration: 1.6 },
  },
};

const Rsvp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    aptSuite: "",
    zip: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await addDoc(collection(db, "rsvps"), {
        ...formData,
        createdAt: Timestamp.now(),
      });

      toast.success("RSVP submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        aptSuite: "",
        zip: "",
        country: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="middle">
      <div className="rsvp_area">
        <motion.div
          className="middle_card luxury_card"
          variants={cardReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="dosh">
            <div className="depth">
              {/* Elegant Title Reveal */}
              <motion.div
                variants={smoothReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="rsvp_sm_title">WITH GRATITUDE</h2>
                <h1 className="rsvp_title">
                  Please Share Your Mailing Address
                </h1>
                <h3 className="rsvp_p">So we may send your formal invitation</h3>
              </motion.div>

              {/* Form */}
              <motion.form
                className="rsvp_formy"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onSubmit={handleSubmit}
              >
                {[
                  { label: "FIRST NAME *", name: "firstName" },
                  { label: "LAST NAME *", name: "lastName" },
                  { label: "EMAIL ADDRESS *", name: "email" },
                  { label: "APT / SUITE (Optional)", name: "aptSuite" },
                  { label: "ZIP / POSTAL CODE", name: "zip" },
                  { label: "COUNTRY", name: "country" },
                ].map((field, index) => (
                  <motion.div
                    className="rsvp_sub"
                    key={index}
                    variants={smoothReveal}
                  >
                    <div className="rsvp_input_area">
                      <label className="rsvp_label">{field.label}</label>
                      <input
                        type="text"
                        name={field.name}
                        value={formData[field.name]}
                        placeholder={field.label}
                        className="rsvp_input"
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Submit Button */}
                <motion.div variants={smoothReveal}>
                  <button type="submit" className="submit_btn luxury_btn">
                    SUBMIT ADDRESS
                    <span className="btn_glow"></span>
                  </button>
                </motion.div>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default Rsvp;
