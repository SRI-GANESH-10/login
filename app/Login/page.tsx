"use client";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCallback } from "react";
import { storeTokensInCookie } from '../comp/cookie';



export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const router = useRouter();
  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSignIn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "https://api.dev2.constructn.ai/api/v1/users/signin",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.data) {
          if (response.status === 401) {
            console.log("Invalid credentials");
            setLoginError(true);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        const user = response.data;
        const{token , refreshToken} = user.result
        storeTokensInCookie(user.result.token, user.result.refreshToken);


        console.log("Token:", token);
        console.log("Refresh Token:", refreshToken);

        if (user && user.result.email === email) {
          console.log("User info:", user);
          router.push("/Products");
        } else {
          setLoginError(true);
        }
      } catch (error) {
         setLoginError(true);
      }
    },
    [email, password, router]
  );

  return (
    <main
      style={{
        width: "70%",
        backgroundImage:
          'url("https://app.constructn.ai/_next/static/media/Illustration.a0ccf67c.svg")',
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "720px",
        minWidth: "100%",
      }}
    >
      <div className="absolute top-[0%] left-[70%] right-0 bg-white flex items-center justify-center p-8 pt-36 pb-44 border-l-2 border-slate-300 shadow-left">
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
            <h1 className="text-2xl mb-4 mt-2 font-semibold">SignIn</h1>
          </div>
          <form className="mt-6" onSubmit={handleSignIn}>
            
            {/*//! Username input */}
            <fieldset className="flex items-center border-slate-300 p-1 transition-all duration-500 rounded-md ease-in-out hover:border-blue-500 border-2 ">
              <legend className="pl-2 pr-2">Email Address*</legend>
              <EmailOutlinedIcon className="ml-1" />
              <input
                type="text"
                id="username"
                name="username"
                className="p-1 w-full focus:border-none focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            {/*//! Password input */}
            <fieldset className="flex items-center border-slate-300 p-1 transition-all duration-500 ease-in-out rounded-md hover:border-blue-500 border-2 mt-6">
              <legend className="pl-2 pr-2">Password*</legend>

              <KeyIcon className="ml-1" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="p-1 w-full focus:border-none focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex items-center">
                <div className="cursor-pointer" onClick={handleTogglePassword}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
            </fieldset>

            {loginError && (
              <div className="text-red-500 mt-1">Invalid email or password</div>
            )}
            {/* //!Remember me checkbox */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* //!Login button */}
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
              Sign In
            </button> 
            <div className="flex items-center ml-32 mt-4">
              <h2>New User? </h2>
              <Link href="/Signup" className="text-orange-500 ml-1">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

//! https://api.dev2.constructn.ai/api/v1/users/signin
