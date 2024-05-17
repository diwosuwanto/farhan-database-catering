'use client'

import React, { useState, useEffect } from "react";

export default function TableOrderHistory() {
  const [orders, setOrders] = useState([]); // Initialize with an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const fetchOrders = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`/api/order?page=${currentPage}&limit=${itemsPerPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Fetched data:", data); // Debugging log
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort data by date in descending order
      setOrders(sortedData)
   // Ensure orders is always an array // Calculate total pages based on total items
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log("data", orders)
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrder = orders.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="container">
      <div className="header my-10">
        <h1 className="font-bold">Order history</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Event</th>
                <th>Desc</th>
                <th>Progress</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center">Loading...</td>
                </tr>
              ) : orders ? (
                currentOrder.map((order, index) => (
                  <tr key={index} className="hover">
                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{order.customerDetail.customerName}</div>
                          <div className="text-sm opacity-50">{order.customerDetail.phoneNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{order.orderDetail.eventName}</div>
                          <div className="text-sm opacity-50">{order.orderDetail.qty}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{new Date(order.date).toLocaleDateString()}</div>
                          <div className="text-sm opacity-50">{new Date(order.date).toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className={`font-bold ${order.status ? 'text-green-300' : 'text-yellow-300'}`}>
                        {order.status ? 'Done' : 'Progress'}
                      </p>
                    </td>
                    <td>
                      <p className="text-sm opacity-50">{order.orderDetail.categoryOrder || 'N/A'}</p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center my-10">
        <div className="join">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              className={`join-item btn ${currentPage === page + 1 ? 'btn-active' : ''}`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

