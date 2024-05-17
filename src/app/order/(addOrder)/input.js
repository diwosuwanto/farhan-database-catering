"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Order() {
  // State for order details
  const [eventName, setEventName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [noteOrder, setNoteOrder] = useState("");
  const [categoryOrder, setCategoryOrder] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // State for menu details
  const [selectedMenu, setSelectedMenu] = useState("");
  const [menuQuantity, setMenuQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [expenseDetails, setExpenseDetails] = useState([
    { menu: "", qty: "", harga: "" },
  ]);
  const [customQuantity, setCustomQuantity] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  

  // State for payment
  const [marginPayment, setMarginPayment] = useState("")
  const [dp, setDp] = useState("");

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newExpenseDetails = [...expenseDetails];
    newExpenseDetails[index][name] = value;
    // If the last field is being filled, add a new empty field
    if (index === newExpenseDetails.length - 1 && value !== "") {
      newExpenseDetails.push({ pembelian: "", harga: "", qty: "" });
    }
    setExpenseDetails(newExpenseDetails);
  };

  
  // submit customer
  const handleSubmitCustomer = async (data) => {

    try {
      setIsLoading(true);
      const jsonData = JSON.stringify(data);
      const response = await fetch("/api/orderContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jsonData }),
      });

      if (response.ok) {
      } else {
        alert("Failed to submit the contact form");
      }
    } catch (error) {
      console.error("Error submitting the contact form:", error);
    }

  };

  const handleSubmitOrder = async (data) => {
    try {
      setIsLoading(true);
      const jsonData = JSON.stringify(data);
      const response = await fetch("/api/order", {
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

  const calculateTotalBalance = () => {
    let balance = 0;
    expenseDetails.forEach((detail) => {
      if (detail.harga && detail.qty) {
        balance += parseInt(detail.harga) * parseInt(detail.qty);
      }
    });
    return balance
  };

  const [balance1, setBalance] = useState("")
  const [margin1, setMargin] = useState("")
  useEffect(() => {
    const balance = calculateTotalBalance();
    const formattedBalance = balance.toLocaleString("id-ID"); // Format the balance for display
    setTotalBalance(formattedBalance);
    setBalance(balance)
    const marginPayment = balance - dp;
    const formattedMargin = marginPayment.toLocaleString("id-ID"); // Perform arithmetic operations on the numeric balance
    setMarginPayment(formattedMargin);
    setMargin(marginPayment)

    let timeoutId;
    timeoutId = setTimeout(() => {
      setIsSuccess(false), setError(null);
    }, 3000); // Hide the success message after 3 seconds
  
    return () => clearTimeout(timeoutId);
  }, [expenseDetails, isSuccess, dp]);

  
  const randomPart = Math.random().toString().substring(2, 8);
  const uniqueId = `O${Date.now()}_${randomPart}`;

  const handleCustomer = () => {
    const formatteddata = {
      id: uniqueId,
      name: customerName,
      phoneNumber: phoneNumber,
      address: address,
      date: Date.now(),
      order: 1,
    }
    const data = JSON.stringify(formatteddata)
    handleSubmitCustomer(data)
  }
  const handleDoneClick = () => {
    const formattedData = {
      id: uniqueId,
      date: selectedDate,
      status: marginPayment <= 0 ? true : false,
      orderDetail: {
        eventName: eventName,
        qty: quantity,
        noteOrder: noteOrder,
        categoryOrder: categoryOrder,
      },
      customerDetail: {
        customerName: customerName,
        phoneNumber: phoneNumber,
        address: address,
      },
      customMenu: expenseDetails.filter(
        (detail) =>
          detail.menu !== "" && detail.harga !== "" && detail.qty !== ""
      ),
      payment: {
        totalPayment: balance1,
        marginPayment: margin1,
        dp: dp,
      },
    };
    handleCustomer()
    const data = JSON.stringify(formattedData);
    handleSubmitOrder(data)
  };
  return (
    <div className="container mb-10">
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
          <span>
            <p className=" text-white">Your submission has been received!</p>
          </span>
        </div>
      )}

      {error && (
        <div role="alert" className="alert alert-danger">
          <span>{error}</span>
        </div>
      )}
      <div className="header mt-10 border-b-2">
        <h1 className="font-bold">Order</h1>
      </div>
      {/* Order details */}
      <div className="mt-2 my-2">
        <div className="grid grid-cols-3 gap-2">
          {/* 1 */}
          <div>
            <h6 className="font-bold">Order Details</h6>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Event name</span>
              </div>
              <input
                type="text"
                placeholder="Event name"
                className="input input-bordered w-full max-w-xs"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Qty</span>
              </div>
              <input
                type="number"
                placeholder="500"
                className="input input-bordered w-full max-w-xs"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Note order</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 w-full max-w-xs"
                placeholder="Note order"
                value={noteOrder}
                onChange={(e) => setNoteOrder(e.target.value)}
              ></textarea>
            </label>
          </div>
          {/* 2 */}
          <div>
            <h6 className="font-bold">-</h6>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Catergory order</span>
              </div>
              <select
                className="select select-bordered"
                value={categoryOrder}
                onChange={(e) => setCategoryOrder(e.target.value)}
              >
                <option selected>
                  Pick one
                </option>
                <option>Prasmanan</option>
                <option>Nasi kotak</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Date</span>
              </div>
              <div className="border-2 p-2 rounded-md">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </div>
            </label>
          </div>
          {/* 3 */}
          <div>
            <h6 className="font-bold">Customer contact</h6>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Customer name</span>
              </div>
              <input
                type="text"
                placeholder="Event name"
                className="input input-bordered w-full max-w-xs"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                // value={searchQuery}
                // onChange={handleSearch}
              />
            </label>
            <ul>
              {/* {filteredContacts.map((contact) => (
                <li key={contact.id}>
                  Name: {contact.name}, Phone Number: {contact.phoneNumber},
                  Address: {contact.address}
                </li>
              ))} */}
            </ul>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Phone Number</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Address</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 w-full max-w-xs"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </label>
          </div>
        </div>
      </div>

      {/* Menu details */}
      <div className="header mt-10 border-b-2">
        <h1 className="font-bold">Order menu</h1>
      </div>
      {/* Menu details */}
      <div className="mt-2 my-2">
        <div className="grid grid-cols-2 gap-10">
          {/* 1 */}
          <div>
            <h6 className="font-bold">Menu details</h6>
            {expenseDetails.map((detail, index) => (
              <div className="grid grid-cols-3 gap-2" key={index}>
                <div className="">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Add custom</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Add custom"
                      className="input input-bordered w-full max-w-xs"
                      name="menu"
                      value={detail.menu}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Qty</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Qty"
                      className="input input-bordered w-full max-w-xs"
                      name="qty"
                      value={detail.qty}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Harga</span>
                    </div>
                    <input
                      type="number"
                      placeholder="harga"
                      className="input input-bordered w-full max-w-xs"
                      name="harga"
                      value={detail.harga}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          {/* 3 */}
          <div className=" border-l-2 pl-4">
            <h6 className="font-bold">Payment</h6>
            <label className="form-control w-full max-w-xs disabled">
              <div className="label">
                <span className="label-text">Total payment</span>
              </div>
              <input
                type="text"
                placeholder="10.000.000"
                value={totalBalance}
                className="input input-bordered w-full max-w-xs"
                disabled
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">DP</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                min={0}
                value={dp}
                onChange={(e) => setDp(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs disabled">
              <div className="label">
                <span className="label-text">Margin payments</span>
              </div>
              <input
                type="text"
                placeholder="10.000.000"
                value={marginPayment}
                className="input input-bordered w-full max-w-xs"
                disabled
              />
            </label>
            <button className="btn bg-success mt-3" onClick={handleDoneClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
