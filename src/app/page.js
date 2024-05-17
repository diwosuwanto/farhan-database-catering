"use client";
import React, { useState } from "react";
import Logo from "../../public/logoT.png";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    userName: "amoycatering",
    passWord: "amoycatering123",
  };


  const handleLink = () => {
    console.log("kesini")
    
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.userName == userName && data.passWord == password){
      console.log("kesini")
      router.push('/dashboard', undefined, { shallow: true })
    }else{
      alert("Salah")
      setUserName("")
      setPassword("")
    }
  };
  return (
    <>
      <main className=" bg-white">
        <div className="flex justify-center items-center h-screen p-10 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-40 w-auto" src={Logo.src} />
            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <form className="space-y-6 mt-10" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    name="text"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="p-3 block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 bg-white"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="p-3 block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
