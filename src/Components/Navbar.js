// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from '../config/apiConfig'


// function Navbar() {


//   const [list, setList] = useState([]);
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && query.trim() !== "") {
//       navigate(`/Search?query=${encodeURIComponent(query.trim())}`);
//       setQuery(""); // optional: clear after search
//     }
//   };


//   useEffect(() => {
//     Axios.get(`${API_BASE_URL}/getcategory`)
//       .then((response) => {
//         //console.log("API Response:", response.data); // Debugging step


//         setList(response.data);
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to load data',
//         });
//       });
//   }, []);


//   return (
//     <>

//       <div className="header sticky-active">

//         <div className="header-middle">
//           <div className="container">
//             <div className="header-middle-inner">
//               <div className="header-middle-left">
//                 <div className="header-logo d-lg-block">
//                   <Link to="/">
//                     <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584413/quickcart_tthz07.png" alt="Logo" />
//                   </Link>
//                 </div>
//                 <div className="category-form-wrap">

//                   <div className="header-form" >
//                     <input className="form-control" type="text" name="search" value={query}
//                       onChange={(e) => setQuery(e.target.value)}
//                       onKeyDown={handleSearch} placeholder="Search here..." />
//                     <button className="submit rr-primary-btn">Search here</button>
//                   </div>
//                 </div>
//               </div>
//               <div className="header-middle-right">

//                 <ul className="contact-item-list">

//                   <li>
//                     <Link to="/Wish" className="icon">
//                       <i className="fa-sharp fa-regular fa-heart"></i>
//                     </Link>
//                   </li>
//                   <li>

//                     <Link to="/Cart" className="icon" >
//                       <i className="fa-light fa-bag-shopping"></i>
//                       <span>2</span>
//                     </Link>

//                   </li>
//                   <li>

//                     <Link to="/Order" className="icon" >
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
//                         <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
//                       </svg>
//                     </Link>

//                   </li>

//                   <li>

//                     <Link to="/Userprofile" className="icon"  >
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
//                         <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
//                         <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
//                       </svg>
//                     </Link>

//                   </li>

//                 </ul>

//               </div>
//             </div>
//           </div>
//         </div>



//         <div className="primary-header">
//           <div className="container">
//             <div className="primary-header-inner">
//               <div className="header-logo mobile-logo">
//                 <Link href="/">
//                   <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584413/quickcart_tthz07.png" className="h-10 w-10" alt="Logo" />
//                 </Link>
//               </div>
//               <div className="header-menu-wrap">
//                 <div className="mobile-menu-items">
//                   <ul>
//                     <li className="menu-item-has-children active">
//                       <Link to="/">Home</Link>

//                     </li>
//                     <li className="menu-item-has-children active">
//                       <Link to="/Shope">Shop</Link>

//                     </li>
//                     <li className="menu-item-has-children">
//                       <Link >Category</Link>

//                       <ul>
//                         {list.map((val, index) => (
//                           <li key={index}><Link to="/Shopgrid" state={{ category_id: val.category_id }} >{val.category_name}</Link></li>
//                         ))}

//                       </ul>

//                     </li>

//                     <li className="menu-item-has-children">
//                       <Link href="/">Pages</Link>
//                       <ul>
//                         {/* <li><Link to="about.html">About</Link></li> */}
//                         <li><Link to="/Login">Login</Link></li>
//                         <li><Link to="/Register">Register</Link></li>
//                       </ul>
//                     </li>
//                     {/* <li><a href="/Contact">Contact</a></li> */}
//                   </ul>
//                 </div>
//               </div>

//               <div className="header-right-wrap">
//                 <div className="header-right">
//                   <span>Get 40% Discount Now <span>Sale</span></span>
//                   <div className="header-right-item">
//                   <button type="button" className="mobile-side-menu-toggle"> <i className="fa-sharp fa-solid fa-bars"></i></button>
//                   </div>
//                 </div>

//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       <div id="popup-search-box">
//         <div className="box-inner-wrap d-flex align-items-center">
//           <form id="form" action="#" method="get" role="search">
//             <input id="popup-search" type="text" name="search" placeholder="Type keywords here..." />
//           </form>
//           <div className="search-close"><i className="fa-sharp fa-regular fa-xmark"></i></div>
//         </div>
//       </div>
//       <div className="mobile-side-menu">
//         <div className="side-menu-content">
//           <div className="side-menu-head">
//             <Link href='/'><img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584413/quickcart_tthz07.png" alt="logo" /></Link>
//             <button className="mobile-side-menu-close"><i className="fa-regular fa-xmark"></i></button>
//           </div>
//           <div className="side-menu-wrap"></div>
//           <ul className="side-menu-list">
//             <li><i className="fa-light fa-location-dot"></i>Address : <span>Gujarat, India</span></li>
//             <li><i className="fa-light fa-phone"></i>Phone : <a href="tel:+919000011111">+91 90000 11111</a></li>
//             <li><i className="fa-light fa-envelope"></i>Email : <a href="mailto:quickcart0411@gmail.com">quickcart0411@gmail.com</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   )
// }
// export default Navbar


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from '../config/apiConfig'

// function Navbar() {

//   const [list, setList] = useState([]);
//   const [query, setQuery] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const navigate = useNavigate();

//   // Auth state - matches ProtectedRoute/PublicRoute which check
//   // sessionStorage.getItem("mydata")
//   const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("mydata"));

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && query.trim() !== "") {
//       navigate(`/Search?query=${encodeURIComponent(query.trim())}`);
//       setQuery("");
//     }
//   };

//   useEffect(() => {
//     Axios.get(`${API_BASE_URL}/getcategory`)
//       .then((response) => {
//         setList(response.data);
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to load data',
//         });
//       });
//   }, []);

//   const closeMenu = () => {
//     setMenuOpen(false);
//     setCategoryOpen(false);
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("mydata");
//     setIsLoggedIn(false);
//     closeMenu();
//     navigate("/Login");
//   };

//   return (
//     <>
//       {/* =========================================================
//           ORIGINAL NAVBAR - UNCHANGED - shown on medium & large only
//          ========================================================= */}
//       <div className="hidden lg:block">
//         <div className="header sticky-active">

//           <div className="header-middle">
//             <div className="container">
//               <div className="header-middle-inner">
//                 <div className="header-middle-left">
//                   <div className="header-logo d-lg-block">
//                     <Link to="/">
//                       <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584413/quickcart_tthz07.png" alt="Logo" />
//                     </Link>
//                   </div>
//                   <div className="category-form-wrap">

//                     <div className="header-form" >
//                       <input className="form-control" type="text" name="search" value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         onKeyDown={handleSearch} placeholder="Search here..." />
//                       <button className="submit rr-primary-btn">Search here</button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="header-middle-right">

//                   <ul className="contact-item-list">

//                     {isLoggedIn && (
//                       <>
//                         <li>
//                           <Link to="/Wish" className="icon">
//                             <i className="fa-sharp fa-regular fa-heart"></i>
//                           </Link>
//                         </li>
//                         <li>

//                           <Link to="/Cart" className="icon" >
//                             <i className="fa-light fa-bag-shopping"></i>
//                             <span>2</span>
//                           </Link>

//                         </li>
//                         <li>

//                           <Link to="/Order" className="icon" >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
//                               <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
//                             </svg>
//                           </Link>

//                         </li>

//                         <li>

//                           <Link to="/Userprofile" className="icon"  >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
//                               <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
//                               <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
//                             </svg>
//                           </Link>

//                         </li>
//                       </>
//                     )}

//                     {!isLoggedIn && (
//                       <li>
//                         <Link
//                           to="/Login"
//                           className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-red-600 text-red-600 text-sm font-semibold rounded-full hover:bg-red-600 hover:text-white transition-colors whitespace-nowrap"
//                         >
//                           <i className="fa-regular fa-user text-xs"></i>
//                           Login
//                         </Link>
//                       </li>
//                     )}

//                   </ul>

//                 </div>
//               </div>
//             </div>
//           </div>



//           <div className="primary-header">
//             <div className="container">
//               <div className="primary-header-inner">
//                 <div className="header-logo mobile-logo">
//                   <Link href="/">
//                     <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584413/quickcart_tthz07.png" className="h-10 w-10" alt="Logo" />
//                   </Link>
//                 </div>
//                 <div className="header-menu-wrap">
//                   <div className="mobile-menu-items">
//                     <ul>
//                       <li className="menu-item-has-children active">
//                         <Link to="/">Home</Link>

//                       </li>
//                       <li className="menu-item-has-children active">
//                         <Link to="/Shope">Shop</Link>

//                       </li>
//                       <li className="menu-item-has-children">
//                         <Link >Category</Link>

//                         <ul>
//                           {list.map((val, index) => (
//                             <li key={index}><Link to="/Shopgrid" state={{ category_id: val.category_id }} >{val.category_name}</Link></li>
//                           ))}

//                         </ul>

//                       </li>
//                       {/* <li><a href="/Contact">Contact</a></li> */}
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="header-right-wrap">
//                   <div className="header-right">
//                     <span>Get 40% Discount Now <span>Sale</span></span>
//                   </div>

//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>

//         <div id="popup-search-box">
//           <div className="box-inner-wrap d-flex align-items-center">
//             <form id="form" action="#" method="get" role="search">
//               <input id="popup-search" type="text" name="search" placeholder="Type keywords here..." />
//             </form>
//             <div className="search-close"><i className="fa-sharp fa-regular fa-xmark"></i></div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           MOBILE NAVBAR (Tailwind) - shown on small screens only
//          ========================================================= */}
//       <div className="lg:hidden sticky top-0 z-[999] bg-white shadow-sm">
//         <div className="border-b border-gray-200 py-3 px-4">
//           <div className="flex items-center gap-3 flex-wrap">

//             <button
//               type="button"
//               onClick={() => setMenuOpen(true)}
//               aria-label="Open menu"
//               className="text-xl p-1.5"
//             >
//               <i className="fa-sharp fa-solid fa-bars"></i>
//             </button>

//             <Link to="/">
//               <img
//                 src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584413/quickcart_tthz07.png"
//                 alt="Logo"
//                 className="h-7 w-auto"
//               />
//             </Link>

//             <div className="basis-full">
//               <div className="flex w-full">
//                 <input
//                   type="text"
//                   name="search"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onKeyDown={handleSearch}
//                   placeholder="Search here..."
//                   className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-red-500"
//                 />
//                 <button className="shrink-0 px-3 bg-red-600 text-white text-xs font-medium rounded-r-md hover:bg-red-700 whitespace-nowrap">
//                   Search
//                 </button>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* ---------- MOBILE SLIDE-OUT MENU ---------- */}
//       <div className={`lg:hidden fixed inset-0 z-[1100] ${menuOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}>

//         <div
//           onClick={closeMenu}
//           className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
//         ></div>

//         <div
//           className={`absolute top-0 left-0 h-full w-[85%] max-w-[340px] bg-white flex flex-col transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
//         >
//           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//             <Link to="/" onClick={closeMenu} className="flex items-center">
//               <img
//                 src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584413/quickcart_tthz07.png"
//                 alt="logo"
//                 className="h-12 w-auto"
//               />
//             </Link>
//             <button
//               onClick={closeMenu}
//               aria-label="Close menu"
//               className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm"
//             >
//               <i className="fa-regular fa-xmark"></i>
//             </button>
//           </div>

//           {/* scrollable middle section */}
//           <div className="flex-1 overflow-y-auto py-2">

//             <p className="uppercase text-[11px] tracking-wider text-gray-400 font-bold mx-4 mt-4 mb-2">Navigation</p>
//             <ul className="list-none m-0 p-0">
//               <li>
//                 <Link to="/" onClick={closeMenu} className="block px-4 py-3 text-gray-900 font-semibold text-[15px] border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors">Home</Link>
//               </li>
//               <li>
//                 <Link to="/Shope" onClick={closeMenu} className="block px-4 py-3 text-gray-900 font-semibold text-[15px] border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors">Shop</Link>
//               </li>

//               <li>
//                 <button
//                   onClick={() => setCategoryOpen(!categoryOpen)}
//                   className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-100 font-semibold text-[15px] text-gray-900 hover:bg-red-50 hover:text-red-600 transition-colors"
//                 >
//                   Category
//                   <i className={`fa-solid fa-chevron-${categoryOpen ? "up" : "down"} text-xs`}></i>
//                 </button>
//                 <ul className={`list-none m-0 p-0 bg-gray-50 overflow-hidden transition-[max-height] duration-300 ${categoryOpen ? "max-h-[600px]" : "max-h-0"}`}>
//                   {list.map((val, index) => (
//                     <li key={index}>
//                       <Link
//                         to="/Shopgrid"
//                         state={{ category_id: val.category_id }}
//                         onClick={closeMenu}
//                         className="block px-7 py-2.5 text-sm text-gray-600 border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors"
//                       >
//                         {val.category_name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             </ul>

//             {/* Account links only when logged in */}
//             {isLoggedIn && (
//               <>
//                 <p className="uppercase text-[11px] tracking-wider text-gray-400 font-bold mx-4 mt-5 mb-2">Account</p>
//                 <ul className="list-none m-0 px-2.5">
//                   <li>
//                     <Link to="/Wish" onClick={closeMenu} className="group flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-red-50 transition-colors">
//                       <span className="shrink-0 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-[15px] text-gray-800">
//                         <i className="fa-sharp fa-regular fa-heart"></i>
//                       </span>
//                       <span className="flex flex-col leading-tight">
//                         <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600">Wishlist</span>
//                         <span className="text-xs text-gray-500">Items you saved</span>
//                       </span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/Cart" onClick={closeMenu} className="group flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-red-50 transition-colors">
//                       <span className="shrink-0 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-[15px] text-gray-800">
//                         <i className="fa-light fa-bag-shopping"></i>
//                       </span>
//                       <span className="flex flex-col leading-tight">
//                         <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600">Cart</span>
//                         <span className="text-xs text-gray-500">2 items in your cart</span>
//                       </span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/Order" onClick={closeMenu} className="group flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-red-50 transition-colors">
//                       <span className="shrink-0 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//                           <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
//                         </svg>
//                       </span>
//                       <span className="flex flex-col leading-tight">
//                         <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600">My Orders</span>
//                         <span className="text-xs text-gray-500">Track, return or buy again</span>
//                       </span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/Userprofile" onClick={closeMenu} className="group flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-red-50 transition-colors">
//                       <span className="shrink-0 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//                           <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
//                           <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
//                         </svg>
//                       </span>
//                       <span className="flex flex-col leading-tight">
//                         <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600">My Account</span>
//                         <span className="text-xs text-gray-500">Profile, details, password</span>
//                       </span>
//                     </Link>
//                   </li>
//                 </ul>
//               </>
//             )}
//           </div>

//           {/* sticky bottom auth button */}
//           <div className="border-t border-gray-100 px-4 py-4">
//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 font-semibold rounded-full py-2.5 hover:bg-red-600 hover:text-white transition-colors"
//               >
//                 <i className="fa-solid fa-arrow-right-from-bracket"></i>
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 to="/Login"
//                 onClick={closeMenu}
//                 className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-semibold rounded-full py-2.5 hover:bg-red-700 transition-colors"
//               >
//                 <i className="fa-regular fa-user"></i>
//                 Login
//               </Link>
//             )}
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }
// export default Navbar


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config/apiConfig'

