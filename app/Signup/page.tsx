"use client";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [registrationError, setRegistrationError] = useState("");

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkboxValue = (e.target as HTMLInputElement).checked;
      setFormData((prevData) => ({
        ...prevData,
        [name]: checkboxValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation logic
    const errors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreedToTerms) {
      errors.agreedToTerms = "You must agree to the terms";
    }

    // If there are errors, set them in state and stop form submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // API call for user registration
      const response = await fetch(
        " https://api.dev2.constructn.ai/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 409) {
        console.log("Email address already registered");
        alert("Email Already Exists!! Go to Sign In");
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // If registration is successful, you can redirect or perform any other actions
      console.log("Registration successful:", formData);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const isValidEmail = (email: string) => {
    // Basic email validation, you can replace it with a more robust validation if needed
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <main
      style={{
        width: "70%",
        backgroundImage:
          'url("https://app.constructn.ai/_next/static/media/Illustration.a0ccf67c.svg")',
        backgroundSize: "cover", // Set the background size to cover
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "720px",
        minWidth: "100%",
      }}
    >
      <div className="absolute top-[0%] left-[70%] right-0 bg-white flex items-center justify-center pl-8 pr-8 pt- pb-24 border-l-2 border-slate-300 shadow-left">
        <div className="flex flex-col w-full">
          <div className="flex items-center flex-col">
            <LockIcon
              fontSize="large"
              style={{
                color: "white",
                backgroundImage: "linear-gradient(to right, #E17327, #932191)",
                padding: "10px",
                borderRadius: "50%",
              }}
            ></LockIcon>
            <h1 className="text-2xl mb-4 mt-2 font-semibold">SignUp</h1>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            {/* First Name input */}
            <fieldset className="flex items-center border-slate-300 p-1 transition-all duration-500 rounded-md ease-in-out hover:border-blue-500 border-2">
              <legend className="pl-2 pr-2">First Name</legend>
              <PersonOutlineRoundedIcon className="ml-1" />
              <input
                type="text"
                id="firstName" // Updated id
                name="firstName" // Updated name
                className="p-1 w-full focus:border-none focus:outline-none"
                onChange={handleInputChange} // Added onChange event
              />
            </fieldset>

            {/* Last Name input */}
            <fieldset className="flex items-center border-slate-300 p-1 transition-all duration-500 rounded-md ease-in-out hover:border-blue-500 border-2 mt-2">
              <legend className="pl-2 pr-2">Last Name</legend>
              <PersonOutlineRoundedIcon className="ml-1" />
              <input
                type="text"
                id="lastName" // Updated id
                name="lastName" // Updated name
                className="p-1 w-full focus:border-none focus:outline-none"
                onChange={handleInputChange} // Added onChange event
              />
            </fieldset>

            {/* Email input */}
            <fieldset className="flex items-center border-slate-300 p-1 transition-all duration-500 rounded-md ease-in-out hover:border-blue-500 border-2 mt-2">
              <legend className="pl-2 pr-2">Email Address*</legend>
              <EmailOutlinedIcon className="ml-1" />
              <input
                type="text"
                id="email" // Updated id
                name="email" // Updated name
                className="p-1 w-full focus:border-none focus:outline-none"
                onChange={handleInputChange} // Added onChange event
              />
            </fieldset>

            {/* Password input */}
            <fieldset className="flex items-center border-slate-300 p-1 transition-all duration-500 ease-in-out rounded-md hover:border-blue-500 border-2 mt-2">
              <legend className="pl-2 pr-2">Password</legend>
              <KeyIcon className="ml-1" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="p-1 w-full focus:border-none focus:outline-none"
                onChange={handleInputChange} // Added onChange event
              />
              <div className="flex items-center">
                <div className="cursor-pointer" onClick={handleTogglePassword}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
            </fieldset>

            {/* Confirm Password input */}
            <fieldset className="flex items-center border-slate-300 p-1 transition-all duration-500 ease-in-out rounded-md hover:border-blue-500 border-2 mt-2">
              <legend className="pl-2 pr-2">Confirm Password</legend>
              <KeyIcon className="ml-1" />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword" // Updated id
                name="confirmPassword" // Updated name
                className="p-1 w-full focus:border-none focus:outline-none"
                onChange={handleInputChange} // Added onChange event
              />
              <div className="flex items-center">
                <div className="cursor-pointer" onClick={handleTogglePassword}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
            </fieldset>

            {/* Agree to Terms checkbox */}
            <div className="flex items-center mt-4 ml-16">
              <input
                type="checkbox"
                id="agreedToTerms" // Updated id
                name="agreedToTerms" // Updated name
                className="mr-2"
                onChange={handleInputChange} // Added onChange event
              />
              <label
                htmlFor="agreedToTerms"
                className="text-sm text-gray-700 mr-2"
              >
                I Agree To the
              </label>
              <Link
                href="https://constructn.ai/terms-conditions/"
                className="text-orange-400"
              >
                Terms & Conditions
              </Link>
            </div>

            {/* Display validation errors */}
            <div>
              {formErrors.firstName && (
                <p className="text-red-500 ">{formErrors.firstName}</p>
              )}
              {!formErrors.firstName && formErrors.lastName && (
                <p className="text-red-500">{formErrors.lastName}</p>
              )}
              {!formErrors.firstName &&
                !formErrors.lastName &&
                formErrors.email && (
                  <p className="text-red-500">{formErrors.email}</p>
                )}
              {!formErrors.firstName &&
                !formErrors.lastName &&
                !formErrors.email &&
                formErrors.password && (
                  <p className="text-red-500">{formErrors.password}</p>
                )}
              {!formErrors.firstName &&
                !formErrors.lastName &&
                !formErrors.email &&
                !formErrors.password &&
                formErrors.confirmPassword && (
                  <p className="text-red-500">{formErrors.confirmPassword}</p>
                )}
              {!formErrors.firstName &&
                !formErrors.lastName &&
                !formErrors.email &&
                !formErrors.password &&
                !formErrors.confirmPassword &&
                formErrors.agreedToTerms && (
                  <p className="text-red-500">{formErrors.agreedToTerms}</p>
                )}
            </div>

            {/* Sign Up button */}
            <button
              style={{
                color: "white",
                backgroundImage: "linear-gradient(to right, #E17327, #AD3D6F)",
                padding: "10px",
                borderRadius: "10px",
              }}
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full"
            >
              Sign Up
            </button>

            <div className="flex items-center ml-28 mt-4">
              Existing User?
              <Link href={'/'} className="ml-1 text-orange-400"> Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
