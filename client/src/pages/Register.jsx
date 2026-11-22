import taskPC from "../assets/task-pc.jpg";
import taskMobile from "../assets/task-mobile.jpg";
import emailIcon from "../assets/email.png";
import ErrorField from "../components/ErrorField";
import InputField from "../components/InputField";
import InPasswordField from "../components/InPasswordField";
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
          <InputField type={"text"} placeholder={"Full Name"} image={emailIcon} nameImage={"name"}
            value={name} onChange={(e) => setName(e.target.value)} />

          {/* Email Input */}
          <InputField type={"email"} placeholder={"Email Address"} image={emailIcon} nameImage={"email"}
            value={email} onChange={(e) => setEmail(e.target.value)} />

          {/* Password Input */}
          <InPasswordField type={passwordVisible ? "text" : "password"} placeholder={"Password"}
            value={password} onChange={(e) => setPassword(e.target.value)}
            Function={togglePasswordVisibility} icon={passwordVisible ? faEyeSlash : faEye} />

          {/* Confirm Password Input */}
          <InPasswordField type={confirmPasswordVisible ? "text" : "password"} placeholder={"Confirm Password"}
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            Function={toggleConfirmPasswordVisibility} icon={confirmPasswordVisible ? faEyeSlash : faEye} />

          {errorConfirm && <ErrorField message={errorConfirm} />}


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
