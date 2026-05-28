import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { API_BASE_URL, MEDIA_BASE_URL } from '../config/apiConfig'


function Cart() {

    const [list, setList] = useState([]);
    const userSession = sessionStorage.getItem('mydata');
    const user = userSession ? JSON.parse(userSession) : null;
    const customerId = user?.customer_id;
    const [totalPrice, setTotalPrice] = useState(0);
    const location = useLocation();
    const product_id = location.state?.product_id;



    useEffect(() => {
        if (!customerId) return;

        Axios.post(`${API_BASE_URL}/showcart`, { customer_id: customerId })
            .then((response) => {
                setList(response.data);
                calculateTotalPrice(response.data);
                updateCartStorage(response.data);
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(
                        response.data.map(item => item.product_id)
                    )
                );
            })
            .catch((error) => {
                console.error("Error fetching Product data!", error);
            });
    }, [customerId]);

    const updateCartStorage = (updatedCart) => {

        localStorage.setItem(
            "cartItems",
            JSON.stringify(
                updatedCart.map(item => item.product_id)
            )
        );
    
    };
    // Function to calculate total price
    const calculateTotalPrice = (products) => {
        let total = 0;
        products.forEach((product) => {
            total += product.product_price * product.product_quantity;
        });
        setTotalPrice(total);
    };

    // Increase quantity
    const increaseQuantity = (product_id, index) => {
        const updatedList = [...list];
        updatedList[index].product_quantity += 1;
        setList(updatedList);

        // Update quantity in the database
        Axios.post(`${API_BASE_URL}/updateQuantity`, {
            product_id: product_id,
            customer_id: user.customer_id,
            quantity: updatedList[index].product_quantity,
        })
            .then(() => {
                calculateTotalPrice(updatedList);
                updateCartStorage(updatedList);
            })
            .catch((error) => {
                console.error("Error updating quantity!", error);
            });
    };

    // Decrease quantity
    const decreaseQuantity = (product_id, index) => {
        const updatedList = [...list];
        if (updatedList[index].product_quantity > 1) {
            updatedList[index].product_quantity -= 1;
            setList(updatedList);

            // Update quantity in the database
            Axios.post(`${API_BASE_URL}/updateQuantity`, {
                product_id: product_id,
                customer_id: user.customer_id,
                quantity: updatedList[index].product_quantity,
            })
                .then(() => {
                    calculateTotalPrice(updatedList);
                    updateCartStorage(updatedList);
                })
                .catch((error) => {
                    console.error("Error updating quantity!", error);
                });
        }
    };


    const handledelete = (customer_id, product_id) => {
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
                Axios.delete(`${API_BASE_URL}/cart_product_delete/${customer_id}/${product_id}`)
                    .then((response) => {

                        const updatedCart = list.filter( item => item.product_id !== product_id  );
                        
                        setList(updatedCart);
                        
                        calculateTotalPrice(updatedCart);
                        
                        updateCartStorage(updatedCart);

                        Swal.fire(
                            'Deleted!',
                            'Product has been removed from the cart.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error("Error deleting product:", error);
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the product. Try again later.',
                            'error'
                        );
                    });
            } else {
                Swal.fire(
                    'Cancelled',
                    'The product is still in your cart.',
                    'info'
                );
            }
        });
    };


    return (
        <>

            <section class="page-header">
                <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape" /></div>
                <div class="container">
                    <div class="page-header-content">
                        <h1 class="title">Cart</h1>
                        <h4 class="sub-title">
                            <span class="home">
                                <a href="index.html">
                                    <span>Home</span>
                                </a>
                            </span>
                            <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
                            <span class="inner">
                                <span>Cart</span>
                            </span>
                        </h4>
                    </div>
                </div>
            </section>


            <section class="cart-section pt-130 pb-130">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                            {/* <div class="cart-top-content">
                            <p>Add <span>₹59.69</span> to cart and get free shipping</p>
                            <div class="line"></div>
                           </div> */}
                            <div class="table-content cart-table">
                                <table class="table mb-0">
                                    <thead>
                                        <tr>
                                            <th class="product-remove"></th>
                                            <th class="cart-product-name text-center">Products</th>
                                            <th class="product-price"> Price</th>
                                            <th class="product-quantity">Quantity</th>
                                            <th class="product-subtotal">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.length > 0 ? (
                                            list.map((val, index) => (
                                                <tr key={index}>

                                                    <td class="product-remove"><button onClick={() => handledelete(user.customer_id, val.product_id)}><i class="fa-sharp fa-regular fa-xmark"></i></button></td>
                                                    <td class="product-thumbnail">
                                                        <Link to="/Productdetails" state={{ product_id: val.product_id }}>
                                                            <img src={`${MEDIA_BASE_URL}/${(val.product_image)}`} alt="img" />

                                                        </Link>
                                                        <div class="product-thumbnail">
                                                            <h4 class="title">{val.product_name}</h4>
                                                        </div>
                                                    </td>
                                                    <td class="product-price"><span class="amount">{val.product_price}</span></td>
                                                    <td class="product-quantity">
                                                        {/* <div class="groupmy"> */}
                                                        <button class="my1" onClick={() => decreaseQuantity(val.product_id, index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                                        </svg></button>

                                                        <input type="text" class="mytext1" name="quantity" value={val.product_quantity} readOnly />
                                                        <button class="my1" onClick={() => increaseQuantity(val.product_id, index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                                        </svg></button>
                                                        {/* </div> */}
                                                    </td>
                                                    <td class="product-subtotal"><span class="amount">₹{val.product_price * val.product_quantity}</span></td>
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

                        <div class="col-lg-4">
                            <div class="checkout-wrapper">
                                <div class="checkout-top checkout-item item-1">
                                    <h4 class="title">Cart Totals</h4>
                                </div>

                                <div class="checkout-total checkout-item">
                                    <h4 class="title">Sub Total</h4>
                                    <span>₹{totalPrice}</span>
                                </div>
                            </div>
                            <div className="checkout-proceed">
                                {list.length > 0 ? (
                                    <Link to="/Checkout2" className="rr-primary-btn checkout-btn" >  Proceed to Checkout </Link>
                                ) : (
                                    <button disabled className="rr-primary-btn cursor-not-allowed  checkout-btn opacity-50 " >
                                        Proceed to Checkout
                                    </button>)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Cart
