import React from 'react'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import Axios from "axios"

const Login = () => {
   
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
        Axios.post("http://localhost:1337/api/userloginprocess", {
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
                          customer_id : response.data[0].customer_id
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
        <>


            <div class="login-area pt-100 pb-100">
                <div class="logcontainer">

                    <div class="login-wrap text-center">

                        <h3 class="title">Login Into Your Account</h3>
                        {/* <a href="a" class="google-login"><img src="assets/img/icon/google.png" alt="google" />Login with Google</a>
                        <span class="or-text">OR</span> */}
                        <div class="login-form">
                            <div class="form-item">
                                <h4 class="form-header">Email address</h4>
                                <input type="text" id="customer_email" name="customer_email" class="form-control" placeholder="" />
                            </div>
                            <div class="form-item">
                                <h4 class="form-header">Password*</h4>
                                <input type="text" id="customer_password" name="customer_password" class="form-control" placeholder="" />
                            </div>
                            <div class="form-item">
                                    
                                <div class="my123456">
                                    
                                    <label for="vehicle1"><Link to="/Forgot">Forgot Password?</Link> </label>
                                    {/* <label for="vehicle1"><Link to="/Changepass">Change password</Link> </label> */}
                                    
                                </div>
                               
                                    
                                   
                            </div>
                           
                            <div class="submit-btn">
                            
                                <button class="rr-primary-btn" onClick={ulogin}>Login Account</button>
                         
                            </div>
                             
                            <div class="loginline">
                                <span class="forgot">if you haven't account?</span>
                                <span><Link to="/Register" class="log-in">Register</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login

