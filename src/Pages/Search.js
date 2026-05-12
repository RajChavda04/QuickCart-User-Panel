import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";
import { API_BASE_URL, MEDIA_BASE_URL } from '../config/apiConfig'


function Search() {

  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  useEffect(() => {
    Axios.get(`${API_BASE_URL}/searchproductlist`).then((response) => {
      setList(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredData = list.filter((item) =>
      item.product_name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filteredData);
  }, [list, query]);


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
        <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape" /></div>
        <div class="container">
          <div class="page-header-content">
            <h1 class="title">Search</h1>
            <h4 class="sub-title">
              <span class="home">
                <Link to="/">
                  <span>Home</span>
                </Link>
              </span>
              <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
              <span class="inner">
                <span>Search</span>
              </span>
            </h4>
          </div>
        </div>
      </section>


      <section class="shop-grid-2 pt-100 pb-100">
        <div class="container">
        <h4>Search Results for "{query}"</h4>
          <div class="row gy-4">
            {filtered.length > 0 ? (
              filtered.map((val, index) => (
                <div class="col-xl-3 col-lg-4 col-md-6" key={index} >
                  <div class="shop-item">
                    <div class="shop-thumb">
                      <div class="overlay"></div>
                      {/* <img src="assets/img/shop/shop-1.png" alt="shop"/> */}
                      <img src={`${MEDIA_BASE_URL}/${(val.product_image)}`} alt="shop" />
                      <span class="sale">New</span>
                      <ul class="shop-list">
                        <li><Link to="/Shope" onClick={() => addcart(val.product_id)}><i class="fa-regular fa-cart-shopping"></i></Link></li>
                        <li><Link to="/Shope" onClick={() => addwish(val.product_id)}><i class="fa-light fa-heart"></i></Link></li>
                        <li><Link to="/Productdetails" state={{ product_id: val.product_id }}><i class="fa-light fa-eye"></i></Link></li>
                      </ul>
                    </div>
                    <div class="shop-content">
                      <span class="category">{val.category_name}</span>
                      <h3 class="title"><a href="shop-details.html">{val.product_name}</a></h3>
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

              ))
            ) : (
              <div className="text-center py-5">
                <h5>No products were found</h5>
              </div>
            )}
          </div>
          
        </div>
      </section>
    </>
  )
}
export default Search