function Navbar() {

  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const navigate = useNavigate();

  // Auth state - matches ProtectedRoute/PublicRoute which check
  // sessionStorage.getItem("mydata")
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("mydata"));

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/Search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  useEffect(() => {
    Axios.get(`${API_BASE_URL}/getcategory`)
      .then((response) => {
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

  const closeMenu = () => {
    setMenuOpen(false);
    setCategoryOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("mydata");
    setIsLoggedIn(false);
    closeMenu();
    navigate("/Login");
  };

  return (
    <>
      {/* =========================================================
          DESKTOP / MEDIUM NAVBAR (pure Tailwind) - md and up
         ========================================================= */}
      <div className="hidden md:block sticky top-0 z-[999] bg-gray-200 shadow-sm">

        {/* top row: logo / search / icons */}
        <div className="border-b border-gray-200 py-4">
          <div className="max-w-[1300px] mx-auto px-4">
            <div className="flex items-center gap-8">

              <Link to="/" className="shrink-0">
                <img
                  src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584413/quickcart_tthz07.png"
                  alt="Logo"
                  className="h-11 w-auto"
                />
              </Link>

              <div className="flex-1 flex justify-center min-w-0">
                <div className="flex w-full max-w-[520px]">
                  <input
                    type="text"
                    name="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Search here..."
                    className="flex-1 min-w-0 px-4 py-2.5 text-base border border-gray-300 rounded-l-md focus:outline-none focus:border-red-500"
                  />
                  <button className="shrink-0 px-6 bg-red-600 text-white text-base font-medium rounded-r-md hover:bg-red-700 whitespace-nowrap">
                    Search Here
                  </button>
                </div>
              </div>

              <ul className="flex items-center gap-6 list-none m-0 p-0 shrink-0">
                {isLoggedIn && (
                  <>
                    <li>
                      <Link to="/Wish" className="relative inline-flex items-center justify-center text-xl text-gray-800">
                        <i className="fa-sharp fa-regular fa-heart"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Cart" className="relative inline-flex items-center justify-center text-xl text-gray-800">
                        <i className="fa-light fa-bag-shopping"></i>
                        <span className="absolute -top-2 -right-2.5 bg-red-600 text-white text-[10px] leading-none px-1.5 py-1 rounded-full">2</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Order" className="inline-flex items-center justify-center text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Userprofile" className="inline-flex items-center justify-center text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                      </Link>
                    </li>
                  </>
                )}

                {!isLoggedIn && (
                  <li>
                    <Link
                      to="/Login"
                      className="inline-flex items-center gap-1.5 px-5 py-2 border !border-2 !border-red-500 text-red-600 text-base font-semibold rounded-full hover:bg-red-600 hover:text-white hover:!border-red-600 transition-colors whitespace-nowrap"
                    >
                      <i className="fa-regular fa-user text-sm"></i>
                      Login
                    </Link>
                  </li>
                )}
              </ul>

            </div>
          </div>
        </div>

        {/* nav links row */}
        <div className="bg-gray-900 ">
          <div className="max-w-[1300px] mx-auto px-4">
            <div className="flex items-center h-20   justify-between py-3.5">

              <ul className="flex items-center  gap-8 list-none m-0 p-0">
                <li>
                  <Link to="/" className="text-lg font-semibold hover:text-red-500 transition-colors duration-300  uppercase tracking-wide text-white">Home</Link>
                </li>
                <li>
                  <Link to="/Shope" className="text-lg font-semibold uppercase tracking-wide text-white">Shop</Link>
                </li>
                <li className="relative group">
                  <Link to="#" className="text-lg font-semibold uppercase tracking-wide text-white">Category</Link>
                  <ul className="hidden group-hover:block absolute top-full left-0 bg-white min-w-[180px] shadow-lg rounded py-2 z-50">
                    {list.map((val, index) => (
                      <li key={index}>
                        <Link
                          to="/Shopgrid"
                          state={{ category_id: val.category_id }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                        >
                          {val.category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>

              <div className="text-lg font-semibold text-white">
                Get 40% Discount Now
                <span className="ml-2 bg-red-600 text-white px-3 py-1 rounded-full text-md">Sale</span>
              </div>

            </div>
          </div>
        </div>


      </div>

      {/* ---------- popup search box (unchanged behavior) ---------- */}
      <div id="popup-search-box">
        <div className="flex items-center">
          <form id="form" action="#" method="get" role="search">
            <input id="popup-search" type="text" name="search" placeholder="Type keywords here..." />
          </form>
          <div className="search-close"><i className="fa-sharp fa-regular fa-xmark"></i></div>
        </div>
      </div>

      {/* =========================================================
          MOBILE NAVBAR (Tailwind) - shown on small screens only
         ========================================================= */}
      <div className="md:hidden sticky top-0 z-[999] bg-white shadow-sm">
        <div className="border-b border-gray-200 py-3 px-4">
          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="text-xl p-1.5"
            >
              <i className="fa-sharp fa-solid fa-bars"></i>
            </button>

            <Link to="/" className="shrink-0">
              <img
                src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584413/quickcart_tthz07.png"
                alt="Logo"
                className="h-7 w-auto"
              />
            </Link>

            <div className="flex-1 min-w-0">
              <div className="flex w-full">
                <input
                  type="text"
                  name="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search here..."
                  className="flex-1 min-w-0 w-full px-2 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-red-500"
                />
                <button className="shrink-0 px-3 bg-red-600 text-white text-xs font-medium rounded-r-md hover:bg-red-700 whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------- MOBILE SLIDE-OUT MENU ---------- */}
      <div className={`md:hidden fixed inset-0 z-[1100] ${menuOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}>

        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        ></div>

        <div
          className={`absolute top-0 left-0 h-full w-[85%] max-w-[340px] bg-white flex flex-col transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Link to="/" onClick={closeMenu} className="flex items-center">
              <img
                src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584413/quickcart_tthz07.png"
                alt="logo"
                className="h-12 w-auto"
              />
            </Link>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm"
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
          </div>

          {/* scrollable middle section */}
          <div className="flex-1 overflow-y-auto py-2">

            <p className="uppercase text-[11px] tracking-wider text-gray-400 font-bold mx-4 mt-4 mb-2">Navigation</p>
            <ul className="list-none m-0 p-0">
              <li>
                <Link to="/" onClick={closeMenu} className="block px-4 py-3 text-gray-900 font-semibold text-[15px] border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/Shope" onClick={closeMenu} className="block px-4 py-3 text-gray-900 font-semibold text-[15px] border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors">Shop</Link>
              </li>

              <li>
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-100 font-semibold text-[15px] text-gray-900 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  Category
                  <i className={`fa-solid fa-chevron-${categoryOpen ? "up" : "down"} text-xs`}></i>
                </button>
                <ul className={`list-none m-0 p-0 bg-gray-50 overflow-hidden transition-[max-height] duration-300 ${categoryOpen ? "max-h-[600px]" : "max-h-0"}`}>
                  {list.map((val, index) => (
                    <li key={index}>
                      <Link
                        to="/Shopgrid"
                        state={{ category_id: val.category_id }}
                        onClick={closeMenu}
                        className="block px-7 py-2.5 text-sm text-gray-600 border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        {val.category_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            {/* Account links only when logged in */}
            {isLoggedIn && (
              <>
                <p className="uppercase text-[11px] tracking-wider text-gray-400 font-bold mx-4 mt-5 mb-2">Account</p>
                <ul className="list-none m-0 px-2.5">
                  <li>
                    <Link to="/Wish" onClick={closeMenu} className="group flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-red-50 transition-colors">
                      <span className="shrink-0 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-[15px] text-gray-800">
                        <i className="fa-sharp fa-regular fa-heart"></i>
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600">Wishlist</span>
                        <span className="text-xs text-gray-500">Items you saved</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Cart" onClick={closeMenu} className="group flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-red-50 transition-colors">
                      <span className="shrink-0 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-[15px] text-gray-800">
                        <i className="fa-light fa-bag-shopping"></i>
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600">Cart</span>
                        <span className="text-xs text-gray-500">2 items in your cart</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Order" onClick={closeMenu} className="group flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-red-50 transition-colors">
                      <span className="shrink-0 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                        </svg>
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600">My Orders</span>
                        <span className="text-xs text-gray-500">Track, return or buy again</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Userprofile" onClick={closeMenu} className="group flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-red-50 transition-colors">
                      <span className="shrink-0 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600">My Account</span>
                        <span className="text-xs text-gray-500">Profile, details, password</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>

          {/* sticky bottom auth button */}
          <div className="border-t border-gray-100 px-4 py-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 font-semibold rounded-full py-2.5 hover:bg-red-600 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Logout
              </button>
            ) : (
              <Link
                to="/Login"
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-semibold rounded-full py-2.5 hover:bg-red-700 transition-colors"
              >
                <i className="fa-regular fa-user"></i>
                Login / Sign Up
              </Link>
            )}
          </div>

        </div>
      </div>
    </>
  )
}
export default Navbar