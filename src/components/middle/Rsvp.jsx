import React, { useState, useMemo } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Select from "react-select";
import countryList from "react-select-country-list";
import Count from "../count/Count";
import "react-toastify/dist/ReactToastify.css";

// 1. UPDATED CHARACTER LIMITS
const FIELD_LIMITS = {
  firstName: 50,
  lastName: 50,
  email: 100,
  streetAddress: 100,
  addressLine2: 100,
  city: 50,
  state: 50,
  zip: 10,
};

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#fbf5e9",
    border: "2px solid #d4af37",
    fontFamily: "poppins",
    borderRadius: "0px",
    // Reduced padding for desktop, set to 0 horizontal for mobile-friendliness
    padding: "2px 0px 2px 10px", 
    minHeight: "45px",
    maxWidth: "100%",
    boxShadow: state.isFocused ? "0 0 0 1px #c6a972" : "none",
    borderColor: state.isFocused ? "#c6a972" : "rgba(255,255,255,0.4)",
    "&:hover": {
      borderColor: "#c6a972",
    },
  }),

  // This removes the inner padding that often pushes text away from the edge
  valueContainer: (provided) => ({
    ...provided,
    padding: "0px 6px",
  }),

  container: (provided) => ({
    ...provided,
    width: "100%", 
    maxWidth: "100%", // Ensures it stretches to the white lines on small screens
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "#fbf5e9",
    borderRadius: "0px",
    zIndex: 9999,
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#c6a972" : "transparent",
    color: state.isFocused ? "#000" : "#333",
    cursor: "pointer",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#333",
    fontFamily: "Raleway",
    fontSize: "18px",
    margin: "0",
    padding: "0",
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#d4af37", // Clear Gold Arrow
    padding: "8px",
    "&:hover": {
      color: "#b8860b",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: "13px",
    fontFamily: "Raleway",
    margin: "0",
    padding: "0",
    textAlign:"left"
  }),
};

const Rsvp = () => {
  const options = useMemo(() => countryList().getData(), []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    city: "",
    country: "",
    addressLine2: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Common inline style for inputs to increase font size
  const inputBaseStyle = {
    fontSize: "18px", // Increased font size inside
    fontFamily: "Raleway",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Keep logic in backend only (stops typing at limit)
    if (FIELD_LIMITS[name] && value.length > FIELD_LIMITS[name]) return;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption?.label || "" });
    setErrors({ ...errors, country: "" });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First Name is Required";
    if (!formData.lastName) newErrors.lastName = "Last Name is Required";
    if (!formData.email) newErrors.email = "Email is Required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid Email Address";
    if (!formData.streetAddress)
      newErrors.streetAddress = "Street Address is Required";
    if (!formData.city) newErrors.city = "City is Required";
    if (!formData.country) newErrors.country = "Country is Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }

    try {
      await addDoc(collection(db, "rsvps"), {
        ...formData,
        isComplete: true,
        createdAt: Timestamp.now(),
      });

      setFormData({
        firstName: "", lastName: "", email: "", streetAddress: "",
        city: "", country: "", addressLine2: "", state: "", zip: "",
      });

      setErrors({});
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(false);
    }
  };

  return (
    <div className="costa">
      <div className="jkobs"></div>
      <div className="rsvp_area">
        <div className="middle_card luxury_card">
          <div className="dosh ">
            <div className="depth iu">
              <h2 className="rsvp_sm_title">WITH GRATITUDE</h2>
              <h1 className="rsvp_title">Please Share Your Mailing Address</h1>
              <h3 className="rsvp_p">So we may send your formal invitation</h3>

              <form className="rsvp_formy" onSubmit={handleSubmit}>
                {/* FIRST NAME */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">FIRST NAME *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      maxLength={FIELD_LIMITS.firstName}
                      placeholder="First Name"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={{
                        ...inputBaseStyle,
                        borderColor: errors.firstName ? "red" : "#ccc",
                      }}
                    />
                    {errors.firstName && (
                      <span className="kuchiys" style={{ color: "red", fontSize: "14px" }}>
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                </div>

                {/* LAST NAME */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">LAST NAME *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      maxLength={FIELD_LIMITS.lastName}
                      placeholder="Last Name"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={{
                        ...inputBaseStyle,
                        borderColor: errors.lastName ? "red" : "#ccc",
                      }}
                    />
                    {errors.lastName && (
                      <span className="kuchiys" style={{ color: "red", fontSize: "14px" }}>
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* EMAIL */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      maxLength={FIELD_LIMITS.email}
                      placeholder="Email Address"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={{
                        ...inputBaseStyle,
                        borderColor: errors.email ? "red" : "#ccc",
                      }}
                    />
                    {errors.email && (
                      <span className="kuchiys" style={{ color: "red", fontSize: "14px" }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* STREET ADDRESS */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">STREET ADDRESS *</label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      maxLength={FIELD_LIMITS.streetAddress}
                      placeholder="Street Address"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={{
                        ...inputBaseStyle,
                        borderColor: errors.streetAddress ? "red" : "#ccc",
                      }}
                    />
                    {errors.streetAddress && (
                      <span className="kuchiys" style={{ color: "red", fontSize: "14px" }}>
                        {errors.streetAddress}
                      </span>
                    )}
                  </div>
                </div>

                {/* ADDRESS LINE 2 */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">ADDRESS LINE 2</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      maxLength={FIELD_LIMITS.addressLine2}
                      placeholder="Address 2"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={inputBaseStyle}
                    />
                  </div>
                </div>

                {/* CITY */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">CITY *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      maxLength={FIELD_LIMITS.city}
                      placeholder="City"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={{
                        ...inputBaseStyle,
                        borderColor: errors.city ? "red" : "#ccc",
                      }}
                    />
                    {errors.city && (
                      <span className="kuchiys" style={{ color: "red", fontSize: "14px" }}>
                        {errors.city}
                      </span>
                    )}
                  </div>
                </div>

                {/* STATE */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">STATE</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      maxLength={FIELD_LIMITS.state}
                      placeholder="State"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={inputBaseStyle}
                    />
                  </div>
                </div>

                {/* ZIP */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">ZIP </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      maxLength={FIELD_LIMITS.zip}
                      placeholder="Zip"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={inputBaseStyle}
                    />
                  </div>
                </div>

                {/* COUNTRY */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">COUNTRY *</label>

                    <Select
                      options={options}
                      value={options.find((opt) => opt.label === formData.country)}
                      onChange={handleCountryChange}
                      placeholder=" Country"
                      styles={customSelectStyles}
                      />
                    {errors.country && (
                      <span className="kuchiys" style={{ color: "red", fontSize: "14px" }}>
                        {errors.country}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rsvp_sub">
                  <div className="gops">
                    <button type="submit" className="submit_btn luxury_btn">
                      SUBMIT ADDRESS
                    </button>
                  </div>
                </div>
              </form>

              {submitted && (
                <div style={{ marginTop: "20px", color: "#fff", fontSize: "16px", fontWeight: 500 }}>
                  Thank you for sharing your address.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="gpo"></div>
        <Count />
      </div>
    </div>
  );
};

export default Rsvp;