import taskPC from "../assets/task-pc.jpg";
import taskMobile from "../assets/task-mobile.jpg";
import lock from "../assets/lock.png";
import email from "../assets/email.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [visible, setvisible] = useState(false);

  function togglePasswordVisibility() {
    setvisible(!visible);
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">

      {/* Image Section */}
      <div className="w-full h-[40vh] lg:w-1/2 lg:h-screen bg-[#C9C5FA] flex justify-center items-center overflow-hidden">
        <img
          src={taskPC}
          alt="Task Manager"
          className="hidden md:block w-full h-full object-contain"
        />
        <img
          src={taskMobile}
          alt="Task Manager"
          className="md:hidden w-full h-full object-contain"
        />
      </div>

      {/* Login Section */}
      <div className="w-full lg:w-1/2 min-h-[60vh] lg:h-screen flex flex-col justify-center items-center gap-3 px-6">

        <h2 className="text-4xl font-bold">
          Create Your Account
        </h2>

        <h2 className="text-xl text-gray-600">
          Sign up to get started
        </h2>

        <form className="w-full max-w-md flex flex-col gap-6 pt-4">
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              className="py-3 px-10 w-full rounded-xl ring-purple-300 ring-1 outline-none focus:ring-purple-500"
            />

            <img
              src={email}
              alt="name"
              className="absolute left-3 top-4 w-4"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className="py-3 px-10 w-full rounded-xl ring-purple-300 ring-1 outline-none focus:ring-purple-500"
            />

            <img
              src={email}
              alt="email"
              className="absolute left-3 top-4 w-4"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              className="py-3 px-10 w-full rounded-xl ring-purple-300 ring-1 outline-none focus:ring-purple-500"
            />

            <img
              src={lock}
              alt="lock"
              className="absolute left-3 top-4 w-4"
            />

            <FontAwesomeIcon
              onClick={togglePasswordVisibility}
              icon={visible ? faEyeSlash : faEye}
              className="absolute right-3 top-4 cursor-pointer text-gray-500"
            />
          </div>
          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              placeholder="Confirm Password"
              className="py-3 px-10 w-full rounded-xl ring-purple-300 ring-1 outline-none focus:ring-purple-500"
            />

            <img
              src={lock}
              alt="lock"
              className="absolute left-3 top-4 w-4"
            />

            <FontAwesomeIcon
              onClick={togglePasswordVisibility}
              icon={visible ? faEyeSlash : faEye}
              className="absolute right-3 top-4 cursor-pointer text-gray-500"
            />
          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="text-white bg-purple-800 py-3 w-full rounded-xl cursor-pointer hover:bg-purple-900 transition"
          >
            Create Account
          </button>
          <p className="text-center">Already have an account? <a href="/login" className="text-purple-800 ">Login</a></p>

        </form>
      </div>

    </div>
  );
}

export default Register;
