"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Stats() {
  const [dataOrder, setDataOrder] = useState("");
  const [totalPendingOrders, setTotalPendingOrders] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalPaymentTrue, setTotalPaymentTrue] = useState(0);
  const [totalPaymentFalse, setTotalPaymentFalse] = useState(0);

  const [totalBelanja, setTotalBelanja] = useState("");
  const [totalGaji, setTotalGaji] = useState("");
  const [margin, setMargin] = useState("");

  const [dateRange, setDateRange] = useState([null, null]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const [startDate, endDate] = dateRange.map((date) =>
      date ? new Date(date) : null
    );

    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/order");
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.filter((order) => {
            const orderDate = new Date(order.date); // Adjust based on your date field
            if (!startDate && !endDate) {
              return true; // Show all data if startDate and endDate are null
            }
            return (
              (!startDate || orderDate >= startDate) &&
              (!endDate || orderDate <= endDate)
            );
          });
          setDataOrder(filteredData);
          const pendingOrders = filteredData.filter(
            (order) => order.status === false
          );
          setTotalPendingOrders(pendingOrders.length);
          const total = filteredData.reduce(
            (acc, order) =>
              acc +
              parseInt(
                order.payment.totalPayment
              ),
            0
          );
          const formattedTotal = total.toLocaleString("id-ID");
          console.log("mana", total)
          setTotalPayment(formattedTotal);
          const totalTrue = filteredData
            .filter((order) => order.status === true)
            .reduce(
              (acc, order) =>
                acc +
                parseInt(
                  order.payment.totalPayment
                ),
              0
            );
          const formattedTotalTrue = totalTrue.toLocaleString("id-ID");
          setTotalPaymentTrue(formattedTotalTrue);
          const totalFalse = filteredData
            .filter((order) => order.status === false)
            .reduce(
              (acc, order) =>
                acc +
                parseInt(
                  order.payment.totalPayment
                ),
              0
            );
          const formattedTotalFalse = totalFalse.toLocaleString("id-ID");
          setTotalPaymentFalse(formattedTotalFalse);

          const marginTotal =
            totalTrue -
            (parseFloat(totalBelanja.replace(/\./g, "").replace(",", ".")) +
              parseFloat(totalGaji.replace(/\./g, "").replace(",", ".")));
          setMargin(marginTotal);
        } else {
          console.error("Failed to fetch contacts");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    const fetchExpense = async () => {
      try {
        const response = await fetch("/api/expense");
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.filter((expense) => {
            const expenseDate = new Date(expense.date); // Adjust based on your date field
            return (
              (!startDate || expenseDate >= startDate) &&
              (!endDate || expenseDate <= endDate)
            );
          });
          const totalBelanja = filteredData
            .filter((expense) => expense.category === "Belanja")
            .reduce(
              (total, expense) => total + parseFloat(expense.total || 0),
              0
            ); // Provide default value if null
          const formattedTBelanja = totalBelanja.toLocaleString("id-ID");
          setTotalBelanja(formattedTBelanja);

          const totalGaji = filteredData
            .filter((expense) => expense.category === "Salary")
            .reduce(
              (total, expense) => total + parseFloat(expense.total || 0),
              0
            ); // Provide default value if null
          const formattedTGaji = totalGaji.toLocaleString("id-ID");
          setTotalGaji(formattedTGaji);
        } else {
          console.error("Failed to fetch expenses");
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpense();
    fetchContacts();
  }, [dateRange, totalBelanja, totalGaji]);

  const calculateMargin = () => {
    const totalPaymentTrueValue = parseInt(
      totalPaymentTrue.toString().replace(/\./g, "").replace(",", "")
    );
    const totalBelanjaValue = parseInt(
      totalBelanja.replace(/\./g, "").replace(",", "")
    );
    const totalGajiValue = parseInt(
      totalGaji.replace(/\./g, "").replace(",", "")
    );
    return (
      totalPaymentTrueValue -
      (totalBelanjaValue + totalGajiValue)
    ).toLocaleString("id-ID");
  };

  // console.log("ini", totalBelanja)
  return (
    <div className="container">
      <div class="grid grid-flow-col auto-cols-max gap-2">
        <div className="align-middle">
          <div className="header my-10 ">
            <h1 className="font-bold">Orders</h1>
          </div>
          <div className="">
            <p className="font-bold">Date Range</p>
          </div>
          <div className="border-2 p-2 rounded-md mb-3 w-64">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
            />
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title text-black text-bold">Total Order</div>
              <div className="stat-value text-center">{dataOrder.length}</div>
            </div>
          </div>

          <div className="stats bg-green-300 mx-3">
            <div className="stat">
              <div className="stat-title text-black text-bold">
                Full Payment Order
              </div>
              <div className="stat-value text-center">
                {dataOrder.length - totalPendingOrders}
              </div>
            </div>
          </div>

          <div className="stats bg-yellow-300 mx-3">
            <div className="stat">
              <div className="stat-title text-black text-bold">
                Pending Payment Order
              </div>
              <div className="stat-value text-center">{totalPendingOrders}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="header my-10 ">
        <h1 className="font-bold">Detail Payment</h1>
      </div>
      <div className="mb-10 ">
        <div className="stats shadow mb-3">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Orders</div>
            <div className="stat-value">RP. {totalPayment}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Full Payment</div>
            <div className="stat-value">RP. {totalPaymentTrue}</div>
            <div className="stat-desc">{}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Pending Payment</div>
            <div className="stat-value">Rp. {totalPaymentFalse}</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Shopping Expense</div>
            <div className="stat-value">Rp. {totalBelanja}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Salary Expense</div>
            <div className="stat-value">Rp. {totalGaji}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Profit Margin</div>
            <div className="stat-value">RP. {calculateMargin()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
