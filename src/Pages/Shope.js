import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import {Link} from "react-router-dom"
import Swal from 'sweetalert2'
import { API_BASE_URL, MEDIA_BASE_URL } from '../config/apiConfig'

 function Shope() {
    const [list, setList] = useState([]);

    useEffect(() => {
        Axios.get(`${API_BASE_URL}/productlist`)
            .then((response) => {
                setList(response.data);
            });
    })

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

    // useEffect(() => {
    //     Axois.get('http://localhost:1337/api/productlist')
    //         .then((response) => {
    //             setList(response.data);
    //         });
    // })

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
   
  return (
    <>

    <section class="page-header">
            <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape"/></div>
            <div class="container">
                <div class="page-header-content">
                    <h1 class="title">Shop</h1>
                    <h4 class="sub-title">
                        <span class="home">
                            <a href="/">
                                <span>Home</span>
                            </a>
                        </span>
                        <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
                        <span class="inner">
                            <span>Shop</span>
                        </span>
                    </h4>
                </div>
            </div>
        </section>
       

        <section class="shop-grid-2 pt-100 pb-100">
            <div class="container">
                <div class="row gy-4">
                {list.map((val, index) => (
                    <div class="col-xl-3 col-lg-4 col-md-6" key={index}>
                        <div class="shop-item">
                            <div class="shop-thumb">
                                <div class="overlay"></div>
                                {/* <img src="assets/img/shop/shop-1.png" alt="shop"/> */}
                                <img src={`${MEDIA_BASE_URL}/${(val.product_image)}`} alt="shop"/>
                                <span class="sale">New</span>
                                <ul class="shop-list">
                                    <li><Link to="/Shope" onClick={() => addcart(val.product_id)}><i class="fa-regular fa-cart-shopping"></i></Link></li>
                                    <li><Link to="/Shope" onClick={() => addwish(val.product_id)}><i class="fa-light fa-heart"></i></Link></li>
                                    <li><Link to="/Productdetails" state={{product_id:val.product_id}}><i class="fa-light fa-eye"></i></Link></li>
                                </ul>
                            </div>
                            <div class="shop-content">
                                <span class="category">{val.category_name}</span>
                                <h3 class="title"><Link to="/Productdetails" state={{product_id:val.product_id}}>{val.product_name}</Link></h3>
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
                                <span class="price"> <span class="offer">₹2500.00</span>₹{val.product_price}</span>
                            </div>
                        </div>
                    </div>
                ))}
                  
                </div>
                <ul class="pagination-wrap justify-content-center mt-50">
                    <li><Link to="/Shope" class="active">1</Link></li>
                    <li><Link to="/Shope">2</Link></li>
                    <li><Link to="/Shope">3</Link></li>
                    <li><Link to="/Shope"><i class="fa-regular fa-chevrons-right"></i></Link></li>
                </ul>
            </div>
        </section>
    </>
  )
}
export default Shope