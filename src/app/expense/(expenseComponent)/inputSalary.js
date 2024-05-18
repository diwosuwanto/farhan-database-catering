"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function InputSalary() {
  const [error, setError] = useState(null);
  const [expenseDetails, setExpenseDetails] = useState([
    { pembelian: "", harga: ""},
  ]);
  const [nameEvent, setNameEvent] = useState("");
  const [note, setNote] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newExpenseDetails = [...expenseDetails];
    newExpenseDetails[index][name] = value;
    // If the last field is being filled, add a new empty field
    if (index === newExpenseDetails.length - 1 && value !== "") {
      newExpenseDetails.push({ pembelian: "", harga: ""});
    }
    setExpenseDetails(newExpenseDetails);
  };
  const calculateTotalBalance = () => {
    let balance = 0;
    expenseDetails.forEach((detail) => {
      if (detail.harga) {
        balance += parseInt(detail.harga)
      }
    });
    return balance.toLocaleString("id-ID");
  };

  useEffect(() => {
    const balance = calculateTotalBalance();
    setTotalBalance(balance);

    let timeoutId;
    timeoutId = setTimeout(() => {
      setIsSuccess(false), setError(null);
    }, 3000); // Hide the success message after 3 seconds

    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenseDetails, isSuccess]);

  const randomPart = Math.random().toString().substring(2, 8);
  const uniqueId = `E${Date.now()}_${randomPart}`;

  const handleDoneClick = () => {
    const formattedData = {
      id: uniqueId,
      eventName: "Salary",
      date: startDate,
      note: note,
      category : "Salary",
      total : totalBalance,
      detail: expenseDetails.filter(
        (detail) =>
          detail.pembelian !== "" && detail.harga !== "" 
      ),
    };
    const data = JSON.stringify(formattedData);
    handleSubmit({ data });
  };

  const handleSubmit = async ({ data }) => {
    // Prevent default form submission behavior
    console.log("ini mana data ini", data);
    try {
      setIsLoading(true);
      const response = await fetch("/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        setIsSuccess(true);
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
      <div className="grid grid-cols-2 gap-5 my-10">
        <div className="mt-6">
          <h1 className="font-bold">Expense Detail</h1>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Name Event</span>
              </div>
              <input
                type="text"
                disabled
                placeholder="Salary"
                className="input input-bordered w-full max-w-xs"
                name="nameEvent"
                value={nameEvent}
                onChange={(e) => setNameEvent("Salary")}
              />
            </label>
          </div>
          <div className="mt-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Date</span>
              </div>
              <div className="border-2 p-2 rounded-md">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </div>
            </label>
          </div>
          {expenseDetails.map((detail, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mt-2 mr-5">
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Nama Pegawai</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Nama Pegawai"
                    className="input input-bordered w-full max-w-xs"
                    name="pembelian"
                    value={detail.pembelian}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Gaji</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Gaji"
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

        <div>
          <h1 className="font-bold">Salary Expense</h1>
          <div className="mt-3">
            <div className="stats bg-blue-600 text-primary-content">
              <div className="stat">
                <div className="stat-title text-white">Account balance</div>
                <div className="stat-value text-white">RP {totalBalance}</div>
              </div>
            </div>
          </div>
          <div>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Note</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 w-full max-w-xs"
                placeholder="Note Gaji"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </label>
          </div>
          <div className="mt-2">
            {isLoading ? (
              <button className="btn btn-success text-white" disabled>
                Loading...
              </button>
            ) : (
              <button
                className="btn btn-success text-white"
                onClick={handleDoneClick}
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
