import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { API_BASE_URL, MEDIA_BASE_URL } from '../config/apiConfig'

function Productdetails() {
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    const location = useLocation();
    const product_id = location.state?.product_id;
    const [rating, setRating] = useState(0);
    const [customer_name, setName] = useState(""); 
    const [feed_message, setMessage] = useState(""); 
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!rating || !customer_name.trim() || !feed_message.trim()) {

            Swal.fire({
                icon: 'warning',
                title: 'Incomplete!',
                text: 'Please fill in all fields and give a rating.',
            });
            return;
        }
        const currentDate = new Date().toISOString().split('T')[0];

        Axios.post(`${API_BASE_URL}/feedback`, {
            customer_name,
            rating,
            feed_message,
            feed_date: currentDate,
        })
            .then((res) => {

                Swal.fire({
                    icon: 'success',
                    title: 'Review sent',
                    text: 'Thanks for your review',
                });
                setRating(0);
                setName("");
                setMessage("");
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong. Please try again.',
                });
            });
    };






    // add data into cart
    const addcart = (product_id) => {
        const userSession = sessionStorage.getItem('mydata');
        if (!userSession) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Login First',
                text: 'You need to login to continue.',
            }).then(() => {
                window.location = "/Login";
            });
            return;
        }
        const user = JSON.parse(userSession);

        if (product_id) {
            Axios.post(`${API_BASE_URL}/cartadd`, { product_id: product_id, customer_id: user.customer_id, quantity: selectedQuantity })
                .then((response) => {
                    if (response.data.message) {
                        // Update local storage for cart items
                        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                        if (!cartItems.includes(product_id)) {
                            cartItems.push(product_id);
                            localStorage.setItem('cartItems', JSON.stringify(cartItems));
                        }

                        // Show success alert
                        Swal.fire({
                            icon: 'success',
                            title: 'Product Added',
                            text: response.data.message,
                        })
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Please try again.',
                    });
                });
        }
    };




    const buy = (product_id) => {
        const userSession = sessionStorage.getItem('mydata');
        if (!userSession) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Login First',
                text: 'You need to login to continue.',
            }).then(() => {
                window.location = "/Login";
            });
            return;
        }
        const user = JSON.parse(userSession);

        if (product_id) {
            Axios.post(`${API_BASE_URL}/cartadd`, { product_id: product_id, customer_id: user.customer_id })
                .then((response) => {
                    if (response.data.message) {
                        // Update local storage for cart items
                        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                        if (!cartItems.includes(product_id)) {
                            cartItems.push(product_id);
                            localStorage.setItem('cartItems', JSON.stringify(cartItems));
                        }

                        window.location = "/Checkout2"
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Please try again.',
                    });
                });
        }
    };

    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        if (product_id) {
            Axios.post(`${API_BASE_URL}/singleproduct`, { product_id })
                .then((response) => {
                    setList(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching Product data!", error);
                });
        }
    }, [product_id]);

    // for feedback
    useEffect(() => {
        Axios.get(`${API_BASE_URL}/feedbacklist`)
            .then((response) => {
                setList2(response.data);
            });
    })

    const [summary, setSummary] = useState({

        totalFeed: 0,
        
    });

    useEffect(() => {

        const fetchSummary = () => {
            Axios.get(`${API_BASE_URL}/admin/summary`)
                .then((res) => {
                    setSummary(res.data);
                })
        };

        fetchSummary();
    }, []);


    return (
        <>
            <section class="page-header">
                <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape" /></div>
                <div class="container">
                    <div class="page-header-content">
                        <h1 class="title">Shop Details</h1>
                        <h4 class="sub-title">
                            <span class="home">
                                <a href="z">
                                    <span>Home</span>
                                </a>
                            </span>
                            <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
                            <span class="inner">
                                <span>Shop Details</span>
                            </span>
                        </h4>
                    </div>
                </div>
            </section>
            {list && list.length > 0 ? (
                list.map((val, index) => (
                    <div className="myclass">
                        <section class="shop-section single pt-100 pb-100">
                            <div class="container">

                                <div class="row" key={index}>
                                    <div class="col-lg-6 product-details-wrap">
                                        <div class="product-slider-wrap">
                                            <div class="swiper product-gallary-thumb">

                                            </div>
                                            <div class="swiper product-gallary">
                                                <span class="sale">Sale</span>
                                                <div class="swiper-wrapper">

                                                    <div class="swiper-slide">
                                                        <div class="gallary-item">
                                                            <img
                                                                src={`${MEDIA_BASE_URL}/${(val.product_image)}`}
                                                                alt="shop"
                                                            />
                                                            {/* <img src="assets/img/shop/shop-slider-3.jpg" alt="shop"/> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="swiper-nav-next"><i class="las la-arrow-right"></i></div>
                                                <div class="swiper-nav-prev"><i class="las la-arrow-left"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="product-details">
                                            <div class="product-info">

                                                <div class="product-inner">
                                                    <span class="category">{val.product_category}</span>
                                                    <h3 class="title">{val.product_name}</h3>
                                                    <div class="rating-wrap">
                                                        <ul class="rating">
                                                            <li><i class="fa-sharp fa-solid fa-star"></i></li>
                                                            <li><i class="fa-sharp fa-solid fa-star"></i></li>
                                                            <li><i class="fa-sharp fa-solid fa-star"></i></li>
                                                            <li><i class="fa-sharp fa-solid fa-star"></i></li>
                                                            <li><i class="fa-sharp fa-solid fa-star"></i></li>
                                                        </ul>
                                                        <span>(1 customer review)</span>
                                                    </div>
                                                    <h4 class="price">₹{val.product_price} <span>₹2600.00</span></h4>

                                                    <div class="item-left-line">
                                                        <span>Only {val.product_quantity} items left in stock!</span>
                                                        <div class="line" ></div>
                                                    </div>
                                                    <ul class="details-list">
                                                        <li><i class="fa-light fa-arrow-right-arrow-left"></i>Free returns</li>
                                                        <li><i class="fa-light fa-truck"></i>Free shipping via DHL, fully insured</li>
                                                        <li><i class="fa-light fa-circle-check"></i>All taxes and customs duties included</li>
                                                    </ul>
                                                </div>

                                                <div class="product-btn">
                                                   
                                                    <input type="number" className="mytext1"  name="quantity" min="1" value={val.product_quantity} hidden  />
                                                   
{/* 
                                                    <button className="my1" onClick={() => setSelectedQuantity(q => Math.max(1, q - 1))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" /></svg></button>

                                                    <input type="number" className="mytext1" style={{width: '50px', textAlign: 'center', display: 'flex'}} name="quantity" min="1" value={selectedQuantity} onChange={(e) => { const value = Math.max(1, parseInt(e.target.value) || 1); setSelectedQuantity(value); }} />

                                                    <button className="my1" onClick={() => setSelectedQuantity(q => q + 1)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                                    </svg></button> */}

                                                    <div className="cart-btn-wrap-2">
                                                                {val.product_quantity > 0 ? (
                                                                    <Link to="/Cart" onClick={() => addcart(val.product_id)} className="rr-primary-btn cart-btn"> Add To Cart </Link>
                                                                ) : (
                                                                    <button 
                                                                    className="rr-primary-btn cart-btn" 
                                                                    disabled 
                                                                    style={{ backgroundColor: "#ccc", cursor: "not-allowed" }}>
                                                                    Out of Stock
                                                                    </button>
                                                                )}
                                                                </div>

                                                    {/* <div class="cart-btn-wrap-2"><Link to="/Cart" onClick={() => addcart(val.product_id)} class="rr-primary-btn cart-btn">Add To Cart</Link></div> */}
                                                </div>
                                                {val.product_quantity > 0 ? (
                                                <button class="shop-details-btn rr-primary-btn" onClick={() => buy(val.product_id)}>Buy Item Now</button>
                                            ) : (
                                                <button 
                                                className="rr-primary-btn cart-btn" 
                                                disabled 
                                                style={{ backgroundColor: "#ccc", cursor: "not-allowed" , color:"black" }}
                                                >
                                                Buy now
                                                </button>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>

                        <section class="product-description pb-100">
                            <div class="container">
                                <ul class="nav tab-navigation" id="product-tab-navigation" role="tablist">
                                    <li role="presentation">
                                        <button class="active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                                            role="tab" aria-controls="home" aria-selected="true">Description</button>
                                    </li>
                                    <li role="presentation">
                                        <button id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab"
                                            aria-controls="contact" aria-selected="false">Reviews ({summary.totalFeed})</button>
                                    </li>
                                </ul>
                                <div class="tab-content" id="product-tab-content">
                                    <div class="tab-pane fade show active description" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="desc-wrap">
                                            <div class="left-content">
                                                <p class="mb-30">{val.product_description}</p>
                                              
                                            </div>
                                            {/* <div class="right-content">
                                                <img src="assets/img/shop/shop-details-img.jpg" alt="" />
                                            </div> */}
                                        </div>
                                    </div>

                                    <div class="tab-pane fade review" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                        <div class="row product-review gy-lg-0 gy-4">
                                            <div class="col-lg-5 col-md-12">
                                                <div class="reviewr-wrap">
                                                    <div class="review-list">
                                                    {list2 && list2.length > 0 ? (
                                                                list2.map((val, index) => (
                                                        <div class="review-item">
                                                            <div class="review-thumb">
                                                                <img src="assets/img/shop/boy.png" alt="img" />
                                                            </div>
                                                            
                                                                    <div class="content">
                                                                        <div class="content-top" key={index}>
                                                                            <h4 class="name">{val.customer_name} <span>{val.feed_date ? new Date(val.feed_date).toLocaleDateString("en-GB") : "N/A"}</span></h4>
                                                                            <ul class="review">

                                                                            <li>{[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star}style={{ fontSize: "28px",color: star <= val.rating ? "red" : "#ccc",}}>★ </span> ))}</li> {/* rate satr */}
                                                                            </ul>
                                                                        </div>
                                                                        <p>{val.feed_message}</p>
                                                                    </div>
                                                        </div>
                                                                ))
                                                            ) : (
                                                                <div className="col-12 text-center">
                                                                    <h4>Reviews are not available.</h4>
                                                                </div>
                                                            )}
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-7 col-md-12">
                                                <div class="review-form-wrap">
                                                    <h4 class="title">Review this product</h4>

                                                    <div class="blog-contact-form form-2 review-form">
                                                        <div class="request-form">
                                                            <form onSubmit={handleSubmit} id="ajax_contact" class="form-horizontal">
                                                                <div class="review-box">
                                                                    <span>Your ratings :</span>
                                                                    <ul class="review">
                                                                        <div style={{ marginBottom: "10px" }}>
                                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                                <span
                                                                                    key={star}
                                                                                    onClick={() => setRating(star)}
                                                                                    style={{
                                                                                        cursor: "pointer",
                                                                                        fontSize: "30px",
                                                                                        color: star <= rating ? "red" : "#ccc",
                                                                                    }}
                                                                                >
                                                                                    ★
                                                                                </span>
                                                                            ))}
                                                                        </div>

                                                                    </ul>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <div class="col-md-12">
                                                                        <div class="form-item">
                                                                            <input type="text" id="fullname" name="fullname" value={customer_name} onChange={(e) => setName(e.target.value)} class="form-control" placeholder="Your Name" required />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div class="form-group row">
                                                                    <div class="col-md-12">
                                                                        <div class="form-item message-item">
                                                                           
                                                                            <textarea
                                                                                placeholder="Write your review..."
                                                                                value={feed_message}
                                                                                onChange={(e) => setMessage(e.target.value)}
                                                                                required
                                                                                id="message" name="message" cols="30" rows="5" class="form-control address"
                                                                            ></textarea>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div class="submit-btn">
                                                                    <button id="submit" class="rr-primary-btn" type="submit">Submit</button>
                                                                </div>

                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                ))
            ) : (
                <div className="col-12 text-center">
                    <h2>No products available.</h2>
                </div>
            )}
        </>
    )
}
export default Productdetails