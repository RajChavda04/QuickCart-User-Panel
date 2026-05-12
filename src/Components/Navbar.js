import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


function Navbar() {


  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/Search?query=${encodeURIComponent(query.trim())}`);
      setQuery(""); // optional: clear after search
    }
  };


  useEffect(() => {
    Axios.get('http://localhost:1337/api/getcategory')
      .then((response) => {
        //console.log("API Response:", response.data); // Debugging step


        setList(response.data);
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

      <div class="header sticky-active">

        <div class="header-middle">
          <div class="container">
            <div class="header-middle-inner">
              <div class="header-middle-left">
                <div class="header-logo d-lg-block">
                  <a href="index.html">
                    <img src="assets/img/logo/QuickCart.png" alt="Logo" />
                  </a>
                </div>
                <div class="category-form-wrap">

                  <div class="header-form" >
                    <input class="form-control" type="text" name="search"  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearch} placeholder="Search here..." />
                    <button class="submit rr-primary-btn">Search here</button>
                  </div>
                </div>
              </div>
              <div class="header-middle-right">
             
                <ul class="contact-item-list">

                  <li>
                    <Link to="/Wish" class="icon">
                      <i class="fa-sharp fa-regular fa-heart"></i>
                    </Link>
                  </li>
                  <li>
                 
                    <Link to="/Cart" class="icon" >
                      <i class="fa-light fa-bag-shopping"></i>
                      <span>2</span>
                    </Link>
                       
                  </li>
                  <li>
                 
                    <Link to="/Order" class="icon" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
                  </svg>
                    </Link>
                       
                  </li>

                  <li>
                 
                    <Link to="/Userprofile" class="icon"  >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                      </svg>
                    </Link>
               
                  </li>

                </ul>
           
              </div>
            </div>
          </div>
        </div>
        <div class="primary-header">
          <div class="container">
            <div class="primary-header-inner">
              <div class="header-logo mobile-logo">
                <a href="index.html">
                  <img src="assets/img/logo/logo-1.png" alt="Logo" />
                </a>
              </div>
              <div class="header-menu-wrap">
                <div class="mobile-menu-items">
                  <ul>
                    <li class="menu-item-has-children active">
                      <Link to="/">Home</Link>

                    </li>
                    <li class="menu-item-has-children active">
                      <Link to="/Shope">Shop</Link>

                    </li>
                    <li class="menu-item-has-children">
                      <a href="/">Category</a>

                      <ul>
                        {list.map((val, index) => (
                          <li key={index}><Link to="/Shopgrid" state={{ category_id: val.category_id }} >{val.category_name}</Link></li>
                        ))}

                      </ul>

                    </li>

                    <li class="menu-item-has-children">
                      <a href="/">Pages</a>
                      <ul>
                        {/* <li><Link to="about.html">About</Link></li> */}
                        <li><Link to="/Login">Login</Link></li>
                        <li><Link to="/Register">Register</Link></li>


                      </ul>
                    </li>

                    {/* <li><a href="/Contact">Contact</a></li> */}
                  </ul>
                </div>
              </div>

              <div class="header-right-wrap">
                <div class="header-right">
                  <span>Get 40% Discount Now <span>Sale</span></span>
                  <div class="header-right-item">
                    <a href="javascript:void(0)" class="mobile-side-menu-toggle"><i class="fa-sharp fa-solid fa-bars"></i></a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <div id="popup-search-box">
        <div class="box-inner-wrap d-flex align-items-center">
          <form id="form" action="#" method="get" role="search">
            <input id="popup-search" type="text" name="search"  placeholder="Type keywords here..." />
          </form>
          <div class="search-close"><i class="fa-sharp fa-regular fa-xmark"></i></div>
        </div>
      </div>
      <div class="mobile-side-menu">
        <div class="side-menu-content">
          <div class="side-menu-head">
            <a href='index.html'><img src="assets/img/logo/logo-1.png" alt="logo" /></a>
            <button class="mobile-side-menu-close"><i class="fa-regular fa-xmark"></i></button>
          </div>
          <div class="side-menu-wrap"></div>
          <ul class="side-menu-list">
            <li><i class="fa-light fa-location-dot"></i>Address : <span>Amsterdam, 109-74</span></li>
            <li><i class="fa-light fa-phone"></i>Phone : <a href="tel:+01569896654">+01 569 896 654</a></li>
            <li><i class="fa-light fa-envelope"></i>Email : <a href="mailto:info@example.com">info@example.com</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
export default Navbar