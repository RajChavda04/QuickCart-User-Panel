import React, { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';
import {Link} from 'react-router-dom'
import { API_BASE_URL, MEDIA_BASE_URL } from '../config/apiConfig'



function Cart() {

    const [list, setList] = useState([]);
    const userSession = sessionStorage.getItem('mydata');
    const user = userSession ? JSON.parse(userSession) : null;
    const customerId = user?.customer_id;
    const navigate = useNavigate();
    
    // const location = useLocation();
    // const product_id = location.state?.product_id;
    useEffect(() => {
        if (!customerId) return;
          Axios.get(`${API_BASE_URL}/latestorder`, {
            params: { customer_id: customerId }
          })
            .then((res) => {
              const orderNo = res.data.order_no;
              return Axios.get(`${API_BASE_URL}/orderdetail/${orderNo}`, {
                params: { customer_id: customerId }
              });
            })
            .then((response) => {
              const data = response.data;
              setList(data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
      }, [customerId]);
      const handleClick = () => {
        if (list.length > 0) {
          navigate(`/Invoice/${list[0].order_no}`);
        }
      };

    return (
        <>

            <section class="page-header">
                <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape" /></div>
                <div class="container">
                    <div class="page-header-content">
                        <h1 class="title">Order Details</h1>
                        <h4 class="sub-title">
                            <span class="home">
                                <a href="index.html">
                                    <span>Home</span>
                                </a>
                            </span>
                            <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
                            <span class="inner">
                                <span>Order Details</span>
                            </span>
                        </h4>
                    </div>
                </div>
            </section>


            <section class="cart-section pt-130 pb-130">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                         
                            <div class="table-content cart-table">
                                <table class="table mb-0">
                                    <thead>
                                        <tr>
                                            
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

                                                    
                                                    <td class="product-thumbnail">
                                                        <a href="shop-details.html">
                                                            <img src={`${MEDIA_BASE_URL}/${(val.product_image)}`} alt="img" />
                                                        </a>
                                                        <div class="product-thumbnail">
                                                            <h4 class="title">{val.product_name}</h4>
                                                        </div>
                                                    </td>
                                                    <td class="product-price"><span class="amount">{val.product_price}</span></td>
                                                    <td class="product-quantity">
                                                    <span class="amount">{val.product_quantity}</span>
                                                    </td>
                                                    <td class="product-subtotal"><span class="amount">₹{val.product_price * val.product_quantity}</span></td>

                                                </tr>
                                            ))
                                        ) : (
                                            <div className="col-12 text-center" > 
                                                <h2>No products available.</h2>
                                            </div>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                          
                        </div>
                       
                        <div class="col-lg-4">
                      
                            {list && list.length > 0 ? (
                                           
                            <div class="checkout-wrapper" >
                                               
                                <div class="checkout-top checkout-item item-1" >
                                    <h4 class="title">Order Details</h4>
                                </div>
                            
                                <div class="checkout-total checkout-item">
                                    <h4 class="title">Order number</h4>
                                    <span>{list[0].order_no}</span>
                                   
                                </div>
                                <div class="checkout-total checkout-item">
                                    <h4 class="title">Shipping cost</h4>
                                    <span>₹50</span>
                                   
                                </div>
                                <div class="checkout-total checkout-item">
                                    <h4 class="title">Total amount</h4>
                                    <span>₹{list[0].total_amount}</span>
                                   
                                </div>
                                <div class="checkout-total checkout-item">
                                    <h4 class="title">Payment type</h4>
                                    <span>{list[0].payment_method}</span>
                                   
                                </div>
                                <div class="checkout-total checkout-item">
                                    <h4 class="title">Order date</h4>
                                    {/* <span>{list[0].order_date}</span> */}
                                     <span>{list[0].order_date ? new Date(list[0].order_date).toLocaleDateString("en-GB") : "N/A"}</span> 
                                </div>
                                <div className="checkout-total checkout-item">
                                <h4 className="title">Delivery date</h4>
                                <span>
                                    {list[0].order_date
                                    ? new Date(new Date(list[0].order_date).setDate(new Date(list[0].order_date).getDate() + 2)).toLocaleDateString("en-GB")
                                    : "N/A"}
                                </span>
                                </div>
                                <div class="raj000">
                                {/* <button  class="rr-primary-btn checkout-btn" id="raj456" onClick={handleClick} >Generate Invoice</button> */}
                                <Link to={{  pathname: "/Invoice", }} state={{ order_no: list[0].order_no }} className="rr-primary-btn checkout-btn" id="raj456"> Generate Invoice </Link>
                                </div>
                               
                               
                            </div>
                                        ) : (
                                            <div className="col-12 text-center" hidden>
                                                <h2>No data available.</h2>
                                            </div>
                                        )}
                            
                        </div>
                        
                            

                    </div>
                </div>
            </section>

        </>
    )
}
export default Cart
