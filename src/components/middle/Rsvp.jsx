import React, { useState, useMemo } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Select from "react-select";
import countryList from "react-select-country-list";
import Count from "../count/Count";
import "react-toastify/dist/ReactToastify.css";
import gomz from "../../assets/traingle.png";
// Custom Select Styles (UPDATED ONLY REQUIRED PARTS)
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#fbf5e9",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "0px",
    padding: "6px 10px",
    boxShadow: state.isFocused ? "0 0 0 1px #c6a972" : "none",
    borderColor: state.isFocused ? "#c6a972" : "rgba(255,255,255,0.4)",
    "&:hover": { borderColor: "#c6a972" },
  }),

  // ✅ FIXED — was black
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#fbf5e9", // soft wedding ivory
    borderRadius: "0px",
    zIndex: 9999,
  }),

  // ✅ FIXED text colors
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#c6a972" : "transparent",
    color: state.isFocused ? "#000" : "#333", // was white
    cursor: "pointer",
  }),

  // ✅ FIXED selected value color
  singleValue: (provided) => ({
    ...provided,
    color: "#333", // visible now
    fontFamily: "Raleway",
    fontSize: "16px",
  }),

  // ✅ FIXED placeholder visibility
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(0,0,0,0.5)", // was white
  }),

  // optional small improvement
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#c6a972",
  }),

  indicatorSeparator: () => ({
    display: "none",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption?.label || "" });
    setErrors({ ...errors, country: "" });
  };

  const validateEmail = (email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

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

      setErrors({});
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(false);
    }
  };

  return (
    <div className="middle costa">
      <div className="b">
      {/* <div className="gom"> */}

        {/* <div className="jom"> */}

        {/* </div> */}
        {/* <div className="sum"></div> */}
      {/* </div> */}
      </div>

      <div className="rsvp_area">
        <div className="middle_card luxury_card">
          <div className="dosh">
            <div className="depth">
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
                      placeholder="Enter Your First Name"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={{
                        borderColor: errors.firstName ? "red" : "#ccc",
                      }}
                    />
                    {errors.firstName && (
                      <span
                        className="kuchiys"
                        style={{ color: "red", fontSize: "14px" }}
                      >
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
                      placeholder="Enter Your Last Name"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={{
                        borderColor: errors.lastName ? "red" : "#ccc",
                      }}
                    />
                    {errors.lastName && (
                      <span
                        className="kuchiys"
                        style={{ color: "red", fontSize: "14px" }}
                      >
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
                      placeholder="Enter Your Email Address"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={{
                        borderColor: errors.email ? "red" : "#ccc",
                      }}
                    />
                    {errors.email && (
                      <span
                        className="kuchiys"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* STREET ADDRESS */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">
                      STREET ADDRESS (LINE 1) *
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      placeholder="Enter Your Street Address"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={{
                        borderColor: errors.streetAddress ? "red" : "#ccc",
                      }}
                    />
                    {errors.streetAddress && (
                      <span
                        className="kuchiys"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {errors.streetAddress}
                      </span>
                    )}
                  </div>
                </div>

                {/* ADDRESS LINE 2 */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">
                      ADDRESS LINE 2 (APT/SUITE)
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      placeholder="Apartment, Suite, Unit, etc. (Optional)"
                      className="rsvp_input"
                      onChange={handleChange}
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
                      placeholder="Enter Your City"
                      className="rsvp_input"
                      onChange={handleChange}
                      style={{
                        borderColor: errors.city ? "red" : "#ccc",
                      }}
                    />
                    {errors.city && (
                      <span
                        className="kuchiys"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {errors.city}
                      </span>
                    )}
                  </div>
                </div>

                {/* STATE */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">STATE </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      placeholder="Enter Your State or Province"
                      className="rsvp_input"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* ZIP */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">ZIP CODE</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      placeholder="Enter Your Postal or Zip Code"
                      className="rsvp_input"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* COUNTRY */}
                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">COUNTRY *</label>
                    <Select
                      options={options}
                      value={options.find(
                        (option) => option.label === formData.country,
                      )}
                      onChange={handleCountryChange}
                      placeholder="Select Your Country"
                      styles={customSelectStyles}
                    />
                    {errors.country && (
                      <span
                        className="kuchiys"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {errors.country}
                      </span>
                    )}
                  </div>
                </div>

                {/* SUBMIT */}
                <div className="rsvp_sub">
                  <div className="gops">
                    <button type="submit" className="submit_btn luxury_btn">
                      SUBMIT ADDRESS
                    </button>
                  </div>
                </div>
              </form>

              {submitted && (
                <div
                  style={{
                    marginTop: "20px",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
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
