import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Swal from "sweetalert2"
import { API_BASE_URL, MEDIA_BASE_URL } from '../config/apiConfig'

function Shopgrid() {


    const [list, setList] = useState([]);
    const [list1, setList1] = useState([]);

    const location = useLocation();
    const category_id = location.state?.category_id;
    //alert(category_id);

    useEffect(() => {
        if (category_id) {
            Axios.post(`${API_BASE_URL}/productlistdata`, { category_id })
                .then((response) => {
                    setList(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching category data!", error);
                });
        }
    }, [category_id],Axios);

    
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
            Axios.post(`${API_BASE_URL}/cartadd`, { product_id: product_id, customer_id: user.customer_id })
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
    
    const addwish = (product_id) => {
        const userSession = sessionStorage.getItem('mydata');
        if (!userSession) {
            alert('Please Login First...');
            window.location = "/Login";
            return;
        }
        const user = JSON.parse(userSession);
    
        if (product_id) {
            Axios.post(`${API_BASE_URL}/wishadd`, { product_id: product_id, customer_id: user.customer_id })
                .then((response) => {
                    if (response.data.message) {
                        // Update local storage for cart items
                        const wishItems = JSON.parse(localStorage.getItem('wishItems')) || [];
                        if (!wishItems.includes(product_id)) {
                            wishItems.push(product_id);
                            localStorage.setItem('wishItems', JSON.stringify(wishItems));
                        }
    
                        // Show success alert
                        Swal.fire({
                            icon: 'success',
                            title: 'Product Added',
                            text: "Product added to the wishlist",
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

    
    useEffect(() => {
        Axios.get(`${API_BASE_URL}/getcategory`)
          .then((response) => {
            //console.log("API Response:", response.data); // Debugging step
    
    
            setList1(response.data);
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to load data',
            });
          });
      }, []);
   
    return (
        <>
            <section class="page-header">
                <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape" /></div>
                <div class="container">
                    <div class="page-header-content">
                        <h1 class="title">Shop Grid</h1>
                        <h4 class="sub-title">
                            <span class="home">
                                <Link to="/">
                                    <span>Home</span>
                                </Link>
                            </span>
                            <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
                            <span class="inner">
                                <span>Shop Grid</span>
                            </span>
                        </h4>
                    </div>
                </div>
            </section>


            <section class="shop-grid pt-100 pb-100">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9 col-md-12">
                            <div class="shop-grid-left">
                                <div class="top-grid-content">
                                    <div class="shop-tab-nav">
                                        <nav>
                                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                                                    <svg width="20" height="17" viewBox="0 0 20 17" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="15" width="5" height="3" fill="currentColor" />
                                                        <rect x="15" y="7" width="5" height="3" fill="currentColor" />
                                                        <rect x="15" y="14" width="5" height="3" fill="currentColor" />
                                                        <rect x="7.71875" width="5" height="3" fill="currentColor" />
                                                        <rect x="7.71875" y="7" width="5" height="3" fill="currentColor" />
                                                        <rect x="7.71875" y="14" width="5" height="3" fill="currentColor" />
                                                        <rect width="5" height="3" fill="currentColor" />
                                                        <rect y="7" width="5" height="3" fill="currentColor" />
                                                        <rect y="14" width="5" height="3" fill="currentColor" />
                                                    </svg>

                                                </button>

                                                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                                                    <svg width="20" height="17" viewBox="0 0 20 17" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="5.71875" width="14.2857" height="3" fill="currentColor" />
                                                        <rect x="5.71875" y="7" width="14.2857" height="3" fill="currentColor" />
                                                        <rect x="5.71875" y="14" width="14.2857" height="3" fill="currentColor" />
                                                        <rect width="3.80952" height="3" fill="currentColor" />
                                                        <rect y="7" width="3.80952" height="3" fill="currentColor" />
                                                        <rect y="14" width="3.80952" height="3" fill="currentColor" />
                                                    </svg>
                                                </button>

                                            </div>
                                        </nav>
                                       
                                    </div>
                                    {/* <div class="nice-select shop-select country" tabindex="0">
                                        <span class="current">Default Shorting</span>
                                        <ul class="list">
                                            <li data-value="" class="option selected focus">Default Shorting</li>
                                            <li data-value="vdt" class="option">Most Popular</li>
                                            <li data-value="can" class="option">Date</li>
                                            <li data-value="uk" class="option">Tranding</li>
                                            <li data-value="dk" class="option">Featured</li>
                                            <li data-value="dl" class="option">Discounted</li>
                                        </ul>
                                    </div> */}
                                </div>
                                
                                <div class="tab-content" id="nav-tabContent">
                                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel"         aria-labelledby="nav-home-tab">
                                        <div class="row gy-4">

                                            {list && list.length > 0 ? (
                                                list.map((val, index) => (
                                                    <div key={index} className="col-xl-4 col-lg-6 col-md-6">
                                                        <div className="shop-item">
                                                            <div className="shop-thumb">
                                                                <div className="overlay"></div>
                                                                <img src={`${MEDIA_BASE_URL}/${val.product_image}`} alt="shop" />
                                                                <span className="sale">New</span>
                                                                <ul className="shop-list">
                                                                   <li><Link to='/Shopgrid' onClick={() => addcart(val.product_id)} > <i className="fa-regular fa-cart-shopping"></i></Link></li>
                                                                    <li><Link to="/Shopgrid"  onClick={() => addwish(val.product_id)}><i className="fa-light fa-heart"></i></Link></li>
                                                                    <li><Link to="/Productdetails" state={{ product_id: val.product_id }}><i className="fa-light fa-eye"></i></Link></li>
                                                                </ul>
                                                            </div>
                                                            <div className="shop-content">
                                                                <span className="category">{val.product_name}</span>
                                                                <h3 class="title"><Link to="/Productdetails" state={{product_id:val.product_id}}>{val.product_name}</Link></h3>
                                                                <div className="review-wrap">
                                                                    <ul className="review">
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                        <li><i className="fa-solid fa-star"></i></li>
                                                                    </ul>
                                                                    <span>(15 Reviews)</span>
                                                                </div>
                                                                <span className="category">₹{val.product_price}</span>
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
                                    
                                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <div class="grid-shop-items">
                                        {list && list.length > 0 ? (
                                                list.map((val1, index) => (
                                            <div class="shop-item grid-shop" key={index}>
                                                <div class="shop-thumb">
                                                    <div class="overlay"></div>
                                                    <img src={`${MEDIA_BASE_URL}/${val1.product_image}`} alt="shop" />
                                                    <span class="sale">New</span>
                                                    <ul class="shop-list">
                                                        <li><Link to="#"><i class="fa-regular fa-cart-shopping"></i></Link></li>
                                                        <li><Link to="#"><i class="fa-light fa-heart"></i></Link></li>
                                                        <li><Link to="/Productdetails" state={{ product_id: val1.product_id }}><i class="fa-light fa-eye"></i></Link></li>
                                                    </ul>
                                                </div>
                                                <div class="shop-content">
                                                    <span class="category">{val1.category_name}</span>
                                                    <h3 class="title"><a href="shop-details.html">{val1.product_name}</a></h3>
                                                    <p>{val1.product_description}</p>
                                                    <div class="review-wrap">
                                                        <ul class="review">
                                                            <li><i class="fa-solid fa-star"></i></li>
                                                            <li><i class="fa-solid fa-star"></i></li>
                                                            <li><i class="fa-solid fa-star"></i></li>
                                                            <li><i class="fa-solid fa-star"></i></li>
                                                            <li><i class="fa-solid fa-star"></i></li>
                                                        </ul>
                                                        <span>(15 Reviews)</span>
                                                    </div>
                                                    {/* <span class="price"> <span class="offer">₹4570.00</span>₹{val1.product_price}</span> */}
                                                    <span class="price"> <span class="offer">₹2500.00</span>₹{val1.product_price}</span>
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
                        <div class="col-lg-3 col-md-12">
                            <div class="shop-sidebar">
                                <h3 class="sidebar-header">Categories</h3>
                                <ul class="sidebar-list">
                            
                                     {list1.map((val1, index1) => (
                                                              <li key={index1}><label><Link to="/Shopgrid" state={{ category_id: val1.category_id }} >{val1.category_name}</Link></label></li>
                                                            ))}
                                   
                                </ul>
                            </div>
                            {/* <div class="shop-sidebar">
                                <h3 class="sidebar-header">Filter by price</h3>
                                <div class="filter-box">
                                    <div class="range-slider">
                                        <input type="range" min="20" max="500" value="300" id="price-range" />
                                        <div class="slider-line"></div>
                                        <div class="range-slider-output">
                                            <h3 class="price">Price: $10 — $90</h3>
                                            <h3 id="price-output" class="price">$<span>500</span></h3>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                          
                        </div>
                    </div>
                    {/* <ul class="pagination-wrap mt-50">
                        <li><a href="#">1</a></li>
                        <li><a href="#" class="active">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#"><i class="fa-regular fa-chevrons-right"></i></a></li>
                    </ul> */}
                </div>
            </section>
        </>
    )
}
export default Shopgrid