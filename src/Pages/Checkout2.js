import React, { useEffect, useState } from 'react'
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
                        // Navigate(`/Invoice/${res.data.order_no}`);

                    })
                    .catch((error) => {
                        alert("Payment successfully, but there was an error processing the order")
                    })

                // console.log(response);
            },
            prefill: {
                name: 'Raj Chavda',
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
    
   


    return (
        <>
            <section class="checkout-section pt-100 pb-100">
                <div class="container">

                    <div class="row">
                        <div class="col-lg-6 col-md-12">
                            <div class="checkout-left">
                                <h3 class="form-header">Billing Details</h3>
                                <div class="order-box">
                                    <div >
                                    {list && list.length > 0 ? (
                                            list.map((val, index2) => (
                                        <div class="checkout-form-wrap">

                                            <div class="form-group row"key={index2} >
                                            <input type="text" hidden id="customer_id" name="customer_id" value={val.customer_id} class="form-control" />
                                                <div class="col-md-6">
                                                    <div class="form-item name">
                                                        <h4 class="form-title">Customer Name*</h4>
                                                        <input type="text" id="customer_name" name="customer_name" value={val.customer_name} class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-item">
                                                        <h4 class="form-title">Email*</h4>
                                                        <input type="email" id="customer_email" name="customer_email" value={val.customer_email} class="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                    
                                            <div class="form-group row">
                                                <div class="col-md-12">
                                                    <div class="form-item ">
                                                        <h4 class="form-title">Address*</h4>
                                
                                                        <textarea  cols="30" rows="2" id="customer_address" name="customer_address" value={val.customer_address}
                                                            class="form-control address"></textarea>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-md-12">
                                                    <div class="form-item">
                                                        <h4 class="form-title">Country </h4>
                                                        <select autocomplete="off" id="customer_country" name="customer_country" class="form-control" value={selectedCountry} onChange={handleCountryChange} >
                                                                    <option hidden value="">Select Country</option>
                                                                    {Object.keys(countryData).map((country) => (
                                                                        <option key={country} value={country}>
                                                                            {country}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="form-group row">
                                                        <div class="col-md-12">
                                                            <div class="form-item">
                                                                <h4 class="form-title">State*</h4>
                                                                {/* <input type="text" id="town" name="town" class="form-control" /> */}
                                                                <select autocomplete="off" class="form-control" id="customer_state" value={selectedState} onChange={handleStateChange} >
                                                                    <option value="">Select State</option>
                                                                    {states.map((state) => (
                                                                        <option key={state} value={state}>
                                                                            {state}
                                                                        </option>
                                                                    ))}

                                                                </select>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <div class="col-md-12">
                                                            <div class="form-item">
                                                                <h4 class="form-title">Town / City*</h4>
                                                                {/* <input type="text" id="town" name="town" class="form-control" /> */}
                                                                <select autocomplete="off" class="form-control" id="customer_city" name="customer_city" >
                                                                    <option value="">Select City</option>
                                                                    {cities.map((city) => (
                                                                        <option key={city} value={city}>
                                                                            {city}
                                                                        </option>
                                                                    ))}

                                                                </select>

                                                            </div>
                                                        </div>
                                                    </div>

                                            <div class="form-group row">
                                                <div class="col-md-12">
                                                    <div class="form-item">
                                                        <h4 class="form-title">Pin Code*</h4>
                                                        <input type="text" id="customer_pincode" name="customer_pincode" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-md-12">
                                                    <div class="form-item">
                                                        <h4 class="form-title">Phone*</h4>
                                                        <input type="text" id="customer_phone" name="customer_phone" value={val.customer_phone} class="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                            ))
                                        ) : (
                                            <div className="col-12 text-center">
                                                <h2>No User data available.</h2>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <div class="checkout-right">
                                <h3 class="form-header">Your Order</h3>
                                <div class="order-box">
                                    <div class="order-items">
                                        <div class="order-item item-1">
                                            <div class="order-left">
                                                <span class="product">Product</span>
                                                
                                            </div>
                                            <div class="order-right">
                                                <span class="price">Price</span>
                                            </div>
                                        </div>
                                        {list1 && list1.length > 0 ? (
                                            list1.map((val, index) => (
                                        <div class="order-item" key={index}>
                                            <div class="order-left">
                                                <div class="order-img"><img src={`${MEDIA_BASE_URL}/${val.product_image}`} alt="img" />
                                                </div>
                                            </div>
                                            <div class="order-right">
                                                <div class="content">
                                                    <span class="category">{val.category_name}</span>
                                                    <h4 class="title">{val.product_name}</h4>
                                                    <span class="price">Qty:{val.product_quantity}</span>
                                                </div>
                                                <span class="price">₹{val.product_price * val.product_quantity}</span>
                                            </div>
                                        </div>
                                             ))
                                            ) : (
                                                <div className="col-12 text-center">
                                                    <h2>No products available.</h2>
                                                </div>
                                            )}


                                        <div class="order-item item-1">
                                            <div class="order-left">
                                                <span class="left-title">Subtotal:</span>
                                            </div>
                                            <div class="order-right">
                                                <span class="right-title">₹{totalPrice}</span>
                                            </div>
                                        </div>
                                        <div class="order-item item-1">
                                            <div class="order-left">
                                                <span class="left-title">Shipping cost:</span>
                                            </div>
                                            <div class="order-right">
                                                <span class="right-title">₹50.00</span>
                                            </div>
                                        </div>
                                        <div class="order-item item-1">
                                            <div class="order-left">
                                                <span class="left-title">Total Price:</span>
                                            </div>
                                            <div class="order-right">
                                                <span class="right-title title-2">₹{finalPrice}</span>
                                            </div>

                                        </div>

                                    </div>
                                    <input type="text" hidden id="total_amt" value={finalPrice}></input>
                                    <div class="payment-option-wrap">
                                        <div class="payment-option">

                                            <div class="shipping-option">
                                                <input id="cod_option" type="radio" name="shipping" value="Cash on Delivery" style={{cursor:'pointer'}} />
                                                <label for="cod_option" style={{cursor:'pointer'}}>Cash On Delivery</label>
                                            </div>
                                            <div class="shipping-option">
                                                <input id="razorpay_option" type="radio" name="shipping" value="Razorpay" style={{cursor:'pointer'}}/>
                                                <label for="razorpay_option" style={{cursor:'pointer'}}>Razorpay</label>
                                            </div>
                                        </div>
                                        <p class="desc">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <span>privacy policy.</span></p>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                I have read and agree terms and conditions *
                                            </label>
                                        </div>
                                        <button class="rr-primary-btn order-btn" onClick={handlerezorpay}>Place Your Order</button>
                                    </div>
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