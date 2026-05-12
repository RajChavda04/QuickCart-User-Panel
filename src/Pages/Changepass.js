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
       <div class="login-area pt-100 pb-100">
                <div class="logcontainer">

                    <div class="login-wrap text-center">

                        <h3 class="title">Change Password</h3>
                        
                        <div class="login-form">
                            <div class="form-item">
                                <h4 class="form-header">Current Password</h4>
                                <input type="password" id="current_password" name="current_password" class="form-control" placeholder="" />
                            </div>
                            <div class="form-item">
                                <h4 class="form-header">New Password*</h4>
                                <input type="password" id="new_password" name="new_password" class="form-control" placeholder="" />
                            </div>
                            <div class="form-item">
                                <h4 class="form-header">Confirm Password*</h4>
                                <input type="password" id="con_password" name="con_password" class="form-control" placeholder="" />
                            </div>
    
                           
                            <div class="submit-btn">
                            
                                <button class="rr-primary-btn" onClick={changepass} >Submit</button>
                         
                            </div>
                             
                            
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
export default Changepass