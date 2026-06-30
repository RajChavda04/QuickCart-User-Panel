import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import Swal from 'sweetalert2'
import { API_BASE_URL, MEDIA_BASE_URL } from '../config/apiConfig'

 function Checkout2() {
    const [list, setList] = useState([]);
    const [list1, setList1] = useState([]);

    const userSession = sessionStorage.getItem('mydata');
    const user = userSession ? JSON.parse(userSession) : null;
    const customerId = user?.customer_id;
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const Navigate = useNavigate();




    const countryData = {
        India: {
            states: {
                Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
                Karnataka: ['Bangalore', 'Mysore', 'Hubli'],
                Gujarat: ['Vadodara', 'Surat', 'Ahemdabad', 'Rajkot', 'Bhavanagar', 'Navsari'],
                Rajasthan: ['Jaipur', 'Udaipur', 'Jaisalmer'],
                Keral: ['Tiruvantampuram', 'Kochi', 'Kannur'],
                Odisha: ['Puri', 'Bhubanesvar', 'Cuttack', 'Balasore']
            },
        },

        USA: {
            states: {
                California: ['Los Angeles', 'San Francisco', 'San Diego'],
                Texas: ['Houston', 'Dallas', 'Austin'],
            },
        },
    }


    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        const stateList = countryData[country]?.states || {};
        setStates(Object.keys(stateList));
        setCities([]);
        setSelectedState('');
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        const cityList = countryData[selectedCountry]?.states[state] || [];
        setCities(cityList);
    };

    const pattern = /^\d{6}$/;

    function usercheckout() {
        const customer_pincode = document.getElementById("customer_pincode").value;

        if (!customer_pincode) {
            Swal.fire({
                title: 'Error',
                text: 'Please enter Pincode',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }


        if (!pattern.test(customer_pincode)) {

            Swal.fire({
                title: 'Error',
                text: 'Please enter valid Pincode',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        } else {
            window.location = "/Checkout2"
        }

    }

    useEffect(() => {
        if (!customerId) return;
            Axios.post(`${API_BASE_URL}/usercheckout`, { customer_id: customerId })
                .then((response) => {
                    setList(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching Product data!", error);
                });
    }, [customerId]);



    useEffect(() => {
        if (!customerId) return;
            Axios.post(`${API_BASE_URL}/showcheckout`, { customer_id: customerId })
                .then((response) => {
                    setList1(response.data);
                    calculateTotalPrice(response.data);
                    calculateTotalPriceWithShipping(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching Product data!", error);
                });
    }, [customerId]);

    // Function to calculate total price
    const calculateTotalPrice = (products) => {
        let total = 0;
        products.forEach((product) => {
            total += product.product_price * product.product_quantity;
        });

        setTotalPrice(total);
    };

    const calculateTotalPriceWithShipping = (products) => {
        var Finaltotal = 0;


        products.forEach((product) => {
            Finaltotal += product.product_price * product.product_quantity;
        });

        // Add shipping cost to the total
        Finaltotal += 50;

        // Set the calculated total price
        setFinalPrice(Finaltotal);
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);
            const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
            if (existingScript) {
                existingScript.addEventListener('load', () => resolve(true));
                existingScript.addEventListener('error', () => resolve(false));
                return;
            }
            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };


    const handlerezorpay = async () => {
        //alert();

            

        const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    if (!selectedShipping) {
        Swal.fire({
            icon: 'warning',
            title: 'No Payment Option Selected',
            text: 'Please select a payment method before placing your order!',
        });
        return;
    }
    const payment_method = selectedShipping.id === "cod_option" ? "Cash on Delivery" : "Razorpay";

        const customer_name = document.getElementById("customer_name").value;
        //alert(customer_name);
        const customer_phone = document.getElementById("customer_phone").value;
        // alert(customer_phone)
        const customer_email = document.getElementById("customer_email").value;
        // alert(customer_email)
        const customer_country = document.getElementById("customer_country").value;
        // alert(customer_country)
        const customer_state = document.getElementById("customer_state").value;
        // alert(customer_state)
        const customer_city = document.getElementById("customer_city").value;
        // alert(customer_city)
        const customer_pincode = document.getElementById("customer_pincode").value;
        // alert(customer_pincode)
        const customer_address = document.getElementById("customer_address").value;
        // alert(customer_address)

        const total_amt = document.getElementById("total_amt").value;
        // alert(total_amt);
        const scriptLoaded = await loadRazorpayScript();
        // alert(amount);

 if (payment_method === "Razorpay"){
    // const scripLoaded =await loadRazorpayScript();
 
        if (!scriptLoaded) {
            alert("failed to load");
            return;
        }
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            amount: total_amt * 100,
            currency: 'INR',
            name: 'Quick Cart',
            description: 'Shopping',
            image: '',
            order_id: '',
            handler: function (response) {
                const data = {
                    customer_id: customerId,
                    customer_name: customer_name,
                    customer_phone: customer_phone,
                    customer_email: customer_email,
                    customer_country: customer_country,
                    customer_state: customer_state,
                    customer_city: customer_city,
                    customer_pincode: customer_pincode,
                    total_amt: total_amt,
                    customer_address: customer_address,
                    payment_method: payment_method,
                };

                Axios.post(`${API_BASE_URL}/pay`, data)
                    .then((res) => {
                        // alert('payment successfully');
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful',
                            text: res.data.message,
                        })
                        localStorage.removeItem("cartItems");
                        setTimeout(() => {  Navigate("/Order");  }, 2000);
                    })
                    .catch((error) => {
                        alert("Payment successfully, but there was an error processing the order")
                    })

               
            },
            prefill: {
                name: 'Raj',
                email: process.env.REACT_APP_RAZORPAY_EMAIL,
                contact: process.env.REACT_APP_RAZORPAY_CONTACT,
            },
            notes: {
                address: 'corporate office',
            },
            theme:
            {
                color: '#F37254',
            },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
        razorpay.on('payment failed', function (response) {
            alert('payment failed');
            console.log(response.error);
        });

    }else {
        // If COD, just store the data directly
        const data = {
            customer_id: customerId,
            customer_name,
            customer_phone,
            customer_email,
            customer_country,
            customer_state,
            customer_city,
            customer_pincode,
            total_amt,
            customer_address,
            payment_method,
        };

        Axios.post(`${API_BASE_URL}/pay`, data)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully',
                    text: res.data.message,
                });
            localStorage.removeItem("cartItems");
             setTimeout(() => {  Navigate("/Order");  }, 2000);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Saving Order',
                    text: 'Please try again later.',
                });
            });
    }
    };
    
   


    // return (
    //     <>
    //         <section class="checkout-section pt-100 pb-100">
    //             <div class="container">

    //                 <div class="row">
    //                     <div class="col-lg-6 col-md-12">
    //                         <div class="checkout-left">
    //                             <h3 class="form-header">Billing Details</h3>
    //                             <div class="order-box">
    //                                 <div >
    //                                 {list && list.length > 0 ? (
    //                                         list.map((val, index2) => (
    //                                     <div class="checkout-form-wrap">

    //                                         <div class="form-group row"key={index2} >
    //                                         <input type="text" hidden id="customer_id" name="customer_id" value={val.customer_id} class="form-control" />
    //                                             <div class="col-md-6">
    //                                                 <div class="form-item name">
    //                                                     <h4 class="form-title">Customer Name*</h4>
    //                                                     <input type="text" id="customer_name" name="customer_name" value={val.customer_name} class="form-control" />
    //                                                 </div>
    //                                             </div>
    //                                             <div class="col-md-6">
    //                                                 <div class="form-item">
    //                                                     <h4 class="form-title">Email*</h4>
    //                                                     <input type="email" id="customer_email" name="customer_email" value={val.customer_email} class="form-control" />
    //                                                 </div>
    //                                             </div>
    //                                         </div>

                    
    //                                         <div class="form-group row">
    //                                             <div class="col-md-12">
    //                                                 <div class="form-item ">
    //                                                     <h4 class="form-title">Address*</h4>
                                
    //                                                     <textarea  cols="30" rows="2" id="customer_address" name="customer_address" value={val.customer_address}
    //                                                         class="form-control address"></textarea>

    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                         <div class="form-group row">
    //                                             <div class="col-md-12">
    //                                                 <div class="form-item">
    //                                                     <h4 class="form-title">Country </h4>
    //                                                     <select autocomplete="off" id="customer_country" name="customer_country" class="form-control" value={selectedCountry} onChange={handleCountryChange} >
    //                                                                 <option hidden value="">Select Country</option>
    //                                                                 {Object.keys(countryData).map((country) => (
    //                                                                     <option key={country} value={country}>
    //                                                                         {country}
    //                                                                     </option>
    //                                                                 ))}
    //                                                             </select>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
                                            
    //                                         <div class="form-group row">
    //                                                     <div class="col-md-12">
    //                                                         <div class="form-item">
    //                                                             <h4 class="form-title">State*</h4>
    //                                                             {/* <input type="text" id="town" name="town" class="form-control" /> */}
    //                                                             <select autocomplete="off" class="form-control" id="customer_state" value={selectedState} onChange={handleStateChange} >
    //                                                                 <option value="">Select State</option>
    //                                                                 {states.map((state) => (
    //                                                                     <option key={state} value={state}>
    //                                                                         {state}
    //                                                                     </option>
    //                                                                 ))}

    //                                                             </select>

    //                                                         </div>
    //                                                     </div>
    //                                                 </div>

    //                                                 <div class="form-group row">
    //                                                     <div class="col-md-12">
    //                                                         <div class="form-item">
    //                                                             <h4 class="form-title">Town / City*</h4>
    //                                                             {/* <input type="text" id="town" name="town" class="form-control" /> */}
    //                                                             <select autocomplete="off" class="form-control" id="customer_city" name="customer_city" >
    //                                                                 <option value="">Select City</option>
    //                                                                 {cities.map((city) => (
    //                                                                     <option key={city} value={city}>
    //                                                                         {city}
    //                                                                     </option>
    //                                                                 ))}

    //                                                             </select>

    //                                                         </div>
    //                                                     </div>
    //                                                 </div>

    //                                         <div class="form-group row">
    //                                             <div class="col-md-12">
    //                                                 <div class="form-item">
    //                                                     <h4 class="form-title">Pin Code*</h4>
    //                                                     <input type="text" id="customer_pincode" name="customer_pincode" class="form-control" />
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                         <div class="form-group row">
    //                                             <div class="col-md-12">
    //                                                 <div class="form-item">
    //                                                     <h4 class="form-title">Phone*</h4>
    //                                                     <input type="text" id="customer_phone" name="customer_phone" value={val.customer_phone} class="form-control" />
    //                                                 </div>
    //                                             </div>
    //                                         </div>

    //                                     </div>
    //                                         ))
    //                                     ) : (
    //                                         <div className="col-12 text-center">
    //                                             <h2>No User data available.</h2>
    //                                         </div>
    //                                     )}
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div class="col-lg-6 col-md-12">
    //                         <div class="checkout-right">
    //                             <h3 class="form-header">Your Order</h3>
    //                             <div class="order-box">
    //                                 <div class="order-items">
    //                                     <div class="order-item item-1">
    //                                         <div class="order-left">
    //                                             <span class="product">Product</span>
                                                
    //                                         </div>
    //                                         <div class="order-right">
    //                                             <span class="price">Price</span>
    //                                         </div>
    //                                     </div>
    //                                     {list1 && list1.length > 0 ? (
    //                                         list1.map((val, index) => (
    //                                     <div class="order-item" key={index}>
    //                                         <div class="order-left">
    //                                             <div class="order-img"><img src={`${MEDIA_BASE_URL}/${val.product_image}`} alt="img" />
    //                                             </div>
    //                                         </div>
    //                                         <div class="order-right">
    //                                             <div class="content">
    //                                                 <span class="category">{val.category_name}</span>
    //                                                 <h4 class="title">{val.product_name}</h4>
    //                                                 <span class="price">Qty:{val.product_quantity}</span>
    //                                             </div>
    //                                             <span class="price">₹{val.product_price * val.product_quantity}</span>
    //                                         </div>
    //                                     </div>
    //                                          ))
    //                                         ) : (
    //                                             <div className="col-12 text-center">
    //                                                 <h2>No products available.</h2>
    //                                             </div>
    //                                         )}


    //                                     <div class="order-item item-1">
    //                                         <div class="order-left">
    //                                             <span class="left-title">Subtotal:</span>
    //                                         </div>
    //                                         <div class="order-right">
    //                                             <span class="right-title">₹{totalPrice}</span>
    //                                         </div>
    //                                     </div>
    //                                     <div class="order-item item-1">
    //                                         <div class="order-left">
    //                                             <span class="left-title">Shipping cost:</span>
    //                                         </div>
    //                                         <div class="order-right">
    //                                             <span class="right-title">₹50.00</span>
    //                                         </div>
    //                                     </div>
    //                                     <div class="order-item item-1">
    //                                         <div class="order-left">
    //                                             <span class="left-title">Total Price:</span>
    //                                         </div>
    //                                         <div class="order-right">
    //                                             <span class="right-title title-2">₹{finalPrice}</span>
    //                                         </div>

    //                                     </div>

    //                                 </div>
    //                                 <input type="text" hidden id="total_amt" value={finalPrice}></input>
    //                                 <div class="payment-option-wrap">
    //                                     <div class="payment-option">

    //                                         <div class="shipping-option">
    //                                             <input id="cod_option" type="radio" name="shipping" value="Cash on Delivery" style={{cursor:'pointer'}} />
    //                                             <label for="cod_option" style={{cursor:'pointer'}}>Cash On Delivery</label>
    //                                         </div>
    //                                         <div class="shipping-option">
    //                                             <input id="razorpay_option" type="radio" name="shipping" value="Razorpay" style={{cursor:'pointer'}}/>
    //                                             <label for="razorpay_option" style={{cursor:'pointer'}}>Razorpay</label>
    //                                         </div>
    //                                     </div>
    //                                     <p class="desc">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <span>privacy policy.</span></p>
    //                                     <div class="form-check">
    //                                         <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
    //                                         <label class="form-check-label" for="flexCheckDefault">
    //                                             I have read and agree terms and conditions *
    //                                         </label>
    //                                     </div>
    //                                     <button class="rr-primary-btn order-btn" onClick={handlerezorpay}>Place Your Order</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </section>

    //     </>
    // )

    return (
    <>
        <section className="checkout-section pt-16 pb-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Billing Details */}
                    <div className="w-full lg:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Billing Details</h3>

                        <div className="rounded-lg border border-gray-100 shadow-sm p-4 sm:p-6">
                            {list && list.length > 0 ? (
                                list.map((val, index2) => (
                                    <div key={index2} className="flex flex-col gap-4">
                                        <input type="text" hidden id="customer_id" name="customer_id" value={val.customer_id} />

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="text-base font-medium text-gray-700 mb-1">Customer Name*</h4>
                                                <input
                                                    type="text"
                                                    id="customer_name"
                                                    name="customer_name"
                                                    defaultValue={val.customer_name}
                                                    className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-medium text-gray-700 mb-1">Email*</h4>
                                                <input
                                                    type="email"
                                                    id="customer_email"
                                                    name="customer_email"
                                                    defaultValue={val.customer_email}
                                                    className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-base font-medium text-gray-700 mb-1">Address*</h4>
                                            <textarea
                                                rows="2"
                                                id="customer_address"
                                                name="customer_address"
                                                defaultValue={val.customer_address}
                                                className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            ></textarea>
                                        </div>

                                        <div>
                                            <h4 className="text-base font-medium text-gray-700 mb-1">Country</h4>
                                            <select
                                                autoComplete="off"
                                                id="customer_country"
                                                name="customer_country"
                                                className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                value={selectedCountry}
                                                onChange={handleCountryChange}
                                            >
                                                <option hidden value="">Select Country</option>
                                                {Object.keys(countryData).map((country) => (
                                                    <option key={country} value={country}>{country}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <h4 className="text-base font-medium text-gray-700 mb-1">State*</h4>
                                            <select
                                                autoComplete="off"
                                                id="customer_state"
                                                className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                value={selectedState}
                                                onChange={handleStateChange}
                                            >
                                                <option value="">Select State</option>
                                                {states.map((state) => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <h4 className="text-base font-medium text-gray-700 mb-1">Town / City*</h4>
                                            <select
                                                autoComplete="off"
                                                id="customer_city"
                                                name="customer_city"
                                                className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            >
                                                <option value="">Select City</option>
                                                {cities.map((city) => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <h4 className="text-base font-medium text-gray-700 mb-1">Pin Code*</h4>
                                            <input
                                                type="text"
                                                id="customer_pincode"
                                                name="customer_pincode"
                                                className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            />
                                        </div>

                                        <div>
                                            <h4 className="text-base font-medium text-gray-700 mb-1">Phone*</h4>
                                            <input
                                                type="text"
                                                id="customer_phone"
                                                name="customer_phone"
                                                defaultValue={val.customer_phone}
                                                className="w-full text-base border border-gray-200 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 text-lg py-8">No user data available.</div>
                            )}
                        </div>
                    </div>

                    {/* Your Order */}
                    <div className="w-full lg:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Order</h3>

                        <div className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">

                            {/* Header */}
                            <div className="flex justify-between items-center bg-gray-50 p-4">
                                <span className="text-base font-semibold text-gray-600 uppercase tracking-wide">Product</span>
                                <span className="text-base font-semibold text-gray-600 uppercase tracking-wide">Price</span>
                            </div>

                            {/* Items */}
                            <div className="divide-y divide-gray-100">
                                {list1 && list1.length > 0 ? (
                                    list1.map((val, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <img
                                                    src={`${MEDIA_BASE_URL}/${val.product_image}`}
                                                    alt="img"
                                                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                                />
                                                <div className="min-w-0">
                                                    <span className="block text-sm text-gray-400 uppercase tracking-wide">{val.category_name}</span>
                                                    <h4 className="text-base font-semibold text-gray-800 leading-snug truncate">{val.product_name}</h4>
                                                    <span className="text-sm text-gray-500">Qty: {val.product_quantity}</span>
                                                </div>
                                            </div>
                                            <span className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                                                ₹{val.product_price * val.product_quantity}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 text-lg py-8">No products available.</div>
                                )}
                            </div>

                            {/* Totals */}
                            <div className="divide-y divide-gray-100 border-t border-gray-100">
                                <div className="flex justify-between items-center p-4">
                                    <span className="text-base text-gray-500">Subtotal:</span>
                                    <span className="text-base font-medium text-gray-800">₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between items-center p-4">
                                    <span className="text-base text-gray-500">Shipping cost:</span>
                                    <span className="text-base font-medium text-gray-800">₹50.00</span>
                                </div>
                                <div className="flex justify-between items-center p-4">
                                    <span className="text-base font-semibold text-gray-700">Total Price:</span>
                                    <span className="text-lg font-bold text-red-500">₹{finalPrice}</span>
                                </div>
                            </div>

                            <input type="text" hidden id="total_amt" value={finalPrice} readOnly />

                            {/* Payment options */}
                            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100">
                                <div className="flex flex-col gap-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <input id="cod_option" type="radio" name="shipping" value="Cash on Delivery" className="w-4 h-4 cursor-pointer" />
                                        <label htmlFor="cod_option" className="text-base text-gray-700 cursor-pointer">Cash On Delivery</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input id="razorpay_option" type="radio" name="shipping" value="Razorpay" className="w-4 h-4 cursor-pointer" />
                                        <label htmlFor="razorpay_option" className="text-base text-gray-700 cursor-pointer">Razorpay</label>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <span className="underline cursor-pointer">privacy policy.</span>
                                </p>

                                <div className="flex items-start gap-2 mb-5">
                                    <input className="w-4 h-4 mt-0.5 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                                    <label htmlFor="flexCheckDefault" className="text-sm text-gray-700 cursor-pointer">
                                        I have read and agree terms and conditions *
                                    </label>
                                </div>

                                <button
                                    onClick={handlerezorpay}
                                    className="w-full rounded-md bg-red-500 hover:bg-red-600 text-white py-3 text-base font-semibold transition"
                                >
                                    Place Your Order
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </>
)
}
export default Checkout2