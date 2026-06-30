import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig'
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
            Axios.post(`${API_BASE_URL}/usercheckout`, { customer_id: user.customer_id })
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
        <div className="mobile-side-menu">
            <div className="side-menu-content">
                <div className="side-menu-head">
                    <a href='index.html'><img src="assets/img/logo/logo-1.png" alt="logo" /></a>
                    <button className="mobile-side-menu-close"><i className="fa-regular fa-xmark"></i></button>
                </div>
                <div className="side-menu-wrap"></div>
            </div>
        </div>

        <div className="page-header">
            <div className="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape" /></div>
            <div className="container">
                <div className="page-header-content">
                    <h1 className="title">User Profile</h1>
                    <h4 className="sub-title">
                        <span className="home">
                            <Link to="/"><span>Home</span></Link>
                        </span>
                        <span className="icon"><i className="fa-solid fa-angle-right"></i></span>
                        <span className="inner"><span>User Profile</span></span>
                    </h4>
                </div>
            </div>
        </div>

        <div className="contact-section pt-16 pb-16">
            <div className="container mx-auto px-4">
                {list && list.length > 0 ? (
                    list.map((val, index) => (
                        <div key={index} className="rounded-lg border border-gray-100 shadow-sm p-4 sm:p-6 max-w-3xl">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-5">Profile</h2>

                            <input type="text" hidden id="customer_id" name="customer_id" value={val.customer_id} readOnly />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h4 className="text-base font-medium text-gray-700 mb-1">User name</h4>
                                    <input
                                        type="text"
                                        id="customer_name"
                                        name="customer_name"
                                        defaultValue={val.customer_name}
                                        className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-base font-medium text-gray-700 mb-1">Email</h4>
                                    <input
                                        type="text"
                                        id="customer_email"
                                        name="customer_email"
                                        defaultValue={val.customer_email}
                                        className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h4 className="text-base font-medium text-gray-700 mb-1">Phone Number</h4>
                                    <input
                                        type="text"
                                        id="customer_phone"
                                        name="customer_phone"
                                        defaultValue={val.customer_phone}
                                        className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h4 className="text-base font-medium text-gray-700 mb-1">Address</h4>
                                    <textarea
                                        id="customer_address"
                                        name="customer_address"
                                        rows="3"
                                        defaultValue={val.customer_address}
                                        className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    to="/update"
                                    state={{ customer_id: val.customer_id }}
                                    className="rr-primary-btn text-center rounded-md bg-red-500 hover:bg-red-600 text-white px-5 py-3 text-base font-semibold transition"
                                >
                                    Update Profile
                                </Link>
                                <Link
                                    to="/Changepass"
                                    className="rr-primary-btn text-center rounded-md bg-red-500 hover:bg-red-600 text-white px-5 py-3 text-base font-semibold transition"
                                >
                                    Change Password
                                </Link>
                                <Link
                                    className="rr-primary-btn text-center rounded-md bg-red-500 hover:bg-red-600 text-white px-5 py-3 text-base font-semibold transition cursor-pointer"
                                    onClick={logout}
                                >
                                    Log out
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 text-lg py-12">
                        Login first to view your profile
                    </div>
                )}
            </div>
        </div>
    </>
)
}
export default Userprofile;
