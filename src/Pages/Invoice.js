import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import { useLocation } from 'react-router-dom';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { API_BASE_URL } from '../config/apiConfig'

function Invoice() {
  const location = useLocation();
  const order_no = location.state?.order_no;

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const invoiceRef = useRef();


  useEffect(() => {
    if (!order_no) {
      setErrorMsg("Order number not provided.");
      setLoading(false);
      return;
    }

    Axios.get(`${API_BASE_URL}/invoice/${order_no}`)
      .then((response) => {
        setOrderDetails(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorMsg("Invoice data not found.");
        } else {
          setErrorMsg("Error fetching invoice.");
        }
        console.error("Invoice fetch error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [order_no]);



  const handleDownloadPDF = () => {
    const input = invoiceRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${orderDetails.order_no}.pdf`);
    });
  };
  if (loading) return <p>Loading invoice...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <>

      <div className="raajj123">
        <div className="invoice-container" ref={invoiceRef} style={{ maxWidth: '900px', margin: 'auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '10px' }}>
          <div className="invoice-header">
            <h1>Invoice</h1>
            <h3>Order Number: {orderDetails.order_no}</h3>
            <p><strong>Date:</strong> {new Date(orderDetails.order_date).toLocaleDateString()}</p>
          </div>

          <div className="invoice-details" style={{ marginTop: '1rem' }}>
            <p><strong>Name:</strong> {orderDetails.user.customer_name}</p>
            <p><strong>Email:</strong> {orderDetails.user.customer_email}</p>
            <p><strong>Mobile:</strong> {orderDetails.user.customer_phone}</p>
            <p><strong>Address:</strong> {orderDetails.user.customer_address}</p>
            <p><strong>Payment Method:</strong> {orderDetails.payment_method}</p>
            <p><strong>Delivery Charge:</strong> ₹50</p>
            {/* <p><strong>Order Status:</strong> {orderDetails.order_status}</p> */}
            <p><strong>Total Amount:</strong> ₹{orderDetails.total_amount.toFixed(2)}</p>
            <p>
            <strong>Delivery Date:</strong>{" "}
            {orderDetails.order_date
              ? new Date(new Date(orderDetails.order_date).setDate(new Date(orderDetails.order_date).getDate() + 2)).toLocaleDateString()
              : "N/A"}
          </p>
            
          </div>

          <div className="invoice-items" style={{ marginTop: '2rem' }}>
            <h4>Ordered Items</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {/* Show delivery charge row only if there are items */}


                {/* Map through products */}
                {orderDetails.items.map((item, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.product_name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.product_quantity}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>₹{item.product_price}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      ₹{(item.product_quantity * item.product_price).toFixed(2)}
                    </td>
                  </tr>
                ))}
                {orderDetails.items.length > 0 && (
                  <tr>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }} colSpan={3}>Delivery Charge:</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>₹50.00</td>
                  </tr>
                )}
                {orderDetails.items.length > 0 && (
                  <tr>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }} colSpan={3}>Total amount:</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>₹{orderDetails.total_amount.toFixed(2)}</td>

                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="invoice-footer" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p>Thank you for your order!</p>


          </div>
        </div>
      </div>
      <div className="rabutton67">
        <button
          onClick={handleDownloadPDF}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1.5rem",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }} >
          Download PDF
        </button>
      </div>



    </>
  )
}
export default Invoice;