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
  const [errors, setErrors] = useState({
    name: "", email: "", password: "", confirmPassword: "", general: ""
  });

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
    setErrors({ name: "", email: "", password: "", confirmPassword: "", general: "" });
    try {
      if (password !== confirmPassword) {
        return setErrors(prev => ({ ...prev, confirmPassword: "Password is Not Identical!" }))
      }

      await axios.post(`${API_URL}/register`, {
        name, email, password
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSuccessNot(true);

    }
    catch (error) {
      if (error.response) {
        const field = error.response.data.field;
        const message = error.response.data.message;
        if (field && Object.keys(errors).includes(field)) {
          return setErrors(prev => ({ ...prev, [field]: message }));
        }
        else {
          return setErrors(prev => ({ ...prev, general: "Error!!" }));
        }
      }
      else {
        return setErrors(prev => ({ ...prev, general: "Error!!" }));
      }
    }
  }
  return (
    <div className="relative w-full min-h-screen flex flex-col lg:flex-row gap-6 mb-4 lg:mb-0">
      <div className={`successNot absolute ${successNot ? "block" : "hidden"}  bottom-10 right-4 bg-white shadow-2xl ring-2  ring-purple-900 rounded-xl p-2 z-50`}>
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

        <h2 className="text-2xl lg:text-4xl font-bold">
          Create Your Account
        </h2>

        <h2 className="text-lg lg:text-xl text-gray-600">
          Sign up to get started
        </h2>

        <form className="w-full max-w-md flex flex-col gap-6 pt-4" onSubmit={handleForm}>
          {/* Name Input */}
          <InputField type={"text"} placeholder={"Full Name"} image={emailIcon} nameImage={"name"}
            value={name} onChange={(e) => {
              setName(e.target.value);
              setErrors(prev => ({ ...prev, name: "" }))
            }} />

          {/* handle name errors */}
          {errors.name && <ErrorField message={errors.name} />}

          {/* Email Input */}
          <InputField type={"email"} placeholder={"Email Address"} image={emailIcon} nameImage={"email"}
            value={email} onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: "" }))
            }} />

          {/* handle email errors */}
          {errors.email && <ErrorField message={errors.email} />}

          {/* Password Input */}
          <InPasswordField type={passwordVisible ? "text" : "password"} placeholder={"Password"}
            value={password} onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prev => ({ ...prev, password: "" }))
            }}
            Function={togglePasswordVisibility} icon={passwordVisible ? faEyeSlash : faEye} />

          {/* handle password errors */}
          {errors.password && <ErrorField message={errors.password} />}

          {/* Confirm Password Input */}
          <InPasswordField type={confirmPasswordVisible ? "text" : "password"} placeholder={"Confirm Password"}
            value={confirmPassword} onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors(prev => ({ ...prev, confirmPassword: "" }))
            }}
            Function={toggleConfirmPasswordVisibility} icon={confirmPasswordVisible ? faEyeSlash : faEye} />

          {/* handle confirm password errors */}
          {errors.confirmPassword && <ErrorField message={errors.confirmPassword} />}

          {/* handle general errors */}
          {errors.general && <ErrorField message={errors.general} />}

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
