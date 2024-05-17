"use client";
import React, { useState, useEffect } from "react";
import Modal from "./modal.js";
import { useRouter } from "next/navigation";

export default function Content01() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [otherOrders, setOtherOrders] = useState([]);
  const [expiredOrders, setExpiredOrders] = useState([]);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false); // Initialize isOpen as false


  const [selectedEventId, setSelectedEventId] = useState(null);

  const openModal = (eventId) => {
    setIsOpen(true);
    setSelectedEventId(eventId);
  };

  const closeModal = () => {
    
    setSelectedEventId(null);
    setIsOpen(false);
    
  };

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("/api/order");
        if (response.ok) {
          const data = await response.json();
          categorizeOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [setIsOpen]);

  const categorizeOrders = (orders) => {
    const now = new Date();
    const oneWeekFromNow = new Date(now);
    oneWeekFromNow.setDate(now.getDate() + 7);

    const upcoming = [];
    const other = [];
    const expired = [];

    orders.forEach((order) => {
      console.log("Order Date:", order.date); // Log the order date for debugging
      const orderDate = new Date(order.date);
      if (orderDate >= now && orderDate <= oneWeekFromNow) {
        upcoming.push(order);
      } else if (orderDate > oneWeekFromNow) {
        other.push(order);
      } else if (orderDate < now) {
        expired.push(order);
      }
    });

    // Assuming these are state setters
    setUpcomingEvents(upcoming);
    setOtherOrders(other);
    setExpiredOrders(expired);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
  };

  const formatTime = (dateString) => {
    const dateObject = new Date(dateString);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;
  };
  const dateNow = Date().now;

  console.log("dataUp", expiredOrders);

  return (
    <div className="container">
      <div className="header my-10 ">
      <button className="btn btn-warning" onClick={() => window.location.reload()}>restart</button>
        <h1 className="font-bold">
          Up Coming Events {"("}1 week{")"}
        </h1>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {upcomingEvents.map((event, index) => (
          <div
            className="card p-2"
            key={index}
            onClick={() => openModal(event.id)}
          >
            <div className="card w-auto lg:w-30  bg-base-100 shadow-md hover:bg-yellow-100">
              <div className="card-body">
                {/* category */}
                <div class="grid grid-cols-2 gap-4">
                  <div className="boxTittle">
                    {event.orderDetail.categorizeOrders === "Prasmanan" ? (
                      <div class="box-border h-auto w-auto p-4 bg-green-600 rounded-md">
                        <p className="font-bold  text-white m-0 p-0">
                          Pras <br />
                          manan
                        </p>
                      </div>
                    ) : (
                      <div class="box-border h-auto w-auto p-4 bg-blue-600 rounded-md">
                        <p className="font-bold  text-white m-0 p-0">
                          Nasi <br />
                          Kotak
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Name */}
                  <div>
                    <p className="font-bold text-xl pt-1 truncate hover:text-clip">
                      {event.customerDetail.customerName}
                    </p>
                    <p className="font-base text-sm truncate hover:text-clip">
                      {event.customerDetail.phoneNumber}
                    </p>
                    <p className="font-bold text-sm">
                      {event.orderDetail.qty}{" "}
                      <span className="font-base">\ Porsi</span>
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 border-y-2 border-black py-2">
                  <div>
                    <p className="font-bold text-sm capitalize align-middle">
                      {formatDate(event.date)}{" "}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-sm capitalize align-middle">
                      {formatTime(event.date)}{" "}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="line-clamp-3 hover:line-clamp-none text-sm break-all">
                    {event.customerDetail.address}
                  </p>
                  {event.payment.marginPayment > 0 ? (
                    <progress
                      className="progress progress-warning w-56"
                      value={event.payment.dp}
                      max={event.payment.totalPayment}
                    ></progress>
                  ) : (
                    <progress
                      className="progress progress-success w-56"
                      value={event.payment.dp}
                      max={event.payment.totalPayment}
                    ></progress>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="header my-10 ">
        <h1 className="font-bold">Other Orders {">"} 1 week</h1>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {otherOrders.map((event, index) => (
          <div className="card p-2" key={index}>
            <div className="card w-auto lg:w-30  bg-base-100 shadow-md hover:bg-yellow-100">
              <div className="card-body">
                {/* category */}
                <div class="grid grid-cols-2 gap-4">
                  <div className="boxTittle">
                    {event.orderDetail.categoryOrder === "Prasmanan" ? (
                      <div class="box-border h-auto w-auto p-4 bg-green-600 rounded-md">
                        <p className="font-bold  text-white m-0 p-0">
                          Pras <br />
                          manan
                        </p>
                      </div>
                    ) : (
                      <div class="box-border h-auto w-auto p-4 bg-blue-600 rounded-md">
                        <p className="font-bold  text-white m-0 p-0">
                          Nasi <br />
                          Kotak
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Name */}
                  <div>
                    <p className="font-bold text-xl pt-1 truncate hover:text-clip">
                      {event.customerDetail.customerName}
                    </p>
                    <p className="font-base text-sm truncate hover:text-clip">
                      {event.customerDetail.phoneNumber}
                    </p>
                    <p className="font-bold text-sm">
                      {event.orderDetail.qty}{" "}
                      <span className="font-base">\ Porsi</span>
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 border-y-2 border-black py-2">
                  <div>
                    <p className="font-bold text-sm capitalize align-middle">
                      {formatDate(event.date)}{" "}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-sm capitalize align-middle">
                      {formatTime(event.date)}{" "}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="line-clamp-3 hover:line-clamp-none text-sm break-all">
                    {event.customerDetail.address}
                  </p>
                  {event.payment.marginPayment > 0 ? (
                    <progress
                      className="progress progress-warning w-56"
                      value={event.payment.dp}
                      max={event.payment.totalPayment}
                    ></progress>
                  ) : (
                    <progress
                      className="progress progress-success w-56"
                      value={event.payment.dp}
                      max={event.payment.totalPayment}
                    ></progress>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="header my-10 ">
        <h1 className="font-bold">Other Orders already done</h1>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {expiredOrders.map((event, index) => (
          <div
            className="card p-2"
            key={index}
            onClick={() => openModal(event.id)}
          >
            <div className="card w-auto lg:w-30  bg-base-100 shadow-md hover:bg-yellow-100">
              <div className="card-body">
                {/* category */}
                <div class="grid grid-cols-2 gap-4">
                  <div className="boxTittle">
                    {event.orderDetail.categorizeOrders === "Prasmanan" ? (
                      <div class="box-border h-auto w-auto p-4 bg-green-600 rounded-md">
                        <p className="font-bold  text-white m-0 p-0">
                          Pras <br />
                          manan
                        </p>
                      </div>
                    ) : (
                      <div class="box-border h-auto w-auto p-4 bg-blue-600 rounded-md">
                        <p className="font-bold  text-white m-0 p-0">
                          Nasi <br />
                          Kotak
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Name */}
                  <div>
                    <p className="font-bold text-xl pt-1 truncate hover:text-clip">
                      {event.customerDetail.customerName}
                    </p>
                    <p className="font-base text-sm truncate hover:text-clip">
                      {event.customerDetail.phoneNumber}
                    </p>
                    <p className="font-bold text-sm">
                      {event.orderDetail.qty}{" "}
                      <span className="font-base">\ Porsi</span>
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 border-y-2 border-black py-2">
                  <div>
                    <p className="font-bold text-sm capitalize align-middle">
                      {formatDate(event.date)}{" "}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-sm capitalize align-middle">
                      {formatTime(event.date)}{" "}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="line-clamp-3 hover:line-clamp-none text-sm break-all">
                    {event.customerDetail.address}
                  </p>
                  {event.payment.marginPayment > 0 ? (
                    <progress
                      className="progress progress-warning w-56"
                      value={event.payment.dp}
                      max={event.payment.totalPayment}
                    ></progress>
                  ) : (
                    <progress
                      className="progress progress-success w-56"
                      value={event.payment.dp}
                      max={event.payment.totalPayment}
                    ></progress>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedEventId && (
        <Modal eventId={selectedEventId} isOpen={isOpen} setIsOpen={setIsOpen} onClose={closeModal} />
      )}
    </div>
  );
}

