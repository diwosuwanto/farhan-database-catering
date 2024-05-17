"use client"
import Navbar from "../components/navbar";

export default function DefaultLayout({ children }) {
  return (
    <>
     <Navbar />
      <main className="grow">{children}</main>
    </>
  )
}