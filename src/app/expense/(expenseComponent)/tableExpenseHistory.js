"use client";

import React, { useEffect, useState } from "react";

export default function TableExpenseHistory() {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchExpenses(currentPage);
  }, [currentPage]);

  const fetchExpenses = async (page) => {
    try {
      const response = await fetch(
        `/api/expense?page=${page}&limit=${itemsPerPage}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort data by date in descending order
        setExpenses(sortedData);
        const totalCount = data.length; // Assuming the API doesn't provide total count
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      } else {
        setExpenses([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      setExpenses([]);
      setTotalPages(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="header my-10">
        <h1 className="font-bold">Expense history</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Note</th>
                <th>Category</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((expense, index) => (
                    <tr key={index} className="hover">
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{expense.eventName}</td>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td>{expense.note}</td>
                      <td>{expense.category}</td>
                      <td>{parseFloat(expense.total).toLocaleString()}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="7">No expenses found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center my-10">
        <div className="join">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`join-item btn ${
                currentPage === i + 1 ? "btn-active" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
