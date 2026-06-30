import React from 'react'
import Swal from 'sweetalert2';
import Axios from "axios";
import { API_BASE_URL } from '../config/apiConfig'

 function Changepass() {

    const usersession = sessionStorage.getItem('mydata');
   function changepass() {



      const parsedata = JSON.parse(usersession)
      const current_password = document.getElementById('current_password').value;

      const new_password = document.getElementById('new_password').value;
      const con_password = document.getElementById('con_password').value;

      if (new_password !== con_password) {
         Swal.fire({
            title: 'Error',
            text: 'Write same password',
            icon: 'error',
            confirmButtonText: 'OK'
         });
         return;
      }
      Axios.post(`${API_BASE_URL}/passchangeuser`, {
         customer_email: parsedata.customer_email,
         current_password: current_password,
         new_password: new_password,


      }).then((response) => {
         if (response.data.message) {
            // alert(response.data.message);
            Swal.fire({
               icon: 'success',
               title: 'sucess',
               text: response.data.message,
               confrimButtonText: 'OK'


            })
            window.location = "/Login";
         } else {
            alert("Password updated successfully");
            window.location = "/Login"
         }
      }).catch((error) => {
         console.error("There was an error making the response:", error);
         alert('An error occured.Please try again later.');
      });





   }
return (
    <>
        <div className="login-area pt-16 pb-16">
            <div className="logcontainer mx-auto px-4">
                <div className="login-wrap text-center max-w-md mx-auto">

                    <h3 className="title text-2xl font-semibold text-gray-800 mb-6">Change Password</h3>

                    <div className="login-form rounded-lg border border-gray-100 shadow-sm p-4 sm:p-6">
                        <div className="text-left mb-4">
                            <h4 className="text-base font-medium text-gray-700 mb-1">Current Password</h4>
                            <input
                                type="password"
                                id="current_password"
                                name="current_password"
                                className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>

                        <div className="text-left mb-4">
                            <h4 className="text-base font-medium text-gray-700 mb-1">New Password*</h4>
                            <input
                                type="password"
                                id="new_password"
                                name="new_password"
                                className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>

                        <div className="text-left mb-6">
                            <h4 className="text-base font-medium text-gray-700 mb-1">Confirm Password*</h4>
                            <input
                                type="password"
                                id="con_password"
                                name="con_password"
                                className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>

                        <div className="submit-btn">
                            <button
                                className="rr-primary-btn w-full rounded-md bg-red-500 hover:bg-red-600 text-white py-3 text-base font-semibold transition"
                                onClick={changepass}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}
export default Changepass