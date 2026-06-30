import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';
import { Link } from 'react-router-dom'
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

    // return (
    //     <>

    //         <section class="page-header">
    //             <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape" /></div>
    //             <div class="container">
    //                 <div class="page-header-content">
    //                     <h1 class="title">Order Details</h1>
    //                     <h4 class="sub-title">
    //                         <span class="home">
    //                             <a href="index.html">
    //                                 <span>Home</span>
    //                             </a>
    //                         </span>
    //                         <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
    //                         <span class="inner">
    //                             <span>Order Details</span>
    //                         </span>
    //                     </h4>
    //                 </div>
    //             </div>
    //         </section>


    //         <section class="cart-section pt-130 pb-130">
    //             <div class="container">
    //                 <div class="row">
    //                     <div class="col-lg-8">

    //                         <div class="table-content cart-table">
    //                             <table class="table mb-0">
    //                                 <thead>
    //                                     <tr>

    //                                         <th class="cart-product-name text-center">Products</th>
    //                                         <th class="product-price"> Price</th>
    //                                         <th class="product-quantity">Quantity</th>
    //                                         <th class="product-subtotal">Subtotal</th>
    //                                     </tr>
    //                                 </thead>
    //                                 <tbody>
    //                                     {list && list.length > 0 ? (
    //                                         list.map((val, index) => (
    //                                             <tr key={index}>


    //                                                 <td class="product-thumbnail">
    //                                                     <a href="shop-details.html">
    //                                                         <img src={`${MEDIA_BASE_URL}/${(val.product_image)}`} alt="img" />
    //                                                     </a>
    //                                                     <div class="product-thumbnail">
    //                                                         <h4 class="title">{val.product_name}</h4>
    //                                                     </div>
    //                                                 </td>
    //                                                 <td class="product-price"><span class="amount">{val.product_price}</span></td>
    //                                                 <td class="product-quantity">
    //                                                 <span class="amount">{val.product_quantity}</span>
    //                                                 </td>
    //                                                 <td class="product-subtotal"><span class="amount">₹{val.product_price * val.product_quantity}</span></td>

    //                                             </tr>
    //                                         ))
    //                                     ) : (
    //                                         <div className="col-12 text-center" > 
    //                                             <h2>No products available.</h2>
    //                                         </div>
    //                                     )}
    //                                 </tbody>
    //                             </table>
    //                         </div>


    //                     </div>

    //                     <div class="col-lg-4">

    //                         {list && list.length > 0 ? (

    //                         <div class="checkout-wrapper" >

    //                             <div class="checkout-top checkout-item item-1" >
    //                                 <h4 class="title">Order Details</h4>
    //                             </div>

    //                             <div class="checkout-total checkout-item">
    //                                 <h4 class="title">Order number</h4>
    //                                 <span>{list[0].order_no}</span>

    //                             </div>
    //                             <div class="checkout-total checkout-item">
    //                                 <h4 class="title">Shipping cost</h4>
    //                                 <span>₹50</span>

    //                             </div>
    //                             <div class="checkout-total checkout-item">
    //                                 <h4 class="title">Total amount</h4>
    //                                 <span>₹{list[0].total_amount}</span>

    //                             </div>
    //                             <div class="checkout-total checkout-item">
    //                                 <h4 class="title">Payment type</h4>
    //                                 <span>{list[0].payment_method}</span>

    //                             </div>
    //                             <div class="checkout-total checkout-item">
    //                                 <h4 class="title">Order date</h4>
    //                                 {/* <span>{list[0].order_date}</span> */}
    //                                  <span>{list[0].order_date ? new Date(list[0].order_date).toLocaleDateString("en-GB") : "N/A"}</span> 
    //                             </div>
    //                             <div className="checkout-total checkout-item">
    //                             <h4 className="title">Delivery date</h4>
    //                             <span>
    //                                 {list[0].order_date
    //                                 ? new Date(new Date(list[0].order_date).setDate(new Date(list[0].order_date).getDate() + 2)).toLocaleDateString("en-GB")
    //                                 : "N/A"}
    //                             </span>
    //                             </div>
    //                             <div class="raj000">
    //                             {/* <button  class="rr-primary-btn checkout-btn" id="raj456" onClick={handleClick} >Generate Invoice</button> */}
    //                             <Link to={{  pathname: "/Invoice", }} state={{ order_no: list[0].order_no }} className="rr-primary-btn checkout-btn" id="raj456"> Generate Invoice </Link>
    //                             </div>


    //                         </div>
    //                                     ) : (
    //                                         <div className="col-12 text-center" hidden>
    //                                             <h2>No data available.</h2>
    //                                         </div>
    //                                     )}

    //                     </div>



    //                 </div>
    //             </div>
    //         </section>

    //     </>
    // )

