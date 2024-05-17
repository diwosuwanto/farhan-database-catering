"use client";
import React, { useState, useEffect } from "react";

export default function AddContact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const randomPart = Math.random().toString().substring(2, 8); // Generates a random string of length 4
  const uniqueId = `${Date.now()}_${randomPart}`;

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      setIsSuccess(false), setError(null);
    }, 3000); // Hide the success message after 3 seconds
  
    return () => clearTimeout(timeoutId);
  }, [isSuccess]);

  const [formData, setFormData] = useState({
    id: uniqueId,
    name: "",
    phoneNumber: "",
    jobTitle: "",
    address: "",
    date: Date.now(),
    order: 0,
    optionalFields: {
      event1: "",
      event2: "",
      event3: "",
      phoneNumber1: "",
      phoneNumber2: "",
      phoneNumber3: "",
    },
  });
   // State for loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if name contains a dot indicating nested fields
    if (name.includes(".")) {
      const [mainKey, subKey] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [mainKey]: {
          ...prevState[mainKey],
          [subKey]: value,
        },
      }));
    } else {
      // Handle top-level fields
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      setIsLoading(true);
      const jsonData = JSON.stringify(formData);
      console.log("id", uniqueId);
      console.log("JSON data:", jsonData);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jsonData }),
      });

      if (response.ok) {
      setIsSuccess(true)
      } else {
        alert("Failed to submit the contact form");
      }
    } catch (error) {
      console.error("Error submitting the contact form:", error);
      setError(error.message);
    }
    setIsLoading(false);
  };
  return (
    <div className="container">
      {isSuccess && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span><p className=" text-white">Your submission has been received!</p></span>
        </div>
      )}

      {error && (
        <div role="alert" className="alert alert-danger">
          <span>{error}</span>
        </div>
      )}
      <div className="header mt-10 mb-3"></div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <h1 className="font-bold">Add User</h1>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-xs capitalize"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Job</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs capitalize"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mt-5">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Address</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 w-full max-w-xs capitalize"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div>
          <h1 className="font-bold">Optional</h1>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Add User</span>
                </div>
                <input
                  type="text"
                  placeholder="Event name"
                  className="input input-bordered w-full max-w-xs capitalize"
                  name="optionalFields.event1"
                  value={formData.optionalFields.event1}
                  onChange={handleChange}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Add User</span>
                </div>
                <input
                  type="text"
                  placeholder="Event name"
                  className="input input-bordered w-full max-w-xs capitalize"
                  name="optionalFields.event2"
                  value={formData.optionalFields.event2}
                  onChange={handleChange}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Add User</span>
                </div>
                <input
                  type="text"
                  placeholder="Event name"
                  className="input input-bordered w-full max-w-xs capitalize"
                  name="optionalFields.event3"
                  value={formData.optionalFields.event3}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Phone Number</span>
                </div>
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  name="optionalFields.phoneNumber1"
                  value={formData.optionalFields.phoneNumber1}
                  onChange={handleChange}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Phone Number</span>
                </div>
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  name="optionalFields.phoneNumber2"
                  value={formData.optionalFields.phoneNumber2}
                  onChange={handleChange}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Phone Number</span>
                </div>
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  name="optionalFields.phoneNumber3"
                  value={formData.optionalFields.phoneNumber3}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            {isLoading ? (
              <button className="btn btn-success text-white" disabled>
                Loading...
              </button>
            ) : (
              <button
                className="btn btn-success text-white"
                onClick={handleSubmit}
              >
                Add Contact
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
