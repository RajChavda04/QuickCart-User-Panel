import React,{useEffect,useState} from 'react'
import {Link} from "react-router-dom"
import Swal from "sweetalert2"
import Axios from 'axios'
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig'

 function Update() {
   
    const location = useLocation();
     const customer_id = location.state?.customer_id;
   
           
            const [customerdata, setcustomerdata] = useState({
                customer_id: '',
                customer_name: '',
                customer_email: '',
                customer_phone: '',
                customer_address: '',
            });

            const handleChange = (e) => {
                const { name, value } = e.target;
                setcustomerdata(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            };
            const handleSubmit = (e) => {
                e.preventDefault();
                const formData = new FormData();
              
                formData.append('customer_id', customerdata.customer_id);
                formData.append('customer_name', customerdata.customer_name);
                formData.append('customer_phone', customerdata.customer_phone);
                formData.append('customer_address', customerdata.customer_address);
               
                formData.append('customer_email', customerdata.customer_email);

              
            
              Axios.post(`${API_BASE_URL}/customerdataupdate`, formData,{
            
              }).then(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Updated!',
                  text: 'Your data updated successfully!'
                });
              }).then(()=>{
                window.location="/UserProfile"
            }).catch((error) => {
              console.error("Error during the update:", error);
              Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'There was an issue updating the user data!',
              });
            });
            };
        
            useEffect(() => {
                if (customer_id) {
        
                    Axios.post(`${API_BASE_URL}/usercheckout`, { customer_id: customer_id })
                        .then((response) => {
                            setcustomerdata(response.data[0]);
                           
                        })
                        .catch((error) => {
                            console.error("There was an error fatching the data!", error);
                        });
                }
            }, [customer_id]);
  return (

    <>

     <div class="mobile-side-menu">
                <div class="side-menu-content">
                    <div class="side-menu-head">
                        <a href='index.html'><img src="assets/img/logo/logo-1.png" alt="logo" /></a>
                        <button class="mobile-side-menu-close"><i class="fa-regular fa-xmark"></i></button>
                    </div>
                    <div class="side-menu-wrap"></div>
                    
                </div>
            </div>


            <div class="page-header">
                <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape" /></div>
                <div class="container">
                    <div class="page-header-content">
                        <h1 class="title">Update Profile</h1>
                        <h4 class="sub-title">
                            <span class="home">
                                <Link to="/">
                                    <span>Home</span>
                                </Link>
                            </span>
                            <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
                            <span class="inner">
                                <span>Update Profile</span>
                            </span>
                        </h4>
                    </div>
                </div>
            </div>

            

            <div class="contact-section pt-100 pb-100">
                <div class="container">
                    <div class="row contact-wrap">
                        <div class="col-lg-8 col-md-12">
                            <div class="blog-contact-form form-2">
                          
                         
                                <div class="request-form" >
                                    <h2 class="form-title">Update Profile</h2>
                                    <div id="ajax_contact" class="form-horizontal" >
                                        <div class="form-group row">
                                            
                                               
                                            
                                                    <input type="text" hidden id="customer_id" name="customer_id" value={customerdata.customer_id} onChange={handleChange} class="form-control"  placeholder="" />
                                               
                                           
                                            <div class="col-md-6">
                                                <div class="form-item">
                                                    <h4 class="form-header">User name</h4>
                                                    <input type="text" id="customer_name" name="customer_name" value={customerdata.customer_name} onChange={handleChange} class="form-control"  placeholder="" />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-item">
                                                    <h4 class="form-header">Email</h4>
                                                    <input type="text" id="customer_email" name="customer_email" value={customerdata.customer_email} onChange={handleChange} class="form-control"  placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-item">
                                                <h4 class="form-header">Phone Number</h4>
                                                <input type="text" id="customer_phone" name="customer_phone" value={customerdata.customer_phone} onChange={handleChange} class="form-control"  placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-md-6">
                                            <div class="form-item message-item">
                                                <h4 class="form-header">Address</h4>
                                                <textarea id="customer_address" name="customer_address" cols="10"  onChange={handleChange} value={customerdata.customer_address} rows="3" class="form-control address"  placeholder=""></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="submit-btn">
                                     <button id="submit" class="rr-primary-btn"  type="submit" onClick={handleSubmit} >Submit</button>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>

                </div>
            </div>
 
      
    </>
  )
}
export default Update;