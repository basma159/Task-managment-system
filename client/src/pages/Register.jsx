import taskPC from "../assets/task-pc.jpg";
import taskMobile from "../assets/task-mobile.jpg";
import lock from "../assets/lock.png";
import emailIcon from "../assets/email.png";
import ErrorField from "../components/ErrorField";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successNot, setSuccessNot] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (successNot) {
      const timer = setTimeout(() => {
        setSuccessNot(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [successNot])

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function toggleConfirmPasswordVisibility() {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  async function handleForm(e) {
    e.preventDefault();
    setErrorMessage("");
    setErrorConfirm("");
    try {
      if (password !== confirmPassword) {
        return setErrorConfirm("Password is Not Identical!")
      }

      await axios.post(`${API_URL}/register`, {
        name, email, password
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSuccessNot(true);
      setErrorConfirm("");
      setErrorMessage("");

    }
    catch (error) {
      if (error.response) {
        return setErrorMessage(error.response.data.message);
      }
      else {
        return setErrorMessage("Error!!");
      }
    }
  }
  return (
    <div className="relative w-full min-h-screen flex flex-col lg:flex-row gap-6 mb-4">
      <div className={`successNot absolute ${successNot ? "block" : "hidden"}  top-10 right-4 bg-white shadow-2xl ring-2  ring-purple-900 rounded-xl p-2 z-50`}>
        <p className="flex justify-center items-center gap-3"><FontAwesomeIcon icon={faCheck} style={{ backgroundColor: "purple", color: "white", borderRadius: "20px", padding: "7px" }} />User created successfully</p>
      </div>
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

        <form className="w-full max-w-md flex flex-col gap-6 pt-4" onSubmit={handleForm}>
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              className="py-3 px-10 w-full rounded-xl ring-purple-300 ring-1 outline-none focus:ring-purple-500"
              value={name} onChange={(e) => setName(e.target.value)} />

            <img
              src={emailIcon}
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
              value={email} onChange={(e) => setEmail(e.target.value)} />

            <img
              src={emailIcon}
              alt="email"
              className="absolute left-3 top-4 w-4"
            />
            {errorMessage && <ErrorField message={errorMessage} />}
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="py-3 px-10 w-full rounded-xl ring-purple-300 ring-1 outline-none focus:ring-purple-500 [&::-ms-reveal]:hidden"
              value={password} onChange={(e) => setPassword(e.target.value)} />

            <img
              src={lock}
              alt="lock"
              className="absolute left-3 top-4 w-4"
            />
            <button onClick={togglePasswordVisibility} type="button">
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                className="absolute right-3 top-4 cursor-pointer text-gray-500"
              />
            </button>

          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              className="py-3 px-10 w-full rounded-xl ring-purple-300 ring-1 outline-none focus:ring-purple-500 [&::-ms-reveal]:hidden"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <img
              src={lock}
              alt="lock"
              className="absolute left-3 top-4 w-4"
            />

            <button onClick={toggleConfirmPasswordVisibility} type="button">
              <FontAwesomeIcon
                icon={confirmPasswordVisible ? faEyeSlash : faEye}
                className="absolute right-3 top-4 cursor-pointer text-gray-500"
              />
            </button>
            {errorConfirm && <ErrorField message={errorConfirm} />}
          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="text-white bg-purple-800 py-3 w-full rounded-xl cursor-pointer hover:bg-purple-900 transition"
          >
            Create Account
          </button>
          <p className="text-center text-gray-600">Already have an account?
            <Link to="/login" className="text-purple-700 font-semibold ml-1">Login</Link></p>

        </form>
      </div>

    </div>
  );
}

export default Register;
