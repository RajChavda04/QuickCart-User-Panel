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
            
        }).then((response)=>{
            if(response.data.message){
                Swal.fire({
                    title:'Success',
                     text: response.data.message,
                    icon:'success',
                confirmButtonText:"OK" 
            }).then(()=>{
                window.location="/Login"
            })
        
            }
            else{
                alert("inserted data");

            }
        })
            //alert(response.data.message);
            

    }
  return (
    <>
    
   
        <div class="login-area pt-100 pb-100">
            <div class="regcontainer">
                <div class="login-wrap text-center">
                    <h3 class="title">Create Your Account</h3>
                    {/* <a href="a" class="google-login"><img src="assets/img/icon/google.png" alt="google"/>Login with Google</a>
                    <span class="or-text">OR</span> */}
                    <div class="login-form">
                        <div class="form-item">
                            <h4 class="form-header">Your Name*</h4>
                            <input type="text" id="customer_name" name="customer_name"  class="form-control" placeholder=""/>
                        </div>
                        <div class="form-item">
                            <h4 class="form-header">Email Address*</h4>
                            <input type="email" id="customer_email" name="customer_email" class="form-control" placeholder=""/>
                        </div>
                        <div class="form-item">
                            <h4 class="form-header">Password*</h4>
                            <input type="text" id="customer_password" name="customer_password" class="form-control" placeholder=""/>
                        </div>
                        <div class="form-item">
                            <h4 class="form-header">Confirm Password*</h4>
                            <input type="text" id="customer_password2" name="customer_password2" class="form-control" placeholder=""/>
                        </div>
                        <div class="form-item">
                            <h4 class="form-header">Address*</h4>
                            <textarea name="customer_address" id="customer_address" rows={3} class="form-control"></textarea>
                            {/* <input type="text-area" id="customer_address" name="customer_address" class="form-control" placeholder=""/> */}
                        </div>
                        <div class="form-item">
                            <h4 class="form-header">Phone*</h4>
                            <input type="text" id="customer_phone" name="customer_phone" class="form-control" placeholder=""/>
                        </div>
                        <div class="form-item">
                           
                            <div class="checkbox-wrap">
                                <input type="checkbox" id="vehicle2" name="vehicle2" value="Bike"/>
                                <label for="vehicle2"> I accept the  <span>Terms / Privacy Policy</span></label>
                            </div>
                        </div>
                        <div class="submit-btn">
                            <button class="rr-primary-btn" onClick={uregister}   >Register</button>
                        </div>
                        <div class="login-btn-wrap">
                            <Link to='' class="forgot">Already have an account?</Link>
                            <Link to="/Login" class="log-in" >Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    </>
  )
}

export default Register