return (
    <>
        <section class="page-header">
            <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape" /></div>
            <div class="container">
                <div class="page-header-content">
                    <h1 class="title">Order Details</h1>
                    <h4 class="sub-title">
                        <span class="home">
                            <a href="index.html"><span>Home</span></a>
                        </span>
                        <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
                        <span class="inner"><span>Order Details</span></span>
                    </h4>
                </div>
            </div>
        </section>

        <section class="cart-section pt-130 pb-130">
            <div class="container">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Products */}
                    <div className="w-full lg:w-2/3">

                        {/* Mobile: stacked cards (below sm) */}
                        <div className="flex flex-col gap-3 sm:hidden">
                            {list && list.length > 0 ? (
                                list.map((val, index) => (
                                    <div key={index} className="rounded-lg border border-gray-100 shadow-sm p-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <img
                                                src={`${MEDIA_BASE_URL}/${val.product_image}`}
                                                alt="img"
                                                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                            />
                                            <h4 className="text-lg font-semibold text-gray-800 leading-snug">
                                                {val.product_name}
                                            </h4>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
                                            <div>
                                                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">Price</p>
                                                <p className="text-lg font-medium text-gray-800">₹{val.product_price}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">Qty</p>
                                                <p className="text-lg font-medium text-gray-800">{val.product_quantity}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">Subtotal</p>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    ₹{val.product_price * val.product_quantity}
                                                </p>
                                            </div>
                                        </div>
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
                            <table className="w-full min-w-[480px] border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-left">
                                        <th className="p-4 text-base font-semibold text-gray-600 uppercase tracking-wide text-center">Product</th>
                                        <th className="p-4 text-base font-semibold text-gray-600 uppercase tracking-wide">Price</th>
                                        <th className="p-4 text-base font-semibold text-gray-600 uppercase tracking-wide">Qty</th>
                                        <th className="p-4 text-base font-semibold text-gray-600 uppercase tracking-wide">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list && list.length > 0 ? (
                                        list.map((val, index) => (
                                            <tr key={index} className="border-t border-gray-100">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={`${MEDIA_BASE_URL}/${val.product_image}`}
                                                            alt="img"
                                                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                                        />
                                                        <h4 className="text-lg font-semibold text-gray-800 leading-snug">
                                                            {val.product_name}
                                                        </h4>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-lg text-gray-700 whitespace-nowrap">₹{val.product_price}</td>
                                                <td className="p-4 text-lg text-gray-700">{val.product_quantity}</td>
                                                <td className="p-4 text-lg font-semibold text-gray-900 whitespace-nowrap">
                                                    ₹{val.product_price * val.product_quantity}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-gray-500 text-lg">
                                                No products available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Order summary */}
                    {list && list.length > 0 && (
                        <div className="w-full lg:w-1/3">
                            <div className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                                <div className="bg-gray-50 p-4">
                                    <h4 className="text-lg font-semibold text-gray-800">Order Details</h4>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    <div className="flex justify-between items-center p-4">
                                        <span className="text-base text-gray-500">Order number</span>
                                        <span className="text-base font-medium text-gray-800 break-all text-right">{list[0].order_no}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4">
                                        <span className="text-base text-gray-500">Shipping cost</span>
                                        <span className="text-base font-medium text-gray-800">₹50</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4">
                                        <span className="text-base text-gray-500">Total amount</span>
                                        <span className="text-lg font-semibold text-gray-900">₹{list[0].total_amount}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4">
                                        <span className="text-base text-gray-500">Payment type</span>
                                        <span className="text-base font-medium text-gray-800">{list[0].payment_method}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4">
                                        <span className="text-base text-gray-500">Order date</span>
                                        <span className="text-base font-medium text-gray-800">
                                            {list[0].order_date ? new Date(list[0].order_date).toLocaleDateString("en-GB") : "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-4">
                                        <span className="text-base text-gray-500">Delivery date</span>
                                        <span className="text-base font-medium text-gray-800">
                                            {list[0].order_date
                                                ? new Date(new Date(list[0].order_date).setDate(new Date(list[0].order_date).getDate() + 2)).toLocaleDateString("en-GB")
                                                : "N/A"}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <Link
                                        to={{ pathname: "/Invoice" }}
                                        state={{ order_no: list[0].order_no }}
                                        className="block w-full text-center rounded-md bg-black text-white py-3 text-base font-semibold hover:bg-gray-800 transition"
                                    >
                                        Generate Invoice
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    </>
)
}
export default Cart
