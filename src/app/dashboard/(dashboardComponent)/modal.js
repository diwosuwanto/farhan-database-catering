"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Modal = ({ eventId, onClose, isOpen, setIsOpen }) => {
  const [eventData, setEventData] = useState(null); // Manage modal visibility
  const [pembayaran, setPembayaran] = useState(null);
  const [margin, setMargin]= useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/order`);
        if (response.ok) {
          const data = await response.json();
          // Filter data by eventId
          const eventData = data.find((item) => item.id === eventId);
          if (eventData) {
            setEventData(eventData);
          } else {
            console.error("Event with eventId not found");
          }
        } else {
          console.error("Failed to fetch event data");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  console.log(eventData);

  const updateDp = async (eventId, formattedData) => {
    try {
      const response = await fetch(`/api/order/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: eventId, data: formattedData }), // Send new dp value in the request body
      });
      if (response.ok) {
        console.log("Dp updated successfully");
      } else {
        console.error("Failed to update dp");
      }
    } catch (error) {
      console.error("Error updating dp:", error);
    }
  };

  const handleUpdateDp = async () => {
    const newDp = pembayaran == null || pembayaran == "" ? eventData.payment.dp : parseInt(pembayaran) + parseInt(eventData.payment.dp)
    const newMargin = parseInt(eventData.payment.totalPayment) - parseInt(newDp)
    const formattedData = {
      id: eventData.id,
      date: eventData.date,
      status: newMargin == 0 ? true : eventData.status,
      orderDetail: {
        eventName: eventData.orderDetail.eventName,
        qty: eventData.orderDetail.qty,
        noteOrder: eventData.orderDetail.noteOrder,
        categoryOrder:  eventData.orderDetail.categoryOrder,
      },
      customerDetail: {
        customerName: eventData.customerDetail.customerName,
        phoneNumber: eventData.customerDetail.phoneNumber,
        address: eventData.customerDetail.address,
      },
      customMenu: eventData.customMenu.filter(
        (detail) =>
          detail.menu !== "" && detail.harga !== "" && detail.qty !== ""
      ),
      payment: {
        totalPayment: eventData.payment.totalPayment,
        marginPayment: newMargin,
        dp: newDp,
      },
    };

    console.log("data", formattedData)
    updateDp(eventId , formattedData);

  };

  const closeModal = () => {
    setIsOpen(false); // Close modal
    onClose(); // Call onClose callback
  };

  const handleButtonClick = () => {
    handleUpdateDp();
    closeModal();
  };

  return (
    <>
      {isOpen &&
      eventData && ( // Render modal only if isOpen is true
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
            open
          >
            {" "}
            {/* Use open attribute to open dialog */}
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <div>
                <div className="container mb-10">
                  <div className="header mt-10 border-b-2">
                    <h1 className="font-bold">Order</h1>
                  </div>
                  {/* Order details */}
                  <div className="mt-2 my-2">
                    <div className="grid grid-cols-2 gap-2">
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
                            value={eventData.orderDetail.eventName}
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
                            value={eventData.orderDetail.quantity}
                          />
                        </label>
                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Note order</span>
                          </div>
                          <textarea
                            className="textarea textarea-bordered h-24 w-full max-w-xs"
                            placeholder="Note order"
                            value={eventData.orderDetail.noteOrder}
                          ></textarea>
                        </label>
                        <h6 className="font-bold">-</h6>
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Catergory order</span>
                          </div>
                          <select
                            className="select select-bordered"
                            value={eventData.orderDetail.categoryOrder}
                            onChange={(e) => setCategoryOrder(e.target.value)}
                          >
                            <option selected>Pick one</option>
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
                              selected={eventData.date}
                              showTimeSelect
                              timeFormat="HH:mm"
                              timeIntervals={15}
                              timeCaption="time"
                              dateFormat="MMMM d, yyyy h:mm aa"
                            />
                          </div>
                        </label>
                      </div>
                      {/* 2 */}
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
                            value={eventData.customerDetail.customerName}
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
                            value={eventData.customerDetail.phoneNumber}
                          />
                        </label>
                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Address</span>
                          </div>
                          <textarea
                            className="textarea textarea-bordered h-24 w-full max-w-xs"
                            placeholder="Address"
                            value={eventData.customerDetail.address}
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
                        {eventData.customMenu.map((detail, index) => (
                          <div className="" key={index}>
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
                            value={eventData.payment.totalPayment}
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
                            value={eventData.payment.dp}
                            className="input input-bordered w-full max-w-xs"
                            disabled
                          />
                        </label>
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Pembayaran</span>
                          </div>
                          <input
                            type="number"
                            placeholder="Type here"
                            min={0}
                            max={parseInt(eventData.payment.totalPayment)}
                            value={pembayaran}
                            onChange={(e) => setPembayaran(e.target.value)}
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
                            value={eventData.payment.marginPayment}
                            className="input input-bordered w-full max-w-xs"
                            disabled
                          />
                        </label>
                        <button className="btn btn-success text-white mt-2" onClick={handleButtonClick}>Update DP</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn" onClick={closeModal}>
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        )}
    </>
  );
};

export default Modal;
