import React, { useState, useMemo } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Select from "react-select";
import countryList from "react-select-country-list";
import Count from "../count/Count";
import "react-toastify/dist/ReactToastify.css";

// Custom Select Styles
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
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1a1a1a",
    borderRadius: "0px",
    zIndex: 9999,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#c6a972" : "transparent",
    color: state.isFocused ? "#000" : "#fff",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
    fontFamily: "Raleway",
    fontSize: "16px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(255,255,255,0.6)",
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
      newErrors.email = "Invalid email";
    if (!formData.streetAddress)
      newErrors.streetAddress = "Street address is Required";
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
      <div className="b"></div>

      <div className="rsvp_area">
        <div className="middle_card luxury_card">
          <div className="dosh">
            <div className="depth">
              <h2 className="rsvp_sm_title">WITH GRATITUDE</h2>
              <h1 className="rsvp_title">
                Please Share Your Mailing Address
              </h1>
              <h3 className="rsvp_p">
                So we may send your formal invitation
              </h3>

              <form className="rsvp_formy" onSubmit={handleSubmit}>
                {[
                  { label: "FIRST NAME *", name: "firstName" },
                  { label: "LAST NAME *", name: "lastName" },
                  { label: "EMAIL ADDRESS *", name: "email" },
                  {
                    label: "STREET ADDRESS (LINE 1) *",
                    name: "streetAddress",
                  },
                  { label: "CITY *", name: "city" },
                ].map((field, index) => (
                  <div className="rsvp_sub" key={index}>
                    <div className="rsvp_input_area">
                      <label className="rsvp_label">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        name={field.name}
                        value={formData[field.name]}
                        placeholder={field.label}
                        className="rsvp_input"
                        onChange={handleChange}
                        style={{
                          fontSize: "18px",
                          borderColor: errors[field.name]
                            ? "red"
                            : "#ccc",
                        }}
                      />
                      {errors[field.name] && (
                        <span
                          style={{
                            color: "red",
                            fontSize: "14px",
                          }}
                        >
                          {errors[field.name]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {[
                  {
                    label: "ADDRESS LINE 2 (Apt/Suite)",
                    name: "addressLine2",
                  },
                  { label: "STATE / PROVINCE", name: "state" },
                  { label: "POSTAL / ZIP CODE", name: "zip" },
                ].map((field, index) => (
                  <div className="rsvp_sub" key={index}>
                    <div className="rsvp_input_area">
                      <label className="rsvp_label">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        name={field.name}
                        value={formData[field.name]}
                        placeholder={field.label}
                        className="rsvp_input"
                        onChange={handleChange}
                        style={{ fontSize: "18px" }}
                      />
                    </div>
                  </div>
                ))}

                <div className="rsvp_sub">
                  <div className="rsvp_input_area">
                    <label className="rsvp_label">
                      COUNTRY *
                    </label>
                    <Select
                      options={options}
                      value={options.find(
                        (option) =>
                          option.label === formData.country
                      )}
                      onChange={handleCountryChange}
                      placeholder="Select Country"
                      styles={customSelectStyles}
                    />
                    {errors.country && (
                      <span
                        style={{
                          color: "red",
                          fontSize: "14px",
                        }}
                      >
                        {errors.country}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rsvp_sub">
                  <div className="gops">
                    <button
                      type="submit"
                      className="submit_btn luxury_btn"
                    >
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