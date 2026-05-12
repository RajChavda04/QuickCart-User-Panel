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


    useEffect(() => {
        if (!customerId) return;
            Axios.post(`${API_BASE_URL}/showwish`, { customer_id: customerId })
                .then((response) => {
                    setList(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching Product data!", error);
                });
    }, [customerId]);

    const addcart = (product_id) => {
        const userSession = sessionStorage.getItem('mydata');
        if (!userSession) {
            alert('Please Login First...');
            window.location = "/Login";
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

  return (
    <>

   
    <section class="page-header">
            <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape"/></div>
            <div class="container">
                <div class="page-header-content">
                    <h1 class="title">Wishlist</h1>
                    <h4 class="sub-title">
                        <span class="home">
                            <Link to="/">
                                <span>Home</span>
                            </Link>
                        </span>
                        <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
                        <span class="inner">
                            <span>Wishlist</span>
                        </span>
                    </h4>
                </div>
            </div>
        </section>
     

        <section class="cart-section pt-130 pb-130">
            <div class="container">
                <div class="table-content cart-table table-2">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                                <th class="product-remove"></th>
                                <th class="cart-product-name ">Product name</th>
                                <th class="product-price"> Price</th>
                                <th class="product-quantity">Stock Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {list && list.length > 0 ? (
                                            list.map((val, index) => (
                            <tr key={index}>
                                <td class="product-remove"><button onClick={() => handledelete(user.customer_id, val.product_id)}><i class="fa-sharp fa-regular fa-xmark"></i></button></td>
                                <td class="product-thumbnail">
                                    <a href="shop-details.html">
                                        <img src={`${MEDIA_BASE_URL}/${(val.product_image)}`} alt="img"/>
                                    </a>
                                    <div class="product-thumbnail">
                                        <span class="category" value={val.category_id}>{val.category_name}</span>
                                       
                                        <h4 class="title">{val.product_name}</h4>
                                    </div>
                                </td>
                                <td class="product-price"><span class="amount">₹{val.product_price}</span></td>
                                <td class="product-quantity">
                                <input type="number" className="mytext1"  name="quantity"  value={val.product_quantity} hidden  />
                                    {val.product_quantity > 0 ? (
  
                                            <span>Out of Stock</span> 
                                        ) : (
                                        
                                            <span >In Stock</span>
                                        )}
                                </td>
                                <td class="product-subtotal"><button class="rr-primary-btn" onClick={() => addcart(val.product_id)}>Add to cart</button></td>
                            </tr>
                           
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <h2>No products available.</h2>
                        </div>
                    )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </>
      
   
  )
}
