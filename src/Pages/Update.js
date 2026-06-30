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
                    <h1 className="title">Update Profile</h1>
                    <h4 className="sub-title">
                        <span className="home">
                            <Link to="/"><span>Home</span></Link>
                        </span>
                        <span className="icon"><i className="fa-solid fa-angle-right"></i></span>
                        <span className="inner"><span>Update Profile</span></span>
                    </h4>
                </div>
            </div>
        </div>

        <div className="contact-section pt-16 pb-16">
            <div className="container mx-auto px-4">
                <div className="rounded-lg border border-gray-100 shadow-sm p-4 sm:p-6 max-w-3xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-5">Update Profile</h2>

                    <input
                        type="text"
                        hidden
                        id="customer_id"
                        name="customer_id"
                        value={customerdata.customer_id}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <h4 className="text-base font-medium text-gray-700 mb-1">User name</h4>
                            <input
                                type="text"
                                id="customer_name"
                                name="customer_name"
                                value={customerdata.customer_name}
                                onChange={handleChange}
                                className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>
                        <div>
                            <h4 className="text-base font-medium text-gray-700 mb-1">Email</h4>
                            <input
                                type="text"
                                id="customer_email"
                                name="customer_email"
                                value={customerdata.customer_email}
                                onChange={handleChange}
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
                                value={customerdata.customer_phone}
                                onChange={handleChange}
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
                                value={customerdata.customer_address}
                                onChange={handleChange}
                                className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row">
                        <button
                            id="submit"
                            type="submit"
                            onClick={handleSubmit}
                            className="rr-primary-btn rounded-md bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-base font-semibold transition w-full sm:w-auto"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}
export default Update;