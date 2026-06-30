import React from 'react'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import Axios from "axios"
import { useState } from "react";
import { API_BASE_URL } from '../config/apiConfig'
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    function ulogin() {
        //alert();
        const customer_email = document.getElementById("customer_email").value;
        const customer_password = document.getElementById("customer_password").value;
        if (!customer_email || !customer_password) {
            Swal.fire({
                title: 'Error',
                text: 'Both fields are required',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        Axios.post(`${API_BASE_URL}/userloginprocess`, {
            customer_email: customer_email,
            customer_password: customer_password

        }).then((response) => {
            if (response.data.message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Opps...',
                    text: response.data.message
                }).then(() => {
                    window.location = "/Login";
                })
            }
            else {
                const obj = {
                    customer_email: response.data[0].customer_email,
                    customer_id: response.data[0].customer_id
                };
                sessionStorage.setItem('mydata', JSON.stringify(obj));
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful',
                    text: `Welcome ${customer_email}`
                }).then(() => {
                    window.location = "/";
                })
            }
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-4">
            <div className="w-full max-w-md sm:max-w-lg">

                <div className="text-center mb-5 sm:mb-8">
                    <h3 className="text-xl sm:text-3xl font-bold text-gray-900">
                        Welcome back
                    </h3>
                    <p className="text-xs sm:text-base text-gray-500 mt-1 sm:mt-2">
                        Login to your account to continue
                    </p>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-100 p-5 sm:p-8">
                    <div className="mb-3 sm:mb-5 text-left">
                        <label htmlFor="customer_email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                            Email address
                        </label>
                        <input
                            type="text"
                            id="customer_email"
                            name="customer_email"
                            placeholder="you@example.com"
                            className="w-full text-sm sm:text-base border border-gray-200 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-3 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
                        />
                    </div>

                    <div className="mb-1 sm:mb-2 text-left">
                        <label htmlFor="customer_password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="customer_password"
                                name="customer_password"
                                placeholder="••••••••"
                                className="w-full text-sm sm:text-base border border-gray-200 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="text-right mb-4 sm:mb-6">
                        <Link to="/Forgot" className="text-xs sm:text-sm text-gray-500 hover:text-red-500 transition">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        onClick={ulogin}
                        className="w-full rounded-md sm:rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition shadow-sm"
                    >
                        Login Account
                    </button>

                    <p className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                        Don't have an account?{" "}
                        <Link to="/Register" className="font-semibold text-red-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Login

