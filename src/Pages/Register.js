import React from 'react'
import {Link} from 'react-router-dom';
import Swal from "sweetalert2";
import Axois from "axios";
import { API_BASE_URL } from '../config/apiConfig'

const Register = () => {
   
     function uregister(){
        var customer_name = document.getElementById("customer_name").value;
        var customer_email = document.getElementById("customer_email").value;
        var customer_password = document.getElementById("customer_password").value;
        var customer_password2 = document.getElementById("customer_password2").value;
        var customer_address = document.getElementById("customer_address").value;
        var customer_phone = document.getElementById("customer_phone").value;

        if(!customer_name || !customer_email || ! customer_password || !customer_address || !customer_phone ||!customer_password2){
            Swal.fire({
                title:'Error',
                text:'All feilds are required',
                icon:'error',
                confirmButtonText:'OK'
            });
            return;
        }
         // on change event for name
         const pattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    
         if(!pattern.test(customer_name)){
            Swal.fire({
                title:'Error',
                text:'Please enter valid name',
                icon:'error',
                confirmButtonText:'OK'
            });
            return;
         }
         // on change event for number
         const pattern2= /^[6-9]\d{9}$/;
     
         if(!pattern2.test(customer_phone)){
            Swal.fire({
                title:'Error',
                text:'Please enter valid number',
                icon:'error',
                confirmButtonText:'OK'
            });
            return;
         }
         if(customer_password!== customer_password2){
            Swal.fire({
                title:'Error',
                text:'Please same password',
                icon:'error',
                confirmButtonText:'OK'
            });
            return;
           
        }

        
        Axois.post(`${API_BASE_URL}/userregister`,{
            customer_name: customer_name,
            customer_address: customer_address,
            customer_email : customer_email,
            customer_password : customer_password,
            customer_phone : customer_phone
        })
        .then((response) => {
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location = "/Login";
            });
        })
        .catch((error) => {
            const message = error?.response?.data?.message || 'Registration failed';
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
            //alert(response.data.message);
            

    }
//   return (
//     <>
//         <div class="login-area pt-100 pb-100">
//             <div class="regcontainer">
//                 <div class="login-wrap text-center">
//                     <h3 class="title">Create Your Account</h3>
//                     {/* <a href="a" class="google-login"><img src="assets/img/icon/google.png" alt="google"/>Login with Google</a>
//                     <span class="or-text">OR</span> */}
//                     <div class="login-form">
//                         <div class="form-item">
//                             <h4 class="form-header">Your Name*</h4>
//                             <input type="text" id="customer_name" name="customer_name"  class="form-control" placeholder=""/>
//                         </div>
//                         <div class="form-item">
//                             <h4 class="form-header">Email Address*</h4>
//                             <input type="email" id="customer_email" name="customer_email" class="form-control" placeholder=""/>
//                         </div>
//                         <div class="form-item">
//                             <h4 class="form-header">Password*</h4>
//                             <input type="text" id="customer_password" name="customer_password" class="form-control" placeholder=""/>
//                         </div>
//                         <div class="form-item">
//                             <h4 class="form-header">Confirm Password*</h4>
//                             <input type="text" id="customer_password2" name="customer_password2" class="form-control" placeholder=""/>
//                         </div>
//                         <div class="form-item">
//                             <h4 class="form-header">Address*</h4>
//                             <textarea name="customer_address" id="customer_address" rows={3} class="form-control"></textarea>
//                             {/* <input type="text-area" id="customer_address" name="customer_address" class="form-control" placeholder=""/> */}
//                         </div>
//                         <div class="form-item">
//                             <h4 class="form-header">Phone*</h4>
//                             <input type="text" id="customer_phone" name="customer_phone" class="form-control" placeholder=""/>
//                         </div>
//                         <div class="form-item">
                           
//                             <div class="checkbox-wrap">
//                                 <input type="checkbox" id="vehicle2" name="vehicle2" value="Bike"/>
//                                 <label for="vehicle2"> I accept the  <span>Terms / Privacy Policy</span></label>
//                             </div>
//                         </div>
//                         <div class="submit-btn">
//                             <button class="rr-primary-btn" onClick={uregister}   >Register</button>
//                         </div>
//                         <div class="login-btn-wrap">
//                             <Link to='' class="forgot">Already have an account?</Link>
//                             <Link to="/Login" class="log-in" >Log in</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
   
//     </>
//   )
return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-6 sm:py-8">
            <div className="w-full max-w-xl">

                <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Create your account
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Sign up to start shopping with us
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">

                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="text-left">
                            <label htmlFor="customer_name" className="block text-xs font-medium text-gray-700 mb-1">
                                Your Name*
                            </label>
                            <input
                                type="text"
                                id="customer_name"
                                name="customer_name"
                                placeholder="John Doe"
                                className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
                            />
                        </div>
                        <div className="text-left">
                            <label htmlFor="customer_email" className="block text-xs font-medium text-gray-700 mb-1">
                                Email Address*
                            </label>
                            <input
                                type="email"
                                id="customer_email"
                                name="customer_email"
                                placeholder="you@example.com"
                                className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="text-left">
                            <label htmlFor="customer_password" className="block text-xs font-medium text-gray-700 mb-1">
                                Password*
                            </label>
                            <input
                                type="password"
                                id="customer_password"
                                name="customer_password"
                                placeholder="••••••••"
                                className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
                            />
                        </div>
                        <div className="text-left">
                            <label htmlFor="customer_password2" className="block text-xs font-medium text-gray-700 mb-1">
                                Confirm Password*
                            </label>
                            <input
                                type="password"
                                id="customer_password2"
                                name="customer_password2"
                                placeholder="••••••••"
                                className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
                            />
                        </div>
                    </div>

                    <div className="mb-3 text-left">
                        <label htmlFor="customer_address" className="block text-xs font-medium text-gray-700 mb-1">
                            Address*
                        </label>
                        <textarea
                            name="customer_address"
                            id="customer_address"
                            rows={2}
                            className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
                        ></textarea>
                    </div>

                    <div className="mb-3 text-left">
                        <label htmlFor="customer_phone" className="block text-xs font-medium text-gray-700 mb-1">
                            Phone*
                        </label>
                        <input
                            type="text"
                            id="customer_phone"
                            name="customer_phone"
                            placeholder="9876543210"
                            className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
                        />
                    </div>

                    <div className="flex items-start gap-2 mb-4 text-left">
                        <input
                            type="checkbox"
                            id="vehicle2"
                            name="vehicle2"
                            value="Bike"
                            className="w-4 h-4 mt-0.5 cursor-pointer accent-red-500"
                        />
                        <label htmlFor="vehicle2" className="text-xs text-gray-600 cursor-pointer">
                            I accept the <span className="font-medium text-gray-800">Terms / Privacy Policy</span>
                        </label>
                    </div>

                    <button
                        onClick={uregister}
                        className="w-full rounded-md bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-2.5 text-sm font-semibold transition shadow-sm"
                    >
                        Register
                    </button>

                    <p className="text-center text-md text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link to="/Login" className="font-semibold text-red-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    </>
)
}

export default Register
