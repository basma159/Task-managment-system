import taskPC from "../assets/task-pc.jpg";
import taskMobile from "../assets/task-mobile.jpg";
import emailIcon from "../assets/email.png";
import InputField from "../components/InputField";
import InPasswordField from "../components/InPasswordField";
import ButtonSub from "../components/ButtonSub";
import ErrorField from "../components/ErrorField";
import SuccessNot from "../components/SuccessNot";
import Text from "../components/Text";
import { useEffect, useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successNot, setSuccessNot] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  function togglePasswordVisibility() {
    setVisible(!visible);
  }
  useEffect(() => {
    if (successNot) {
      const timer = setTimeout(() => {
        setSuccessNot(false);
        navigate("/home");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successNot, navigate]);
  async function handleForm(e) {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
      general: "",
    });
    try {
      if (!email) {
        return setErrors((prev) => ({
          ...prev,
          email: "Email is Required",
        }));
      }
      if (!password) {
        return setErrors((prev) => ({
          ...prev,
          password: "Password is Required",
        }));
      }
      setIsSubmitting(true);
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      setSuccessNot(true);
      setEmail("");
      setPassword("");
      const token = response.data.token;
      localStorage.setItem("token", token);
    } catch (error) {
      if (error.response) {
        const field = error.response.data.field;
        const message = error.response.data.message;
        if (field && Object.keys(errors).includes(field)) {
          return setErrors((prev) => ({ ...prev, [field]: message }));
        } else {
          return setErrors((prev) => ({ ...prev, general: "Error !" }));
        }
      } else {
        return setErrors((prev) => ({ ...prev, general: "Error !" }));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row  gap-10 mb-4 md:mb-0">
      <SuccessNot text={"Login successfully"} successNot={successNot} />
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
      <div className="w-full lg:w-1/2 lg:min-h-[60vh] lg:h-screen flex flex-col justify-center items-center gap-3 px-6">
        <h2 className="text-4xl font-bold">Welcome Back!</h2>

        <h2 className="text-xl text-gray-600">Login to your account</h2>

        <form
          className="w-full max-w-md flex flex-col gap-6 pt-4"
          onSubmit={handleForm}
        >
          {/* Email Input */}

          <InputField
            image={emailIcon}
            nameImage={"email"}
            type={"email"}
            placeholder={"Email Address"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
          />
          {errors.email && <ErrorField message={errors.email} />}
          {/* Password Input */}

          <InPasswordField
            type={visible ? "text" : "password"}
            placeholder={"Password"}
            Function={togglePasswordVisibility}
            icon={visible ? faEyeSlash : faEye}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          {errors.password && <ErrorField message={errors.password} />}
          {errors.general && <ErrorField message={errors.general} />}

          {/* Login Button */}

          <ButtonSub
            isSubmitting={isSubmitting}
            loading={"Loading..."}
            noLoading={"Login"}
          />

          <Text
            text={"Don't have an account?"}
            signLink={"/register"}
            signText={"Register"}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
