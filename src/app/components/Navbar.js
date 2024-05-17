"use client";
import React from "react";

const navbar = () => {
  return (
    <div className="navbar bg-base-100 container">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Dashboard</a>
              <ul className="p-2">
                <li>
                  <a href="/dashboard">Home</a>
                </li>
                <li>
                  <a href="/dashboard/margin">Margin</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Order</a>
              <ul className="p-2">
                <li>
                  <a href="/order">Add order</a>
                </li>
                <li>
                  <a href="/order/orderHistory">Order history</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Expense</a>
              <ul className="p-2">
                <li>
                  <a href="/expense">Add expense</a>
                </li>
                <li>
                  <a href="/expense/addSalary">Add salary</a>
                </li>
                <li>
                  <a href="/expense/expenseHistory">Expense history</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Contact</a>
              <ul className="p-2">
                <li>
                  <a>Add contact</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl" href="/dashboard" >Amoy Catering</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Dashboard</summary>
              <ul className="p-2">
                <li>
                  <a href="/dashboard">Home</a>
                </li>
                <li>
                  <a href="/dashboard/margin">Margin</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Order</summary>
              <ul className="p-2">
                <li>
                  <a href="/order">Add order</a>
                </li>
                <li>
                  <a href="/order/orderHistory">Order history</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Expense</summary>
              <ul className="p-2">
                <li>
                  <a href="/expense">Add expense</a>
                </li>
                <li>
                  <a href="/expense/addSalary">Add salary</a>
                </li>
                <li>
                  <a href="/expense/expenseHistory">Expense history</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Contact</summary>
              <ul className="p-2">
                <li>
                <a href="/contact">Add contact</a>
                </li>
                <li>
                <a href="/contact/contactHistory">Contact</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div> */}
        <div className="dropdown dropdown-end">
          <div
            tabindex="0"
            className="avatar placeholder btn btn-ghost btn-circle"
            role="button"
          >
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              <span className="text-xs">AC</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default navbar;
