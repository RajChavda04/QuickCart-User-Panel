import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
// import Swal from 'sweetalert2'
// import { useLocation } from 'react-router-dom';

function Userprofile() {

    const [list, setList] = useState([]);
    const userSession = sessionStorage.getItem('mydata');
    const user = userSession ? JSON.parse(userSession) : null;
    const customerId = user?.customer_id;

    function logout() {
        sessionStorage.clear();
        window.location = "/Login"
    }

    useEffect(() => {
        if (user) {
            Axios.post('http://localhost:1337/api/usercheckout', { customer_id: user.customer_id })
                .then((response) => {

                    setList(response.data);




                })
                .catch((error) => {
                    console.error("Error fetching Product data!", error);
                });
        }
    }, [user]);

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
                        <h1 class="title">User Profile</h1>
                        <h4 class="sub-title">
                            <span class="home">
                                <Link to="/">
                                    <span>Home</span>
                                </Link>
                            </span>
                            <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
                            <span class="inner">
                                <span>User Profile</span>
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
                                {list && list.length > 0 ? (
                                    list.map((val, index) => (

                                        <div class="request-form" key={index}  >
                                            <h2 class="form-title">Profile</h2>
                                            <div id="ajax_contact" class="form-horizontal" >
                                                <div class="form-group row">



                                                    <input type="text" hidden id="customer_id" name="customer_id" value={val.customer_id} class="form-control" placeholder="" />


                                                    <div class="col-md-6">
                                                        <div class="form-item">
                                                            <h4 class="form-header">User name</h4>
                                                            <input type="text" id="customer_name" name="customer_name" value={val.customer_name} class="form-control" placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-item">
                                                            <h4 class="form-header">Email</h4>
                                                            <input type="text" id="customer_email" name="customer_email" value={val.customer_email} class="form-control" placeholder="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-item">
                                                        <h4 class="form-header">Phone Number</h4>
                                                        <input type="text" id="customer_phone" name="customer_phone" value={val.customer_phone} class="form-control" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-md-6">
                                                    <div class="form-item ">
                                                        <h4 class="form-header">Address</h4>
                                                        <textarea id="customer_address" name="customer_address" cols="20" value={val.customer_address} rows="3" class="form-control address" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="raj123">
                                                <div class="submit-btn">
                                                    <Link to="/update" id="submit" class="rr-primary-btn" state={{ customer_id: val.customer_id }} >Update Profile</Link>
                                                </div>
                                                <div class="submit-btn">
                                                    <Link to="/Changepass" id="submit" class="rr-primary-btn">Change Password</Link>
                                                </div>
                                                <div class="submit-btn">
                                                    <Link  class="rr-primary-btn" onClick={logout}>Log out</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12 text-center">
                                        <h2>No products available.</h2>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                </div>
            </div>



        </>
    )
}
export default Userprofile;
