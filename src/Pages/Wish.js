import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import { API_BASE_URL, MEDIA_BASE_URL } from '../config/apiConfig'

export default function Wish() {

    const [list, setList] = useState([]);
    const userSession = sessionStorage.getItem('mydata');
    const user = userSession ? JSON.parse(userSession) : null;
    const customerId = user?.customer_id;


    const fetchWishlist = () => {
        Axios.post(`${API_BASE_URL}/showwish`, { customer_id: customerId })
            .then((response) => {
                setList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Product data!", error);
            });
    };
    
    useEffect(() => {
        if (!customerId) return;
    
        fetchWishlist();
    }, [customerId]);

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
            Axios.post(`${API_BASE_URL}/cartaddwish`, { product_id: product_id, customer_id: user.customer_id, fromWishlist: true })
                .then((response) => {
                    if (response.data.message) {
                        // Update local storage for cart items
                        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                        if (!cartItems.includes(product_id)) {
                            cartItems.push(product_id);
                            localStorage.setItem('cartItems', JSON.stringify(cartItems));
                        }
                        fetchWishlist();
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
    

    const handledelete = (customer_id,product_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`${API_BASE_URL}/wish_product_delete/${customer_id}/${product_id}`)
                    .then((response) => {

                        setList(prevList => prevList.filter(item => item.product_id !== product_id));
    
                        Swal.fire(
                            'Remove',
                            'Product has been removed from the Whishlist.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error("Error deleting product:", error);
                        Swal.fire(
                            'Error!',
                            'There was a problem removing the product. Try again later.',
                            'error'
                        );
                    });
            } else {
                Swal.fire(
                    'Cancelled',
                    'The product is still in your whishlist.',
                    'info'
                );
            }
        });
    };

//   return (
//     <>

   
//     <section class="page-header">
//             <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape"/></div>
//             <div class="container">
//                 <div class="page-header-content">
//                     <h1 class="title">Wishlist</h1>
//                     <h4 class="sub-title">
//                         <span class="home">
//                             <Link to="/">
//                                 <span>Home</span>
//                             </Link>
//                         </span>
//                         <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
//                         <span class="inner">
//                             <span>Wishlist</span>
//                         </span>
//                     </h4>
//                 </div>
//             </div>
//         </section>
     

//         <section class="cart-section pt-130 pb-130">
//             <div class="container">
//                 <div class="table-content cart-table table-2">
//                     <table class="table mb-0">
//                         <thead>
//                             <tr>
//                                 <th class="product-remove"></th>
//                                 <th class="cart-product-name ">Product name</th>
//                                 <th class="product-price"> Price</th>
//                                 <th class="product-quantity">Stock Status</th>
                                
//                             </tr>
//                         </thead>
//                         <tbody>
//                         {list && list.length > 0 ? (
//                                             list.map((val, index) => (
//                             <tr key={index}>
//                                 <td class="product-remove"><button onClick={() => handledelete(user.customer_id, val.product_id)}><i class="fa-sharp fa-regular fa-xmark"></i></button></td>
//                                 <td class="product-thumbnail">
//                                     <a href="shop-details.html">
//                                         <img src={`${MEDIA_BASE_URL}/${(val.product_image)}`} alt="img"/>
//                                     </a>
//                                     <div class="product-thumbnail">
//                                         <span class="category" value={val.category_id}>{val.category_name}</span>
                                       
//                                         <h4 class="title">{val.product_name}</h4>
//                                     </div>
//                                 </td>
//                                 <td class="product-price"><span class="amount">₹{val.product_price}</span></td>
//                                 <td class="product-quantity">
//                                 <input type="number" className="mytext1"  name="quantity"  value={val.product_quantity} hidden  />
//                                     {val.product_quantity > 0 ? (
  
//                                             <span>Out of Stock</span> 
//                                         ) : (
                                        
//                                             <span >In Stock</span>
//                                         )}
//                                 </td>
//                                 <td class="product-subtotal"><button class="rr-primary-btn" onClick={() => addcart(val.product_id)}>Add to cart</button></td>
//                             </tr>
                           
//                         ))
//                     ) : (
//                         <div className="col-12 text-center">
//                             <h2>No products available.</h2>
//                         </div>
//                     )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </section>
//     </>
      
   
//   )

return (
    <>
        <section className="page-header">
            <div className="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape" /></div>
            <div className="container">
                <div className="page-header-content">
                    <h1 className="title">Wishlist</h1>
                    <h4 className="sub-title">
                        <span className="home">
                            <Link to="/"><span>Home</span></Link>
                        </span>
                        <span className="icon"><i className="fa-solid fa-angle-right"></i></span>
                        <span className="inner"><span>Wishlist</span></span>
                    </h4>
                </div>
            </div>
        </section>

        <section className="cart-section pt-130 pb-130">
            <div className="container">

                {/* Mobile: stacked cards (below sm) */}
                <div className="flex flex-col gap-3 sm:hidden">
                    {list && list.length > 0 ? (
                        list.map((val, index) => (
                            <div key={index} className="relative rounded-lg border border-gray-100 shadow-sm p-4">
                                <button
                                    onClick={() => handledelete(user.customer_id, val.product_id)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                                >
                                    <i className="fa-sharp fa-regular fa-xmark text-lg"></i>
                                </button>

                                <a href="shop-details.html" className="flex items-center gap-3 mb-3 pr-6">
                                    <img
                                        src={`${MEDIA_BASE_URL}/${val.product_image}`}
                                        alt="img"
                                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                    />
                                    <div>
                                        <span className="block text-sm text-gray-400 uppercase tracking-wide">{val.category_name}</span>
                                        <h4 className="text-lg font-semibold text-gray-800 leading-snug">{val.product_name}</h4>
                                    </div>
                                </a>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">Price</p>
                                        <p className="text-lg font-medium text-gray-800">₹{val.product_price}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">Status</p>
                                        {val.product_quantity > 0 ? (
                                            <span className="text-base font-medium text-red-500">Out of Stock</span>
                                        ) : (
                                            <span className="text-base font-medium text-green-600">In Stock</span>
                                        )}
                                    </div>
                                </div>

                                <input type="number" className="mytext1" name="quantity" value={val.product_quantity} hidden readOnly />

                                <button
                                    className="rr-primary-btn w-full mt-4 rounded-md bg-red-500 hover:bg-red-600 text-white py-2.5 text-base font-semibold transition"
                                    onClick={() => addcart(val.product_id)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-lg border border-gray-100 p-8 text-center text-gray-500 text-lg">
                            No products available.
                        </div>
                    )}
                </div>

                {/* Tablet/Desktop: real table (sm and up) */}
                <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
                    <table className="w-full min-w-[640px] border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-left">
                                <th className="p-4 w-10"></th>
                                <th className="p-4 text-base font-semibold text-gray-600 uppercase tracking-wide">Product name</th>
                                <th className="p-4 text-base font-semibold text-gray-600 uppercase tracking-wide">Price</th>
                                <th className="p-4 text-base font-semibold text-gray-600 uppercase tracking-wide">Stock Status</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.length > 0 ? (
                                list.map((val, index) => (
                                    <tr key={index} className="border-t border-gray-100">
                                        <td className="p-4">
                                            <button
                                                onClick={() => handledelete(user.customer_id, val.product_id)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <i className="fa-sharp fa-regular fa-xmark text-lg"></i>
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <a href="shop-details.html" className="flex items-center gap-3">
                                                <img
                                                    src={`${MEDIA_BASE_URL}/${val.product_image}`}
                                                    alt="img"
                                                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                                />
                                                <div>
                                                    <span className="block text-sm text-gray-400 uppercase tracking-wide">{val.category_name}</span>
                                                    <h4 className="text-lg font-semibold text-gray-800 leading-snug">{val.product_name}</h4>
                                                </div>
                                            </a>
                                        </td>
                                        <td className="p-4 text-lg text-gray-700 whitespace-nowrap">₹{val.product_price}</td>
                                        <td className="p-4">
                                            <input type="number" className="mytext1" name="quantity" value={val.product_quantity} hidden readOnly />
                                            {val.product_quantity > 0 ? (
                                                <span className="text-base font-medium text-red-500">Out of Stock</span>
                                            ) : (
                                                <span className="text-base font-medium text-green-600">In Stock</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                className="rr-primary-btn rounded-md bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 text-base font-semibold whitespace-nowrap transition"
                                                onClick={() => addcart(val.product_id)}
                                            >
                                                Add to cart
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500 text-lg">
                                        No products available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    </>
)
}
